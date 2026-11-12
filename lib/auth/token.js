import crypto from "node:crypto";
import { getActiveUserByKey } from "./users.js";

export const SESSION_COOKIE_NAME = "hf_sales_session";

const DEFAULT_SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours
const MIN_SESSION_TTL_SECONDS = 60;
const MAX_SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days
const MIN_SECRET_LENGTH = 32;

function getAuthSecret() {
  const secret = process.env.SALES_AUTH_SECRET;
  if (typeof secret !== "string" || secret.length < MIN_SECRET_LENGTH) {
    return null;
  }
  return secret;
}

export function isAuthConfigured() {
  return getAuthSecret() !== null;
}

export function getSessionTtlSeconds() {
  const raw = process.env.SALES_SESSION_TTL_SECONDS;
  if (!raw) return DEFAULT_SESSION_TTL_SECONDS;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return DEFAULT_SESSION_TTL_SECONDS;
  return Math.min(
    MAX_SESSION_TTL_SECONDS,
    Math.max(MIN_SESSION_TTL_SECONDS, Math.floor(parsed)),
  );
}

function getRevocationStore() {
  if (!globalThis.__hfSalesRevokedSessions) {
    globalThis.__hfSalesRevokedSessions = new Map();
  }
  return globalThis.__hfSalesRevokedSessions;
}

function pruneRevocations(store, nowSeconds) {
  for (const [jti, exp] of store.entries()) {
    if (exp <= nowSeconds) {
      store.delete(jti);
    }
  }
}

function isTokenRevoked(jti, nowSeconds) {
  const store = getRevocationStore();
  pruneRevocations(store, nowSeconds);
  const exp = store.get(jti);
  return typeof exp === "number" && exp > nowSeconds;
}

function signPayload(encodedPayload, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");
}

function decodeAndVerifyToken(token) {
  if (typeof token !== "string" || !token) return null;
  const secret = getAuthSecret();
  if (!secret) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, providedSig] = parts;
  if (!encodedPayload || !providedSig) return null;

  const expectedSig = signPayload(encodedPayload, secret);
  const providedBuf = Buffer.from(providedSig, "utf8");
  const expectedBuf = Buffer.from(expectedSig, "utf8");

  if (
    providedBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(providedBuf, expectedBuf)
  ) {
    return null;
  }

  try {
    const json = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const payload = JSON.parse(json);
    if (!payload || typeof payload !== "object") return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Create a fresh signed session token with a cryptographically random jti.
 */
export function createSessionToken(user) {
  const secret = getAuthSecret();
  if (!secret) {
    throw new Error("SALES_AUTH_SECRET is not configured.");
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const maxAge = getSessionTtlSeconds();
  const exp = nowSeconds + maxAge;

  const payload = {
    jti: crypto.randomBytes(32).toString("hex"),
    sub: user.key,
    username: user.username,
    email: user.email,
    name: user.name,
    v: user.tokenVersion,
    iat: nowSeconds,
    exp,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url",
  );
  const signature = signPayload(encodedPayload, secret);

  return {
    token: `${encodedPayload}.${signature}`,
    maxAge,
    expiresAt: exp * 1000,
  };
}

/**
 * Verify a session token: checks signature, expiration, revocation, and active user status.
 * Returns only safe public user attributes (never secrets, hashes, or raw tokens).
 */
export function verifySessionToken(token) {
  const payload = decodeAndVerifyToken(token);
  if (!payload) return null;

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (
    typeof payload.jti !== "string" ||
    typeof payload.sub !== "string" ||
    typeof payload.iat !== "number" ||
    typeof payload.exp !== "number"
  ) {
    return null;
  }

  if (payload.exp <= nowSeconds || payload.iat > nowSeconds + 60) {
    return null;
  }

  if (isTokenRevoked(payload.jti, nowSeconds)) {
    return null;
  }

  const activeUser = getActiveUserByKey(payload.sub);
  if (!activeUser || activeUser.tokenVersion !== payload.v) {
    return null;
  }

  return {
    username: activeUser.username,
    email: activeUser.email,
    name: activeUser.name,
    expiresAt: payload.exp * 1000,
  };
}

/**
 * Revoke a valid session token on logout so it cannot be replayed.
 */
export function revokeSessionToken(token) {
  const payload = decodeAndVerifyToken(token);
  if (
    !payload ||
    typeof payload.jti !== "string" ||
    typeof payload.exp !== "number"
  ) {
    return;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (payload.exp > nowSeconds) {
    const store = getRevocationStore();
    pruneRevocations(store, nowSeconds);
    store.set(payload.jti, payload.exp);
  }
}

function isSecureCookieContext(request) {
  if (!request) {
    return process.env.NODE_ENV === "production";
  }

  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedProto) {
    return forwardedProto.split(",")[0].trim().toLowerCase() === "https";
  }

  try {
    const parsed = new URL(request.url);
    if (parsed.protocol === "https:") return true;
    const isLocalhost =
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "::1" ||
      parsed.hostname === "[::1]";
    return process.env.NODE_ENV === "production" && !isLocalhost;
  } catch {
    return process.env.NODE_ENV === "production";
  }
}

export function getSessionCookieOptions(request, maxAge) {
  return {
    name: SESSION_COOKIE_NAME,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: isSecureCookieContext(request),
    maxAge,
  };
}

export function getClearedSessionCookieOptions(request) {
  return {
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: isSecureCookieContext(request),
    maxAge: 0,
    expires: new Date(0),
  };
}

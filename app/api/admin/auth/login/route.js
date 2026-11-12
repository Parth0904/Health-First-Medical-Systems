import { NextResponse } from "next/server";
import { verifyDummyPassword, verifyPassword } from "@/lib/auth/password";
import {
  checkLoginRateLimit,
  clearLoginRateLimit,
  extractClientIp,
  recordFailedLogin,
} from "@/lib/auth/rateLimit";
import {
  createSessionToken,
  getSessionCookieOptions,
  isAuthConfigured,
} from "@/lib/auth/token";
import { findAuthorizedUser, getConfiguredSalesUsers } from "@/lib/auth/users";

export const runtime = "nodejs";

const NO_STORE_HEADERS = { "Cache-Control": "no-store" };
const GENERIC_AUTH_ERROR = "Invalid username/email or password.";
const MAX_IDENTIFIER_LENGTH = 254;
const MAX_PASSWORD_LENGTH = 256;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const rawIdentifier = body?.identifier;
  const rawPassword = body?.password;

  if (
    typeof rawIdentifier !== "string" ||
    typeof rawPassword !== "string" ||
    rawIdentifier.trim().length === 0 ||
    rawPassword.length === 0
  ) {
    return NextResponse.json(
      { error: "Username or email and password are required." },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const identifier = rawIdentifier.trim();
  if (
    identifier.length > MAX_IDENTIFIER_LENGTH ||
    rawPassword.length > MAX_PASSWORD_LENGTH
  ) {
    return NextResponse.json(
      { error: "Invalid input length." },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const ip = extractClientIp(request);
  const rateLimit = checkLoginRateLimit(ip, identifier);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: {
          ...NO_STORE_HEADERS,
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  const { configured } = getConfiguredSalesUsers();
  const authSecretConfigured = isAuthConfigured();
  if (!authSecretConfigured || !configured) {
    console.error("[sales-auth] Login unavailable:", {
      hasValidSecret: authSecretConfigured,
      hasConfiguredUsers: configured,
    });
    return NextResponse.json(
      { error: "Authentication service is temporarily unavailable." },
      { status: 503, headers: NO_STORE_HEADERS },
    );
  }

  const user = findAuthorizedUser(identifier);
  if (!user || user.disabled) {
    await verifyDummyPassword(rawPassword);
    recordFailedLogin(ip, identifier);
    return NextResponse.json(
      { error: GENERIC_AUTH_ERROR },
      { status: 401, headers: NO_STORE_HEADERS },
    );
  }

  const isPasswordValid = await verifyPassword(rawPassword, user.passwordHash);
  if (!isPasswordValid) {
    recordFailedLogin(ip, identifier);
    return NextResponse.json(
      { error: GENERIC_AUTH_ERROR },
      { status: 401, headers: NO_STORE_HEADERS },
    );
  }

  clearLoginRateLimit(ip, identifier);

  // Always mint a fresh session ID on login to prevent session fixation.
  const { token, maxAge } = createSessionToken(user);

  const response = NextResponse.json(
    {
      authenticated: true,
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
      },
    },
    { status: 200, headers: NO_STORE_HEADERS },
  );

  response.cookies.set({
    ...getSessionCookieOptions(request, maxAge),
    value: token,
  });

  return response;
}


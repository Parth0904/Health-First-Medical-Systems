import { isValidPasswordHashFormat } from "./password.js";

function decodeUsersEnv(rawValue) {
  let trimmed = rawValue.trim();
  if (!trimmed) return null;

  // Strip optional surrounding single/double quotes if pasted literally into env UI.
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    trimmed = trimmed.slice(1, -1).trim();
  }

  if (trimmed.startsWith("[")) {
    return JSON.parse(trimmed);
  }

  // Also allow base64-encoded JSON to avoid shell/platform quoting issues.
  const decoded = Buffer.from(trimmed, "base64").toString("utf8").trim();
  if (!decoded.startsWith("[")) {
    throw new Error("SALES_AUTH_USERS must be a JSON array or base64-encoded JSON array.");
  }
  return JSON.parse(decoded);
}

function normalizeUserRecord(entry) {
  if (!entry || typeof entry !== "object") return null;

  const username =
    typeof entry.username === "string" ? entry.username.trim().toLowerCase() : "";
  const email =
    typeof entry.email === "string" ? entry.email.trim().toLowerCase() : "";
  const name = typeof entry.name === "string" ? entry.name.trim() : "";
  const passwordHash =
    typeof entry.passwordHash === "string" ? entry.passwordHash.trim() : "";
  const disabled = entry.disabled === true;
  const tokenVersion =
    Number.isInteger(entry.tokenVersion) && entry.tokenVersion > 0
      ? entry.tokenVersion
      : 1;

  if (!username && !email) {
    return null;
  }

  // Reject plaintext or malformed password hashes.
  if (!isValidPasswordHashFormat(passwordHash)) {
    return null;
  }

  const key = email || username;

  return {
    key,
    username,
    email,
    name: name || username || email,
    passwordHash,
    disabled,
    tokenVersion,
  };
}

/**
 * Load explicitly configured sales accounts from SALES_AUTH_USERS.
 * Returns { configured: boolean, users: Array }.
 */
export function getConfiguredSalesUsers() {
  const raw = process.env.SALES_AUTH_USERS;
  if (!raw || !raw.trim()) {
    return { configured: false, users: [] };
  }

  try {
    const parsed = decodeUsersEnv(raw);
    if (!Array.isArray(parsed)) {
      console.error("[sales-auth] SALES_AUTH_USERS must be a JSON array.");
      return { configured: false, users: [] };
    }

    const users = [];
    for (const item of parsed) {
      const normalized = normalizeUserRecord(item);
      if (normalized) {
        users.push(normalized);
      } else {
        console.warn("[sales-auth] Skipping invalid sales account entry in SALES_AUTH_USERS.");
      }
    }

    return { configured: users.length > 0, users };
  } catch {
    console.error("[sales-auth] Failed to parse SALES_AUTH_USERS configuration.");
    return { configured: false, users: [] };
  }
}

/**
 * Find a configured sales account by username or email (case-insensitive).
 */
export function findAuthorizedUser(identifier) {
  if (typeof identifier !== "string") return null;
  const normalized = identifier.trim().toLowerCase();
  if (!normalized) return null;

  const { users } = getConfiguredSalesUsers();
  return (
    users.find(
      (user) =>
        (user.username && user.username === normalized) ||
        (user.email && user.email === normalized),
    ) || null
  );
}

/**
 * Find an active (non-disabled) configured user by canonical key.
 */
export function getActiveUserByKey(userKey) {
  if (typeof userKey !== "string" || !userKey.trim()) return null;
  const normalized = userKey.trim().toLowerCase();
  const { users } = getConfiguredSalesUsers();
  return (
    users.find((user) => !user.disabled && user.key === normalized) || null
  );
}

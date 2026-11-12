import crypto from "node:crypto";

const SCRYPT_PREFIX = "scrypt";
const DEFAULT_COST = 16384; // N
const DEFAULT_BLOCK_SIZE = 8; // r
const DEFAULT_PARALLELISM = 1; // p
const SALT_BYTES = 16;
const KEY_LENGTH = 64;
const MAX_SCRYPT_COST = 65536;
const MAX_BLOCK_SIZE = 16;
const MAX_PARALLELISM = 8;

function scryptAsync(password, salt, keylen, options) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, keylen, options, (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(derivedKey);
    });
  });
}

function parseHashParts(storedHash) {
  if (typeof storedHash !== "string") return null;

  // Support colon-delimited format (safe from .env dotenv-expand '$' expansion)
  // as well as legacy '$'-delimited format.
  const delimiter = storedHash.startsWith(`${SCRYPT_PREFIX}:`)
    ? ":"
    : storedHash.startsWith(`${SCRYPT_PREFIX}$`)
      ? "$"
      : null;

  if (!delimiter) return null;

  const parts = storedHash.split(delimiter);
  if (parts.length !== 6) return null;

  const [prefix, nStr, rStr, pStr, saltHex, hashHex] = parts;
  if (prefix !== SCRYPT_PREFIX) return null;

  const N = Number(nStr);
  const r = Number(rStr);
  const p = Number(pStr);

  if (
    !Number.isInteger(N) ||
    !Number.isInteger(r) ||
    !Number.isInteger(p) ||
    N < 1024 ||
    N > MAX_SCRYPT_COST ||
    (N & (N - 1)) !== 0 ||
    r < 1 ||
    r > MAX_BLOCK_SIZE ||
    p < 1 ||
    p > MAX_PARALLELISM
  ) {
    return null;
  }

  if (!/^[0-9a-f]+$/i.test(saltHex) || saltHex.length < 32) return null;
  if (!/^[0-9a-f]+$/i.test(hashHex) || hashHex.length !== KEY_LENGTH * 2) {
    return null;
  }

  return { N, r, p, saltHex, hashHex };
}

/**
 * Hash a plaintext password using Node's built-in scrypt KDF.
 * Output format: scrypt:<N>:<r>:<p>:<saltHex>:<hashHex>
 */
export async function hashPassword(password) {
  if (typeof password !== "string" || password.length === 0) {
    throw new Error("Password must be a non-empty string.");
  }

  const salt = crypto.randomBytes(SALT_BYTES);
  const derivedKey = await scryptAsync(password, salt, KEY_LENGTH, {
    N: DEFAULT_COST,
    r: DEFAULT_BLOCK_SIZE,
    p: DEFAULT_PARALLELISM,
    maxmem: 64 * 1024 * 1024,
  });

  return [
    SCRYPT_PREFIX,
    DEFAULT_COST,
    DEFAULT_BLOCK_SIZE,
    DEFAULT_PARALLELISM,
    salt.toString("hex"),
    derivedKey.toString("hex"),
  ].join(":");
}

/**
 * Validate that a stored hash matches the expected scrypt hash format.
 */
export function isValidPasswordHashFormat(storedHash) {
  return parseHashParts(storedHash) !== null;
}

/**
 * Verify a candidate password against a stored scrypt hash in constant time.
 */
export async function verifyPassword(password, storedHash) {
  if (typeof password !== "string" || password.length === 0) {
    return false;
  }

  const parsed = parseHashParts(storedHash);
  if (!parsed) {
    return false;
  }

  const salt = Buffer.from(parsed.saltHex, "hex");
  const expectedKey = Buffer.from(parsed.hashHex, "hex");

  const derivedKey = await scryptAsync(password, salt, expectedKey.length, {
    N: parsed.N,
    r: parsed.r,
    p: parsed.p,
    maxmem: 128 * 1024 * 1024,
  });

  if (derivedKey.length !== expectedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(derivedKey, expectedKey);
}

// Precomputed dummy scrypt hash used to equalize timing when a user is not found.
const DUMMY_PASSWORD_HASH =
  "scrypt:16384:8:1:0123456789abcdef0123456789abcdef:" + "0".repeat(128);

export async function verifyDummyPassword(password) {
  try {
    await verifyPassword(password || "dummy-password", DUMMY_PASSWORD_HASH);
  } catch {
    // Ignore dummy verification errors.
  }
}

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS_PER_ACCOUNT = 5;
const MAX_ATTEMPTS_PER_IP = 15;
const MAX_BUCKETS = 5000;

function getStore() {
  if (!globalThis.__hfSalesLoginRateLimit) {
    globalThis.__hfSalesLoginRateLimit = new Map();
  }
  return globalThis.__hfSalesLoginRateLimit;
}

function pruneExpired(store, now) {
  if (store.size === 0) return;
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
  // Safety cap against memory exhaustion.
  while (store.size > MAX_BUCKETS) {
    const oldestKey = store.keys().next().value;
    if (oldestKey === undefined) break;
    store.delete(oldestKey);
  }
}

function checkBucket(store, key, limit, now) {
  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    return { blocked: false, retryAfterSeconds: 0 };
  }
  if (entry.count >= limit) {
    return {
      blocked: true,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  return { blocked: false, retryAfterSeconds: 0 };
}

function incrementBucket(store, key, now) {
  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export function extractClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstHop = forwarded.split(",")[0]?.trim();
    if (firstHop) return firstHop;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

export function checkLoginRateLimit(ip, identifier) {
  const now = Date.now();
  const store = getStore();
  pruneExpired(store, now);

  const normalizedIp = ip || "unknown";
  const normalizedId = (identifier || "").trim().toLowerCase();

  const ipStatus = checkBucket(store, `ip:${normalizedIp}`, MAX_ATTEMPTS_PER_IP, now);
  if (ipStatus.blocked) {
    return { allowed: false, retryAfterSeconds: ipStatus.retryAfterSeconds };
  }

  if (normalizedId) {
    const accountStatus = checkBucket(
      store,
      `acct:${normalizedIp}:${normalizedId}`,
      MAX_ATTEMPTS_PER_ACCOUNT,
      now,
    );
    if (accountStatus.blocked) {
      return {
        allowed: false,
        retryAfterSeconds: accountStatus.retryAfterSeconds,
      };
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailedLogin(ip, identifier) {
  const now = Date.now();
  const store = getStore();
  pruneExpired(store, now);

  const normalizedIp = ip || "unknown";
  const normalizedId = (identifier || "").trim().toLowerCase();

  incrementBucket(store, `ip:${normalizedIp}`, now);
  if (normalizedId) {
    incrementBucket(store, `acct:${normalizedIp}:${normalizedId}`, now);
  }
}

export function clearLoginRateLimit(ip, identifier) {
  const store = getStore();
  const normalizedIp = ip || "unknown";
  const normalizedId = (identifier || "").trim().toLowerCase();
  if (normalizedId) {
    store.delete(`acct:${normalizedIp}:${normalizedId}`);
  }
}


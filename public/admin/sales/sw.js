const CACHE_VERSION = "hf-sales-static-v1";

const PRECACHE_ASSETS = [
  "/admin/sales/icon-192.png",
  "/admin/sales/icon-512.png",
  "/admin/sales/icon-maskable-512.png",
  "/admin/sales/apple-touch-icon.png",
];

const ALLOWED_EXACT_STATIC_PATHS = new Set(PRECACHE_ASSETS);

const OFFLINE_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Offline | Health First Sales</title>
    <style>
      body {
        margin: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #f8fafc;
        color: #0f172a;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
      }
      .card {
        max-width: 26rem;
        width: 100%;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
      }
      h1 {
        margin: 0 0 0.5rem;
        font-size: 1.125rem;
        font-weight: 700;
      }
      p {
        margin: 0 0 1.25rem;
        font-size: 0.875rem;
        line-height: 1.5;
        color: #475569;
      }
      button {
        background: #1d4ed8;
        color: #ffffff;
        border: 0;
        border-radius: 0.5rem;
        padding: 0.625rem 1.125rem;
        font-size: 0.8125rem;
        font-weight: 600;
        cursor: pointer;
      }
      button:hover {
        background: #1e40af;
      }
    </style>
  </head>
  <body>
    <main class="card">
      <h1>You are currently offline</h1>
      <p>
        Health First Sales requires an active internet connection to verify your
        session and load live product details.
      </p>
      <button type="button" onclick="window.location.reload()">Try Again</button>
    </main>
  </body>
</html>`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_ASSETS)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_VERSION)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isCacheableStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    ALLOWED_EXACT_STATIC_PATHS.has(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  // Never cache authenticated navigations; show generic offline screen if disconnected.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(
        () =>
          new Response(OFFLINE_HTML, {
            status: 503,
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "no-store",
            },
          }),
      ),
    );
    return;
  }

  // Never intercept or cache API routes, auth routes, RSC payloads, manifest, or sw.js.
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/admin/login") ||
    url.pathname === "/admin/sales/sw.js" ||
    url.pathname === "/admin/sales/manifest.webmanifest" ||
    url.searchParams.has("_rsc") ||
    request.headers.get("rsc")
  ) {
    return;
  }

  if (!isCacheableStaticAsset(url)) {
    return;
  }

  // Conservative cache-first for versioned /_next/static/* assets and static PWA icons.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request).then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === "basic"
        ) {
          const responseToCache = networkResponse.clone();
          caches
            .open(CACHE_VERSION)
            .then((cache) => cache.put(request, responseToCache));
        }
        return networkResponse;
      });
    }),
  );
});


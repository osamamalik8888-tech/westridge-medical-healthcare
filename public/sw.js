// Deliberately conservative. A service worker that over-caches can serve
// stale prices/hours/content indefinitely, which is a worse outcome than
// no offline support at all for a site like this. So:
//   - Page navigations: ALWAYS go to the network first. Cache is only a
//     fallback for the rare case of a fully offline visit, and even then
//     it falls back to a static offline page, not a stale cached page.
//   - Static assets (icons/photos): cache-first, since a logo or photo
//     going stale for a while is harmless and this saves real bandwidth.
//   - Everything else: pass straight through, uncached.

const CACHE_VERSION = "westridge-v1";
const OFFLINE_URL = "/offline.html";
const PRECACHE_ASSETS = [OFFLINE_URL, "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: network-first, offline page as last resort.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Icons and photos: cache-first, refresh cache in the background.
  if (url.pathname.startsWith("/icons/") || url.pathname.startsWith("/images/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
            }
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
  }
  // Everything else: default browser behaviour, no interception.
});

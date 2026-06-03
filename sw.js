// Portfolio Service Worker — Network-First Strategy
// Version bump this string on every deploy to bust old caches.
const CACHE_VERSION = 'portfolio-v1';
const CACHE_NAME = `${CACHE_VERSION}`;

// Assets to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
];

// ── Install: pre-cache shell assets ────────────────────────────────────────
self.addEventListener('install', event => {
  self.skipWaiting(); // Activate immediately without waiting
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

// ── Activate: claim clients & delete old caches ─────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim()) // Take control of all open pages
  );
});

// ── Fetch: Network-First with cache fallback ─────────────────────────────────
self.addEventListener('fetch', event => {
  // Only handle GET requests for same-origin resources
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Update cache with fresh response
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return networkResponse;
      })
      .catch(() => {
        // Network failed → serve from cache
        return caches.match(event.request);
      })
  );
});

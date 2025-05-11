const CACHE_NAME = 'quran-kareem-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',  // Add your stylesheets here
  '/script.js',  // Add your JavaScript files here
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event: caching the resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serving resources from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request); // Fetch from network if not cached
      })
  );
});

// Activate event: deleting old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

const CACHE_NAME = 'personasim-cache-v1';

// We removed the missing images and added the required CDNs
const urlsToCache =[
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/vue@3/dist/vue.global.js',
  'https://unpkg.com/dexie/dist/dexie.js',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// This "Stale-While-Revalidate" fetch strategy is better for CDNs
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached version immediately if available
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise fetch from the network
      return fetch(event.request).catch(() => {
        // Optional: Return a fallback offline page if you had one
      });
    })
  );
});
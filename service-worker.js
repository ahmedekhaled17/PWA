const CACHE_NAME = "zaqapp-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./about.html",
  "./contact.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./images/icons/web-app-manifest-192x192.png",
  "./images/icons/web-app-manifest-512x512.png"
];

// Install Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
});

// Fetch from cache or network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});

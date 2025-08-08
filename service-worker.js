const CACHE_NAME = "zaqapp-cache-v1";
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const ASSETS = [
  "./",
  "./index.html",
  "./about.html",
  "./contact.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./offline.html",
  "./images/icons/web-app-manifest-192x192.png",
  "./images/icons/web-app-manifest-512x512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
});

self.addEventListener("fetch", event => {
  if (event.request.url === API_URL) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request).then(response => {
          return response || caches.match('./offline.html');
        });
      })
    );
  }
});

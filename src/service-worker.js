const cacheName = 'reactive-todo-app'
const filesToCache = [
  '/index.html',
  '/index.js',
  '/index.css',
]
// Cache root path on production
if (location.hostname !== 'localhost') filesToCache.push('/')

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app shell')
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map(key => {
      if (key !== cacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
    })))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

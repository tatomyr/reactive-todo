const cacheName = 'reactive-todo-app'
const filesToCache = [
  '/dist/index.html',
  '/dist/index.js',
  '/dist/index.css',
]

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

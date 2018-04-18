const dev = location.hostname == 'localhost'
console.log('0.0.51', dev ? 'development mode' : 'production mode')

const cacheName = 'reactive-todo-app'

const filesToCache = dev
  ? []
  : [
    '/',
    '/index.html',
    '/index.js',
    '/index.css',
    '/assets/fonts/SandNew.ttf',
    '/assets/images/undefined-task.jpg',
    '/assets/images/loading-shape.gif',
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

/* eslint-disable no-restricted-globals */

const dev = location.hostname === 'localhost'
console.log('3.0.6', dev ? 'development mode' : 'production mode')

if (!dev) {
  const cacheName = 'reactive-todo-app'

  let srcFiles
  // FIXME:
  let filesToCache = dev
    ? []
    : [
      '/',
      '/index.html',
      '/index.js',
      '/manifest.json',
      '/reset.css',
      '/style.css',
      '/assets/images/loading-shape.gif',
      '/assets/images/undefined-task.jpg',
    ]

  if (srcFiles) {
    console.log(srcFiles)
    filesToCache = [...filesToCache, ...srcFiles]
  }

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
    console.log('[ServiceWorker] Activate')
    e.waitUntil(
      caches.keys().then(keyList => Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
          return undefined
        })
      ))
    )
    return self.clients.claim()
  })

  self.addEventListener('fetch', e => {
    console.log('[Service Worker] Fetch', e.request.url)
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)))
  })
}

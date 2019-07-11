/* eslint-disable no-restricted-globals */
const version = 'BUILD_DATE'
const cacheName = version
let srcFiles // Should come from bash script when building
// FIXME:
let filesToCache = [
  '/',
  '/index.html',
  '/index.js',
  '/manifest.json',
  '/reset.css',
  '/style.css',
  '/assets/images/loading-shape.gif',
  '/assets/images/undefined-task.jpg',
  // Modules
  'https://tatomyr.github.io/purity/factory.js',
  'https://tatomyr.github.io/purity/htmx.js',
  'https://tatomyr.github.io/shared-modules/md5.js',
  // Font
  'https://tatomyr.github.io/unisource/unisource.ttf',
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

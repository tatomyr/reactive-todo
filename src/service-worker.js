const version = 'BUILD_DATE'
const cacheName = version
let srcFiles // Should come from bash script when building
// FIXME:
let filesToCache = [
  '/',
  '/index.html',
  '/index.js',
  '/manifest.json',
  '/styles/reset.css',
  '/styles/style.css',
  '/assets/images/loading-shape.gif', // IMAGES.LOADING
  '/assets/images/icon-pack/idea.svg', // IMAGES.UNDEFINED_TASK
  '/assets/images/icon-pack/forbidden.svg', // IMAGES.BROKEN
  // Modules
  './purity-modules/core.js',
  './purity-modules/register-async.js',
  './purity-modules/debounce.js',
  './purity-modules/md5.js',
  './purity-modules/sanitize.js',
  // Fonts
  'https://fonts.googleapis.com/css?family=Fira+Sans',
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
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
          return undefined
        })
      )
    )
  )
  return self.clients.claim()
})

self.addEventListener('fetch', e => {
  console.log('[Service Worker] Fetch', e.request.url)
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)))
})

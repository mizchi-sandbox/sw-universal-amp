console.log('sw started')
const VERSION = 2
const PRELOAD_FILES = ['/offline.html']

self.addEventListener('install', ev => {
  console.info(`sw:installed v${VERSION}`)
  ev.waitUntil(skipWaiting())
})

self.addEventListener('activate', ev => {
  console.info(`sw:activated v${VERSION}`)
  ev.waitUntil(
    self.clients
      .claim()
      .then(() => caches.keys())
      .then(keys =>
        Promise.all(
          keys.filter(key => key !== VERSION).map(key => caches.delete(key))
        )
      )
      .then(() => caches.open(VERSION))
      .then(cache => cache.addAll(PRELOAD_FILES))
  )
})

// Return cache
self.addEventListener('fetch', event => {
  console.info('sw:fetch', event.request.url)
  event.respondWith(
    caches.match(event.request).then(res => {
      if (!!res) {
        console.log('return cache: ', event.request.url)
      }
      return res || fetch(event.request)
    })
  )
})

self.addEventListener('push', () => {
  console.log('sw:push')
  self.registration.update()
})

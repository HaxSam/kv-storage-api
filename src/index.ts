import router from './routes/index'

addEventListener('fetch', (event) => {
  event.respondWith(router.handleRequest(event.request))
})

import { mount } from './store-provider/index.js'
import { App } from './ui/App.js'

// Render page
mount(App, document.getElementById('root'))

// TODO: implement config files for different environments and use them on build / dev
const dev = location.hostname === 'localhost'
// Registering service worker
console.log(`dev=${dev}`)
if ('serviceWorker' in navigator && !dev) {
  navigator.serviceWorker.register('./service-worker.js').then(() => {
    console.log('Service Worker Registered')
  })
}

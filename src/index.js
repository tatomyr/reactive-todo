import { mount } from './store-provider/index.js'
import App from './ui/App.js'

// Render page
mount(document.getElementById('root'), App)

// Registering service worker
const dev = location.hostname === 'localhost'
console.log(`dev=${dev}`)
if ('serviceWorker' in navigator && !dev) {
  navigator.serviceWorker.register('./service-worker.js').then(() => {
    console.log('Service Worker Registered')
  })
}

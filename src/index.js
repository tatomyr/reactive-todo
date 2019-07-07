import { mount } from './store-provider/index.js'
import { App } from './ui/App.js'

// Render page
mount(App)

// Registering service worker
// eslint-disable-next-line no-restricted-globals
const stage = 'DEV' // location.hostname === 'localhost' ? 'DEV' : 'PROD'
console.log(stage, stage !== 'DEV', 'serviceWorker' in navigator)
if (stage !== 'DEV' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(() => {
    console.log('Service Worker Registered')
  })
}

import { mount } from './store/provider.js'
import { App } from './ui/App.js'

// Render page
mount(App)

// Registering service worker
// TODO: provide a maintainable DEV/PROD flagging
const stage = location.hostname === 'localhost' ? 'DEV' : 'PROD'
console.log(stage, stage !== 'DEV', 'serviceWorker' in navigator)
if (stage !== 'DEV' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(() => {
    console.log('Service Worker Registered')
  })
}

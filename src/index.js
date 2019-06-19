import App from './ui/App.js'

// Render page
const mount = app => {
  document.querySelector('#root').innerHTML = app
  document.querySelector('input').focus() // XXX
};
(() => {
  mount(App())
})()

// Registering service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(() => {
    console.log('Service Worker Registered')
  })
}

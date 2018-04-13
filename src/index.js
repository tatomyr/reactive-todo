import './reset.css'
import './style.css'
import App from './App'

// Render page
const mount = app => {
  document.getElementById('root').innerHTML = app
  document.querySelector('input').focus() // XXX
}

(() => {
  mount(App())
})()

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(() => { console.log('Service Worker Registered') })
}

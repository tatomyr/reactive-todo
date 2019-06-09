import { connect } from '/store-provider/index.js'

const Notification = ({ notification }) => `
  <div
    id="notification"
    ${notification.pageY ? `style="top: calc(${notification.pageY}px - 1.5em)"` : ''}
    class="${notification.text ? '' : 'hidden'}"
  >
    <div class="notification-text">${notification.text}</div>
  </div>
`

Notification.args = ['notification']

export default connect(Notification)

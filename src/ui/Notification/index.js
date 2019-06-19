import { connect } from '/store-provider/index.js'

const Notification = ({ notification: { pageY = 70, text } }) => `
  <div
    id="notification"
    style="top: calc(${pageY}px - 1.5em)"
    class="${text ? '' : 'hidden'}"
  >
    <div class="notification-text">${text}</div>
  </div>
`

export default connect(Notification)

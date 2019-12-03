import { render } from '/modules.js'
import { connect } from '/store/provider.js'

export const Notification = connect(
  ({ notification: { pageY = 70, text } }) => render`
    <div
      id="notification"
      style="top: calc(${pageY}px - 1.5em)"
      class="${text ? '' : 'hidden'}"
    >
      <div class="notification-text">${text}</div>
    </div>
  `
)

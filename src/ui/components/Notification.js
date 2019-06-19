import { connect } from '/store-provider/index.js'

export const Notification = connect(
  ({ notification: { pageY = 70, text } }) => `
    <div
      id="notification"
      style="top: calc(${pageY}px - 1.5em)"
      class="${text ? '' : 'hidden'}"
    >
      <div class="notification-text">${text}</div>
    </div>
  `
)

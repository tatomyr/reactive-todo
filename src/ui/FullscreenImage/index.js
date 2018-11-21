import { connect } from '@store-provider'

const FullscreenImage = ({ taskToShowImage, tasks }) => `
  <div
    class="fullimage-container ${!taskToShowImage ? 'hidden' : ''}"
    onclick="global.dispatch({ type: 'SHOW_IMAGE', taskToShowImage: '' })"
  >
    <img
      src="${taskToShowImage && tasks.find(({ id }) => id === taskToShowImage).images[0]}"
    />
    <button
      class="invisible-button round change-image prev"
      onclick="event.stopPropagation(); global.dispatch({ type: '@CHANGE_IMAGE', direction: 'prev', taskId: '${taskToShowImage}' })"
    >
      <
    </button>
    <button
      class="invisible-button round change-image next"
      onclick="event.stopPropagation(); global.dispatch({ type: '@CHANGE_IMAGE', direction: 'next', taskId: '${taskToShowImage}' })"
    >
      >
    </button>
  </div>
`

FullscreenImage.args = ['taskToShowImage', 'tasks']

export default connect(FullscreenImage)

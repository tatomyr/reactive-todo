import { connect } from '@store-provider'

const FullscreenImage = ({ taskToShowImage, tasks }) => `
  <div
    class="fullimage-container ${!taskToShowImage ? 'hidden' : ''}"
    onclick="dispatch({ type: 'SHOW_IMAGE', taskToShowImage: '' })"
  >
    <img
      src="${taskToShowImage && tasks.find(({ id }) => id === taskToShowImage).images[0]}"
    />
    <button
      class="invisible-button round change-image prev"
      onclick="event.stopPropagation(); dispatch({ type: 'CHANGE_IMAGE', direction: 'prev', taskId: '${taskToShowImage}' })"
    >
      ◂
    </button>
    <button
      class="invisible-button round change-image next"
      onclick="event.stopPropagation(); dispatch({ type: 'CHANGE_IMAGE', direction: 'next', taskId: '${taskToShowImage}' })"
    >
      ▸
    </button>
  </div>
`

FullscreenImage.args = ['taskToShowImage', 'tasks']

export default connect(FullscreenImage)

// TODO: implement some nice visual effect when onening an image

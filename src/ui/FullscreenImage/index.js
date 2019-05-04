import { connect } from '@store-provider'

const selectTaskImages = (tasks, id) => id && tasks.find(task => task.id === id).images

const FullscreenImage = ({ taskToShowImage, tasks }) => `
  <div class="fullimage-container ${!taskToShowImage ? 'hidden' : ''}">
    <div
      id="fullscreen-image"
      class="bg"
      style="background-image: url(${selectTaskImages(tasks, taskToShowImage)[0]})"
      onclick="dispatch({ type: 'HIDE_IMAGE' })"
    ></div>
    <button
      class="invisible-button round change-image prev"
      onclick="
        event.stopPropagation();
        dispatch({ type: 'CHANGE_IMAGE', direction: 'prev', taskId: '${taskToShowImage}' })
      "
      ${selectTaskImages(tasks, taskToShowImage).length <= 1 ? 'disabled' : ''}
    >◂</button>
    <button
      class="invisible-button round change-image next"
      onclick="
        event.stopPropagation();
        dispatch({ type: 'CHANGE_IMAGE', direction: 'next', taskId: '${taskToShowImage}' })
      "
      ${selectTaskImages(tasks, taskToShowImage).length <= 1 ? 'disabled' : ''}
    >▸</button>
  </div>
`

FullscreenImage.args = ['taskToShowImage', 'tasks']

export default connect(FullscreenImage)

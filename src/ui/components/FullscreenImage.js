import { connect } from '/store-provider/index.js'

const selectTaskImages = (tasks, id) => id && tasks.find(task => task.id === id).images

export const FullscreenImage = connect(
  ({ taskToShowImage, tasks }) => `
    <div 
      id="fullscreen-image-container" 
      class="fullimage-container ${!taskToShowImage ? 'hidden' : ''}"
    >
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
)
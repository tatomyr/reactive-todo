import { connect } from '/store-provider/index.js'
import { selectTaskImages } from '/services/index.js'

export const ChangeImage = connect(
  ({ taskToShowImage, direction, disabled }) => `
    <button
      class="invisible-button round change-image ${direction}"
      onclick="
          event.stopPropagation();
          dispatch({ type: 'CHANGE_IMAGE', direction: '${direction}', taskId: '${taskToShowImage}' })
        "
      ${disabled ? 'disabled' : ''}
    >
      ${direction === 'prev' ? '◂' : '▸'}
    </button>
  `
)

export const CapturePhoto = connect(
  ({ taskToShowImage }) => `
    <label for="capture" class="round change-image capture">
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        id="capture"
        onchange="dispatch({ 
          type: 'CAPTURE_PHOTO', 
          files: event.target.files, 
          taskId: '${taskToShowImage}' 
        })"
      />
    </label>
  `
)

export const FullscreenImage = connect(({ taskToShowImage, tasks }) => {
  const [image, others = []] = selectTaskImages(tasks, taskToShowImage)
  return `
    <div 
      id="fullscreen-image-container" 
      class="fullimage-container ${!taskToShowImage ? 'hidden' : ''}"
    >
      <div
        id="fullscreen-image"
        class="bg"
        style="background-image: url(${image})"
        onclick="dispatch({ type: 'HIDE_IMAGE' })"
      ></div>
      <section class="image-controls">
        ${ChangeImage({ direction: 'prev', disabled: !others.length })}
        ${CapturePhoto()}
        ${ChangeImage({ direction: 'next', disabled: !others.length })}
      </section>
    </div>
  `
})

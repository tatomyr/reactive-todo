import { html } from '/modules/purity.js'
import { connect } from '/store-provider/index.js'
import { selectTaskImages } from '/services/index.js'
import { Icon } from './Icon.js'

export const ChangeImage = connect(
  ({ taskToShowImage, direction, disabled }) => html(Icon)`
    <button
      class="invisible-button round change-image ${direction}"
      onclick="
          event.stopPropagation();
          dispatch({ type: 'CHANGE_IMAGE', direction: '${direction}', taskId: '${taskToShowImage}' })
        "
      ${disabled ? 'disabled' : ''}
    >
      <Icon name="${direction}", disabled=${disabled} />
    </button>
  `
)

export const CapturePhoto = connect(
  ({ taskToShowImage }) => html(Icon)`
    <label for="capture" class="round change-image">
      <Icon name="camera" />
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
        ${ChangeImage({ direction: 'back', disabled: !others.length })}
        ${CapturePhoto()}
        ${ChangeImage({ direction: 'next', disabled: !others.length })}
      </section>
    </div>
  `
})

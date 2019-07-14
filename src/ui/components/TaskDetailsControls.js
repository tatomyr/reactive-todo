import { htmx } from '/modules/purity.js'
import { connect } from '/store-provider/index.js'
import { Icon } from './Icon.js'

export const ChangeImage = connect(
  ({ taskId, direction, disabled }) => htmx({ Icon })`
    <button
      class="invisible-button round change-image ${direction}"
      onclick="
        event.stopPropagation();
        dispatch({ type: 'CHANGE_IMAGE', direction: '${direction}', taskId: '${taskId}' })
      "
      ${disabled ? 'disabled' : ''}
    >
      <Icon name=${direction} disabled=${disabled} />
    </button>
  `
)

export const CapturePhoto = connect(
  ({ taskId }) => htmx({ Icon })`
    <label for="capture" class="round change-image">
      <Icon name=${'camera'} />
      <input
        type="file" 
        accept="image/*" 
        capture="environment" 
        id="capture"
        onchange="dispatch({ 
          type: 'CAPTURE_PHOTO', 
          file: event.target.files[0], 
          taskId: '${taskId}' 
        })"
      />
    </label>
  `
)

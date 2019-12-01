import { render } from '/modules/purity.js'
import { connect, dispatch } from '/store/provider.js'
import { Icon } from './Icon.js'

export const ChangeImage = connect(
  ({ taskId, direction, disabled }) => render`
    <button
      class="invisible-button round change-image ${direction}"
      ::click=${e => {
        e.stopPropagation()
        dispatch({ type: 'CHANGE_IMAGE', direction, taskId })
      }}
      ${disabled && 'disabled'}
    >
      ${Icon({ name: direction, disabled })}
    </button>
  `
)

export const CapturePhoto = connect(
  ({ taskId }) => render`
    <label for="capture" class="round change-image">
      ${Icon({ name: 'camera' })}
      <input
        type="file" 
        accept="image/*" 
        capture="environment" 
        id="capture"
        ::change=${e => {
          dispatch({ type: 'CAPTURE_PHOTO', file: e.target.files[0], taskId })
        }}
      />
    </label>
  `
)

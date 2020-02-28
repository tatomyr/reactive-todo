import { render } from '/modules.js'
import { dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'
import { Icon } from './Icon.js'

export const ChangeImage = ({ taskId, direction, disabled }) => render`
  <button
    type="button"
    class="invisible-button round change-image ${direction}"
    ::click=${e => {
      dispatch({ type: types.CHANGE_IMAGE, direction, taskId })
    }}
    ${disabled && 'disabled'}
  >
    ${Icon({ name: direction, disabled })}
  </button>
`

export const CapturePhoto = ({ taskId }) => render`
  <label for="capture" class="round change-image">
    ${Icon({ name: 'photo-camera' })}
    <input
      type="file"
      accept="image/*"
      capture="environment"
      id="capture"
      ::change=${({
        target: {
          files: [file],
        },
      }) => {
        dispatch({ type: types.CAPTURE_PHOTO, file, taskId })
      }}
    />
  </label>
`

export const TriggerTask = ({ id: taskId, completed }) => render`
  <a
    href="#/active"
    class="link"
    ::click=${e => {
      dispatch({ type: types.TRIGGER_TASK, taskId })
    }}
  >
    <div class="round">
      ${Icon({ name: completed ? 'push-pin' : 'success' })}
    </div>
  </a>
`

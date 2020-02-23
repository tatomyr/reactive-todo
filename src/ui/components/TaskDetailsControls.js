import { render } from '/modules.js'
import { connect, dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'
import { Icon } from './Icon.js'

import { router } from '../../hashrouter.js'

export const ChangeImage = router(
  connect(
    ({ taskId, direction, disabled }) => render`
      <button
        class="invisible-button round change-image ${direction}"
        ::click=${e => {
          e.stopPropagation()
          dispatch({ type: types.CHANGE_IMAGE, direction, taskId })
        }}
        ${disabled && 'disabled'}
      >
        ${Icon({ name: direction, disabled })}
      </button>
    `
  )
)

export const CapturePhoto = router(
  ({ taskId }) => render`
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
)

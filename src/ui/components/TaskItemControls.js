import { render } from '/modules.js'
import { dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'

export const UpButton = ({ taskId }) => render`
  <button
    class="invisible-button round up-button"
    ::click=${e => {
      dispatch({
        type: types.UPDATE_TASK,
        task: { id: taskId, updatedAt: Date.now() },
      })
    }}
  >
    ▴
  </button>
`

export const DeleteButton = ({ taskId }) => render`
  <button
    class="invisible-button round delete-button"
    ::click=${e => {
      dispatch({ type: types.DELETE_TASK, taskId, pageY: e.pageY })
    }}
  >
    ✗
  </button>
`

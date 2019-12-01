import { render } from '/modules/purity.js'
import { dispatch } from '/store/provider.js'

export const UpButton = ({ taskId }) => render`
  <button
    class="invisible-button round up-button"
    ::click=${e => {
      dispatch({
        type: 'UPDATE_TASK',
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
      dispatch({ type: 'DELETE_TASK', taskId, pageY: e.pageY })
    }}
  >
    ✗
  </button>
`

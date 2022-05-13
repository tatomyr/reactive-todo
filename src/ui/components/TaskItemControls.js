import { render } from '/modules.js'
import { dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'
import { Icon } from './Icon.js'

export const UpButton = ({ taskId, updatedAt }) => render`
  <button
    class="invisible-button round up-button"
    ::click=${e => {
      dispatch({
        type: types.UPDATE_TASK,
        task: { id: taskId, updatedAt: Date.now() },
      })
    }}
  >
    ${Icon({
      name: Date.now() > updatedAt + 24 * 60 * 60 * 1000 ? 'flag-3' : 'flag-4',
      size: 'S',
    })}
  </button>
`

export const DeleteButton = ({ taskId, updatedAt }) => render`
  <button
    class="invisible-button round delete-button"
    ::click=${e => {
      dispatch({ type: types.DELETE_TASK, taskId, pageY: e.pageY })
    }}
  >
    ${Icon({
      name:
        Date.now() > updatedAt + 24 * 60 * 60 * 1000 ? 'garbage-2' : 'trash',
      size: 'S',
    })}
  </button>
`

export const ActionButton = ({ completed, id: taskId, updatedAt }) =>
  (completed ? DeleteButton : UpButton)({
    taskId,
    updatedAt,
  })

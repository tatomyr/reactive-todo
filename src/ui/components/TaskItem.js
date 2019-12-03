import { render } from '/modules.js'
import { dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'
import { formatDescription } from '/services/index.js'
import { DeleteButton, UpButton } from './TaskItemControls.js'

export const TaskItem = task => render`
  <li id="${task.id}">
    <div
      class="task ${task.completed ? 'completed' : ''}"
      ::touchstart=${e => {
        dispatch({ type: types.MOVE_TASK, taskId: task.id, event: e })
      }}
    >
      <div
        class="image round bg"
        style="background-image: url(${task.images && task.images[0]})"
      ></div>
      <div
        class="description"
        ::click=${e => {
          dispatch({ type: types.SHOW_TASK_DETAILS, taskId: task.id })
        }}
      >
        <div>${formatDescription(task)}</div>
      </div>

      ${(task.completed ? DeleteButton : UpButton)({ taskId: task.id })}
    </div>
  </li>
`

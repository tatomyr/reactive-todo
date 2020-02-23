import { render } from '/modules.js'
import { dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'
import { formatDescription, BROKEN_IMAGE } from '/services/index.js'
import { ActionButton } from './TaskItemControls.js'

import { router } from '../../hashrouter.js'

export const TaskItem = router(
  ({ view, ...task }) => render`
    <li>
      <div
        class="task ${task.completed && 'completed'}"
        ::touchstart=${e => {
          dispatch({ type: types.MOVE_TASK, taskId: task.id, event: e })
        }}
      >
        <img
          class="image round"
          src="${task.images && task.images[0]}"
          srcset="${task.images && task.images[0]}, ${BROKEN_IMAGE}"
          loading="lazy"
        />
        
        <a href="#/${view}/tasks/${task.id}" class="description link">
          <div>${formatDescription(task)}</div>
        </a>

        ${ActionButton(task)}
      </div>
    </li>
  `
)

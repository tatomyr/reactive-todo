import { formatDescription } from '/services/index.js'
import { DeleteButton, UpButton } from './TaskItemControls.js'

export const TaskItem = task => `
  <li id="${task.id}">
    <div
      class="task ${task.completed ? 'completed' : ''}"
      ontouchstart="dispatch({ type: 'MOVE_TASK', taskId: '${task.id}', event })"
    >
      <div
        class="image round bg"
        style="background-image: url(${task.images && task.images[0]})"
      ></div>
      <div
        class="description"
        onclick="dispatch({ type: 'SHOW_TASK_DETAILS', taskId: '${task.id}' })"
      >
        <div>${formatDescription(task)}</div>
      </div>

      ${(task.completed ? DeleteButton : UpButton)({ taskId: task.id })}
    </div>
  </li>
`

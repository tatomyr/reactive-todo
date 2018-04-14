import { highlight } from '../../fakes'

export const TaskItem = task => `
  <li
    ${highlight('light')}
    id="${task.id}"
    class="task ${task.completed ? 'completed' : ''}"
  >
    <div class="image" style="background-image: url(${task.img})"></div>
    <div
      class="description"
      onclick="global.dispatch('TRIGGER_TASK', { taskId: '${task.id}' })"
    >
      ${task.description}
    </div>
    <div class="button-column">
      ${task.completed
        ? `
          <button
            class="invisible-button delete-button"
            onclick="global.dispatch('DELETE_TASK', { taskId: '${task.id}' })"
          >
            X
          </button>
        `
        : ''
      }
    </div>
  </li>
`

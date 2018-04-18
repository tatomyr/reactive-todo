import { highlight } from '../../fakes'

export const TaskItem = task => `
  <li
    ${highlight('light')}
    id="${task.id}"
    class="task ${task.completed ? 'completed' : ''}"
  >
    <div
      class="image round"
      style="background-image: url(${task.images && task.images[0]})"
      onclick="global.dispatch('SHOW_IMAGE', { taskToShowImage: '${task.id}' })"
    ></div>
    <div
      class="description"
      onclick="global.dispatch('TRIGGER_TASK', { taskId: '${task.id}', pageY: event.pageY })"
    >
      <div>${task.description}</div>
    </div>

    ${task.completed
      ? `
        <button
          class="invisible-button round delete-button"
          onclick="global.dispatch('DELETE_TASK', { taskId: '${task.id}' })"
        >
          x
        </button>
      `
      : `
        <button
          class="invisible-button round up-button"
          onclick="global.dispatch('UPDATE_TASK', { taskId: '${task.id}' })"
        >
          л
        </button>
      `
    }

  </li>
`

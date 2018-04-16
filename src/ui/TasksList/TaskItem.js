import { highlight } from '../../fakes'

export const TaskItem = task => `
  <li
    ${highlight('light')}
    id="${task.id}"
    class="task ${task.completed ? 'completed' : ''}"
  >
    <div
      class="image"
      style="background-image: url(${task.img})"
      onclick="global.dispatch('SHOW_IMAGE', { imageToShow: '${task.img}' })"
    ></div>
    <div
      class="description"
      onclick="global.dispatch('TRIGGER_TASK', { taskId: '${task.id}' })"
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

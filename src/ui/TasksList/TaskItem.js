export const TaskItem = task => `
  <li id="${task.id}">
    <div
      class="task ${task.completed ? 'completed' : ''}"
      ontouchstart="dispatch({ type: 'MOVE_TASK', id: '${task.id}', event })"
    >
      <div
        class="image round"
        style="background-image: url(${task.images && task.images[0]})"
        onclick="dispatch({ type: 'SHOW_IMAGE', taskToShowImage: '${task.id}' })"
      ></div>
      <div
        class="description"
        ondblclick="dispatch({ type: 'TRIGGER_TASK', id: '${task.id}', pageY: event.pageY })"
      >
        <div>${task.description}</div>
      </div>

      ${
  task.completed
    ? `
        <button
          class="invisible-button round delete-button"
          onclick="dispatch({ type: 'DELETE_TASK', id: '${task.id}', pageY: event.pageY })"
        >
          x
        </button>
      `
    : `
        <button
          class="invisible-button round up-button"
          onclick="dispatch({ type: 'UPDATE_TASK', task: { id: '${task.id}' } })"
        >
          ▴
        </button>
      `
}
    </div>
  </li>
`

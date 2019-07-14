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
        <div>${task.description}</div>
      </div>

      ${
  task.completed
    ? `
        <button
          class="invisible-button round delete-button"
          onclick="dispatch({ type: 'DELETE_TASK', taskId: '${task.id}', pageY: event.pageY })"
        >
          ✗
        </button>
      ` // TODO: refactor & move to TaskItemControls
    : `
        <button
          class="invisible-button round up-button"
          onclick="dispatch({ 
            type: 'UPDATE_TASK', 
            task: { id: '${task.id}', updatedAt: Date.now() } 
          })"
        >
          ▴
        </button>
      `
}
    </div>
  </li>
`

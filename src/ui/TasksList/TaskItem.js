export const TaskItem = task => `
  <li id="${task.id}">
    <div
      class="task ${task.completed ? 'completed' : ''}"
      ontouchstart="global.dispatch({ type: '@TOUCH_START', id: '${task.id}', event })"
    >
      <div
        class="image round"
        style="background-image: url(${task.images && task.images[0]})"
        onclick="global.dispatch({ type: 'SHOW_IMAGE', taskToShowImage: '${task.id}' })"
      ></div>
      <div
        class="description"
        ondblclick="global.dispatch({ type: '@TRIGGER_TASK', id: '${task.id}', pageY: event.pageY })"
      >
        <div>${task.description}</div>
      </div>

      ${task.completed ? `
        <button
          class="invisible-button round delete-button"
          onclick="global.dispatch({ type: '@DELETE_TASK', id: '${task.id}', pageY: event.pageY })"
        >
          x
        </button>
      ` : `
        <button
          class="invisible-button round up-button"
          onclick="global.dispatch({ type: '@UPDATE_TASK', task: { id: '${task.id}' } })"
        >
          л
        </button>
      `}
    </div>
  </li>
`

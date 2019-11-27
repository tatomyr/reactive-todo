export const UpButton = ({ taskId }) => `
  <button
    class="invisible-button round up-button"
    onclick="dispatch({ 
      type: 'UPDATE_TASK', 
      task: { id: '${taskId}', updatedAt: Date.now() } 
    })"
  >
    ▴
  </button>
`

export const DeleteButton = ({ taskId }) => `
  <button
    class="invisible-button round delete-button"
    onclick="dispatch({ type: 'DELETE_TASK', taskId: '${taskId}', pageY: event.pageY })"
  >
    ✗
  </button>
`

import {
  NavBar, TasksList, FullscreenImage, Notification,
} from '../components/index.js'

export const TodoPage = () => `
  <div id="todo-page" class="container">
    ${NavBar()}
    ${TasksList()}
    <div class="form">
      <form
        onSubmit="
          event.preventDefault()
          dispatch({ type: 'CREATE_TASK', event })
        "
      >
        <input
          class="input"
          id="newTask"
          name="newTask"
          placeholder="New task..."
          required
          maxlength="60"
          autocomplete="off"
          onkeyup="dispatch({ type: 'CHANGE_INPUT', input: event.target.value })"
        />
        <div
          id="clear"
          class="round"
          onclick="dispatch({ type: 'CLEAN_INPUT', target: 'newTask' })"
        >
          ✗
        </div>
      </form>
    </div>
    ${FullscreenImage()}
    ${Notification()}
  </div>
`

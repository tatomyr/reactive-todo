import TasksList from './TasksList'
import Header from './Header'
import FullscreenImage from './FullscreenImage'
import Notification from './Notification'

// Main component (stateless)
export default () => `
  <div class="container">
    ${Header()}

    ${TasksList()}

    <div class="form">
      <form onSubmit="global.dispatch({ type: '@ADD_TASK', event })">
        <input
          class="input"
          id="newTask"
          name="newTask"
          placeholder="New Task..."
          required
          maxlength="60"
          autocomplete="off"
          onkeyup="global.dispatch({ type: '@CHANGE_INPUT', input: event.target.value })"
        />
        <div
          id="clear"
          class="round"
          onclick="global.dispatch({ type: '@CLEAR_INPUT', target: 'newTask' })"
        >
          x
        </div>
      </form>
    </div>

    ${FullscreenImage()}

    ${Notification()}
  </div>
`

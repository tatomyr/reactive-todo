import { highlight } from '../fakes'
import TasksList from './TasksList'
import Header from './Header'
import FullscreenImage from './FullscreenImage'
import Notification from './Notification'

// Main component (storeless)
export default () => `
  <div class="container">
    ${Header()}

    ${TasksList()}

    <div class="form">
      <form onSubmit="global.dispatch('ADD_TASK', { event: event })">
        <input
          class="input"
          id="newTask"
          name="newTask"
          placeholder="New Task..."
          required
          maxlength="60"
          autocomplete="off"
          ${highlight('dark')}
          onkeyup="global.dispatch('CHANGE_INPUT', { input: event.target.value })"
        />
        <div
          id="clear"
          class="round"
          onclick="global.dispatch('CLEAR_INPUT', { target: 'newTask' })"
        >
          x
        </div>
      </form>
    </div>

    ${FullscreenImage()}

    ${Notification()}
  </div>
`

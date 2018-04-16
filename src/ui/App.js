import { highlight } from '../fakes'
import TasksList from './TasksList'
// import Filter from './Filter'
import Header from './Header'

// Main component (storeless)
export default () => `
  <div class="container">
    ${Header()}

    ${TasksList()}

    <div class="controls">
      <form onSubmit="global.dispatch('ADD_TASK', { event: event })">
        <input
          class="input"
          id="newTask"
          name="newTask"
          placeholder="New Task..."
          required
          maxlength="60"
          ${highlight('dark')}
        />
        <div
          id="clear"
          onclick="global.dispatch('CLEAR_INPUT', { target: 'newTask' })"
        >
          x
        </div>
      </form>
    </div>
  </div>
`

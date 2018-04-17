import { highlight } from '../fakes'
import TasksList from './TasksList'
import Header from './Header'
import ImageToShow from './ImageToShow'

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

    ${ImageToShow()}
  </div>
`

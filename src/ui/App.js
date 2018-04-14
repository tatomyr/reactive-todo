import { highlight } from '../fakes'
import TasksList from './TasksList'
import Filter from './Filter'
import Header from './Header'

// Main component (storeless)
export default () => `
  <div class="container">
    ${Header()}

    ${TasksList()}

    <div class="controls">
      <div class="row">
        <form onSubmit="global.dispatch('ADD_TASK', { event: event })">
          <input
            class="input"
            name="newTask"
            placeholder="New Task..."
            required
            maxlength="60"
            ${highlight('dark')}
          />
        </form>
      </div>

      ${Filter()}
    </div>
  </div>
`

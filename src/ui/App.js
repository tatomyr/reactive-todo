import TasksList from './TasksList/index.js'
import Header from './Header/index.js'
import FullscreenImage from './FullscreenImage/index.js'
import Notification from './Notification/index.js'

// Main component (stateless)
export default () => `
  <div class="container">
    ${Header()}
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

// TODO: implement state viewer for testing purposes in dev environment

/* TODO: SEEMS NOT WORKING PROPERLY
Implement such syntax:
```
const Component = () => `
  <div class="container">
    <AnotherComponent prop={something} />
  </div>
`
```
where `<AnotherComponent />` will be transformed into `${AnotherComponent({ prop: something })}`
*/

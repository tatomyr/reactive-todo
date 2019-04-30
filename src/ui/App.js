import { re } from 'reactive-store'
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

// TODO: implement state viewer for testing purposes in dev environment

/* TODO:
Implement such syntax:
```
const Component = () => re`
  <div class="container">
    <AnotherComponent prop={something} />
  </div>
`
```
where `<AnotherComponent />` will be transformed into `${AnotherComponent({ prop: something })}`
*/

/* SEEMS NOT WORKING PROPERLY
export default () => re`
  <div class="container">
    <Header />

    <TasksList />

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

    <FullscreenImage />

    <Notification />
  </div>
`
*/

# Reactive Store

Implementation of reactive global store for pure JavaScript applications.

The concept is that every reactive data should be contained in one store
which is accessible through methods `connect` (for getting data) and `dispatch`
(for dispatching an syncronous or asyncronous action).

In your application you can declare components as bare functions. E. g.

```javascript
const Component = props => `<div>${props.text}</div>`
```

Then you can use the component inside an other one:

```javascript
const OtherComponent = () => `
  <div>
    ...
    ${Component({ text: 'Hello World!' })}
    ...
  </div>
`
```

Also you can use `connect` method to pass all the data from the shared application state like so:

```javascript
import { connect } from '/store-provider.js'
import { Component } from './Component.js'

export default connect(Component)
```

Bare in mind, each changable component or a part of a component
should have an unique id attribute defined.
This allows the DOM updater to decouple changed elements
and replase only them.

To set up store for your application you have to implement a provider via
`createStore` method.

```javascript
import { createStore } from '/reactive-store.js'
import { stateHandler } from './state-handler.js'
import { asyncWatcher } from './async-handler.js'

export const { connect, dispatch, mount } = createStore(
  stateHandler,
  asyncWatcher
)
// The last step you have to mount your dispatch function somwhere
// … to be able to access it in components
// One of the options is obviously window object
// TODO: try to pass the dispatch function somehow without using window!
window.dispatch = dispatch
```

You have to declare state handler, where should be at least one case of type 'INIT'
to return a default state.
Basically, each case should return a `state` changes.
If there's no changes, it should return an empty object.

```javascript
const stateHandler = (state = defaultState, action = {}) => {
  switch (action.type) {
    // Handle your cases
    case 'INIT':
      return state
    default:
      return {}
  }
}
```

Async handlers a just an asynchronoys funcions
and should be triggered when async watcher encounters a specific action:

```javascript
async function someAction(action, state, dispatch) {
  // Make API calls
  // Do asynchronous stuff
  // Dispatch other actions
}

function asyncWatcher(action, state, dispatch) {
  switch (action.type) {
    case 'SOME_ACTION':
      return function someAction(action, state, dispatch)
    default:
      return undefined
  }
}
```

# Reactive ToDo Application

To start dev server run `npm start` or `bash bin/start.sh`. Your app will be accessible at
http://localhost:8080.

To deploy use `npm run build && npm run deploy`.
Don't forget to change the app version in `src/service-worker.js` to enable PWA autoupdate!
Make sure that a branch you're deploying to (e.g. `master`) isn't protected.

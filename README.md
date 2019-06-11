# Reactive Store

Implementation of reactive global store for pure JavaScript applications.

The concept is that every reactive data should be contained in one store
which is accessible through methods `connect` (for getting data) and `dispatch`
(for dispatching an syncronous or asyncronous action).

You have to declare state handler, where should be at least one case of type 'INIT'
to return a default state.
Basically, each case should return a `state` changes.
If there's no changes, it should return an empty object.

Each store mutation triggers rerendering of components that directly rely on
the changed fields.
To let the reactive-store know when a component should be rerendered please use first-level destruction of properties when declaring the component function:

```javascript
const Component = ({ someFiled }) => `<div>${someField}</div>`
```

or

```javascript
function Component({ someField }) {
  return `<div>${someField}</div>`
}
```

To set up store for your application you have to implement a provider via
`createStore` method.

# Reactive ToDo Application

To start dev server run `npm start` or `bash bin/start.sh`. Your app will be accessible at
http://localhost:8080.

To deploy use `npm run build && npm run deploy`.
Don't forget to change the app version in `src/service-worker.js` to enable PWA autoupdate!
Make sure that a branch you're deploying to (e.g. `master`) isn't protected.

<!-- FIXME: update readme -->

# Reactive Store

Implementation of reactive global store for pure JavaScript applications.

The concept is that every reactive data should be contained in one store
which is accessible through methods `connect` (for getting data) and `dispatch`
(for dispatching an syncronous or asyncronous action).

You have to declare a handler, where should be at least one case of type 'INIT'
to return a default state.
Basically, each case should return a `state` changes.
If there's no changes, it should return an empty object.

Each store mutation triggers rerendering of components that directly rely on
the changed fields.
[!] As for now you have to **set the fields directly** in component
by providing to its `args` property an array of field names component rely on.
E. g.:

```javascript
const Component = ({ someFiled }) => `<div>${someField}</div>`
Component.args = ['someFiled']
```

Later on its possible to parse the argumets supplied to a component
and add `.args` list under the hood.

To set up store for your application you have to implement a provider via
`createStore` method.

# Reactive ToDo Application

To start dev server run `npm start`. Your app will be accessible at
http://localhost:1234/index.html.

To deploy use `npm run build && npm run deploy`.
Don't forget to change the app version in `src/service-worker.js` to enable PWA autoupdate!
Make sure that a branch you're deploying to (e.g. `master`) isn't protected.

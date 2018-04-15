# Reactive Store

Implementation of reactive global store for pure JavaScript applications.

The concept is that every reactive data should be contained in one store
which is accessible through methods `render` (for getting data) and `mutate`
(for mutating data).

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
Make sure that a branch you're deploying to (e.g. `master`) isn't protected.

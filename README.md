# Reactive Store

Implementation of reactive global store for pure JavaScript applications.

The concept is that every reactive data should be contained in one store
which is accessible through methods `render` (for getting data) and `mutate`
(for mutating data).
Each store mutation triggers rerendering of components that directly rely on
the changed fields.
To set up store for your application you have to implement a provider via
`createStore` method.

# Reactive ToDo Application

To start dev server run `npm start`. Your app will be accessible at
http://localhost:1234/index.html.

To deploy use `npm run build && npm run deploy`.
Make sure that a branch you're deploying to (e.g. `master`) isn't protected.

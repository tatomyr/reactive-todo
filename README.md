# Reactive ToDo Application

Implementation of reactive global store for pure JavaScript applications.

The concept is that every reactive data should be contained in one store
which is accessible through methods `render` (for getting data) and `mutate`
(for mutating data).
Each store mutation triggers rerendering of components that directly rely on
the changed fields.
To set up store for your application you have to implement a provider via
`createStore` method.

// TODO: move to the separate module

console.log('• triggered reactive store file')

/**
 * Store module constructor that should be invoked once to create a single store with reactive state
 * @param defaults - an object that should contain init values for the store
 * @returns an object that contains public methods to manage the store created
 */
export const createStore = (handler) => {
  // State
  const state = handler(undefined, { type: 'INIT' })
  console.log('• triggered state constructor:', state, handler)

  // Track each connected component
  const tracker = {
    components: [],
    add: component => {
      if (!component.args) {
        throw new Error('Rendered component should relay on some arguments. Consider adding arguments list via <Component>.args = [<args>].')
      }
      const id = tracker.components.unshift(component)
      tracker.components[0].id = `$${component.name}-${id}`
      console.warn('• added tracker:', component.name, tracker.components)
      return 'TODO'
    },
    rerender: changes => {
      const changedArgs = Object.keys(changes)
      tracker.components
        .filter(({ args }) => changedArgs.some(arg => args.includes(arg)))
        .forEach(component => {
          console.log('    • rerender:', component.name)
          document.querySelector(`[data-rsid="${component.id}"]`).outerHTML = wrapWithId(component)
        })
    },
  }

  const wrapWithId = component => {
    const renderedComponent = component(state).trim()
    return component.id
      ? renderedComponent
        .replace(/<[A-z]+(.|\n)*?>/, match => `${match.slice(0, -1)} data-rsid="${component.id}">`)
      : renderedComponent
  }

  /**
   * Returns funcion to be invoked
   * @param component - a function that retuns a string which represents a valid html tag with its content
   * @returns function to be invoked later on
   */
  const connect = (component) => {
    tracker.add(component)
    // TODO: implement a method to wrap a component properly
    return () => wrapWithId(component)
  }

  const logger = ({ type, ...rest }) => console.log('• action:',type, rest)

  const dispatch = action => {
    logger(action)
    const changes = handler(state, action, dispatch)
    Object.assign(state, changes)
    tracker.rerender(changes)
    return state
  }

  return { connect, dispatch }
}

// TODO: implement routing
// TODO: implement passing props through `connect` method
// TODO: implement unique app identifier `app` (e.g. global[app].dispatch("ACTION", payload)) !! Symbol()
// TODO: prevent adding a same tracker twice

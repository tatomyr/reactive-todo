console.log('triggered reactive store file')

/**
 * Store module constructor that should be invoked once to create a singleton with reactive data
 * @param defaults - an object that should contain init values for the store
 * @returns an object that contains public methods to manage the store created
 */
export const createStore = defaults => {
  // Store
  const store = { ...defaults }
  console.log('triggered store constructor:', store)

  // Track each rendered component
  const tracker = {
    components: [],
    add: component => {
      if (!component.args) {
        throw new Error('Rendered component should relay on some arguments. Consider adding arguments list via <Component>.args = [<args>].')
      }
      const id = tracker.components.unshift(component)
      tracker.components[0].id = `$${component.name}-${id}`
      console.warn('added tracker:', component.name, tracker.components)
      return 'TODO'
    },
    rerender: changes => {
      const changedArgs = Object.keys(changes)
      tracker.components
        .filter(({ args }) => changedArgs.some(arg => args.includes(arg)))
        .forEach(component => {
          console.log('rerender:', component.name)
          document.querySelector(`[data-rsid="${component.id}"]`).outerHTML = wrapWithId(component)
        })
    },
  }

  const wrapWithId = component => {
    const renderedComponent = component(store).trim()
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
  const render = (component) => {
    tracker.add(component)
    // TODO implement a method to wrap a component properly
    return () => wrapWithId(component)
  }

  /**
   * Store mutation method
   * @param callback - a callback function that will take the store as a single argunent and retuns an object that represents store changes
   * @param after - an optional callback function that takes the store as a single argunent and run after the store is updated
   */
  const mutate = (callback, after = () => undefined) => {
    const changes = callback(store)
    Object.assign(store, changes)
    console.log('store changes:', changes)
    tracker.rerender(changes)
    after(store)
    return 'TODO'
  }

  return { render, mutate }
}

// TODO implement routing
// TODO implement passing props through render method
// TODO implement unique app identifier `app` (e.g. global[app].dispatch("ACTION", payload))
// TODO prevent adding a same tracker twice

// TODO: move to the separate module

console.log('• triggered reactive store file')

/**
 * Store module constructor that should be invoked once to create a single store with reactive state
 * @param defaults - an object that should contain init values for the store
 * @returns an object that contains public methods to manage the store created
 */
export const createStore = (stateHandler, asyncHandler) => {
  // State
  const state = stateHandler(undefined, { type: 'INIT' })
  console.log('• triggered state constructor:', state)

  // Auxiliary wrapper
  // TODO: try to implement unique ids via Symbol()
  // TODO: how to properly pass the dispatch function to a wrapped component?
  const wrapWithId = component => {
    const renderedComponent = component(state /* , dispatch */).trim()
    return component.id
      ? renderedComponent.replace(
        /<[A-z]+(.|\n)*?>/,
        match => `${match.slice(0, -1)} data-rsid="${component.id}">`
      )
      : renderedComponent
  }

  // Track each connected component
  const tracker = {
    components: [],
    add: component => {
      if (!component.args) {
        throw new Error(
          'Rendered component should relay on some arguments. Consider adding arguments list via <Component>.args = [<args>].'
        )
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

  /**
   * Returns funcion to be invoked
   * @param component -
   *    a function that retuns a string which represents a valid html tag with its content
   * @returns function to be invoked later on
   */
  const connect = component => {
    tracker.add(component)
    // TODO: implement a method to wrap a component properly
    return () => wrapWithId(component)
  }

  const logger = ({ type, ...rest }) => console.log('• action:', type, rest)

  function dispatch(action) {
    logger(action)
    const changes = stateHandler(state, action)
    Object.assign(state, changes)
    tracker.rerender(changes)
    asyncHandler(action, state, dispatch)
  }

  const getState = () => state

  return { connect, dispatch, getState }
}

// TODO: implement routing
// TODO: implement passing props through `connect` method
// TODO: implement unique app identifier `app` (e.g. global[app].dispatch("ACTION", payload))
// … !! Symbol()
// TODO: prevent adding a same tracker twice

// TODO: implement JSX templator analogue | SEEMS NOT WORKING PROPERLY
// export const re = (strings, ...args) => {
//   console.log(strings, args)
//   let response = ''
//   for (let i = 0; i < strings.length; i++) {
//     response += strings[i]
//       .replace(/<([A-Z]\w+)\s.*?/gm, (x, y) => `\${${y}(`)
//       .replace(/\/>/gm, (x, y) => ')}')

//     // const f = () => args[i]
//     const stringifyCallback = (key, value) => {
//       console.log(key, '≈', value)
//       if (typeof value === 'function') {
//         return `#${value}#` // .toString();
//       }
//       return value
//     }
//     response += args[i]
//       ? JSON.stringify(args[i], stringifyCallback)
//         .replace(/"#/gm, '')
//         .replace(/#"/gm, '') // f.toString().replace('() =>', '') // JSON.stringify(args[i])
//       : ''
//   }
//   console.log(`\${${response}}`)
//   return response
// }

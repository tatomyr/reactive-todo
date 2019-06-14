console.log('• triggered reactive store file')

/**
 * Store module factory that should be invoked once to create a single store with reactive state
 * @param stateHandler - a synchronous reducer callback
 * @param asyncHandler - an asynchronous action handler callback
 * @returns an object that contains public methods to manage the store created
 */
export const createStore = (stateHandler, asyncHandler) => {
  // State
  const state = stateHandler(undefined, { type: 'INIT' })
  console.log('• triggered state constructor:', state)

  // TODO: implement passing props through `connect` method
  const connect = component => () => component(state)

  let rootComponent
  let domElements

  const parseHTML = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const o = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const $el of doc.querySelectorAll('*[id]')) {
      o[$el.id] = { shallow: $el.cloneNode(true), element: $el }
    }
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const id in o) {
      // eslint-disable-next-line no-restricted-syntax
      for (const $el of o[id].shallow.querySelectorAll('*[id]')) {
        if (id === $el.id) continue
        $el.outerHTML = `<template data-key="${$el.id}" />`
      }
      o[id].outerHTML = o[id].shallow.outerHTML
    }
    return o
  }

  function mount(rootParent, f) {
    // Root component should always have an id
    rootComponent = f
    // TODO: investigate why replacing innerHTML with outerHTML causes rerendering issues
    // eslint-disable-next-line no-param-reassign
    rootParent.innerHTML = rootComponent(state)
    domElements = parseHTML(rootParent.innerHTML)
  }

  function rerender() {
    const newElements = parseHTML(rootComponent(state))

    // eslint-disable-next-line no-restricted-syntax
    for (const id in domElements) {
      if (domElements[id].outerHTML !== (newElements[id] && newElements[id].outerHTML)) {
        console.log(
          id,
          domElements[id].outerHTML,
          '-->',
          newElements[id] && newElements[id].outerHTML
        )

        const elementById = document.getElementById(id)
        if (elementById) {
          elementById.replaceWith(newElements[id].element)
        }
      }
    }

    domElements = newElements
  }

  function logger({ type, ...rest }) {
    console.log('• action:', type, rest)
  }

  function dispatch(action) {
    logger(action)
    const changes = stateHandler(state, action)
    Object.assign(state, changes)
    rerender(changes)
    asyncHandler(action, state, dispatch)
  }

  const getState = () => state

  return {
    connect,
    dispatch,
    getState,
    mount,
  }
}

// TODO: implement different handler for lists:
// … add & delete changed elements without touching other items
// TODO: implement routing
// TODO: implement unique app identifier `app` (e.g. global[app].dispatch("ACTION", payload))
// … !! Symbol()
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

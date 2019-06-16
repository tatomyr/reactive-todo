console.log('• triggered reactive store file')

/**
 * Store module factory that should be invoked once to create a single store with reactive state
 * @param stateHandler - a synchronous reducer callback
 * @param asyncWatcher - an asynchronous action handler callback
 * @returns an object that contains public methods to manage the store created
 */
export const createStore = (stateHandler, asyncWatcher) => {
  // State
  const state = stateHandler(undefined, { type: 'INIT' })
  console.log('• triggered state constructor:', state)

  const connect = component => ownProps => component({ ...state, ...ownProps })

  let rootComponent
  let domElements

  const parseHTML = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const objElements = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const $el of doc.querySelectorAll('*[id]')) {
      objElements[$el.id] = {
        element: $el,
        shallow: $el.cloneNode(true),
        wrapperHTML: $el.cloneNode(false).outerHTML,
      }
    }
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const id in objElements) {
      // eslint-disable-next-line no-restricted-syntax
      for (const $el of objElements[id].shallow.querySelectorAll('*[id]')) {
        $el.outerHTML = `<template data-key="${$el.id}"></template>`
      }
      objElements[id].html = objElements[id].shallow.outerHTML
    }
    return objElements
  }

  function mount(rootParent, f) {
    // Root component should always have an id
    rootComponent = f
    // eslint-disable-next-line no-param-reassign
    rootParent.innerHTML = rootComponent(state)
    domElements = parseHTML(rootParent.innerHTML)
  }

  function rerender() {
    const newElements = parseHTML(rootComponent(state))

    // eslint-disable-next-line no-restricted-syntax
    for (const id in domElements) {
      if (domElements[id].html !== (newElements[id] && newElements[id].html)) {
        console.log(`@${id}:`)

        const elementById = document.getElementById(id)
        if (elementById) {
          if (domElements[id].wrapperHTML === (newElements[id] && newElements[id].wrapperHTML)) {
            console.log('└─ change')
            elementById.innerHTML = newElements[id].element.innerHTML
          } else {
            console.log('└─ replace')
            elementById.replaceWith(newElements[id].element)
          }
        } else {
          console.log('└─ ✗')
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
    asyncWatcher(action, state, dispatch)
  }

  const getState = () => state

  return {
    connect,
    dispatch,
    getState,
    mount,
  }
}

// TODO: implement routing

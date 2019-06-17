/**
 * Store module factory that should be invoked once to create a single store with reactive state
 * @param stateHandler - a synchronous reducer callback
 * @param asyncWatcher - an asynchronous action handler callback
 * @returns an object that contains public methods to manage the store created
 */
export const createStore = (stateHandler, asyncWatcher = () => {}) => {
  const state = stateHandler(undefined, { type: 'INIT' })

  let rootComponent

  let domElementsMap

  const parseHTML = html => {
    const virtualDocument = new DOMParser().parseFromString(html, 'text/html')
    const elementsMap = new Map()
    // eslint-disable-next-line no-restricted-syntax
    for (const element of virtualDocument.querySelectorAll('*[id]')) {
      const shallow = element.cloneNode(true)
      // eslint-disable-next-line no-restricted-syntax
      for (const innerElement of shallow.querySelectorAll('*[id]')) {
        innerElement.outerHTML = `<template data-key="${innerElement.id}"></template>`
      }
      elementsMap.set(element.id, {
        element,
        shallow,
        wrapperHTML: shallow.cloneNode(false).outerHTML,
      })
    }
    return elementsMap
  }

  function mount(f) {
    rootComponent = f
    domElementsMap = parseHTML(rootComponent())
    // Top-level component should always have an id equal to parent element's id
    const rootId = domElementsMap.keys().next().value
    document.getElementById(rootId).replaceWith(domElementsMap.get(rootId).element)
  }

  function rerender() {
    const newElementsMap = parseHTML(rootComponent())
    // eslint-disable-next-line no-restricted-syntax
    for (const [id, domEl] of domElementsMap) {
      const newEl = newElementsMap.get(id)
      if (domEl.shallow.outerHTML !== (newEl && newEl.shallow.outerHTML)) {
        console.log(`@${id}:`)

        const elementById = document.getElementById(id)
        if (elementById) {
          if (domEl.wrapperHTML === (newEl && newEl.wrapperHTML)) {
            console.log('└─ change')
            elementById.innerHTML = newEl.element.innerHTML
          } else {
            console.log('└─ replace')
            elementById.replaceWith(newEl.element)
          }
        } else {
          console.log('└─ ✗')
        }
      }
    }

    domElementsMap = newElementsMap
  }

  function logger({ type, ...rest }) {
    console.log('• action:', type, rest)
  }

  function dispatch(action) {
    logger(action)
    const changes = stateHandler(state, action)
    Object.assign(state, changes)
    rerender()
    asyncWatcher(action, state, dispatch)
  }

  const connect = component => ownProps => component({ ...state, ...ownProps })

  const getState = () => state

  return {
    mount,
    connect,
    dispatch,
    getState,
  }
}

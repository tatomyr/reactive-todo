import { createStore } from '/modules.js'
import { stateHandler } from './state-handler.js'
import asyncWatcher from './async-handler.js'

export const { mount, dispatch, connect, rerender, getState } = createStore(
  stateHandler,
  asyncWatcher
)

window.getState = getState

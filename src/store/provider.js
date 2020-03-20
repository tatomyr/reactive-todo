import { createStore } from '/modules.js'
import { stateHandler } from './state-handler.js'
import asyncWatcher from './async-handler.js'
import { registerRouter, getParams } from '../hashrouter.js'

export const { mount, dispatch, connect, rerender, getState } = createStore(
  stateHandler,
  asyncWatcher
)

registerRouter(rerender)

window.getState = getState
window.getParams = getParams

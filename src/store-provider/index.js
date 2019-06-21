import { createStore } from '/modules/quantum.js'
import { stateHandler } from './state-handler.js'
import { asyncWatcher } from './async-handler.js'

export const { mount, connect, dispatch } = createStore(stateHandler, asyncWatcher)

window.dispatch = dispatch

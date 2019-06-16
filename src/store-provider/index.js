import { createStore } from '/modules/reactive-store.js'
import { stateHandler } from './state-handler.js'
import { asyncWatcher } from './async-handler.js'

export const { connect, dispatch, mount } = createStore(stateHandler, asyncWatcher)

window.dispatch = dispatch

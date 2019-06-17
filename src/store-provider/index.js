import { createStore } from '/modules/restore.js'
import { stateHandler } from './state-handler.js'
import { asyncWatcher } from './async-handler.js'

export const { connect, dispatch, mount } = createStore(stateHandler, asyncWatcher)

window.dispatch = dispatch

import { createStore } from '/modules/reactive-store.js'
import { stateHandler } from './state-handler.js'
import { asyncHandler } from './async-handler.js'

console.log('triggered store provider')

export const { connect, dispatch, mount } = createStore(stateHandler, asyncHandler)

window.dispatch = dispatch

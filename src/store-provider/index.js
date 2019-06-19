import { createStore } from '/reactive-store/index.js'
import { stateHandler } from './state-handler.js'
import { asyncHandler } from './async-handler.js'

console.log('triggered store provider')

export const { connect, dispatch } = createStore(stateHandler, asyncHandler)

window.dispatch = dispatch

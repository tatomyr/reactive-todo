import { createStore } from 'reactive-store'
import { stateHandler } from './state-handler'
import { asyncHandler } from './async-handler'

console.log('triggered store provider')

export const { connect, dispatch } = createStore(stateHandler, asyncHandler)

window.dispatch = dispatch

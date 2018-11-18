import { createStore } from 'reactive-store'
import { handler } from './handler'

console.log('triggered store provider')

export const { connect, dispatch } = createStore(handler)

// FIXME: try to do this in a cleaner way
window.global = { dispatch }

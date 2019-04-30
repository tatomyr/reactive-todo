import { createStore } from 'reactive-store'
import { handler } from './handler'

console.log('triggered store provider')

export const { connect, dispatch } = createStore(handler)

window.dispatch = dispatch

import { render, mutate } from '../store-provider.js'
// TODO: investigate why this causes error on outerHTML if already render likes inside Inc
import Likes from './Likes'

const Inc = () => `
  <button
    onclick="global.helpers.Inc.increment()"
  >
    ${Likes()}++
  </button>
`

const increment = () => {
  mutate(({ likes }) => ({ likes: likes + 1 }))
}

Inc.helpers = { increment }

export default render(Inc)

import { render, renderTextField, mutate } from '../store-provider.js'
import { highlight } from '../fakes.js'

// TODO: investigate why this causes error on outerHTML - thats because duplicated args !!!!!!!!!
// TODO: implement method like render but less verbose --
// -- for such purposes like just writihg out data: `${render(({ dislikes }) => `<span>${dislikes}</span>`, ['dislikes'])}`
const Dec = ({ dislikes }) => `
  <button
    onclick="global.helpers.Dec.decrement()"
    ${highlight()}
  >
    ${renderTextField('dislikes')}--
  </button>
`

const decrement = () => {
  mutate(({ dislikes }) => ({ dislikes: dislikes - 1 }))
}

Dec.helpers = { decrement }

export default render(Dec /* We should not wrap one render inside an other with args * , ['dislikes'] /* */)

// TODO investigate why lambda functions are rendered multiple times while named functions aren't

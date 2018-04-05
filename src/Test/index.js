import { render, renderTextField, mutate } from '../store-provider'

// TODO: implement passing props to rendered component
const Test = () => `
  <div>
    <!-- comment -->
    ${render(Rnd, 'test')()}
  </div>
`

export default Test

const Rnd = ({ test }) => `
  <div>
    <button onclick="global.handlers.Test.getRandom()">
      ${test}
    </button>

    <button onclick="global.handlers.Test.getRandom()">
      ${RenderVal()}
    </button>
  </div>
`

const Val = ({ test }) => `
  <span>
    ${test}
  </span>
`

const RenderVal = render(Val, 'test')

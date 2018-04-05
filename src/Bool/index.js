import { render, renderTextField, mutate } from '../store-provider'

// TODO: implement passing props to rendered component
const Bool = bool => `
  <div>
    ${bool}
    ${render((store) => `
      <button onclick="global.handlers.Bool.clickHandler(event, '${bool}')">
        ${renderTextField(bool)}
      </button>
    `)()}
  </div>
`

export default Bool

/*
<button onclick="(${store.testSwitcher})(event, '${bool}')">
  ${renderTextField(bool)}
</button>
*/

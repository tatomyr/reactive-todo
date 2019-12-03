import { render } from '/modules.js'
import { connect, dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'
import { filterByInput } from '/services/index.js'
import { Bubble } from './Bubble.js'

export const NavItem = connect(
  ({ id, title, filterByStatus, view, tasks, input }) => render`
    <li 
      id="${id}" 
      class="controls-contaiter ${id === view ? 'active' : ''}"
    >
      <button
        id="nav-button-${id}"
        class="invisible-button item"  
        ::click=${e => dispatch({ type: types.FILTER, view: id })}
      >
        ${title}
      </button>
      ${Bubble({
        count: tasks.filter(filterByStatus).filter(filterByInput(input)).length,
      })}
    </li>
  `
)

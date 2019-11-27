import { htmx } from '/modules/purity.js'
import { connect, dispatch } from '/store-provider/index.js'
import { filterByInput } from '/services/index.js'
import { Bubble } from './Bubble.js'

export const NavItem = connect(
  ({
    id, title, filterByStatus, view, tasks, input,
  }) => htmx({ Bubble })`
    <li 
      id="${id}" 
      class="controls-contaiter ${id === view ? 'isActive' : ''}"
    >
      <button
        id="nav-button-${id}"
        class="invisible-button item"  
        ::click=${() => dispatch({ type: 'FILTER', view: id })}
      >
        ${title}
      </button>
      <Bubble count=${tasks.filter(filterByStatus).filter(filterByInput(input)).length} />
    </li>
  `
)

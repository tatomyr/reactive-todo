import { connect } from '/store-provider/index.js'
import { filterByInput } from '/services/index.js'
import { Bubble } from './Bubble.js'

const NavItem = ({
  id, title, filterByStatus, route, tasks, input,
}) => `
  <li 
    id="${id}" 
    class="controls-contaiter ${id === route ? 'isActive' : ''}"
  >
    <button
      class="invisible-button item"  
      onclick="dispatch({ type: 'FILTER', filter: '${id}' })"
    >
      ${title}
    </button>
    ${Bubble(tasks.filter(filterByStatus).filter(filterByInput(input)).length)}
  </li>
`

export default connect(NavItem)

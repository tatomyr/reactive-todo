import { render } from '/modules.js'
import { getState } from '/store/provider.js'
import { filterByInput, isActive } from '/services/index.js'
import { Bubble } from './Bubble.js'

import { getParams } from '../../hashrouter.js'

export const NavItem = ({ id, title, filterByStatus }) => {
  const { tasks, input } = getState()
  const { view } = getParams()
  return render`
    <li 
      id="${id}"
      class="controls-contaiter ${isActive(input, view)({ id }) && 'active'}"
    >
      <a href="#/${id}" id="nav-button-${id}" class="link item">
        ${title}
      </a>
      ${Bubble({
        count: tasks.filter(filterByStatus).filter(filterByInput(input)).length,
      })}
    </li>
  `
}

import { render } from '/modules.js'
import { connect } from '/store/provider.js'
import { filterByInput } from '/services/index.js'
import { Bubble } from './Bubble.js'

import { router } from '../../hashrouter.js'

export const NavItem = router(
  connect(
    ({ id, title, filterByStatus, view, tasks, input }) => render`
      <li 
        id="${id}" 
        class="controls-contaiter ${
          (input && id === 'all') || (!input && id === view) ? 'active' : ''
        }"
      >
        <a href="#/${id}" id="nav-button-${id}" class="link item">
          ${title}
        </a>
        ${Bubble({
          count: tasks.filter(filterByStatus).filter(filterByInput(input))
            .length,
        })}
      </li>
    `
  )
)

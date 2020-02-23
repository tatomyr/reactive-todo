import { render } from '/modules.js'
import { Icon } from './Icon.js'

import { router } from '../../hashrouter.js'

export const NavAboutButton = router(
  ({ view }) => render`
    <li 
      id="info-link" 
      class="controls-contaiter about ${view === 'about' && 'active'}"
    >
      <a href="#/about" class="link item">
        ${Icon({ name: 'info', size: 'S' })}
      </a>
    </li>
  `
)

import { render } from '/modules.js'
import { Icon } from './Icon.js'

import { getParams } from '../../hashrouter.js'

export const NavAboutButton = () => render`
  <li 
    id="info-link" 
    class="controls-contaiter about ${getParams().view === 'about' && 'active'}"
  >
    <a href="#/about" class="link item">
      ${Icon({ name: 'info', size: 'S' })}
    </a>
  </li>
`

import { jsx } from '/modules/jsx.js' // FIXME: use or remove
import { filters } from '/services/index.js'
import NavItem from './NavItem.js'

const AboutLink = () => `
  <li id="info-link" class="controls-contaiter">
    <button 
      class="invisible-button item"  
      onclick="dispatch({ type: 'SHOW_INFO' })"
    >
      <div class="info-question-mark">?</div>
    </button>
  </li>
`

const NavBar = () => jsx`
  <nav id="nav-bar">
    <ul class="nav-list">
      ${filters.map(NavItem).join('')}
      ${AboutLink()}
    </ul>
  </nav>
`

export default NavBar

import { filters } from '/services/index.js'
import NavItem from './NavItem.js'

const NavBar = () => `
  <nav id="nav-bar">
    <ul class="nav-list">
      ${filters.map(NavItem).join('')}
      <li id="info-link" class="controls-contaiter">
        <button 
          class="invisible-button item"  
          onclick="dispatch({ type: 'SHOW_INFO' })"
        >
          <div class="info-question-mark">?</div>
        </button>
      </li>
    </ul>
  </nav>
`

export default NavBar

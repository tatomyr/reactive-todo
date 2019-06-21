import { jsx } from '/modules/jsx.js'
import { filters } from '/services/index.js'
import { NavItem } from './NavItem.js'
import { NavAboutButton } from './NavAboutButton.js'

export const NavBar = () => jsx(NavAboutButton)`
  <nav id="nav-bar">
    <ul class="nav-list">
      ${filters.map(NavItem).join('')}
      <NavAboutButton caption="?" />
    </ul>
  </nav>
`

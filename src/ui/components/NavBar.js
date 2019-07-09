import { htmx } from '/modules/purity.js'
import { filters } from '/services/index.js'
import { NavItem } from './NavItem.js'
import { NavAboutButton } from './NavAboutButton.js'

export const NavBar = () => htmx(NavAboutButton)`
  <nav id="nav-bar">
    <ul class="nav-list">
      ${filters.map(NavItem)}
      <NavAboutButton />
    </ul>
  </nav>
`

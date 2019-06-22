import { html } from '/modules/html.js'
import { filters } from '/services/index.js'
import { NavItem } from './NavItem.js'
import { NavAboutButton } from './NavAboutButton.js'

export const NavBar = () => html(NavAboutButton)`
  <nav id="nav-bar">
    <ul class="nav-list">
      ${filters.map(NavItem)}
      <NavAboutButton caption="?" />
    </ul>
  </nav>
`

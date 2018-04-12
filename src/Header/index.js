import { render } from '../store-provider'
import { highlight } from '../fakes'
import filters from '../data/filters'

const Header = ({ route }) => `
  <div class="header" ${highlight('light')}>
    <h2>${filters.find(({ id }) => id === route).caption}</h2>
  </div>
`

Header.args = ['route']

export default render(Header)

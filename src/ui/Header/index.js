import { connect } from '../../store-provider'
import { highlight } from '../../fakes'
import filters from '../../data/filters'

const Header = ({ route }) => `
  <div id="header" ${highlight('light')}>
    ${filters.map(item => `
        <button
          class="invisible-button item ${item.id === route ? 'active' : ''}"
          id="${item.id}"
          ${item.id !== route
            ? `onclick="global.dispatch('FILTER', { filter: '${item.id}' })"`
            : ''}
        >
          ${item.title}
        </button>
    `).join('')}
  </div>
`

Header.args = ['route']

export default connect(Header)

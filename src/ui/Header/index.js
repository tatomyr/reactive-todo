import { connect } from '../../store-provider'
import { highlight } from '../../fakes'
import filters from '../../data/filters'
import { filterByInput } from '../TasksList'

const Header = ({ route, tasks, input }) => `
  <div id="header" ${highlight('light')}>
    ${filters.map(item => `
        <div class="controls-contaiter ${item.id === route ? 'active' : ''}">
          <button
            class="invisible-button item"
            id="${item.id}"
            ${item.id !== route
              ? `onclick="global.dispatch('FILTER', { filter: '${item.id}' })"`
              : ''}
          >
            ${item.title}
          </button>

          <div class="counter">
            ${tasks
              .filter(item.filterByStatus)
              .filter(filterByInput(input))
              .length}
          </div>
        </div>
    `).join('')}
  </div>
`

Header.args = ['route', 'tasks', 'input']

export default connect(Header)

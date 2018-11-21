import { connect } from '@store-provider'
import { filters, filterByInput } from '@services'
import { Bubble } from './Bubble'

const Header = ({ route, tasks, input }) => `
  <div id="header">
    ${filters.map(({ id, title, filterByStatus }) => `
      <div class="controls-contaiter ${id === route ? 'active' : ''}">
        <button
          class="invisible-button item"
          id="${id}"
          onclick="global.dispatch({ type: 'FILTER', filter: '${id}' })"
        >
          ${title}
        </button>

        ${Bubble(tasks
          .filter(filterByStatus)
          .filter(filterByInput(input))
          .length)}
      </div>
    `).join('')}
  </div>
`

Header.args = ['route', 'tasks', 'input']

export default connect(Header)

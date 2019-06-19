import { connect } from '/store-provider/index.js'
import { filters, filterByInput } from '/services/index.js'
import { Bubble } from './Bubble.js'

const Header = ({ route, tasks, input }) => `
  <div id="header">
    ${filters
    .map(
      ({ id, title, filterByStatus }) => `
        <div class="controls-contaiter ${id === route ? 'active' : ''}">
          <button
            class="invisible-button item"
            id="${id}"
            onclick="dispatch({ type: 'FILTER', filter: '${id}' })"
          >
            ${title}
          </button>
          ${Bubble(tasks.filter(filterByStatus).filter(filterByInput(input)).length)}
        </div>
      `
    )
    .join('')}
  </div>
`

export default connect(Header)

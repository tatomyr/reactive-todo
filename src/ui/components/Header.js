import { connect } from '/store-provider/index.js'
import { filters, filterByInput } from '/services/index.js'
import { HeaderBubble } from './HeaderBubble.js'

// TODO: merge state with ownProps and extract map function into separate component
const Header = ({ route, tasks, input }) => `
  <div id="header">
    ${filters
    .map(
      ({ id, title, filterByStatus }) => `
        <div id="${id}" class="controls-contaiter ${id === route ? 'active' : ''}">
          <button
            class="invisible-button item"  
            onclick="dispatch({ type: 'FILTER', filter: '${id}' })"
          >
            ${title}
          </button>
          ${HeaderBubble(tasks.filter(filterByStatus).filter(filterByInput(input)).length)}
        </div>
      `
    )
    .join('')}
    <button 
      class="controls-contaiter ${route === 'show-info' ? 'active' : ''}"
      onclick="dispatch({ type: 'SHOW_INFO' })"
    >
      (i)
    </button>
  </div>
`

export default connect(Header)

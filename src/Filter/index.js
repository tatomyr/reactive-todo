import { render } from '../store-provider'
import { highlight } from '../fakes'
import filters from '../data/filters'

const Filter = ({ route }) => `
  <div class="row">
    ${filters.map(item => `
      <button
        onclick="global.dispatch('FILTER', { filter: '${item.id}' })"
        ${highlight()}
      >
        ${item.caption}
      </button>
    `).join('')}
  </div>
`

// Filter.args = ['route']

export default render(Filter)

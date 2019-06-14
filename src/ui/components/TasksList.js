import { connect } from '/store-provider/index.js'
import { filters, filterByInput } from '/services/index.js'
import { TaskItem } from './TaskItem.js'

const TasksList = ({ tasks, route, input }) => `
  <ul id="tasks-list" class="tasks-list">
    ${tasks
    .filter(filters.find(({ id }) => id === route).filterByStatus)
    .filter(filterByInput(input))
    .map(TaskItem)
    .join('')}
  </ul>
`

export default connect(TasksList)

// TODO: only make height of compleated/active task of zero to preserve list structure everywhere!

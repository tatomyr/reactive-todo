import { connect } from '@store-provider'
import { filters, filterByInput } from '@services'
import { TaskItem } from './TaskItem'

const TasksList = ({ tasks, route, input }) => `
  <ul class="tasks-list">
    ${tasks
      .filter(filters.find(({ id }) => id === route).filterByStatus)
      .filter(filterByInput(input))
      .map(TaskItem)
      .join('')}
  </ul>
`

TasksList.args = ['tasks', 'route', 'input']

export default connect(TasksList)

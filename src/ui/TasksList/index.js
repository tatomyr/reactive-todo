import { connect } from '../../store-provider'
import { highlight } from '../../fakes'
import { TaskItem } from './TaskItem'
import filters from '../../data/filters'

export const filterByInput = input => ({ description }) =>
  description.toLowerCase().includes(input.toLowerCase())

const TasksList = ({ tasks, route, input }) => `
  <ul class="tasks-list" ${highlight('light')}>
    ${tasks
      .filter(filters.find(({ id }) => id === route).filterByStatus)
      .filter(filterByInput(input))
      .map(TaskItem)
      .join('')}
  </ul>
`

TasksList.args = ['tasks', 'route', 'input']

export default connect(TasksList)

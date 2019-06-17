import { connect } from '/store-provider/index.js'
import { filters, filterByInput } from '/services/index.js'
import { TaskItem } from './TaskItem.js'

export const TasksList = connect(
  ({ tasks, view, input }) => `
    <ol id="tasks-list" class="tasks-list">
    ${tasks
    .filter(filters.find(({ id }) => id === view).filterByStatus)
    .filter(filterByInput(input))
    .map(TaskItem)
    .join('')}
    </ol>
  `
)

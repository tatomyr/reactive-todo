import { htmx } from '/modules/purity.js'
import { connect } from '/store-provider/index.js'
import { filters, filterByInput } from '/services/index.js'
import { TaskItem } from './TaskItem.js'

export const TasksList = connect(
  ({ tasks, view, input }) => htmx()`
    <ol id="tasks-list" class="tasks-list">
    ${tasks
    .filter(filters.find(({ id }) => id === view).filterByStatus)
    .filter(filterByInput(input))
    .map(TaskItem)}
    </ol>
  `
)

// TODO: render tasks chunk by chunk

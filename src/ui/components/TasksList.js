import { connect } from '/store-provider/index.js'
import { html } from '/modules/html.js'
import { filters, filterByInput } from '/services/index.js'
import { TaskItem } from './TaskItem.js'

export const TasksList = connect(
  ({ tasks, view, input }) => html()`
    <ol id="tasks-list" class="tasks-list">
    ${tasks
    .filter(filters.find(({ id }) => id === view).filterByStatus)
    .filter(filterByInput(input))
    .map(TaskItem)}
    </ol>
  `
)

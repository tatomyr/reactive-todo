import { render } from '/modules/purity.js'
import { connect } from '/store/provider.js'
import { filters, filterByInput } from '/services/index.js'
import { TaskItem } from './TaskItem.js'

// TODO: maybe map all todos, just hide not needed?
export const TasksList = connect(({ tasks, view, input }) => {
  const currentTasks = tasks
    .filter(filters.find(({ id }) => id === view).filterByStatus)
    .filter(filterByInput(input))
  return render`
    <ol id="tasks-list" class="tasks-list">
      ${currentTasks.map(TaskItem)}
    </ol>
  `
})

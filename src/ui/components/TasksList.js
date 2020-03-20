import { render } from '/modules.js'
import { connect } from '/store/provider.js'
import { filters, filterByInput, isActive } from '/services/index.js'
import { TaskItem } from './TaskItem.js'

import { router } from '../../hashrouter.js'

export const TasksList = router(
  connect(({ tasks, view, input }) => {
    const currentTasks = tasks
      .filter(filters.find(isActive(input, view)).filterByStatus)
      .filter(filterByInput(input))
    return render`
      <ol id="tasks-list" class="tasks-list">
        ${currentTasks.map(TaskItem)}
      </ol>
    `
  })
)

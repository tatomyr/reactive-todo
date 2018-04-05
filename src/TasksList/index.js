import { render } from '../store-provider'
import { highlight } from '../fakes'
import { TaskItem } from './TaskItem'

const filter =  ({
  all: () => true,
  active: task => !task.completed,
  completed: task => task.completed,
})

const TasksList = ({ tasks, route }) => `
  <ul
    class="tasks-list"
    onclick="global.dispatch('TRIGGER_TASK', { event: event })"
    ${highlight()}
  >
    ${tasks.filter(filter[route]).map(TaskItem).join('')}
  </ul>
`

TasksList.args = ['tasks', 'route']

export default render(TasksList)

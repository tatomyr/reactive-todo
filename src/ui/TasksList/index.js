import { connect } from '../../store-provider'
import { highlight } from '../../fakes'
import { TaskItem } from './TaskItem'

const filter =  ({
  all: () => true,
  active: task => !task.completed,
  completed: task => task.completed,
})

const TasksList = ({ tasks, route }) => `
  <ul class="tasks-list" ${highlight('light')}>
    ${tasks.filter(filter[route]).map(TaskItem).join('')}
  </ul>
`

TasksList.args = ['tasks', 'route']

export default connect(TasksList)

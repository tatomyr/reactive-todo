import { render } from '../../store-provider'
import { highlight } from '../../fakes'
import { TaskItem } from './TaskItem'

const filter =  ({
  all: () => true,
  active: task => !task.completed,
  completed: task => task.completed,
})

const TasksList = ({ tasks, route }) => `
  <ul
    class="tasks-list"
    ontouchstart="global.dispatch('TOUCH_START', { event: event })"
    ontouchmove="global.dispatch('TOUCH_MOVE', { event: event })"
    ontouchend="global.dispatch('TOUCH_END', { event: event })"
    ontouchcancel="global.dispatch('TOUCH_CANCEL', { event: event })"
    ${highlight('light')}
  >
    ${tasks.filter(filter[route]).map(TaskItem).join('')}
  </ul>
`

TasksList.args = ['tasks', 'route']

export default render(TasksList)

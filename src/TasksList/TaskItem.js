import { highlight } from '../fakes'

export const TaskItem = task => `
  <li
    ${highlight('light')}
    id="${task.id}"
    class="task ${task.completed ? 'completed' : ''}"
  >
    <div class="image" style="background-image: url(${task.img})"></div>
    ${task.description}
  </li>
`

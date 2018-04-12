import { highlight, images } from '../fakes'

export const TaskItem = task => `
  <li
    ${highlight('light')}
    id="${task.id}"
    class="task ${task.completed ? 'completed' : ''}"
  >
    <div class="image" style="background-image: url(${images[task.index]})"></div>
    ${task.description}
  </li>
`

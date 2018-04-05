import { highlight, images } from '../fakes'

export const TaskItem = task => `
  <li
    ${highlight()}
    id="${task.id}"
    class="task ${task.completed ? 'completed' : ''}"
  >
    ${task.description}
    <img src="${images[task.index]}" />
    <!-- ${task.completed ? '' : `<img src="${images[task.index]}" />`} -->
  </li>
`

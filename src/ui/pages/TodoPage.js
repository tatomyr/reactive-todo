import { render } from '/modules.js'
import { TasksList, InputForm } from '../components/index.js'

export const TodoPage = () => render`
  <div id="todo-page" class="todo-page">
    ${TasksList()}
    ${InputForm()}
  </div>
`

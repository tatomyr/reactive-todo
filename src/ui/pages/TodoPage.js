import { render } from '/modules.js'
import {
  NavBar,
  TasksList,
  InputForm,
  TaskDetails,
} from '../components/index.js'

export const TodoPage = () => render`
  <div id="todo-page" class="container">
    ${NavBar()}
    ${TasksList()}
    ${InputForm()}
    ${TaskDetails()}
  </div>
`

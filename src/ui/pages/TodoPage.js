import {
  NavBar, TasksList, InputForm, FullscreenImage,
} from '../components/index.js'

export const TodoPage = () => `
  <div id="todo-page" class="container">
    ${NavBar()}
    ${TasksList()}
    ${InputForm()}
    ${FullscreenImage()}
  </div>
`

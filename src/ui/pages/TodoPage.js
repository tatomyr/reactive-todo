import { htmx } from '/modules/purity.js'
import * as components from '../components/index.js'

export const TodoPage = () => htmx(components)`
  <div id="todo-page" class="container">
    <NavBar />
    <TasksList />
    <InputForm />
    <FullscreenImage />
  </div>
`

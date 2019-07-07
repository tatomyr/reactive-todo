import { html } from '/modules/purity.js'
import { Icon } from '../components/index.js'

export const InfoPage = () => html(Icon)`
  <div id="info-page">
    <h1>
      Purity ToDo App Info
    </h1>
    <p>
      App version: 5.0.12
    </p>
    <p>
      Check out the repository:
      <a href="https://github.com/tatomyr/reactive-todo">
        github.com/tatomyr/reactive-todo
      </a>
    </p>
    <button onclick="dispatch({ type: 'FILTER', view: 'active' })">Back</button>
    <h1>Icons</h1>
    <Icon name="download" />
    <h1>Credits</h1>
    <div>Icons made by <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
  </div>
`

// TODO: export / import user data (tasks)

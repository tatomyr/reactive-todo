import { htmx } from '/modules/purity.js'
import { Icon } from '../components/index.js'

export const InfoPage = () => htmx({ Icon })`
  <div id="info-page">
    <h1>
      Purity ToDo App Info
    </h1>
    <p>
      App version: 5.3.1
    </p>
    <p>
      Check out the repository:
      <a href="https://github.com/tatomyr/reactive-todo">
        github.com/tatomyr/reactive-todo
      </a>
    </p>
    <button onclick="dispatch({ type: 'FILTER', view: 'active' })">Back</button>
    <hr />
    <h2>Actions</h2>
    <section class="user-actions">
      <div class="user-action">
        <button 
          onclick="dispatch({ type: 'DOWNLOAD_USER_DATA' })"
          class="invisible-button"
        >
          <Icon name=${'download'} size=${'S'} />
          <span class="user-action__description">backup your data</span>
        </button>
      </div>
      <div class="user-action">
        <label for="backup">
          <Icon name=${'upload'} size=${'S'} />
          <input 
            type="file" 
            accept=".json"
            id="backup"
            onchange="dispatch({ type: 'UPLOAD_USER_DATA', file: event.target.files[0] })" 
          />
          <span class="user-action__description">restore ToDos from file</span>
        </label>
      </div>
    </section>
    <hr />
    <h2>Credits</h2>
    <div>Icons made by <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
  </div>
`

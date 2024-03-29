import { render } from '/modules.js'
import { getState, dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'
import { Icon } from '../components/index.js'

export const InfoPage = () => render`
  <div id="info-page" class="info-page">
    <h1>
      Purity ToDo App Info
    </h1>
    <p>
      App version: ${getState().version}
    </p>
    <p>
      Check out the repository:
      <a href="https://github.com/tatomyr/reactive-todo">
        github.com/tatomyr/reactive-todo
      </a>
    </p>
    
    <hr />
    <h2>Actions</h2>
    <section class="user-actions">
      <div class="user-action">
        <button
          ::click=${e => {
            dispatch({ type: types.DOWNLOAD_USER_DATA })
          }}
          class="invisible-button"
        >
          ${Icon({ name: 'save', size: 'S' })}
          <span class="user-action__description">backup your data</span>
        </button>
      </div>

      <div class="user-action">
        <label for="backup">
          ${Icon({ name: 'upload', size: 'S' })}
          <input
            type="file"
            accept=".json"
            id="backup"
            ::change=${({
              target: {
                files: [file],
              },
            }) => {
              dispatch({ type: types.UPLOAD_USER_DATA, file })
            }}
          />
          <span class="user-action__description">restore ToDos from file</span>
        </label>
      </div>

      <div class="user-action">
        <button
          class="invisible-button"
          ::click=${e => {
            localStorage.removeItem('customFont')
            location.reload()
          }}
        >
          ${Icon({ name: 'edit', size: 'S' })}
          <span class="user-action__description">use default font</span>
        </button>
      </div>

      <div class="user-action">
        <button
          class="invisible-button"
          ::click=${e => {
            localStorage.setItem('customFont', 'Unisource')
            location.reload()
          }}
        >
          ${Icon({ name: 'edit', size: 'S' })}
          <span class="user-action__description">use Unisource font</span>
        </button>
      </div>
    </section>
    <hr />
    <h2>Credits</h2>
    <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </div>
`

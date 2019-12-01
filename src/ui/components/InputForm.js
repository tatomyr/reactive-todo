import { render } from '/modules/purity.js'
import { debounce } from '/modules/debounce.js'
import { sanitize } from '/modules/sanitize.js'
import { dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'

const onSubmit = e => {
  e.preventDefault()
  dispatch({
    type: types.CREATE_TASK,
    description: sanitize(e.target.newTask.value),
  })
  // TODO: decide whether to reset the form here
  // e.target.reset()
}

const onKeyUp = debounce(e => {
  dispatch({ type: types.CHANGE_INPUT, input: e.target.value })
}, -200)

const cleanInput = e => {
  dispatch({ type: types.CHANGE_INPUT, input: '' })
}

export const InputForm = () => render`
  <div class="form">
    <form id="newTask-form" ::submit=${onSubmit}>
      <input
        class="input"
        id="newTask"
        name="newTask"
        placeholder="New task..."
        required
        maxlength="60"
        autocomplete="off"
        ::keyup=${onKeyUp}
      />
      <button
        type="reset"
        id="clear"
        class="round"
        ::click=${cleanInput}
      >
        ✗
      </button>
    </form>
  </div>
`

import { render, debounce, sanitize } from '/modules.js'
import { connect, dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'

const onSubmit = e => {
  e.preventDefault()
  dispatch({
    type: types.CREATE_TASK,
    description: sanitize(e.target.newTask.value),
    // TODO: decide whether to reset the form here
    // onSuccess: () => {
    //   e.target.reset()
    //   console.log(e.target, e.target.blur)
    //   e.target.newTask.blur()
    // },
  })
}

const onKeyUp = debounce(e => {
  dispatch({ type: types.CHANGE_INPUT, input: e.target.value })
}, 500)

const cleanInput = e => {
  dispatch({ type: types.CHANGE_INPUT, input: '' })
}

export const InputForm = connect(
  ({ input }) => render`
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
          value="${input}"
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
)

import { htmx } from '/modules/purity.js'
import { debounce } from '/modules/debounce.js'
import { dispatch } from '/store-provider/index.js'

const onSubmit = event => {
  event.preventDefault()
  dispatch({ type: 'CREATE_TASK', event })
}

const onKeyUp = debounce(e => {
  dispatch({ type: 'CHANGE_INPUT', input: e.target.value })
}, -200)

const cleanInput = () => {
  dispatch({ type: 'CLEAN_INPUT', target: 'newTask' })
}

export const InputForm = () => htmx({})`
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
            <div
                id="clear"
                class="round"
                ::click=${cleanInput}
            >
                ✗
            </div>
        </form>
    </div>
`

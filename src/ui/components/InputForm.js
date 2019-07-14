export const InputForm = () => `
    <div class="form">
        <form
            id="newTask-form"
            onSubmit="
                event.preventDefault()
                dispatch({ type: 'CREATE_TASK', event })
            "
        >
            <input
                class="input"
                id="newTask"
                name="newTask"
                placeholder="New task..."
                required
                maxlength="60"
                autocomplete="off"
                onkeyup="dispatch({ type: 'CHANGE_INPUT', input: event.target.value })"
            />
            <div
                id="clear"
                class="round"
                onclick="dispatch({ type: 'CLEAN_INPUT', target: 'newTask' })"
            >
                ✗
            </div>
        </form>
    </div>
`

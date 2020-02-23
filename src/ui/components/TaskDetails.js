import { render, sanitize } from '/modules.js'
import { connect, dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'
import { selectTask } from '../../services/index.js'
import { ChangeImage, CapturePhoto } from './TaskDetailsControls.js'
import { Icon } from './Icon.js'

// TODO: split by sections
// TODO: if screen height isn't large enough, hide the task image and controls section when textarea is focused (CSS?)

export const TaskDetails = connect(({ tasks, taskId }) => {
  const task = selectTask(taskId)({ tasks })
  const [image, others = []] = task.images

  return render`
    <div class="task-details__container">
      <section>
        <div class="task-details__image--wrapper">
          <div
            id="fullscreen-image"
            class="task-details__image"
            class="bg"
            style="background-image: url(${image})"

            ::touchstart=${e => {
              dispatch({ type: types.SWIPE_IMAGE, taskId, event: e })
            }}

          ></div>
          <section class="task-details__image--controls">
            ${ChangeImage({ direction: 'back', disabled: !others.length })}
            ${CapturePhoto()}
            ${ChangeImage({ direction: 'next', disabled: !others.length })}
          </section>
        </div>
      </section>
      <section class="task-details__description">
        <textarea 
          id="task-description-edit"
          ::change=${e => {
            dispatch({
              type: types.UPDATE_TASK,
              task: { id: taskId, description: sanitize(e.target.value) },
            })
          }}
        >
          ${task.description}
        </textarea>
      </section>
      <section class="task-details__controls">
        <a
          href="#/active"
          class="link"
          ::click=${e => {
            dispatch({ type: types.TRIGGER_TASK, taskId })
          }}
        >
          <div class="round">
            ${Icon({ name: task.completed ? 'push-pin' : 'success' })}
          </div>
        </a>
      </section>
    </div>
  `
})

import { htmx } from '/modules/purity.js'
import { connect } from '/store-provider/index.js'
import * as controls from './TaskDetailsControls.js'
import { Icon } from './Icon.js'
import { selectTask } from '../../services/index.js'

// TODO: split by sections
// TODO: if screen height isn't large enough, hide the task image and controls section when textarea is focused (CSS?)

export const TaskDetails = connect(({ tasks, taskId }) => {
  if (!taskId) return '<div id="task-details" class="task-details__container hidden"></div>'
  const task = selectTask(taskId)({ tasks })

  const [image, others = []] = task.images

  return htmx({ ...controls, Icon })`
    <div 
      id="task-details" 
      class="task-details__container" 
    >
      <section>
        <div class="task-details__image--wrapper">
          <div
            id="fullscreen-image"
            class="task-details__image"
            class="bg"
            style="background-image: url(${image})"

            ontouchstart="dispatch({ type: 'SWIPE_IMAGE', taskId: '${taskId}', event })"

          ></div>
          <section class="task-details__image--controls">
            <ChangeImage direction=${'back'} disabled=${!others.length} />
            <CapturePhoto />
            <ChangeImage direction=${'next'} disabled=${!others.length} />
          </section>
        </div>
      </section>
      <section class="task-details__description">
        <textarea 
          id="task-description-edit"
          onchange="dispatch({ 
            type: 'UPDATE_TASK', 
            task: { id: '${taskId}', description: event.target.value } 
          })"
        >${task.description}</textarea>
      </section>
      <section class="task-details__controls">
        <button
          class="invisible-button round"
          onclick="dispatch({ 
            type: 'CLOSE_TASK_DETAILS', 
          })"
        >
          <Icon name=${'home'} />
        </button>
        <button
          class="invisible-button round ${task.completed ? 'completed' : ''}"
          onclick="
            dispatch({ type: 'CLOSE_TASK_DETAILS' })
            dispatch({ type: 'TRIGGER_TASK', taskId: '${task.id}' })
          "
        >
          ✓
        </button>
      </section>
    </div>
  `
})

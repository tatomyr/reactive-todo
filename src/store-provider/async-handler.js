import nanoid from 'nanoid'
import { types } from './action-types'
import {
  saveTasks, fetchImages, filterImagesOverHttps, undefinedTaskImage,
} from '@services'

function triggerTask(action, state, dispatch) {
  saveTasks(state)
  const { completed } = state.tasks.find(task => task.id === action.id)
  const text = completed ? 'Task marked completed' : 'Task now set active'
  dispatch({ type: types.NOTIFY, text, pageY: action.pageY })
}

async function createTask(action, state, dispatch) {
  const {
    event: { target },
  } = action
  const description = target.newTask.value
  const date = Date.now()
  const id = nanoid()
  target.reset()
  target.newTask.blur()
  dispatch({ type: types.FILTER, filter: 'active' })
  dispatch({
    type: types.ADD_TASK,
    description,
    date,
    id,
  })
  try {
    const { items } = await fetchImages(description)
    dispatch({
      type: types.UPDATE_TASK,
      task: { id, images: filterImagesOverHttps(items) },
    })
  } catch (err) {
    console.error(err)
    dispatch({ type: types.UPDATE_TASK, task: { id, images: [undefinedTaskImage] } })
    dispatch({ type: types.NOTIFY, text: err.message })
  }
}

export function deleteTask(action, state, dispatch) {
  saveTasks(state)
  dispatch({
    type: types.NOTIFY,
    text: 'Task has been deleted',
    pageY: action.pageY,
  })
}

export function changeInput(action, state, dispatch) {
  dispatch({ type: types.SUBSTITUTE_ROUTE, hasInput: !!action.input })
}

export function cleanInput(action, state, dispatch) {
  document.querySelector(`#${action.target}`).value = ''
  dispatch({ type: types.CHANGE_INPUT, input: '' })
}

export function notify(action, state, dispatch) {
  const pass = ({ type, ...rest }) => rest
  if (state.notification.notificationId) clearTimeout(state.notification.notificationId)
  const notificationId = !!action.text
    && setTimeout(() => {
      dispatch({ type: types.NOTIFICATION_HIDE })
    }, 2000)
  dispatch({ type: types.NOTIFICATION_SHOW, ...pass(action), notificationId })
}

export function moveTask(action, state, dispatch) {
  // TODO: try to move to a separate file. Basically we should be able to describe helpers separately and then assemble them in a root one. Common sense hints us that it should be separated files for each root field in the State.
  const { currentTarget, changedTouches } = action.event
  // Position helpers
  const getPosition = () => parseFloat(currentTarget.style.left || 0, 10)
  const getDirection = () => (Math.sign(getPosition()) < 0 ? '-' : '')
  const initialOffset = getPosition()
  // Clear possible transition that would have intercepted with dragging.
  currentTarget.style.transition = 'none'
  // Enables to check once whether a user wants to scroll or to trigger a task.
  let checkOnce = condition => {
    checkOnce = () => false
    return condition
  }

  const taskCompleted = state.tasks.find(({ id }) => id === action.id).completed

  currentTarget.ontouchmove = e => {
    const offsetX = e.changedTouches[0].clientX - changedTouches[0].clientX
    const offsetY = e.changedTouches[0].clientY - changedTouches[0].clientY
    if (checkOnce(Math.abs(offsetY / offsetX) > 1 / 2)) {
      // A user wants to scroll.
      currentTarget.ontouchmove = null
    } else {
      // A user wants to drag a task card. Preventing default scrolling.
      e.preventDefault()
      const positionX = initialOffset + offsetX
      currentTarget.style.left = `${positionX}px`
      // dispatch({ type: types.TOUCH_MOVE, id: action.id, positionX })
    }
  }

  currentTarget.ontouchend = () => {
    // Destroying attached events.
    currentTarget.ontouchmove = null
    currentTarget.ontouchend = null
    // Animating task automovement.
    const positionX = getPosition()
    const duration = 500 // FIXME: should depend on positionX
    currentTarget.style.transition = `left ${duration}ms`
    if (
      (positionX > window.screen.width * 0.33 && !taskCompleted)
      || (positionX < -window.screen.width * 0.33 && taskCompleted)
    ) {
      // Go away.
      // TODO: Try to save scroll Y position
      currentTarget.style.left = `${getDirection()}${window.screen.width}px`
      setTimeout(
        () => dispatch({
          type: types.TRIGGER_TASK,
          id: action.id,
          pageY: changedTouches[0].clientY,
        }),
        duration
      )
    } else {
      // Get back.
      currentTarget.style.left = 0
    }
  }
}

// Watcher for async actions to handle Side Effects
export function asyncHandler(action, state, dispatch) {
  switch (action.type) {
    case types.TRIGGER_TASK:
      return triggerTask(action, state, dispatch)
    case types.CREATE_TASK:
      return createTask(action, state, dispatch)
    case types.DELETE_TASK:
      return deleteTask(action, state, dispatch)
    case types.UPDATE_TASK:
    case types.CHANGE_IMAGE:
      return saveTasks(state)
    case types.CHANGE_INPUT:
      return changeInput(action, state, dispatch)
    case types.CLEAN_INPUT:
      return cleanInput(action, state, dispatch)
    case types.NOTIFY:
      return notify(action, state, dispatch)
    case types.MOVE_TASK:
      return moveTask(action, state, dispatch)
    default:
      return undefined
  }
}

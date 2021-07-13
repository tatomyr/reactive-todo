import { registerAsync, md5 } from '/modules.js'
import * as services from '/services/index.js'
import { IMAGES } from '/config/images.js'
import { types } from './action-types.js'

import { push } from '../hashrouter.js'

async function createTask(action, dispatch, state) {
  const { description } = action
  const date = Date.now()
  // TODO: investigate impact
  const id = `${md5(description)}`
  // TODO: handle unique id case properly
  if (state.tasks.some(task => task.id === id)) {
    dispatch({
      type: types.NOTIFY,
      text: 'There is already a task with this id',
    })
    return
  }
  dispatch({ type: types.ADD_TASK, description, date, id })
  dispatch({ type: types.RESET_INPUT })
  try {
    const { items } = await services.fetchImages(description)
    const images = await services.filterImages(items)
    dispatch({
      type: types.UPDATE_TASK,
      task: { id, images },
    })
  } catch (err) {
    console.error(err)
    dispatch({
      type: types.UPDATE_TASK,
      task: { id, images: [IMAGES.UNDEFINED_TASK] },
    })
    dispatch({ type: types.NOTIFY, text: err.message })
  }
}

function resetInput(action, dispatch, state) {
  // TODO: try to do it with the help of the native event
  const form = document.getElementById('newTask-form')
  form.reset()
  form.newTask.blur()
  push('#/active')
}

function triggerTask(action, dispatch, state) {
  const { completed } = services.selectTask(action.taskId)(state)
  dispatch({
    type: types.UPDATE_TASK,
    task: { id: action.taskId, completed: !completed, updatedAt: Date.now() },
  })
  const text = completed
    ? 'Task has been set active'
    : 'Task has been completed'
  dispatch({ type: types.RESET_INPUT })
  dispatch({ type: types.NOTIFY, text, pageY: action.pageY })
}

async function saveTasks(action, dispatch, state) {
  try {
    services.saveTasks(state.tasks)
  } catch (err) {
    console.log({ err })
    dispatch({ type: types.NOTIFY, text: err.message })
  }
}

export function deleteTask(action, dispatch, state) {
  services.saveTasks(state.tasks)
  dispatch({
    type: types.NOTIFY,
    text: 'Task has been deleted',
    pageY: action.pageY,
  })
}

export function notify(action, dispatch, state) {
  const pass = ({ type, ...rest }) => rest
  if (state.notification.notificationId)
    clearTimeout(state.notification.notificationId)
  const notificationId =
    !!action.text &&
    setTimeout(() => {
      dispatch({ type: types.NOTIFICATION_HIDE })
    }, 2000)
  dispatch({ type: types.NOTIFICATION_SHOW, ...pass(action), notificationId })
}

export function moveTask(action, dispatch, state) {
  // TODO: try to move to a separate file. Basically we should be able
  // … to describe helpers separately and then assemble them in a root one.
  // … Common sense hints us that it should be separated files for each root field in the State.
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

  const { completed } = services.selectTask(action.taskId)(state)

  currentTarget.ontouchmove = e => {
    const offsetX = e.changedTouches[0].clientX - changedTouches[0].clientX
    const offsetY = e.changedTouches[0].clientY - changedTouches[0].clientY
    if (checkOnce(Math.abs(offsetY / offsetX) > 1 / 2)) {
      // User wants to scroll.
      currentTarget.ontouchmove = null
    } else {
      // User wants to drag a task card. Preventing default scrolling.
      e.preventDefault()
      const positionX = initialOffset + offsetX
      currentTarget.style.left = `${positionX}px`
      // dispatch({ type: types.TOUCH_MOVE, id: action.taskId, positionX })
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
      (positionX > window.screen.width * 0.15 && !completed) ||
      (positionX < -window.screen.width * 0.15 && completed)
    ) {
      // Go away.
      currentTarget.style.left = `${getDirection()}${window.screen.width}px`
      setTimeout(() => {
        dispatch({
          type: types.TRIGGER_TASK,
          taskId: action.taskId,
          pageY: changedTouches[0].clientY,
        })
      }, duration)
    } else {
      // Get back.
      currentTarget.style.left = 0
    }
  }
}

// ---------- Carouselle -------------
// TODO: implement SWIPE_IMAGE action handling (WIP)
export function swipeImage(action, dispatch, state) {
  const { currentTarget, changedTouches } = action.event
  // Position helpers
  const getPosition = () => parseFloat(currentTarget.style.left || 0, 10)
  const getDirection = () => (Math.sign(getPosition()) < 0 ? '-' : '')
  const initialOffset = getPosition()

  // Clear possible transition that would have intercepted with dragging.
  currentTarget.style.transition = 'none'
  // Enables to check once whether a user wants to scroll or to trigger a task.
  // let checkOnce = condition => {
  //   checkOnce = () => false
  //   return condition
  // }

  // const completed = state.tasks.find(({ id }) => id === action.id).completed
  console.info(currentTarget, initialOffset, getDirection())

  currentTarget.ontouchmove = e => {
    const offsetX = e.changedTouches[0].clientX - changedTouches[0].clientX
    const offsetY = e.changedTouches[0].clientY - changedTouches[0].clientY
    //   if (checkOnce(Math.abs(offsetY / offsetX) > 1 / 2)) {
    //     // User wants to scroll.
    //     currentTarget.ontouchmove = null
    //   } else {
    //     // User wants to drag a task card. Preventing default scrolling.
    e.preventDefault()
    const positionX = initialOffset + offsetX
    currentTarget.style.left = `${positionX}px`
    // dispatch({ type: types.TOUCH_MOVE, id: action.id, positionX })
    //   }
  }

  currentTarget.ontouchend = () => {
    // Destroying attached events.
    currentTarget.ontouchmove = null
    currentTarget.ontouchend = null
    // Animating task automovement.
    const positionX = getPosition()
    const duration = 500 // FIXME: should depend on positionX
    currentTarget.style.transition = `left ${duration}ms`
    //   if (
    //     (positionX > window.screen.width * 0.33 && !completed)
    //     || (positionX < -window.screen.width * 0.33 && completed)
    //   ) {
    //     // Go away.
    //     currentTarget.style.left = `${getDirection()}${window.screen.width}px`
    //     setTimeout(
    //       () => dispatch({
    //         type: types.TRIGGER_TASK,
    //         id: action.id,
    //         pageY: changedTouches[0].clientY,
    //       }),
    //       duration
    //     )
    //   } else {
    //     // Get back.
    currentTarget.style.left = initialOffset // FIXME: ?
    //   }
  }
}
// ---------- Carouselle -------------

async function changeImage(action, dispatch, state) {
  console.log(action.taskId, 'state-->', state)
  const { images } = services.selectTask(action.taskId)(state)
  dispatch({
    type: types.UPDATE_TASK,
    task: {
      id: action.taskId,
      images: services.shiftImages(images)(action.direction),
    },
  })
}

async function capturePhoto(action, dispatch, state) {
  try {
    if (action.file) {
      const bigImg = await createImageBitmap(action.file)
      const smallImg = await createImageBitmap(bigImg, {
        ...services.keepRatio(bigImg)(300),
        resizeQuality: 'high',
      })
      const croppedImg = await createImageBitmap(
        smallImg,
        ...services.cropSquare(smallImg)
      )
      const src = services.getImgSrc(croppedImg)
      const { images } = services.selectTask(action.taskId)(state)
      dispatch({
        type: types.UPDATE_TASK,
        task: {
          id: action.taskId,
          images: [src, ...images],
        },
      })
    }
  } catch (err) {
    dispatch({ type: types.NOTIFY, text: err.message })
  }
}

function downloadUserData(action, dispatch, state) {
  try {
    const fileName = `TODO-backup-${new Date()
      .toDateString()
      .replace(/[ /]/g, '_')}.json`
    services.download(fileName, JSON.stringify(services.getCachedTasks()))
    dispatch({
      type: types.NOTIFY,
      text: `Trying to download your backup in file ${fileName}`,
    })
  } catch (err) {
    dispatch({ type: types.NOTIFY, text: err.message })
  }
}

async function uploadUserData(action, dispatch, state) {
  if (!action.file) return
  try {
    const text = await services.textFileReader(action.file)
    const tasks = JSON.parse(text)
    // TODO: check for correct format (changes)
    if (
      window.confirm(
        `Are you sure you want to replace current tasks in your storage (${
          services.getCachedTasks().length
        } items) with new one (${tasks.length} items)?`
      )
    ) {
      services.saveTasks(tasks)
      push('#/active')
      dispatch({ type: types.RESET_TASKS, tasks })
    }
  } catch (err) {
    dispatch({ type: types.NOTIFY, text: err.message })
  }
}

async function startup(action, dispatch, state) {
  const version = await fetch('./config/version').then(res => res.text())
  dispatch({ type: types.SET_DEFAULTS, version })
}

export default registerAsync({
  [types.INIT]: startup,
  [types.CREATE_TASK]: createTask,
  [types.RESET_INPUT]: resetInput,
  [types.TRIGGER_TASK]: triggerTask,
  [types.DELETE_TASK]: deleteTask,
  [types.UPDATE_TASK]: saveTasks,
  [types.NOTIFY]: notify,
  [types.MOVE_TASK]: moveTask,
  [types.CHANGE_IMAGE]: changeImage,
  [types.CAPTURE_PHOTO]: capturePhoto,
  [types.DOWNLOAD_USER_DATA]: downloadUserData,
  [types.UPLOAD_USER_DATA]: uploadUserData,
  SWIPE_IMAGE: swipeImage,
})

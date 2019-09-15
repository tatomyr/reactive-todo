import { md5 } from '/modules/md5.js'
import { types } from './action-types.js'
import * as services from '/services/index.js'

async function createTask(action, state, dispatch) {
  const {
    event: { target },
  } = action
  const description = target.newTask.value
  const date = Date.now()
  // TODO: investigate impact
  const id = `${md5(description)}`
  // TODO: handle unique id case properly
  if (state.tasks.some(task => task.id === id)) {
    dispatch({ type: types.NOTIFY, text: 'There is already a task with this id' })
    return
  }
  dispatch({
    type: types.ADD_TASK,
    description,
    date,
    id,
  })
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
    dispatch({ type: types.UPDATE_TASK, task: { id, images: [services.undefinedTaskImage] } })
    dispatch({ type: types.NOTIFY, text: err.message })
  }
}

function resetInput(action, state, dispatch) {
  const form = document.getElementById('newTask-form')
  form.reset()
  form.newTask.blur()
  dispatch({ type: types.FILTER, view: 'active' })
}

function triggerTask(action, state, dispatch) {
  const { completed } = services.selectTask(action.taskId)(state)
  dispatch({
    type: types.UPDATE_TASK,
    task: {
      id: action.taskId,
      completed: !completed,
      updatedAt: Date.now(),
    },
  })
  const text = completed ? 'Task has been set active' : 'Task has been completed'
  dispatch({ type: types.RESET_INPUT })
  dispatch({ type: types.NOTIFY, text, pageY: action.pageY })
}

async function saveTasks(action, state, dispatch) {
  try {
    services.saveTasks(state.tasks)
  } catch (err) {
    console.log({ err })
    dispatch({ type: types.NOTIFY, text: err.message })
  }
}

export function deleteTask(action, state, dispatch) {
  services.saveTasks(state.tasks)
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
      (positionX > window.screen.width * 0.33 && !completed)
      || (positionX < -window.screen.width * 0.33 && completed)
    ) {
      // Go away.
      currentTarget.style.left = `${getDirection()}${window.screen.width}px`
      setTimeout(
        () => dispatch({
          type: types.TRIGGER_TASK,
          taskId: action.taskId,
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

// ---------- Carouselle -------------
// TODO: implement SWIPE_IMAGE action handling (WIP)
export function swipeImage(action, state, dispatch) {
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

async function changeImage(action, state, dispatch) {
  const { images } = services.selectTask(action.taskId)(state)
  dispatch({
    type: types.UPDATE_TASK,
    task: {
      id: action.taskId,
      images: services.shiftImages(images)(action.direction),
    },
  })
}

async function capturePhoto(action, state, dispatch) {
  try {
    if (action.file) {
      const bigImg = await createImageBitmap(action.file)
      const smallImg = await createImageBitmap(bigImg, {
        ...services.keepRatio(bigImg)(300),
        resizeQuality: 'high',
      })
      const croppedImg = await createImageBitmap(smallImg, ...services.cropSquare(smallImg))
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

function downloadUserData(action, state, dispatch) {
  try {
    const fileName = `TODO-backup-${new Date().toDateString().replace(/[ /]/g, '_')}.json`
    services.download(fileName, JSON.stringify(services.getCachedTasks()))
    dispatch({
      type: types.NOTIFY,
      text: `Trying to download your backup in file ${fileName}`,
    })
  } catch (err) {
    dispatch({ type: types.NOTIFY, text: err.message })
  }
}

async function uploadUserData(action, state, dispatch) {
  if (!action.file) return
  try {
    const text = await services.textFileReader(action.file)
    const tasks = JSON.parse(text)
    // TODO: check for correct format (changes)
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `Are you sure you want to replace current tasks in your storage (${
          services.getCachedTasks().length
        } items) with new one (${tasks.length} items)?`
      )
    ) {
      services.saveTasks(tasks)
      dispatch({ type: 'FILTER', view: 'active' })
      dispatch({ type: 'RESET_TASKS', tasks })
    }
  } catch (err) {
    dispatch({ type: types.NOTIFY, text: err.message })
  }
}

function logger({ type, ...rest }, state) {
  console.info('•', type, rest)
}

// Watcher for async actions to handle Side Effects
export function asyncWatcher(action, state, dispatch) {
  logger(action, state)
  switch (action.type) {
    case types.CREATE_TASK:
      createTask(action, state, dispatch)
      break
    case types.RESET_INPUT:
      resetInput(action, state, dispatch)
      break
    case types.TRIGGER_TASK:
      triggerTask(action, state, dispatch)
      break
    case types.DELETE_TASK:
      deleteTask(action, state, dispatch)
      break
    case types.CHANGE_IMAGE:
      changeImage(action, state, dispatch)
      break
    case types.UPDATE_TASK:
      saveTasks(action, state, dispatch)
      break
    case types.CHANGE_INPUT:
      changeInput(action, state, dispatch)
      break
    case types.CLEAN_INPUT:
      cleanInput(action, state, dispatch)
      break
    case types.NOTIFY:
      notify(action, state, dispatch)
      break
    case types.MOVE_TASK:
      moveTask(action, state, dispatch)
      break
    case types.CAPTURE_PHOTO:
      capturePhoto(action, state, dispatch)
      break
    case types.DOWNLOAD_USER_DATA:
      downloadUserData(action, state, dispatch)
      break
    case types.UPLOAD_USER_DATA:
      uploadUserData(action, state, dispatch)
      break

    case 'SWIPE_IMAGE':
      swipeImage(action, state, dispatch)
      break

    default:
      break
  }
}

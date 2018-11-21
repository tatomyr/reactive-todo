import nanoid from 'nanoid'
import {
  cashedTasks,
  updateTasks,
  shiftArray,
  fetchImages,
} from '@services'
import { types, asyncTypes } from './action-types'

// Default Application state
const defaults = {
  tasks: cashedTasks || [],
  route: 'active',
  _backupRoute: undefined,
  taskToShowImage: '',
  notification: {
    text: '',
    notificationId: undefined,
    pageY: undefined,
  },
  input: '',
}

// Action's payload extractor
const pass = ({ type, ...rest }) => rest

// Main Application handler. Handle all cases that may happen in the app.
export const handler = (state = defaults, action = {}, dispatch) => {
  switch (action.type) {
    case types.FILTER:
      return {
        route: action.filter,
        // If we've intentionally changed route, perhaps we don't want go back.
        _backupRoute: undefined,
      }
    case asyncTypes.ADD_TASK: {
      const { event: e } = action
      e.preventDefault()
      const description = e.target.newTask.value
      const date = Date.now()
      const id = nanoid()
      e.target.reset()
      e.target.newTask.blur()
      dispatch({
        type: types.ADD_TASK,
        description,
        date,
        id,
      })
      fetchImages(description).then(({ images, error }) => {
        dispatch({ type: asyncTypes.UPDATE_TASK, task: { id, images } })
        dispatch({ type: asyncTypes.NOTIFY, text: error })
      })
      dispatch({ type: types.FILTER, filter: 'active' })
      return {}
    }
    // This is a syncronous action
    case types.ADD_TASK:
      return {
        tasks: [
          {
            description: action.description,
            images: ['./assets/images/loading-shape.gif'],
            completed: false,
            id: action.id,
            createdAt: action.date,
            updatedAt: action.date,
          },
          ...state.tasks,
        ],
        input: '',
      }
    case asyncTypes.DELETE_TASK:
      dispatch({ type: types.DELETE_TASK, ...pass(action) })
      dispatch({ type: asyncTypes.SAVE_TASKS })
      dispatch({
        type: asyncTypes.NOTIFY,
        text: 'Task has been deleted',
        pageY: action.pageY,
      })
      return {}
    case types.DELETE_TASK:
      return {
        tasks: state.tasks.filter(({ id }) => id !== action.id),
      }
    case asyncTypes.SAVE_TASKS:
      updateTasks(state)
      return {}
    case asyncTypes.UPDATE_TASK:
      dispatch({ type: types.UPDATE_TASK, ...pass(action) })
      dispatch({ type: asyncTypes.SAVE_TASKS })
      return {}
    case types.UPDATE_TASK:
      return {
        tasks: state.tasks.map(task => (
          task.id === action.task.id
            ? ({
              ...task,
              ...action.task,
              updatedAt: Date.now(),
            })
            : task
        )).sort((a, b) => b.updatedAt - a.updatedAt),
      }
    case asyncTypes.TRIGGER_TASK: {
      const newState = dispatch({ type: types.TRIGGER_TASK, ...pass(action) })
      dispatch({ type: asyncTypes.SAVE_TASKS })
      const { completed } = newState.tasks.find(task => task.id === action.id)
      dispatch({
        type: asyncTypes.NOTIFY,
        text: completed ? 'Task marked completed' : 'Task now set active',
        pageY: action.pageY,
      })
      return {}
    }
    case types.TRIGGER_TASK:
      return {
        tasks: state.tasks.map(task => (
          task.id === action.id
            ? ({
              ...task,
              completed: !task.completed,
              updatedAt: Date.now(),
            })
            : task
        )).sort((a, b) => b.updatedAt - a.updatedAt),
      }
    case asyncTypes.NOTIFY: {
      const notificationId = (
        state.notification.notificationId
        && clearTimeout(state.notification.notificationId)
      ) || (
        action.text && setTimeout(() => {
          dispatch({
            type: asyncTypes.NOTIFY,
            text: '',
            pageY: undefined,
            notificationId: undefined,
          })
        }, 2000) // FIXME: move to config
      )
      dispatch({ type: types.NOTIFY, ...pass(action), notificationId })
      return {}
    }
    case types.NOTIFY:
      return {
        notification: {
          text: action.text,
          pageY: action.pageY || '10px',
          notificationId: action.notificationId,
        },
      }
    case types.SHOW_IMAGE:
      return { taskToShowImage: action.taskToShowImage }
    case asyncTypes.CHANGE_IMAGE:
      dispatch({ type: types.CHANGE_IMAGE, ...pass(action) })
      dispatch({ type: asyncTypes.SAVE_TASKS })
      return {}
    case types.CHANGE_IMAGE:
      return {
        tasks: state.tasks.map(task => (
          task.id === action.taskId
            ? { ...task, images: shiftArray(task.images)(action.direction) }
            : task
        )),
      }
    case types.SUBSTITUTE_ROUTE:
      return action.input ? ({
        route: 'all',
        _backupRoute: state._backupRoute || state.route,
      }) : ({
        route: state._backupRoute || state.route,
        _backupRoute: undefined,
      })
    case asyncTypes.CHANGE_INPUT:
      dispatch({ type: types.SUBSTITUTE_ROUTE, ...pass(action) })
      dispatch({ type: types.CHANGE_INPUT, ...pass(action) })
      return {}
    case types.CHANGE_INPUT:
      return { input: action.input }
    case asyncTypes.CLEAR_INPUT:
      document.querySelector(`#${action.target}`).value = ''
      dispatch({ type: asyncTypes.CHANGE_INPUT, input: '' })
      return {}
    case asyncTypes.TOUCH_START: {
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
        if ((
          positionX > window.screen.width * 0.33 && !taskCompleted
        ) || (
          positionX < -window.screen.width * 0.33 && taskCompleted
        )) {
          // Go away.
          // TODO: Try to save scroll Y position
          currentTarget.style.left = `${getDirection()}${window.screen.width}px`
          setTimeout(() => dispatch({
            type: asyncTypes.TRIGGER_TASK,
            id: action.id,
            pageY: changedTouches[0].clientY,
          }), duration)
        } else {
          // Get back.
          currentTarget.style.left = 0
        }
      }
      return {}
    }
    // This should be triggered for the first time handler is used to create store.
    case types.INIT:
      return state
    default:
      console.log('DEFAULT')
      return {}
  }
}

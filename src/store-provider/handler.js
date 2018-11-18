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
    // Here @... means an async action
    case asyncTypes.ADD_TASK: {
      const { event: e } = action
      e.preventDefault()
      const description = e.target.newTask.value
      const date = Date.now()
      const id = nanoid()
      e.target.reset()
      e.target.newTask.blur()
      dispatch({ type: types.ADD_TASK, description, date, id })
      fetchImages(description).then(images => {
        dispatch({ type: asyncTypes.UPDATE_TASK, task: { id, images } })
      })
      dispatch({ type: types.FILTER, filter: 'active' })
      return {}
    }
    // This is a syncronous action
    case types.ADD_TASK:
      const images = ['./assets/images/loading-shape.gif']
      return {
        tasks: [
          {
            description: action.description,
            images,
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
      dispatch({ type: asyncTypes.NOTIFY, text: 'Task has been deleted', pageY: action.pageY })
      return {}
    case types.DELETE_TASK:
      return {
        tasks: state.tasks.filter(({ id }) => id !== action.id)
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
              updatedAt: Date.now()
            })
            : task
        )).sort((a, b) => b.updatedAt - a.updatedAt)
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
              updatedAt: Date.now()
            })
            : task
        )).sort((a, b) => b.updatedAt - a.updatedAt),
      }
    case asyncTypes.NOTIFY:
      const notificationId =
        state.notification.notificationId && clearTimeout(state.notification.notificationId) ||
        action.text && setTimeout(() => {
          dispatch({ type: asyncTypes.NOTIFY, text: '', pageY: undefined, notificationId: undefined })
        }, 2000)
      dispatch({ type: types.NOTIFY, ...pass(action), notificationId })
      return {}
    case types.NOTIFY:
      return { notification: {
        text: action.text,
        pageY: action.pageY,
        notificationId: action.notificationId,
      } }
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
        ))
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
    case types.INIT:
      return state;
    default:
      console.log('DEFAULT')
      return {}
  }
}

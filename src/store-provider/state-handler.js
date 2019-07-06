/* eslint-disable no-underscore-dangle */
import { cashedTasks, shiftArray, updateTaskImages } from '/services/index.js'
import { types } from './action-types.js'

// Default Application state
const defaults = {
  tasks: cashedTasks || [],
  view: 'active',
  _backupRoute: undefined,
  taskToShowImage: '',
  notification: {
    text: '',
    notificationId: undefined,
    pageY: undefined,
  },
  input: '',
}

// Main syncronous Application handler. Handle all App state changes.
export const stateHandler = (state = defaults, action = {}) => {
  switch (action.type) {
    case types.FILTER:
      return {
        view: action.view,
        // If we've intentionally changed view, apparently we don't want go back.
        _backupRoute: undefined,
      }
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
    case types.DELETE_TASK:
      return {
        tasks: state.tasks.filter(({ id }) => id !== action.id),
      }
    case types.UPDATE_TASK:
      return {
        tasks: state.tasks
          .map(task => (task.id === action.task.id
            ? {
              ...task,
              ...action.task,
              updatedAt: Date.now(),
            }
            : task))
          .sort((a, b) => b.updatedAt - a.updatedAt),
      }
    case types.TRIGGER_TASK:
      return {
        tasks: state.tasks
          .map(task => (task.id === action.id
            ? {
              ...task,
              completed: !task.completed,
              updatedAt: Date.now(),
            }
            : task))
          .sort((a, b) => b.updatedAt - a.updatedAt),
      }
    case types.NOTIFICATION_SHOW:
      return {
        notification: {
          text: action.text,
          pageY: action.pageY,
          notificationId: action.notificationId,
        },
      }
    case types.NOTIFICATION_HIDE:
      return {
        notification: {
          text: '',
          pageY: undefined,
          notificationId: undefined,
        },
      }
    case types.SHOW_IMAGE:
      return { taskToShowImage: action.taskToShowImage }
    case types.HIDE_IMAGE:
      return { taskToShowImage: '' }
    case types.CHANGE_IMAGE:
      return updateTaskImages(state.tasks, action.taskId, images => shiftArray(images)(action.direction))
    case types.ADD_PHOTO:
      return updateTaskImages(state.tasks, action.taskId, images => [action.src, ...images])
    case types.SUBSTITUTE_ROUTE:
      return action.hasInput
        ? {
          view: 'all',
          _backupRoute: state._backupRoute || state.view,
        }
        : {
          view: state._backupRoute || state.view,
          _backupRoute: undefined,
        }
    case types.CHANGE_INPUT:
      return { input: action.input }
    case types.SHOW_INFO:
      return { view: 'show-info' }

    // This should be triggered for the first time handler is used to create store.
    case types.INIT:
      return state
    default:
      console.log('DEFAULT')
      return {}
  }
}

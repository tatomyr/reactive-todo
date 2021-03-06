import { types } from './action-types.js'
import { getCachedTasks } from '/services/index.js'

// Default Application state
const defaults = {
  tasks: getCachedTasks(),
  taskId: undefined,
  input: '',
  view: 'active',
  startedInputAt: 'active',
  notification: {
    text: '',
    notificationId: undefined,
    pageY: undefined,
  },
}

// Main syncronous Application handler. Handle all App state changes.
export const stateHandler = (state = defaults, action = {}) => {
  switch (action.type) {
    case types.FILTER:
      return {
        view: action.view,
        // If we've intentionally changed view, apparently we don't want go back.
        startedInputAt: action.view,
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
      }
    case types.RESET_INPUT:
      // TODO: combine with CHANGE_INPUT?
      return { input: '' }
    case types.DELETE_TASK:
      return {
        tasks: state.tasks.filter(({ id }) => id !== action.taskId),
      }
    case types.UPDATE_TASK:
      return {
        tasks: state.tasks
          .map(task =>
            task.id === action.task.id
              ? {
                  ...task,
                  ...action.task,
                }
              : task
          )
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
    case types.CHANGE_INPUT:
      return {
        input: action.input,
        view: action.input ? 'all' : state.startedInputAt,
      }
    case types.SHOW_INFO:
      return { view: 'show-info' }
    case types.RESET_TASKS:
      return { tasks: action.tasks }

    case types.SHOW_TASK_DETAILS:
      return { taskId: action.taskId }
    case types.CLOSE_TASK_DETAILS:
      return { taskId: undefined }

    // This should be triggered for the first time handler is used to create store.
    case types.INIT:
      return state
    default:
      console.log('DEFAULT')
      return null
  }
}

import { createStore } from './reactive-store'
import imageAPI from './data/google-api'

console.log('triggered store provider')

// Task helpers
const cashedTasks = localStorage.getItem('tasks') &&
  JSON.parse(localStorage.getItem('tasks'))

const updateTasks = ({ tasks }) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const shiftArray = arr => direction => {
  switch (direction) {
    case 'next':
      const [first, ...rest] = arr
      return [...rest, first]
    case 'prev':
      const last = arr[arr.length - 1]
      const start = arr.slice(0, -1)
      return [last, ...start]
  }
}

// Initialize store and export store methods
export const { connect, mutate } = createStore({
  tasks: cashedTasks || [],
  route: 'active',
  taskToShowImage: '',
  notification: {
    text: '',
    id: undefined,
    pageY: undefined,
  },
})

// Set global handlers
window.global = { ...(window.global || {}) }
window.global.dispatch = (action, payload) => {
  switch (action) {
    case 'ADD_TASK':
      payload.event.preventDefault()
      const description = payload.event.target.newTask.value
      console.log(description)
      payload.event.target.reset()
      payload.event.target.newTask.blur()
      const date = Date.now()
      const undefinedTask = './assets/images/undefined-task.jpg'
      const images = ['./assets/images/loading-shape.gif']
      mutate(({ tasks }) => ({
        tasks: [
          {
            description,
            images,
            completed: false,
            id: `task-${date}`,
            createdAt: date,
            updatedAt: date,
          },
          ...tasks,
        ]
      }), store => {
        updateTasks(store)

        fetch(imageAPI(description))
          .then(res => res.json())
          .then(({ items }) => {
            const imagesOverHttps = items
              .map(({ link }) => link)
              .filter(link => link.startsWith('https://'))
            return imagesOverHttps || [undefinedTask]
          })
          .catch(err => {
            console.error(err);
            return [undefinedTask]
          })
          .then(images => {
            console.log(images);
            mutate(({ tasks }) => ({
              tasks: tasks
                .map(task => task.createdAt === date ? ({ ...task, images }) : task)
            }), updateTasks)
          })
      })
      return false

    case 'CLEAR_INPUT':
      console.log(action, payload)
      const input = document.querySelector(`#${payload.target}`)
      input.value = ''
      return false

    case 'TRIGGER_TASK':
      console.log(action, payload);
      mutate(({ tasks, notification }) => ({
        tasks: tasks.map(task => (
          task.id === payload.taskId
            ? { ...task, completed: !task.completed, updatedAt: Date.now() }
            : task
        )).sort((a, b) => b.updatedAt - a.updatedAt),
        notification: {
          text: tasks.find(({ id }) => id === payload.taskId).completed
            ? 'Task now set active'
            : 'Task marked completed',
          id: (notification.id !== undefined) && clearTimeout(notification.id) ||
            setTimeout(() => {
              mutate(() => ({ notification: {
                text: '',
                id: undefined,
                pageY: undefined,
              } }))
            }, 1000),
          pageY: payload.pageY,
        },
      }), updateTasks)
      return false

    case 'UPDATE_TASK':
      console.log(action, payload)
      mutate(({ tasks }) => ({
        tasks: tasks.map(task => (
          task.id === payload.taskId
            ? { ...task, updatedAt: Date.now() }
            : task
        )).sort((a, b) => b.updatedAt - a.updatedAt)
      }), updateTasks)
      return false

    case 'DELETE_TASK':
      console.log(action, payload)
      mutate(({ tasks }) => ({
        tasks: tasks.filter(task => task.id !== payload.taskId)
      }), updateTasks)
      return false

    case 'FILTER':
      console.log(action, payload)
      mutate(() => ({ route: payload.filter }))
      return false

    case 'SHOW_IMAGE':
      console.log(action, payload)
      mutate(() => ({ taskToShowImage: payload.taskToShowImage }))
      return false

    case 'CHANGE_IMAGE':
      console.log(action, payload)
      mutate(({ tasks }) => ({ tasks: tasks.map(task => (
        task.id === payload.taskId
          ? { ...task, images: shiftArray(task.images)(payload.direction) }
          : task
      )) }), updateTasks)
      return false

    default:
      console.log(action, payload)
      return false
  }
}

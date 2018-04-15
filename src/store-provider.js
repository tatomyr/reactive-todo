import { createStore } from './reactive-store'
import imageAPI from './data/google-api'

console.log('triggered store provider')

// Task helpers
const cashedTasks = localStorage.getItem('tasks') &&
  JSON.parse(localStorage.getItem('tasks'))

const updateTasks = ({ tasks }) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Initialize store and export store methods
export const { render, mutate } = createStore({
  tasks: cashedTasks || [],
  move: {
    // current: [0, 0],
    // velocity: [0, 0],
    diff: [0, 0],
  },
  route: 'active',
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
      const img = './assets/images/loading-shape.gif'
      mutate(({ tasks }) => ({
        tasks: [
          {
            description,
            img,
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
            const imgOverHttps = items
              .map(({ link }) => link)
              .find(link => link.startsWith('https://'))
            return imgOverHttps || undefinedTask
          })
          .catch(err => {
            console.error(err);
            return undefinedTask
          })
          .then(img => {
            console.log(img);
            mutate(({ tasks }) => ({
              tasks: tasks
                .map(task => task.createdAt === date ? ({ ...task, img }) : task)
            }), updateTasks)
          })
      })
      return false

    case 'TRIGGER_TASK':
      console.log(action, payload);
      mutate(({ tasks }) => ({
        tasks: tasks.map(task => (
          task.id === payload.taskId
            ? { ...task, completed: !task.completed, updatedAt: Date.now() }
            : task
        )).sort((a, b) => b.updatedAt - a.updatedAt)
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
      mutate(({ route }) => ({ route: payload.filter }))
      return false

    case 'TOUCH_START':
      // payload.event.preventDefault()
      console.log(action, payload)
      var changes = payload.event.changedTouches[0]
      var v1 = [changes.pageX, changes.pageY]

      mutate(({ move }) => ({
        move: {
          // ...move
          start: v1,
          current: v1,
          velocity: [0, 0],
          diff: [0, 0],
        }
      }))
      return false

    case 'TOUCH_MOVE':
      var changes = payload.event.changedTouches[0]
      var v1 = [changes.pageX, changes.pageY]
      // var v2 = [changes.screenX, changes.screenY]
      mutate(({ move }) => ({ move: {
        ...move,
        current: v1,
        velocity: [
          v1[0] - move.current[0],
          v1[1] - move.current[1],
        ],
        diff: [
          v1[0] - move.start[0],
          v1[1] - move.start[1],
        ],
      } }), ({ move }) => console.log('diff:',move.diff[0]))
      return false

    case 'TOUCH_END':
    var changes = payload.event.changedTouches[0]
    var v1 = [changes.pageX, changes.pageY]
      console.log(action, payload)
      mutate(({ move }) => ({ move: {
        ...move,
        diff: [
          v1[0] - move.start[0],
          v1[1] - move.start[1],
        ],
      } }), ({ move }) => console.log('diff::',Math.abs(move.diff[1]) / move.diff[0] * 100))
      return false

    case 'TOUCH_CANCEL':
      console.log(action, payload)
      return false

    default:
      return false
  }
}

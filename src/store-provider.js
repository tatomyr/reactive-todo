import { createStore } from './reactive-store'

console.log('triggered store provider')

const cashedTasks = localStorage.getItem('tasks') &&
  JSON.parse(localStorage.getItem('tasks'))

const updateTasks = ({ tasks }) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Initialize store and export store methods
export const { render, mutate } = createStore({
  tasks: cashedTasks || [],
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
      const undefinedTask = '../assets/images/undefined-task.jpg'
      mutate(({ tasks }) => ({
        tasks: [
          {
            description,
            completed: false,
            id: `task-${date}`,
            createdAt: date,
            updatedAt: date,
          },
          ...tasks,
        ]
      }), store => {
        updateTasks(store)

        fetch(`https://www.googleapis.com/customsearch/v1/?q=${description}&num=1&key=AIzaSyCzOZT0KpisM7GOxnNm2IHoI9L8SFJN8UI&cx=006011215058077132006:oomzxe2ej2o&searchType=image`)
          .then(res => res.json())
          .then(doc => doc.items[0] && doc.items[0].link || undefinedTask)
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

    default:
      return false
  }
}

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
      console.log(payload.event.target.newTask.value)
      mutate(({ tasks }) => ({
        tasks: [
          ...tasks,
          {
            description: payload.event.target.newTask.value,
            completed: false,
            index: tasks.length,
            id: `task-${tasks.length}`,
            updatedAt: Date.now(),
          },
        ]
      }), updateTasks)
      return false

    case 'TRIGGER_TASK':
      console.log('trigger:',   payload.event.target.closest('li.task'))
      mutate(({ tasks }) => ({
        tasks: tasks.map(task => (
          task.id === payload.event.target.closest('li.task').id
            ? { ...task, completed: !task.completed, updatedAt: Date.now() }
            : task
        ))
      }), updateTasks)
      return false

    case 'FILTER':
      console.log('filter', payload)
      mutate(({ route }) => ({ route: payload.filter }))
      return false

    default:
      return false
  }
}

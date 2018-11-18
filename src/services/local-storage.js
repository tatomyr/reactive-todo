export const cashedTasks = localStorage.getItem('tasks')
  && JSON.parse(localStorage.getItem('tasks'))

export const updateTasks = ({ tasks }) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

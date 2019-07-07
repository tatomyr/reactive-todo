export const shiftArray = arr => direction => {
  switch (direction) {
    case 'next': {
      const [first, ...rest] = arr
      return [...rest, first]
    }
    case 'prev': {
      const start = arr.slice(0, -1)
      const last = arr.slice(-1)[0]
      return [last, ...start]
    }
    default:
      return arr
  }
}

export const updateTaskImages = (tasks, taskId, applyChanges) => ({
  tasks: tasks.map(task => (task.id === taskId ? { ...task, images: applyChanges(task.images) } : task)),
})

export const selectTaskImages = (tasks, id) => (id && tasks.find(task => task.id === id).images) || []

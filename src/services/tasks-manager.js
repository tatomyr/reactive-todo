export const shiftImages = arr => direction => {
  switch (direction) {
    case 'next': {
      const [first, ...rest] = arr
      return [...rest, first]
    }
    case 'back': {
      const start = arr.slice(0, -1)
      const last = arr.slice(-1)[0]
      return [last, ...start]
    }
    default:
      return arr
  }
}

export const selectTask = taskId => state => state.tasks.find(({ id }) => id === taskId)

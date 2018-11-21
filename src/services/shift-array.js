export const shiftArray = arr => direction => {
  switch (direction) {
    case 'next': {
      const [first, ...rest] = arr
      return [...rest, first]
    }
    case 'prev': {
      const last = arr[arr.length - 1]
      const start = arr.slice(0, -1)
      return [last, ...start]
    }
    default:
      return arr
  }
}

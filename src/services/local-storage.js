import { IMAGES } from '/config/images.js'

export const getCachedTasks = () =>
  localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []

export const saveTasks = tasks => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export const migrate = () => {
  const migratedAtVersion = localStorage.getItem('migratedAtVersion')

  /* eslint-disable no-fallthrough */
  switch (migratedAtVersion) {
    case null:
      try {
        saveTasks(
          getCachedTasks().map(({ images, ...rest }) => ({
            ...rest,
            images: images.map(url =>
              console.log(
                url,
                url.match('/assets/images/undefined-task.jpg')
              ) || url.match('/assets/images/undefined-task.jpg')
                ? IMAGES.UNDEFINED_TASK
                : url
            ),
          }))
        )
        localStorage.setItem('migratedAtVersion', '9')
        console.info('Successfuly migrated to v.9')
      } catch (err) {
        console.error('There is an error while migrating to v.9', err)
      }
    default:
      console.info('Finished migration')
  }
}

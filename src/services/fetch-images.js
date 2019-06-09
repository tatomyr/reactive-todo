import imageAPI from './google-api.js'

export const undefinedTaskImage = '/assets/images/undefined-task.jpg'

const getResponseErrorMessage = ({ status }) => {
  switch (status) {
    case 403:
      return 'Can not get images'
    default:
      return 'Failed to fetch images'
  }
}

export const fetchImages = description => fetch(imageAPI(description)).then(res => {
  if (!res.ok) {
    throw new Error(getResponseErrorMessage(res))
  }
  return res.json()
})

const testImage = url => new Promise(resolve => {
  const timeout = 5000
  const img = new Image()
  const finish = timer => resolution => e => {
    clearTimeout(timer)
    resolve(resolution)
    console.log(timer, e, resolution)
  }
  const send = finish(
    setTimeout(() => {
      console.log('TIMEOUT!')
      // Resetting src to invalid URL so it stops previous loading, but doesn't trigger new load
      img.src = null
      resolve(undefined)
    }, timeout)
  )
  img.onerror = img.onabort = send(undefined)
  img.onload = send(url)
  img.src = url
})

export const filterImages = async (items = []) => {
  const liveImages = (await Promise.all(items.map(({ link }) => link).map(await testImage))).filter(
    Boolean
  )
  return liveImages.length > 0 ? liveImages : [undefinedTaskImage]
}

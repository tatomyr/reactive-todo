import imageAPI from './google-api'

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

// const isLiveImage = async link => {
//   try {
//     const type = await fetch(link /* { method: 'GET', mode: 'no-cors' } */).then(res => res.blob())
//     console.log(type, '<->', link)
//     return link
//     return type.startsWith('image/') && link
//   } catch (err) {
//     return false
//   }
// }

// TODO: refactor this | use async-await | TAKEN FROM HERE: https://stackoverflow.com/a/9714891
function testImage(url) {
  return new Promise((resolve, reject) => {
    const timeout = 5000
    let timer
    const img = new Image()
    img.onerror = img.onabort = function () {
      clearTimeout(timer)
      resolve(false)
    }
    img.onload = function () {
      clearTimeout(timer)
      resolve(url)
    }
    timer = setTimeout(() => {
      // reset .src to invalid URL so it stops previous
      // loading, but doesn't trigger new load
      img.src = '//!!!!/test.jpg'
      resolve(false)
    }, timeout)
    img.src = url
  })
}

export const filterImages = async (items = []) => {
  const liveImages = (await Promise.all(items.map(({ link }) => link).map(await testImage))).filter(
    Boolean
  )
  return liveImages.length > 0 ? liveImages : [undefinedTaskImage]
}

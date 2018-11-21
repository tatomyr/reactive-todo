import imageAPI from './google-api'

const undefinedTask = './assets/images/undefined-task.jpg'

const getResponseErrorMessage = ({ status }) => {
  switch (status) {
    case 403:
      return 'Can not get images. Try later.'
    default:
      return 'Failed to fetch images.'
  }
}

export const fetchImages = description => fetch(imageAPI(description))
  .then(res => {
    if (!res.ok) {
      throw new Error(getResponseErrorMessage(res))
    }
    return res.json()
  })
  .then(({ items }) => {
    const imagesOverHttps = items
      .map(({ link }) => link)
      .filter(link => link.startsWith('https://'))
    return {
      images: imagesOverHttps || [undefinedTask],
    }
  })
  .catch(err => {
    console.error({ err })
    return {
      images: [undefinedTask],
      error: err.message,
    }
  })

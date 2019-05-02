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

export const filterImagesOverHttps = items => (items && items.map(({ link }) => link)).filter(link => link.startsWith('https://')) || [
  undefinedTaskImage,
]

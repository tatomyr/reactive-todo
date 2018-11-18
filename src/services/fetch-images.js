import imageAPI from './google-api'

const undefinedTask = './assets/images/undefined-task.jpg'
export const fetchImages = description => fetch(imageAPI(description))
  .then(res => res.json())
  .then(({ items }) => {
    const imagesOverHttps = items
      .map(({ link }) => link)
      .filter(link => link.startsWith('https://'))
    return imagesOverHttps || [undefinedTask]
  })
  .catch(err => {
    console.error(err)
    return [undefinedTask]
  })

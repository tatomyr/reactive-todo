export function download(filename, text) {
  const element = document.createElement('a')
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`)
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export const textFileReader = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => {
    resolve(reader.result)
  }
  reader.readAsText(file)
})

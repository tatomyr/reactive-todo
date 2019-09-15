export const formatDescription = ({ description }) => {
  const [main, ...rest] = description.split('\n')
  return `${main} ${rest.map(item => `<span class="secondary-text">${item}</span>`).join('')}`
}

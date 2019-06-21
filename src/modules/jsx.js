export const jsx = (...Components) => (strings, ...args) => {
  console.log('[JSX]', Components, strings, args)
  let response = ''
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < strings.length; i++) {
    response += strings[i].replace(/<([A-Z]\w+)\s(.*?)\/>/gm, (_, componentName, attrs) => {
      const propsStr = `{${attrs
        .replace(/=/gm, ':')
        .replace(/(\w+?)\s*:/gm, (_, param) => `,"${param}":`)
        .replace(/^\s*?,/, '')}}`
      console.log('[JSX]', propsStr)
      const props = JSON.parse(propsStr)
      console.log('[JSX]', props)
      const componentFunction = Components.find(({ name }) => name === componentName)
      console.log(
        '[JSX]',
        `<${componentName}`,
        attrs,
        '/> -->',
        `(${componentFunction})(${propsStr})`
      )
      return componentFunction(props)
    })
    response += args[i] || ''
  }
  return response
}

// TODO: Implement parsing for such a props:
// <Bubble count=${tasks.filter(filterByStatus).filter(filterByInput(input)).length} />
// And for nested elements as well

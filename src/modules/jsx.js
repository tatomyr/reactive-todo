// FIXME: it doesn't know what the parsed name function refers to...

export const jsx = (strings, ...args) => {
  let response = ''
  for (let i = 0; i < strings.length; i++) {
    response += strings[i].replace(/<([A-Z]\w+)\s(.*?)\/>/gm, (_, name, props) => {
      const f = (() => `${name}({${props
        .replace(/=/gm, ':')
        .replace(/\w+?\s*:/gm, match => `,${match}`)
        .replace(/^\s*?,/, '')}})`)()
      console.log('[JSX]', `<${name}`, props, '/>', '-->', f)
      return eval(f)
    })
    response += args[i] || ''
  }
  return response
}

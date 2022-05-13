let match

// FIXME: I believe the common `match` will cause data inferring issues. Work this out.
export const router = component => props => component({ ...match, ...props })

export const getParams = () => match

export const Switch = routes => {
  for (const path in routes) {
    const params = (path.match(/:(\w+)/g) || []).map(param => param.slice(1))
    const matchRe = new RegExp(path.replace(/:\w+/g, '(\\w+[\\w\\-\\.]*)'))
    const matches = window.location.hash.match(matchRe)
    console.log(matches, path, ':', routes[path])
    if (!matches) {
      continue
    }
    const [_, ...args] = matches
    match = params.reduce(($, param, i) => ({ ...$, [param]: args[i] }), {})
    return routes[path](match)
  }
}

export const registerRouter = rerender => {
  if (window.location.href.indexOf('#/') === -1) {
    window.location.hash = '#/'
  }
  window.onhashchange = rerender
}

export const Redirect = ({ to }) => {
  window.location.hash = to
}

export const push = hash => {
  window.location.hash = hash
}

// TODO: replace search with hash
// export const queryParams = {
//   get: () =>
//     location.search
//       .slice(1)
//       .split('&')
//       .reduce(($, param) => {
//         const [key, value] = param.split('=')
//         return { ...$, [key]: value }
//       }, {}),
//   set: params => {
//     location.search = Object.entries(params)
//       .reduce(($, [key, value]) => `${$}${key}=${value}&`, '?')
//       .slice(0, -1)
//   },
// }

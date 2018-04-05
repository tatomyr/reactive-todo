import { render } from '../store-provider.js'
import { highlight } from '../fakes.js'

const Likes = ({ likes }) => `
  <span
    ${highlight()}
  >
    ${likes}
  </span>
`

export default render(Likes, 'likes')

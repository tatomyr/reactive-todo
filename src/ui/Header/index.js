import { render } from '../../store-provider'
import { highlight } from '../../fakes'
import filters from '../../data/filters'

const Header = ({ route }) => `
  <div
    class="header"
    ${highlight('light')}
    ontouchstart="global.dispatch('TOUCH_START', { event: event })"
    ontouchmove="global.dispatch('TOUCH_MOVE', { event: event })"
    ontouchend="global.dispatch('TOUCH_END', { event: event })"
    ontouchcancel="global.dispatch('TOUCH_CANCEL', { event: event })"
  >
    <h2>${filters.find(({ id }) => id === route).title}</h2>
  </div>
`

Header.args = ['route']

export default render(Header)

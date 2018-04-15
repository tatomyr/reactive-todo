import { render } from '../../store-provider'
import { highlight } from '../../fakes'
import filters from '../../data/filters'

const widthSum = ($, { offsetWidth }) => +$ + offsetWidth

const getOffset = route => {
  const header = (document.querySelector('#header') || {}).offsetWidth

  if (!header) {
    return setTimeout(() => window.global.dispatch('FILTER', { filter: route }), 100)
  }
  const items = [...document.querySelectorAll('#header .plank .item')]
  const plank = items
    .filter((_, i) => i < items.length - 1)
    .reduce(widthSum, 0)

  const zone = header * 0.4

  const elIndex = items.findIndex(({ id }) => id === route)
  const partialLength = items
    .filter((_, i) => i < elIndex)
    .reduce(widthSum, 0)

  const squishedLength = partialLength / plank * zone
  console.info(partialLength,'/',plank,'*',zone , '->',squishedLength, '\\',header);

  return squishedLength - partialLength
}


const Header = ({ route, move }) => {
  const offset = getOffset(route)

  return `
    <div
      id="header"
      ${highlight('light')}
      ontouchstart="global.dispatch('TOUCH_START', { event: event })"
      ontouchmove="global.dispatch('TOUCH_MOVE', { event: event })"
      ontouchend="global.dispatch('TOUCH_END', { event: event })"
      ontouchcancel="global.dispatch('TOUCH_CANCEL', { event: event })"
    >
      <div
        class="plank"
        style="transform: translate(${offset}px)"
      >
        ${filters.map(item => `
          <div id="${item.id}" class="item">
            <h2
              ${item.id === route
                ? `class="${item.id === route ? 'active' : ''}"`
                : `onclick="global.dispatch('FILTER', { filter: '${item.id}' })"`}
            >
              ${item.title}
            </h2>
          </div>
        `).join('')}
      </div>
    </div>
  `
}

Header.args = ['route', 'move']

export default render(Header)

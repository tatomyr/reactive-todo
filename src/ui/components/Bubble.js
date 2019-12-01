import { render } from '/modules/purity.js'

export const Bubble = ({ count }) => render`
  <div class="counter" data-count="${count}">
    ${count < 100 ? count : '∞'}
  </div>
`

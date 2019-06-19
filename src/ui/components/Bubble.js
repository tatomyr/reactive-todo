export const Bubble = count => `
  <div class="counter" data-count="${count}">
    ${count < 100 ? count : '∞'}
  </div>
`

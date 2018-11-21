export const Bubble = count => `
  <div class="counter" data-count=${count}>
    ${count < 100 ? count : '99'}
  </div>
`

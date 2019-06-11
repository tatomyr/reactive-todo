export const HeaderBubble = count => `
  <div class="counter" data-count=${count}>
    ${count < 100 ? count : '∞'}
  </div>
`

export const NavAboutButton = ({ caption }) => `
  <li id="info-link" class="controls-contaiter">
    <button 
      class="invisible-button item"  
      onclick="dispatch({ type: 'SHOW_INFO' })"
    >
      <div class="info-question-mark">${caption}</div>
    </button>
  </li>
`

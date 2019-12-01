import { render } from '/modules/purity.js'
import { dispatch } from '/store/provider.js'

export const NavAboutButton = () => render`
  <li id="info-link" class="controls-contaiter">
    <button 
      class="invisible-button item"  
      ::click=${e => {
        dispatch({ type: 'SHOW_INFO' })
      }}
    >
      <div class="info-question-mark">?</div>
    </button>
  </li>
`

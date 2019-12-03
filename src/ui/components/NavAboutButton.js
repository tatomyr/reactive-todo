import { render } from '/modules.js'
import { dispatch } from '/store/provider.js'
import { types } from '/store/action-types.js'

export const NavAboutButton = () => render`
  <li id="info-link" class="controls-contaiter">
    <button 
      class="invisible-button item"  
      ::click=${e => {
        dispatch({ type: types.SHOW_INFO })
      }}
    >
      <div class="info-question-mark">?</div>
    </button>
  </li>
`

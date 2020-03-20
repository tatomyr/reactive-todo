import { render } from '/modules.js'

import { Redirect } from '../../hashrouter.js'

export const StartPage = () => render`
  <div id="start-page" class=" ">
    ${Redirect({ to: '#/active' })}
  </div>
`

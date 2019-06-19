import { connect } from '/store-provider/index.js'
import { TodoPage, InfoPage } from './pages/index.js'

// FIXME: do it nicely
export const App = connect(
  ({ view }) => `
  <div id="root">
  ${(() => {
    switch (view) {
      case 'show-info':
        return InfoPage()
      default:
        return TodoPage()
    }
  })()}
  </div>
`
)

// TODO: implement state viewer for testing purposes in dev environment

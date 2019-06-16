import { connect } from '/store-provider/index.js'
import { TodoPage, InfoPage } from './pages/index.js'

const App = ({ route }) => `
  <div id="app">
  ${(() => {
    switch (route) {
      case 'show-info':
        return InfoPage()
      default:
        return TodoPage()
    }
  })()}
  </div>
`

export default connect(App)

// TODO: implement state viewer for testing purposes in dev environment

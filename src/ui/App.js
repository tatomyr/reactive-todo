import { connect } from '/store-provider/index.js'
import { TodoPage, InfoPage } from './pages/index.js'

// FIXME: do routing nicely
export const App = connect(
  ({ view }) => `
    <div id="root">
      ${view === 'show-info' ? InfoPage() : TodoPage()}
    </div>
  `
)

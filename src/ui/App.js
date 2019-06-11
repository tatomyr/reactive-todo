import { connect } from '/store-provider/index.js'
import { TodoPage, InfoPage } from './pages/index.js'

const App = ({ route }) => {
  switch (route) {
    case 'show-info':
      return InfoPage()
    default:
      return TodoPage()
  }
}

export default connect(App)

// TODO: implement state viewer for testing purposes in dev environment

/* TODO: SEEMS NOT WORKING PROPERLY
Implement such syntax:
```
const Component = () => `
  <div class="container">
    <AnotherComponent prop={something} />
  </div>
`
```
where `<AnotherComponent />` will be transformed into `${AnotherComponent({ prop: something })}`
*/

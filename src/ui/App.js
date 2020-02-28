import { render } from '/modules.js'
import { rerender } from '/store/provider.js'
import { StartPage, TodoPage, InfoPage } from './pages/index.js'
import { Notification, NavBar, TaskDetails } from './components/index.js'

import { Switch, registerRouter } from '../hashrouter.js'

const fontStyles = font => {
  switch (font) {
    case 'Unisource':
      return `
      body,
      input,
      button,
      textarea {
        font-family:  Unisource, sans-serif;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 1px;
      }
    `
    default:
      return ''
  }
}

// FIXME: do routing nicely
registerRouter(rerender)

export const App = () => {
  document.getElementById('applied-styles').innerHTML = fontStyles(
    localStorage.customFont
  )

  return render`
    <div id="root" class="container">
      ${Switch({ '#/:view': NavBar })}
      
      <div id="main" class="main-wrapper">
        ${Switch({
          '#/about': InfoPage,
          '#/:view': TodoPage,
          '#/': StartPage,
        })}
      </div>

      <div id="task-details">
        ${Switch({ '#/:view/tasks/:taskId': TaskDetails })}
      </div>
        
      ${Notification()}
    </div>
  `
}

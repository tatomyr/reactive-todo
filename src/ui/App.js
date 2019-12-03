import { render } from '/modules.js'
import { connect } from '/store/provider.js'
import { TodoPage, InfoPage } from './pages/index.js'
import { Notification } from './components/index.js'

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
export const App = connect(({ view }) => {
  document.getElementById('applied-styles').innerHTML = fontStyles(
    localStorage.customFont
  )

  return render`
    <div id="root">
      ${(() => {
        switch (view) {
          case 'show-info':
            return InfoPage()
          default:
            return TodoPage()
        }
      })()}
      ${Notification()}
    </div>
  `
})

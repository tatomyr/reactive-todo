import { render } from '../../store-provider'
import { highlight } from '../../fakes'

const ImageToShow = ({ imageToShow }) => `
  <div
    class="fullimage-container ${!imageToShow ? 'hidden' : ''}"
    onclick="global.dispatch('SHOW_IMAGE', { imageToShow: '' })"
  >
    <img src="${imageToShow}" />
  </div>
`

ImageToShow.args = ['imageToShow']

export default render(ImageToShow)

import { htmx } from '/modules/purity.js'
import { connect } from '/store-provider/index.js'
import { selectTaskImages } from '/services/index.js'
import * as controls from './FullscreenImageControls.js'

export const FullscreenImage = connect(({ taskToShowImage, tasks }) => {
  const [image, others = []] = selectTaskImages(tasks, taskToShowImage)
  return htmx(controls)`
    <div 
      id="fullscreen-image-container" 
      class="fullimage-container ${!taskToShowImage ? 'hidden' : ''}"
    >
      <div
        id="fullscreen-image"
        class="bg"
        style="background-image: url(${image})"
        onclick="dispatch({ type: 'HIDE_IMAGE' })"
      ></div>
      <section class="image-controls">
        <ChangeImage direction=${'back'} disabled=${!others.length} />
        <CapturePhoto />
        <ChangeImage direction=${'next'} disabled=${!others.length} />
      </section>
    </div>
  `
})

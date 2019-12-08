import { render } from '/modules.js'

const sizes = {
  M: '30px',
  S: '25px',
}

export const Icon = ({ name, disabled, size = 'M' }) => render`
  <img 
    src="/assets/images/icon-pack/${name}.svg" 
    alt="${name}" 
    width="${sizes[size]}"
    style="${disabled ? 'opacity: 0.3;' : ''}"
  />
`

export const Icon = ({ name, disabled }) => `
    <img 
        src="/assets/images/icon-pack/${name}.svg" 
        alt="${name}" 
        width="30px"
        style="${disabled ? 'opacity: 0.3;' : ''}"
    />
`

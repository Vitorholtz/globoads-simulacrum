export const fvar = (fill: 0 | 1, opsz: number) =>
  `'FILL' ${fill}, 'wght' 400, 'GRAD' 0, 'opsz' ${opsz}`

export const FVAR_OUTLINED_SM = fvar(0, 20)
export const FVAR_OUTLINED_MD = fvar(0, 24)
export const FVAR_FILLED_SM   = fvar(1, 20)
export const FVAR_FILLED_MD   = fvar(1, 24)

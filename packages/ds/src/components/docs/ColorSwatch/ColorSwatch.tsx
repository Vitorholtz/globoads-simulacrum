import type { ColorToken } from '../../../tokens/colors'
import { isLightColor } from '../../../utils/color'
import DocBadge from '../DocBadge/DocBadge'
import styles from './ColorSwatch.module.css'

interface ColorSwatchProps {
  token: ColorToken
}

export default function ColorSwatch({ token }: ColorSwatchProps) {
  const isGradient = token.type === 'gradient'
  const isTransparent = token.type === 'solid' && token.value === 'transparent'
  const isAlphaHex =
    token.type === 'solid' && token.value.startsWith('#') && token.value.length === 9
  const isLight = !isGradient && !isTransparent && (isAlphaHex || isLightColor(token.value))

  const valueDisplay = isGradient ? `${token.stops[0]} → ${token.stops[1]}` : token.value

  return (
    <div className={styles.card}>
      <div
        className={`${styles.preview}${isTransparent ? ` ${styles.checkerboard}` : ''}`}
        style={isTransparent ? undefined : { background: `var(${token.variable})` }}
        data-light={isLight || isTransparent ? '' : undefined}
      >
        <span className={`type-title-sm ${styles.previewName}`}>{token.name}</span>
        <span className={`type-caption-sm ${styles.previewValue}`}>{valueDisplay}</span>
      </div>

      <div className={styles.meta}>
        <DocBadge variant="accent" className="type-caption-sm font-code">
          {token.variable}
        </DocBadge>
        {token.description && (
          <p className={`type-body-sm ${styles.description}`}>{token.description}</p>
        )}
      </div>
    </div>
  )
}

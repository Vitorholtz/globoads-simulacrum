import type { ColorToken } from '../../tokens/colors'
import { isLightColor } from '../../utils/color'
import styles from './ColorSwatch.module.css'

interface ColorSwatchProps {
  token: ColorToken
}

export default function ColorSwatch({ token }: ColorSwatchProps) {
  const isGradient = token.type === 'gradient'
  const isLight = !isGradient && isLightColor(token.value)

  const valueDisplay = isGradient
    ? `${token.stops[0]} → ${token.stops[1]}`
    : token.value

  return (
    <div className={styles.card}>
      <div
        className={styles.preview}
        style={{ background: `var(${token.variable})` }}
        data-light={isLight && !isGradient ? '' : undefined}
      >
        <span className={`type-title-sm ${styles.previewName}`}>{token.name}</span>
        <span className={`type-caption-sm ${styles.previewValue}`}>{valueDisplay}</span>
      </div>

      <div className={styles.meta}>
        <code className={`type-caption-sm ${styles.cssVar}`}>{token.variable}</code>
        {token.description && (
          <p className={`type-body-sm ${styles.description}`}>{token.description}</p>
        )}
      </div>
    </div>
  )
}

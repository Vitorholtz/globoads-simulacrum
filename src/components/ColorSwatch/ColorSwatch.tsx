import type { ColorToken } from '../../tokens/colors'
import { isLightColor } from '../../utils/color'
import styles from './ColorSwatch.module.css'

interface ColorSwatchProps {
  token: ColorToken
}

export default function ColorSwatch({ token }: ColorSwatchProps) {
  const isGradient = token.type === 'gradient'
  const isLight = !isGradient && isLightColor(token.value)

  const previewStyle: React.CSSProperties = isGradient
    ? { background: `linear-gradient(135deg, ${token.stops[0]}, ${token.stops[1]})` }
    : {
        background: token.value,
        boxShadow: isLight ? 'inset 0 0 0 1px rgba(0,0,0,0.08)' : undefined,
      }

  const valueDisplay = isGradient
    ? `${token.stops[0]} → ${token.stops[1]}`
    : token.value

  return (
    <div className={styles.card}>
      <div className={styles.preview} style={previewStyle} />
      <div className={styles.meta}>
        <span className={styles.tokenName}>{token.name}</span>
        <span className={styles.tokenValue}>{valueDisplay}</span>
        <code className={styles.cssVar}>{token.variable}</code>
        {token.description && (
          <span className={styles.description}>{token.description}</span>
        )}
      </div>
    </div>
  )
}

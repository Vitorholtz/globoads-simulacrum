import type { TypographyToken } from '../../tokens/typography'
import styles from './TypeSpecimen.module.css'

interface TypeSpecimenProps {
  token: TypographyToken
}

const WEIGHT_LABELS: Record<number, string> = {
  400: 'Regular',
  500: 'Medium',
  600: 'Semibold',
  700: 'Bold',
}

export default function TypeSpecimen({ token }: TypeSpecimenProps) {
  const textStyle: React.CSSProperties = {
    fontFamily: token.fontFamily,
    fontSize: `${token.fontSize}px`,
    fontWeight: token.fontWeight,
    lineHeight: token.lineHeight,
    letterSpacing: token.letterSpacing,
    textTransform: token.textTransform,
  }

  const weightLabel = WEIGHT_LABELS[token.fontWeight] ?? String(token.fontWeight)

  return (
    <div className={styles.specimen}>
      <div className={styles.meta}>
        <span className={styles.nameTag}>{token.name}</span>
        <span className={styles.specs}>
          {token.fontFamilyLabel}
          <span className={styles.sep}>·</span>
          {token.fontSize}px
          <span className={styles.sep}>·</span>
          {weightLabel}
          <span className={styles.sep}>·</span>
          lh {token.lineHeight}
          {token.letterSpacing !== '0' && (
            <>
              <span className={styles.sep}>·</span>
              {token.letterSpacing}
            </>
          )}
          {token.textTransform && (
            <>
              <span className={styles.sep}>·</span>
              {token.textTransform}
            </>
          )}
        </span>
        <code className={styles.varCode}>{token.variable}</code>
      </div>

      <div className={styles.sample} style={textStyle}>
        {token.sampleText.split('\n').map((line, i) => (
          <span key={i} className={styles.sampleLine}>{line}</span>
        ))}
      </div>

      <p className={styles.usage}>
        <span className={styles.usageLabel}>Uso</span>
        {token.usage}
      </p>
    </div>
  )
}

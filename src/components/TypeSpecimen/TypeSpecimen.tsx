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
  const weightLabel = WEIGHT_LABELS[token.fontWeight] ?? String(token.fontWeight)

  return (
    <div className={styles.specimen}>
      <div className={styles.header}>
        <div className={styles.nameRow}>
          <span className={`type-caption-sm ${styles.nameTag}`}>{token.name}</span>
          <code className={`type-caption-sm ${styles.classTag}`}>{token.className}</code>
        </div>
        <div className={`type-caption-sm ${styles.specs}`}>
          <span>{token.fontFamilyLabel}</span>
          <span className={styles.sep}>·</span>
          <span>{token.fontSize}px</span>
          <span className={styles.sep}>·</span>
          <span>{weightLabel}</span>
          <span className={styles.sep}>·</span>
          <span>lh {token.lineHeight}px</span>
        </div>
      </div>

      <div className={`${token.className} ${styles.sample}`}>
        {token.sampleText}
      </div>

      <div className={styles.footer}>
        <div className={styles.tokenSection}>
          {token.fixedTokens.length > 0 && (
            <div className={styles.tokenGroup}>
              <span className={`type-caption-xs ${styles.tokenGroupLabel}`}>Fixos</span>
              {token.fixedTokens.map((v) => (
                <code key={v} className={`type-caption-xs ${styles.tokenVar}`}>{v}</code>
              ))}
            </div>
          )}
          {token.contextualTokens.length > 0 && (
            <div className={styles.tokenGroup}>
              <span className={`type-caption-xs ${styles.tokenGroupLabel}`}>Contextuais</span>
              {token.contextualTokens.map((v) => (
                <code key={v} className={`type-caption-xs ${styles.tokenVarContextual}`}>{v}</code>
              ))}
            </div>
          )}
        </div>
        <p className={`type-caption-sm ${styles.usage}`}>{token.usage}</p>
      </div>
    </div>
  )
}

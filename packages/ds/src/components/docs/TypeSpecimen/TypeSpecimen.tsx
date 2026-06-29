import type { TypographyToken } from '../../../tokens/typography'
import DocBadge from '../DocBadge/DocBadge'
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
          <span className="type-title-sm">{token.name}</span>
          <span className={styles.dot}>•</span>
          <code className={`type-caption-md ${styles.classTag}`}>{token.className}</code>
        </div>
        <p className={`type-body-sm ${styles.usage}`}>{token.usage}</p>
      </div>

      <div className={styles.card}>
        <div className={`${token.className} ${styles.sample}`}>{token.sampleText}</div>

        <div className={styles.specsStrip}>
          <div className={styles.specItem}>
            <span className={`type-caption-xs ${styles.specLabel}`}>Família</span>
            <span className={`type-body-sm ${styles.specValue}`}>{token.fontFamilyLabel}</span>
          </div>
          <div className={styles.specItem}>
            <span className={`type-caption-xs ${styles.specLabel}`}>Tamanho</span>
            <span className={`type-body-sm ${styles.specValue}`}>{token.fontSize}px</span>
          </div>
          <div className={styles.specItem}>
            <span className={`type-caption-xs ${styles.specLabel}`}>Peso</span>
            <span className={`type-body-sm ${styles.specValue}`}>{weightLabel}</span>
          </div>
          <div className={styles.specItem}>
            <span className={`type-caption-xs ${styles.specLabel}`}>Alt. de linha</span>
            <span className={`type-body-sm ${styles.specValue}`}>{token.lineHeight}px</span>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.tokenSection}>
            {token.fixedTokens.length > 0 && (
              <div className={styles.tokenGroup}>
                <span className={`type-caption-sm ${styles.tokenGroupLabel}`}>Fixos</span>
                {token.fixedTokens.map((v) => (
                  <DocBadge key={v} variant="accent" className="type-caption-sm font-code">
                    {v}
                  </DocBadge>
                ))}
              </div>
            )}
            {token.contextualTokens.length > 0 && (
              <div className={styles.tokenGroup}>
                <span className={`type-caption-sm ${styles.tokenGroupLabel}`}>Contextuais</span>
                {token.contextualTokens.map((v) => (
                  <DocBadge key={v} className="type-caption-sm font-code">
                    {v}
                  </DocBadge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

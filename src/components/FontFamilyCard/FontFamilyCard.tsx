import type { FontFamilyDef } from '../../tokens/typography'
import styles from './FontFamilyCard.module.css'

interface FontFamilyCardProps {
  family: FontFamilyDef
}

export default function FontFamilyCard({ family }: FontFamilyCardProps) {
  const maxWeight = family.weights[family.weights.length - 1].value

  return (
    <div className={styles.card}>
      <div className={styles.showcase}>
        <div
          className={`type-display-xl ${styles.showcaseHeadline}`}
          style={{ fontFamily: family.cssFamily, fontWeight: maxWeight }}
        >
          {family.specimenText}
        </div>
        <div
          className={`type-body-sm ${styles.showcaseAlphabet}`}
          style={{ fontFamily: family.cssFamily, fontWeight: family.weights[0].value }}
        >
          Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll
          <br />
          Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <h3 className={`type-title-sm ${styles.familyName}`}>{family.name}</h3>
          <span className={`type-caption-sm ${styles.purposeBadge}`}>{family.purpose}</span>
        </div>
        <p className={`type-body-md ${styles.description}`}>{family.description}</p>
        <div className={styles.weightsPills}>
          {family.weights.map((w) => (
            <span key={w.value} className={`type-caption-sm ${styles.weightPill}`}>
              <span className={`type-caption-sm font-code ${styles.weightPillNum}`}>{w.value}</span>
              {w.label}
            </span>
          ))}
        </div>
        <div className={styles.cssRow}>
          <span className={`type-caption-sm ${styles.cssLabel}`}>CSS</span>
          <code className={`type-caption-sm font-code ${styles.cssVar}`}>{family.cssVariable}</code>
        </div>
      </div>
    </div>
  )
}

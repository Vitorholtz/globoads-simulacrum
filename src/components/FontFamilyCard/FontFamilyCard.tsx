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
          className={styles.showcaseHeadline}
          style={{ fontFamily: family.cssFamily, fontWeight: maxWeight }}
        >
          {family.specimenText}
        </div>
        <div
          className={styles.showcaseAlphabet}
          style={{ fontFamily: family.cssFamily, fontWeight: family.weights[0].value }}
        >
          Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll
          <br />
          Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <h3 className={styles.familyName}>{family.name}</h3>
          <span className={styles.purposeBadge}>{family.purpose}</span>
        </div>
        <p className={styles.description}>{family.description}</p>
        <div className={styles.weightsPills}>
          {family.weights.map((w) => (
            <span key={w.value} className={styles.weightPill}>
              <span className={styles.weightPillNum}>{w.value}</span>
              {w.label}
            </span>
          ))}
        </div>
        <div className={styles.cssRow}>
          <span className={styles.cssLabel}>CSS</span>
          <code className={styles.cssVar}>{family.cssVariable}</code>
        </div>
      </div>
    </div>
  )
}

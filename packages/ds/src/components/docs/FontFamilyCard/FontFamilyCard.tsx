import type { FontFamilyDef } from '../../../tokens/typography'
import DocBadge from '../DocBadge/DocBadge'
import styles from './FontFamilyCard.module.css'

interface FontFamilyCardProps {
  family: FontFamilyDef
}

export default function FontFamilyCard({ family }: FontFamilyCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.showcase}>
        <div className={`${family.specimenClassName} ${styles.showcaseHeadline}`}>
          {family.specimenText}
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <h3 className={`type-title-sm ${styles.familyName}`}>{family.name}</h3>
          <DocBadge className="type-caption-sm">{family.purpose}</DocBadge>
        </div>
        <p className={`type-body-md ${styles.description}`}>{family.description}</p>
        <div className={styles.weightsPills}>
          {family.weights.map((w) => (
            <DocBadge key={w.value} size="md" className={`type-caption-sm ${styles.weightPill}`}>
              <span className={`type-caption-sm font-code ${styles.weightPillNum}`}>{w.value}</span>
              {w.label}
            </DocBadge>
          ))}
        </div>
        <div className={styles.cssRow}>
          <span className={`type-caption-sm ${styles.cssLabel}`}>Token</span>
          <DocBadge variant="accent" className="type-caption-sm font-code">
            {family.cssVariable}
          </DocBadge>
        </div>
      </div>
    </div>
  )
}

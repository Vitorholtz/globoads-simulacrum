import type { GuidelineDef } from '../../tokens/types'
import { cx } from '../../utils/cx'
import styles from './GuidelinesGrid.module.css'

interface GuidelinesGridProps {
  items: GuidelineDef[]
  className?: string
}

/**
 * Two-column grid of guideline cards (title · body · rule).
 * Replaces the `guidelinesGrid` + `guidelineCard` markup duplicated
 * across every documentation page. Pair with `<Section icon="checklist">`.
 */
export default function GuidelinesGrid({ items, className }: GuidelinesGridProps) {
  const cls = cx(styles.guidelinesGrid, className ?? '')

  return (
    <div className={cls}>
      {items.map((g) => (
        <div key={g.title} className={styles.guidelineCard}>
          <h3 className={`type-body-md ${styles.guidelineTitle}`}>{g.title}</h3>
          <p className={`type-body-sm ${styles.guidelineBody}`}>{g.body}</p>
          <div className={`type-caption-sm ${styles.guidelineRule}`}>{g.rule}</div>
        </div>
      ))}
    </div>
  )
}

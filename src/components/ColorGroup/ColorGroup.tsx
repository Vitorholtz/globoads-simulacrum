import type { ColorGroup as ColorGroupType } from '../../tokens/colors'
import ColorSwatch from '../ColorSwatch/ColorSwatch'
import styles from './ColorGroup.module.css'

interface ColorGroupProps {
  group: ColorGroupType
  icon?: string
}

export default function ColorGroup({ group, icon }: ColorGroupProps) {
  return (
    <section className={styles.group}>
      <div className={styles.header}>
        {icon && (
          <span className={`material-symbols-rounded icon-md icon-filled ${styles.headerIcon}`}>
            {icon}
          </span>
        )}
        <h2 className={`type-title-md ${styles.title}`}>{group.label}</h2>
        <span className={`type-caption-sm ${styles.count}`}>{group.tokens.length}</span>
      </div>
      {group.description && (
        <p className={`type-body-sm ${styles.description}`}>{group.description}</p>
      )}
      <div className={styles.grid}>
        {group.tokens.map((token) => (
          <ColorSwatch key={token.variable} token={token} />
        ))}
      </div>
    </section>
  )
}

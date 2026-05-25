import type { ColorGroup as ColorGroupType } from '../../tokens/colors'
import ColorSwatch from '../ColorSwatch/ColorSwatch'
import styles from './ColorGroup.module.css'

interface ColorGroupProps {
  group: ColorGroupType
  icon?: string
}

const FVAR = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20"

export default function ColorGroup({ group, icon }: ColorGroupProps) {
  return (
    <section className={styles.group}>
      <div className={styles.header}>
        {icon && (
          <span
            className={`material-symbols-rounded ${styles.headerIcon}`}
            style={{ fontVariationSettings: FVAR }}
          >
            {icon}
          </span>
        )}
        <h2 className={styles.title}>{group.label}</h2>
        <span className={styles.count}>{group.tokens.length} tokens</span>
      </div>
      <div className={styles.grid}>
        {group.tokens.map((token) => (
          <ColorSwatch key={token.variable} token={token} />
        ))}
      </div>
    </section>
  )
}

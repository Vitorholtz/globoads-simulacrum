import Avatar from '../Avatar/Avatar'
import styles from './AvatarGroup.module.css'
import type { AvatarSize, AvatarVariant } from '../../tokens/avatar'
import { cx } from '../../utils/cx'

export interface AvatarItem {
  name?: string
  src?: string
  variant?: AvatarVariant
}

export interface AvatarGroupProps {
  items: AvatarItem[]
  label?: string
  size?: AvatarSize
  className?: string
}

export default function AvatarGroup({ items, label, size = 'xs', className }: AvatarGroupProps) {
  return (
    <div className={cx(styles.group, className ?? '')}>
      <div className={styles.avatars}>
        {items.map((item, i) => {
          const variant: AvatarVariant =
            item.variant ?? (item.src ? 'photo' : item.name ? 'initial' : 'placeholder')
          return (
            <Avatar
              key={i}
              size={size}
              variant={variant}
              name={item.name}
              src={item.src}
              className={i < items.length - 1 ? styles.overlap : ''}
            />
          )
        })}
      </div>
      {label && <span className={`type-body-md ${styles.label}`}>{label}</span>}
    </div>
  )
}

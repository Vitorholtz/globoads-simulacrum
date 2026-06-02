import { cx } from '../../utils/cx'
import styles from './Avatar.module.css'
import type { AvatarSize, AvatarVariant } from '../../tokens/avatar'

export type { AvatarSize, AvatarVariant }

export interface AvatarProps {
  size?: AvatarSize
  variant?: AvatarVariant
  name?: string
  /** Photo URL — only used when variant="photo" */
  src?: string
  /** Alt text for the photo image; defaults to `name` when omitted */
  alt?: string
  className?: string
}

const INITIALS_TYPE: Record<AvatarSize, string> = {
  xs: 'type-caption-sm',
  sm: 'type-caption-md',
  md: 'type-caption-lg',
  lg: 'type-title-lg',
  xl: 'type-title-lg',
}

function getInitials(name: string, singleChar: boolean): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (singleChar || parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

export default function Avatar({
  size = 'md',
  variant = 'initial',
  name = '',
  src,
  alt,
  className,
}: AvatarProps) {
  const initials = getInitials(name, size === 'xs')

  const cls = cx(styles.avatar, styles[size], className ?? '')

  return (
    <div className={cls}>
      {variant === 'photo' && src ? (
        <img src={src} alt={alt ?? name} className={styles.photo} />
      ) : variant === 'placeholder' ? (
        <img src="/avatar-image.png" alt="" className={styles.photo} aria-hidden="true" />
      ) : (
        <span className={`${INITIALS_TYPE[size]} ${styles.initials}`} aria-hidden="true">
          {initials}
        </span>
      )}
    </div>
  )
}

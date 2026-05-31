import type { SkeletonType, SkeletonSize } from '../../tokens/skeleton'
import { cx } from '../../utils/cx'
import styles from './Skeleton.module.css'

export type { SkeletonType, SkeletonSize }

interface SkeletonProps {
  type: SkeletonType
  size?: SkeletonSize
  width?: string | number
  height?: string | number
  className?: string
}

const BUTTON_H: Partial<Record<SkeletonSize, number>> = { sm: 32, md: 40, lg: 48 }
const INPUT_H: Partial<Record<SkeletonSize, number>> = { sm: 32, md: 40, lg: 48 }
const AVATAR_SZ: Partial<Record<SkeletonSize, number>> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80 }
const BODY_H: Partial<Record<SkeletonSize, number>> = { xs: 16, sm: 20, md: 24, lg: 28 }
const TITLE_H: Partial<Record<SkeletonSize, number>> = { sm: 20, md: 24, lg: 32 }
const CAPTION_H: Partial<Record<SkeletonSize, number>> = { sm: 14, md: 16, lg: 20 }
const DISPLAY_H: Partial<Record<SkeletonSize, number>> = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  '2xl': 80,
  '3xl': 96,
}

const DEFAULT_SIZE: Record<SkeletonType, SkeletonSize> = {
  button: 'md',
  input: 'md',
  avatar: 'md',
  body: 'md',
  title: 'md',
  caption: 'md',
  display: 'md',
  card: 'md',
}

function toCSS(v: string | number): string {
  return typeof v === 'number' ? `${v}px` : v
}

export default function Skeleton({ type, size, width, height, className }: SkeletonProps) {
  const resolvedSize = size ?? DEFAULT_SIZE[type]
  const w = width !== undefined ? toCSS(width) : '100%'

  if (type === 'avatar') {
    const sz = AVATAR_SZ[resolvedSize] ?? 40
    return (
      <span
        className={cx(styles.bone, styles.circle, className)}
        style={{ width: sz, height: sz }}
        aria-hidden="true"
      />
    )
  }

  if (type === 'button') {
    const h = BUTTON_H[resolvedSize] ?? 40
    return (
      <span
        className={cx(styles.bone, styles.rounded, className)}
        style={{ height: h, width: w }}
        aria-hidden="true"
      />
    )
  }

  if (type === 'input') {
    const h = INPUT_H[resolvedSize] ?? 40
    return (
      <span className={cx(styles.inputWrapper, className)} style={{ width: w }} aria-hidden="true">
        <span className={[styles.bone, styles.pill, styles.inputLabel].join(' ')} />
        <span
          className={[styles.bone, styles.rounded, styles.inputBox].join(' ')}
          style={{ height: h }}
        />
      </span>
    )
  }

  if (type === 'card') {
    const h = height !== undefined ? toCSS(height) : '120px'
    return (
      <span
        className={cx(styles.bone, styles.card, className)}
        style={{ width: w, height: h }}
        aria-hidden="true"
      />
    )
  }

  const TEXT_HEIGHT_MAP = { body: BODY_H, title: TITLE_H, caption: CAPTION_H, display: DISPLAY_H }
  const h = TEXT_HEIGHT_MAP[type as keyof typeof TEXT_HEIGHT_MAP]?.[resolvedSize] ?? 24

  return (
    <span
      className={cx(styles.bone, styles.pill, className)}
      style={{ height: h, width: w }}
      aria-hidden="true"
    />
  )
}

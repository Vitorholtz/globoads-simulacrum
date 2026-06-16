import { useState, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import ThumbFrame from '../ThumbFrame/ThumbFrame'
import { formatDuration } from '../ThumbFrame/duration'
import styles from '../ThumbFrame/ThumbFrame.module.css'
import type { StaticThumbType } from '../../tokens/staticThumb'

export type { StaticThumbType }

export interface StaticThumbProps {
  type?: StaticThumbType
  /** URL da imagem (type="image") ou do vídeo (type="video"). */
  src: string
  /** Texto alternativo da imagem. */
  alt?: string
  /** Duração exibida no thumb de vídeo (ex.: "1:40"). Quando ausente, é derivada do vídeo. */
  duration?: string
  /** Frame de capa opcional para o thumb de vídeo. */
  poster?: string
  /** Conteúdo opcional no canto inferior direito (ex.: badge de formato). */
  badge?: ReactNode
  className?: string
}

/**
 * Miniatura estática (sem interação) para apresentar e identificar um asset visual.
 *
 * Compartilha a mesma moldura do Interactive Thumb via {@link ThumbFrame}, mas
 * sem nenhuma interação: imagem exibe só o preview (sem lupa, sem hover, sem
 * modal); vídeo exibe o preview com a duração no canto inferior esquerdo (sem
 * play, sem hover, sem modal).
 */
export default function StaticThumb({
  type = 'image',
  src,
  alt = '',
  duration,
  poster,
  badge,
  className,
}: StaticThumbProps) {
  const [derivedDuration, setDerivedDuration] = useState<string | null>(null)

  const isVideo = type === 'video'
  const shownDuration = duration ?? derivedDuration ?? ''

  function handleVideoMetadata(e: React.SyntheticEvent<HTMLVideoElement>) {
    if (duration) return
    const secs = e.currentTarget.duration
    if (Number.isFinite(secs)) setDerivedDuration(formatDuration(secs))
  }

  // Vídeo mantém a duração no chip; imagem não tem chip nenhum.
  const chip =
    isVideo && shownDuration ? (
      <span className={cx(styles.details, styles.chip)}>
        <span className={cx('type-caption-sm', styles.duration)}>{shownDuration}</span>
      </span>
    ) : undefined

  return (
    <ThumbFrame
      type={type}
      src={src}
      alt={alt}
      poster={poster}
      onVideoMetadata={isVideo ? handleVideoMetadata : undefined}
      chip={chip}
      badge={badge}
      className={className}
    />
  )
}

import { useState, type ReactNode } from 'react'
import { cx } from '../../utils/cx'
import ThumbFrame from '../ThumbFrame/ThumbFrame'
import { formatDuration } from '../ThumbFrame/duration'
import styles from '../ThumbFrame/ThumbFrame.module.css'
import InteractiveThumbModal from './InteractiveThumbModal'
import type { InteractiveThumbType } from '../../tokens/interactiveThumb'

export type { InteractiveThumbType }

export interface InteractiveThumbProps {
  type?: InteractiveThumbType
  /** URL da imagem (type="image") ou do vídeo (type="video"). */
  src: string
  /** Texto alternativo da imagem; também compõe o nome acessível do botão. */
  alt?: string
  /** Duração exibida no thumb de vídeo (ex.: "1:40"). Quando ausente, é derivada do vídeo. */
  duration?: string
  /** Frame de capa opcional para o thumb de vídeo. */
  poster?: string
  /** Conteúdo opcional no canto inferior direito (ex.: badge de formato). */
  badge?: ReactNode
  /** Força um estado visual — apenas para documentação/showcase. */
  forceState?: 'hover' | 'focus' | 'active'
  className?: string
}

const ICON: Record<InteractiveThumbType, string> = {
  image: 'zoom_in',
  video: 'play_arrow',
}

/**
 * Miniatura interativa para apresentar um asset visual (imagem ou vídeo) e abrir
 * sua visualização ampliada.
 *
 * Compartilha a moldura (caixa, mídia, chip) com o Static Thumb via {@link ThumbFrame};
 * adiciona aqui a interação: chip discreto no repouso (lupa/play + duração), backdrop
 * com ícone centralizado no hover/foco/pressionado e um modal (imagem ampliada ou
 * player de vídeo) ao clicar.
 */
export default function InteractiveThumb({
  type = 'image',
  src,
  alt = '',
  duration,
  poster,
  badge,
  forceState,
  className,
}: InteractiveThumbProps) {
  const [open, setOpen] = useState(false)
  const [derivedDuration, setDerivedDuration] = useState<string | null>(null)

  const isVideo = type === 'video'
  const icon = ICON[type]
  const action = isVideo ? 'Reproduzir vídeo' : 'Ampliar imagem'
  const ariaLabel = alt ? `${action}: ${alt}` : action
  const shownDuration = duration ?? derivedDuration ?? ''

  function handleVideoMetadata(e: React.SyntheticEvent<HTMLVideoElement>) {
    if (duration) return
    const secs = e.currentTarget.duration
    if (Number.isFinite(secs)) setDerivedDuration(formatDuration(secs))
  }

  const chip = (
    <span className={cx(styles.details, styles.chip)}>
      <span className={cx('material-symbols-rounded', 'icon-sm', styles.icon)} aria-hidden="true">
        {icon}
      </span>
      {isVideo && shownDuration && (
        <span className={cx('type-caption-sm', styles.duration)}>{shownDuration}</span>
      )}
    </span>
  )

  const overlay = (
    <span className={cx(styles.details, styles.backdrop)} aria-hidden="true">
      <span className={cx('material-symbols-rounded', 'icon-lg', styles.icon)}>{icon}</span>
    </span>
  )

  return (
    <>
      <ThumbFrame
        interactive
        type={type}
        src={src}
        alt={alt}
        poster={poster}
        forceState={forceState}
        ariaLabel={ariaLabel}
        onActivate={() => setOpen(true)}
        onVideoMetadata={handleVideoMetadata}
        chip={chip}
        badge={badge}
        overlay={overlay}
        className={className}
      />

      <InteractiveThumbModal
        open={open}
        type={type}
        src={src}
        alt={alt}
        poster={poster}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

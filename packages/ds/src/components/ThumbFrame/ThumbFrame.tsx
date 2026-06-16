import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './ThumbFrame.module.css'

export type ThumbType = 'image' | 'video'

export interface ThumbFrameProps {
  type: ThumbType
  /** URL da imagem (type="image") ou do vídeo (type="video"). */
  src: string
  /** Texto alternativo da imagem. */
  alt?: string
  /** Frame de capa opcional para vídeos. */
  poster?: string
  /** Dispara quando o vídeo carrega metadados (para derivar a duração). */
  onVideoMetadata?: (e: React.SyntheticEvent<HTMLVideoElement>) => void
  /** Chip do canto inferior esquerdo (lupa/play/duração). */
  chip?: ReactNode
  /** Slot genérico no canto inferior direito (ex.: badge de formato). */
  badge?: ReactNode
  /** Overlay central (backdrop dos estados interativos). */
  overlay?: ReactNode
  /**
   * Torna a moldura interativa: vira `<button>`, ativa hover/foco/pressionado e
   * o cursor. Sem isso, renderiza um `<div>` puramente apresentacional.
   */
  interactive?: boolean
  /** Acionado no clique/Enter/Espaço — só quando `interactive`. */
  onActivate?: () => void
  /** Nome acessível do botão — só quando `interactive`. */
  ariaLabel?: string
  /** Força um estado visual — apenas para documentação/showcase. */
  forceState?: 'hover' | 'focus' | 'active'
  className?: string
}

/**
 * Moldura compartilhada das miniaturas (Interactive Thumb e Static Thumb).
 *
 * Centraliza a estrutura visual — caixa dimensionada por tipo/tamanho, borda,
 * raio e a mídia (imagem ou frame de vídeo) — além dos slots de `chip` (canto
 * inferior esquerdo) e `overlay` (centralizado). Os estados de hover/foco só
 * existem quando `interactive`, mantendo a versão estática sem qualquer interação.
 */
export default function ThumbFrame({
  type,
  src,
  alt = '',
  poster,
  onVideoMetadata,
  chip,
  badge,
  overlay,
  interactive = false,
  onActivate,
  ariaLabel,
  forceState,
  className,
}: ThumbFrameProps) {
  const media = (
    <span className={styles.media}>
      {type === 'video' ? (
        <video
          className={styles.mediaEl}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
          onLoadedMetadata={onVideoMetadata}
        />
      ) : (
        <img className={styles.mediaEl} src={src} alt={alt} />
      )}
    </span>
  )

  const badgeSlot = badge && <span className={cx(styles.details, styles.badge)}>{badge}</span>

  const cls = cx(styles.thumb, styles[type], interactive ? styles.interactive : '', className ?? '')

  if (interactive) {
    return (
      <button
        type="button"
        className={cls}
        data-force-state={forceState}
        onClick={onActivate}
        aria-haspopup="dialog"
        aria-label={ariaLabel}
      >
        {media}
        {chip}
        {badgeSlot}
        {overlay}
      </button>
    )
  }

  return (
    <div className={cls}>
      {media}
      {chip}
      {badgeSlot}
    </div>
  )
}

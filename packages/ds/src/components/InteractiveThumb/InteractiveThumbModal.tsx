import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from '../Button/Button'
import { cx } from '../../utils/cx'
import styles from './InteractiveThumbModal.module.css'
import type { InteractiveThumbType } from '../../tokens/interactiveThumb'

export interface InteractiveThumbModalProps {
  open: boolean
  type: InteractiveThumbType
  src: string
  alt?: string
  poster?: string
  onClose: () => void
}

/**
 * Lightbox do {@link InteractiveThumb}: imagem ampliada ou player de vídeo.
 *
 * Espelha a receita de overlay do `CreativeDrawer` — createPortal + scrim +
 * animação de entrada/saída com `leaving`/`onAnimationEnd` — somada à trava de
 * scroll do body e à gestão de foco (foca o botão fechar, escuta Escape e
 * restaura o foco ao sair).
 */
export default function InteractiveThumbModal({
  open,
  type,
  src,
  alt = '',
  poster,
  onClose,
}: InteractiveThumbModalProps) {
  const [render, setRender] = useState(open)
  const [leaving, setLeaving] = useState(false)
  const [prevOpen, setPrevOpen] = useState(open)
  const panelRef = useRef<HTMLDivElement>(null)

  // Sincroniza estado com a prop durante o render (sem effects), igual ao drawer.
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setRender(true)
      setLeaving(false)
    } else if (render) {
      setLeaving(true)
    }
  }

  // Trava o scroll do fundo enquanto o modal está montado, compensando a scrollbar.
  useEffect(() => {
    if (!render) return
    const { body } = document
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      const current = parseFloat(getComputedStyle(body).paddingRight) || 0
      body.style.paddingRight = `${current + scrollbarWidth}px`
    }
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
    }
  }, [render])

  // Foca o botão de fechar ao abrir, escuta Escape e restaura o foco ao sair.
  useEffect(() => {
    if (!render || leaving) return
    const previousFocus = document.activeElement as HTMLElement | null
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLButtonElement>(`.${styles.closeBtn}`)?.focus()
    })
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus?.()
    }
  }, [render, leaving, onClose])

  if (!render) return null

  return createPortal(
    <div className={styles.overlay}>
      <div
        className={cx(styles.scrim, leaving ? styles.scrimLeaving : '')}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={cx(styles.panel, leaving ? styles.panelLeaving : '')}
        role="dialog"
        aria-modal="true"
        aria-label={type === 'video' ? 'Reprodução do vídeo' : 'Visualização da imagem'}
        onAnimationEnd={() => {
          if (leaving) {
            setLeaving(false)
            setRender(false)
          }
        }}
      >
        <Button
          type="button"
          variant="tertiary"
          size="md"
          iconLeft="close"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fechar"
        />

        {type === 'video' ? (
          <video className={styles.media} src={src} poster={poster} controls autoPlay />
        ) : (
          <img className={styles.media} src={src} alt={alt} />
        )}
      </div>
    </div>,
    document.body
  )
}

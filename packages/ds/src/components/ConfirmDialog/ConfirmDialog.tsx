import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from '../Button/Button'
import { cx } from '../../utils/cx'
import styles from './ConfirmDialog.module.css'

export interface ConfirmDialogProps {
  open: boolean
  title: string
  description?: string
  /** Rótulo do botão de confirmação (default "Confirmar"). */
  confirmLabel?: string
  /** Rótulo do botão de cancelamento (default "Cancelar"). */
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

/**
 * Dialog de confirmação — overlay centralizado para ações que exigem validação
 * explícita do usuário, especialmente destrutivas.
 *
 * Segue o padrão de overlay do DS (createPortal + scrim + animação de
 * entrada/saída + trava de scroll + gestão de foco + Escape).
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [render, setRender] = useState(open)
  const [leaving, setLeaving] = useState(false)
  const [prevOpen, setPrevOpen] = useState(open)
  const panelRef = useRef<HTMLDivElement>(null)

  // Congela title/description durante a saída — o pai pode zerá-los ao fechar,
  // o que faria o conteúdo desaparecer antes da animação terminar.
  const [shownTitle, setShownTitle] = useState(title)
  const [shownDescription, setShownDescription] = useState(description)
  if (title !== shownTitle && !leaving) setShownTitle(title)
  if (description !== shownDescription && description !== undefined && !leaving)
    setShownDescription(description)

  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setRender(true)
      setLeaving(false)
    } else if (render) {
      setLeaving(true)
    }
  }

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

  useEffect(() => {
    if (!render || leaving) return
    const previousFocus = document.activeElement as HTMLElement | null
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLButtonElement>(`.${styles.cancelBtn}`)?.focus()
    })
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus?.()
    }
  }, [render, leaving, onCancel])

  if (!render) return null

  return createPortal(
    <div className={styles.overlay}>
      <div
        className={cx(styles.scrim, leaving ? styles.scrimLeaving : '')}
        onClick={onCancel}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={cx(styles.panel, leaving ? styles.panelLeaving : '')}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onAnimationEnd={() => {
          if (leaving) {
            setLeaving(false)
            setRender(false)
          }
        }}
      >
        <div className={styles.header}>
          <h2 id="confirm-dialog-title" className={cx('type-title-md', styles.title)}>
            {shownTitle}
          </h2>
          <Button
            type="button"
            variant="tertiary"
            size="md"
            iconLeft="close"
            onClick={onCancel}
            aria-label="Fechar"
          />
        </div>

        {shownDescription && (
          <p className={cx('type-body-md', styles.description)}>{shownDescription}</p>
        )}

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button type="button" variant="primary" size="md" danger onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

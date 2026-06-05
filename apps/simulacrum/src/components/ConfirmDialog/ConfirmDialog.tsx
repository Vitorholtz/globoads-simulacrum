import { useEffect, useRef } from 'react'
import { Button } from '@globo-ads/ds'
import styles from './ConfirmDialog.module.css'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirmar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [isOpen])

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) onCancel()
  }

  return (
    <dialog ref={ref} className={styles.dialog} onClose={onCancel} onClick={handleBackdropClick}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={`type-title-md ${styles.title}`}>{title}</h2>
          <Button
            variant="tertiary"
            size="md"
            iconLeft="close"
            onClick={onCancel}
            aria-label="Fechar"
          />
        </div>

        <p className={`type-body-md ${styles.description}`}>{description}</p>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="primary" danger onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}

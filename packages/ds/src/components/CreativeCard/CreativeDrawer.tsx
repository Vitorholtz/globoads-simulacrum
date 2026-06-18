import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Tabs from '../Tabs/Tabs'
import Button from '../Button/Button'
import InfoPanel from '../InfoPanel/InfoPanel'
import CreativeAssetDetails from './CreativeAssetDetails'
import CreativeValidationSteps from './CreativeValidationSteps'
import { cx } from '../../utils/cx'
import styles from './CreativeDrawer.module.css'
import type { Creative } from './types'

const TABS = [
  { id: 'detalhes', label: 'Detalhes' },
  { id: 'validacao', label: 'Etapas de validação' },
]

export interface CreativeDrawerProps {
  /** Criativo exibido; pode ser null enquanto o drawer está fechado. */
  creative: Creative | null
  open: boolean
  /** Aba aberta ao montar o drawer (default `detalhes`). */
  initialTab?: string
  onClose: () => void
  /** Solicita a exclusão do criativo exibido. */
  onDelete?: () => void
}

/**
 * Drawer lateral de "Ver detalhes do criativo".
 *
 * Parte da família Creative Card (Business Component). Espelha o padrão de overlay
 * dos pickers do DS — createPortal + scrim + animação de entrada/saída com
 * `leaving`/`onAnimationEnd` — adicionando trava de scroll e gestão de foco.
 */
export default function CreativeDrawer({
  creative,
  open,
  initialTab = 'detalhes',
  onClose,
  onDelete,
}: CreativeDrawerProps) {
  const [render, setRender] = useState(open)
  const [leaving, setLeaving] = useState(false)
  const [activeTab, setActiveTab] = useState(initialTab)
  // Mantém o último criativo durante a animação de saída (parent zera ao fechar).
  const [shown, setShown] = useState<Creative | null>(creative)
  const [prevOpen, setPrevOpen] = useState(open)
  const panelRef = useRef<HTMLElement>(null)

  // Sincroniza estado com as props ajustando durante o render (sem effects):
  // o linter proíbe setState síncrono em useEffect.
  if (creative && creative !== shown) setShown(creative)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setRender(true)
      setLeaving(false)
      setActiveTab(initialTab)
    } else if (render) {
      setLeaving(true)
    }
  }

  // Trava o scroll do fundo enquanto o drawer está montado. Compensa a largura
  // da scrollbar com padding-right para o conteúdo não "pular" ao abrir/fechar.
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

  if (!render || !shown) return null

  return createPortal(
    <div className={styles.overlay}>
      <div
        className={cx(styles.scrim, leaving ? styles.scrimLeaving : '')}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        ref={panelRef}
        className={cx(styles.panel, leaving ? styles.panelLeaving : '')}
        role="dialog"
        aria-modal="true"
        aria-label="Informações do criativo"
        onAnimationEnd={() => {
          if (leaving) {
            setLeaving(false)
            setRender(false)
          }
        }}
      >
        <header className={styles.header}>
          <div className={styles.headerText}>
            <span className={cx('type-caption-sm', styles.breadcrumb)}>Galeria de criativos</span>
            <h2 className={cx('type-title-md', styles.title)}>Informações do criativo</h2>
          </div>
          <Button
            type="button"
            variant="tertiary"
            size="md"
            iconLeft="close"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fechar"
          />
        </header>

        <Tabs items={TABS} activeId={activeTab} onChange={setActiveTab} className={styles.tabs} />

        <div className={styles.body}>
          {activeTab === 'detalhes' && (
            <CreativeAssetDetails
              key={shown.id}
              creative={shown}
              onViewValidation={() => setActiveTab('validacao')}
            />
          )}

          {activeTab === 'validacao' &&
            (shown.validation?.length ? (
              <CreativeValidationSteps steps={shown.validation} />
            ) : (
              <InfoPanel
                type="neutral"
                title="Sem etapas de validação"
                description="Este criativo ainda não tem etapas de validação registradas."
              />
            ))}
        </div>

        <footer className={styles.footer}>
          <Button
            type="button"
            variant="secondary"
            size="md"
            danger
            iconLeft="delete"
            className={styles.deleteBtn}
            onClick={onDelete}
          >
            Excluir criativo da galeria
          </Button>
        </footer>
      </aside>
    </div>,
    document.body
  )
}

import { useState, type ReactNode } from 'react'
import { Button, Tooltip } from '@globo-ads/ds'
import styles from './ExpandablePurchaseCard.module.css'

/** Texto secundário da linha de meta do header (acompanha badges via prop `meta`). */
export function MetaText({ children }: { children: ReactNode }) {
  return <span className={`type-caption-sm ${styles.expandableMetaText}`}>{children}</span>
}

interface ExpandablePurchaseCardProps {
  /** Ícone Material Symbols exibido no header. */
  icon: string
  /** Título do card (nome do produto). */
  name: string
  /** Conteúdo da linha de meta (badges, textos auxiliares). */
  meta: ReactNode
  /** Valor total já formatado (ex.: "R$ 1.200,00"). */
  total: string
  /** Conteúdo do recibo (invoice) — renderizado dentro do container `.receipt`. */
  receipt: ReactNode
  /** Accordion de formatos (opcional). */
  formats?: ReactNode
  defaultOpen?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export default function ExpandablePurchaseCard({
  icon,
  name,
  meta,
  total,
  receipt,
  formats,
  defaultOpen = false,
  onEdit,
  onDelete,
}: ExpandablePurchaseCardProps) {
  const [expanded, setExpanded] = useState(defaultOpen)

  return (
    <div className={styles.expandableCard}>
      <button
        type="button"
        className={styles.expandableCardHeader}
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <div className={styles.expandableCardLeft}>
          <div className={styles.expandableIconWrap}>
            <span
              className={`material-symbols-rounded icon-lg ${styles.expandableIcon}`}
              aria-hidden="true"
            >
              {icon}
            </span>
          </div>
          <div className={styles.expandableCardInfo}>
            <span className={`type-body-sm ${styles.expandableName}`}>{name}</span>
            <div className={styles.expandableCardMeta}>{meta}</div>
          </div>
        </div>
        <div className={styles.expandableCardRight}>
          <span className={`type-title-sm ${styles.expandableTotalValue}`}>{total}</span>
          <span
            className={`material-symbols-rounded icon-md ${styles.expandableChevron} ${expanded ? styles.chevronOpen : ''}`}
            aria-hidden="true"
          >
            expand_more
          </span>
        </div>
      </button>
      <div
        className={`${styles.expandableCardBody} ${expanded ? styles.expandableCardBodyOpen : ''}`}
      >
        <div className={styles.expandableCardBodyInner}>
          <div className={styles.expandableCardBodyPad}>
            <div className={styles.receipt}>{receipt}</div>
            {formats && <div className={styles.accordionWrap}>{formats}</div>}
            {(onEdit || onDelete) && (
              <div className={styles.expandableCardActions}>
                {onEdit && (
                  <Tooltip text="Editar compra" position="left">
                    <Button
                      variant="tertiary"
                      size="md"
                      iconLeft="edit"
                      onClick={onEdit}
                      aria-label="Editar compra"
                    />
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip text="Excluir compra" position="left">
                    <Button
                      variant="tertiary"
                      size="md"
                      iconLeft="delete"
                      danger
                      onClick={onDelete}
                      aria-label="Excluir compra"
                    />
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

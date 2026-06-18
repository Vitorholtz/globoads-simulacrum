import { useState, useRef, useEffect } from 'react'
import Button from '../Button/Button'
import { cx } from '../../utils/cx'
import styles from './OptionsMenu.module.css'

export interface OptionsMenuItem {
  /** Nome do Material Symbol exibido à esquerda do rótulo. */
  icon: string
  label: string
  onSelect?: () => void
  /** Aplica a cor crítica — para ações destrutivas como excluir. */
  danger?: boolean
}

export interface OptionsMenuProps {
  items?: OptionsMenuItem[]
  /** Ação do item "Ver detalhes" (injetada nos itens padrão). */
  onViewDetails?: () => void
  /** Ação do item "Baixar criativo" (injetada nos itens padrão). */
  onDownload?: () => void
  /** Ação do item "Excluir criativo" (injetada nos itens padrão). */
  onDelete?: () => void
  /** Rótulo acessível do botão de opções. */
  triggerLabel?: string
  /** Classe aplicada ao botão de opções (trigger). */
  triggerClassName?: string
  className?: string
}

/**
 * Menu flutuante de ações para o botão de opções dos cards de criativo.
 *
 * Parte da família Creative Card (Business Component). Abre ao clicar no botão
 * `more_vert`, fecha ao clicar fora ou pressionar Escape. Cada item dispara o
 * callback correspondente (`onViewDetails`/`onDownload`/`onDelete`).
 */
export default function OptionsMenu({
  items,
  onViewDetails,
  onDownload,
  onDelete,
  triggerLabel = 'Mais opções',
  triggerClassName,
  className,
}: OptionsMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const menuItems: OptionsMenuItem[] = items ?? [
    { icon: 'visibility', label: 'Ver detalhes', onSelect: onViewDetails },
    { icon: 'download', label: 'Baixar criativo', onSelect: onDownload },
    { icon: 'delete', label: 'Excluir criativo', danger: true, onSelect: onDelete },
  ]

  useEffect(() => {
    if (!open) return
    function onOutsideClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [open])

  function focusTrigger() {
    rootRef.current?.querySelector<HTMLButtonElement>(`.${styles.trigger}`)?.focus()
  }

  function handleSelect(item: OptionsMenuItem) {
    item.onSelect?.()
    setOpen(false)
    focusTrigger()
  }

  return (
    <div
      className={cx(styles.root, className ?? '')}
      ref={rootRef}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false)
          focusTrigger()
        }
      }}
    >
      <Button
        type="button"
        variant="tertiary"
        size="sm"
        iconLeft="more_vert"
        className={cx(styles.trigger, triggerClassName ?? '')}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        aria-label={triggerLabel}
        aria-haspopup="menu"
        aria-expanded={open}
      />

      <div
        className={cx(styles.menu, open ? styles.menuOpen : '')}
        role="menu"
        aria-label={triggerLabel}
      >
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            role="menuitem"
            className={cx(styles.item, item.danger ? styles.danger : '')}
            tabIndex={open ? 0 : -1}
            onClick={(e) => {
              e.stopPropagation()
              handleSelect(item)
            }}
          >
            <span
              className={cx('material-symbols-rounded', 'icon-md', styles.itemIcon)}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span className={cx('type-caption-md', styles.itemLabel)}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

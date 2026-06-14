import { useState } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import Badge from '../../components/Badge/Badge'
import OptionsMenu from './OptionsMenu'
import { cx } from '../../utils/cx'
import styles from './CreativeStatusCard.module.css'
import type { BadgeVariant } from '../../tokens/badge'

export interface CreativeStatusCardProps {
  /** Nome do criativo — truncado em uma linha quando excede o espaço. */
  name?: string
  /** Imagem de preview do criativo. */
  imageSrc?: string
  /** Formato exibido no badge sobre o preview. */
  format?: string
  /** Tag de categoria opcional, exibida com ícone no rodapé. */
  tag?: string
  /** Texto do status do criativo. */
  status?: string
  /** Variante semântica do badge de status. */
  statusVariant?: BadgeVariant
  /** Estado inicial de seleção (não controlado). */
  defaultSelected?: boolean
  /** Abre o drawer de detalhes a partir do menu de opções. */
  onViewDetails?: () => void
  className?: string
}

/**
 * Card de galeria de criativos focado em status.
 *
 * Componente de produto em incubação no Playground. Mantém a mesma interação de
 * seleção do CreativeCard (header e preview alternam a seleção, sincronizada com
 * o checkbox), mas troca as configurações por um rodapé de status: tag de
 * categoria opcional à esquerda e badge de status à direita.
 */
export default function CreativeStatusCard({
  name = 'Nome-do-criativo-enviado-pelo-usuário',
  imageSrc = '/Billboard.jpg',
  format = 'Billboard',
  tag,
  status = 'Aprovado',
  statusVariant = 'success',
  defaultSelected = false,
  onViewDetails,
  className,
}: CreativeStatusCardProps) {
  const [selected, setSelected] = useState(defaultSelected)
  const toggle = () => setSelected((s) => !s)

  return (
    <div className={cx(styles.card, selected ? styles.selected : '', className ?? '')}>
      <div className={styles.header} onClick={toggle}>
        <span className={styles.checkboxSlot} onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={selected} onChange={setSelected} aria-label={`Selecionar ${name}`} />
        </span>

        <span className={cx('type-caption-md', styles.name)}>{name}</span>

        <OptionsMenu triggerClassName={styles.menuBtn} onViewDetails={onViewDetails} />
      </div>

      <div className={styles.preview} onClick={toggle}>
        <img className={styles.previewImage} src={imageSrc} alt="" />
        <Badge className={styles.formatBadge} variant="neutral" label={format} />
      </div>

      <div className={styles.footer}>
        {tag && (
          <span className={styles.tag}>
            <span
              className={cx('material-symbols-rounded', 'icon-xs', styles.tagIcon)}
              aria-hidden="true"
            >
              shoppingmode
            </span>
            <Badge variant="neutral" label={tag} />
          </span>
        )}
        <Badge className={styles.status} variant={statusVariant} label={status} />
      </div>
    </div>
  )
}

import { useState } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import Badge from '../../components/Badge/Badge'
import StaticThumb from '../../components/StaticThumb/StaticThumb'
import CreativeStatusBadge from './CreativeStatusBadge'
import OptionsMenu from './OptionsMenu'
import { cx } from '../../utils/cx'
import styles from './CreativeStatusCard.module.css'
import type { BadgeVariant } from '../../tokens/badge'

export interface CreativeStatusCardProps {
  /** Nome do criativo — truncado em uma linha quando excede o espaço. */
  name?: string
  /** Tipo de mídia do criativo (default `image`). */
  kind?: 'image' | 'video'
  /** Imagem de preview do criativo. */
  imageSrc?: string
  /** Fonte do vídeo de preview — quando `kind === 'video'`. */
  videoSrc?: string
  /** Duração exibida no preview do vídeo (ex.: "0:15"). */
  duration?: string
  /** Formato exibido no badge sobre o preview. */
  format?: string
  /** Tag de categoria opcional, exibida com ícone no rodapé. */
  tag?: string
  /** Texto do status do criativo. */
  status?: string
  /** Variante semântica do badge de status. */
  statusVariant?: BadgeVariant
  /** Texto-link sublinhado exibido após o status (ex.: "Ver detalhes"). */
  statusLink?: string
  /** Renderiza o próprio status como link sublinhado (ex.: "Pronto para anunciar"). */
  statusAsLink?: boolean
  /** Ação do link de status; ausente torna o link apenas decorativo. */
  onStatusLink?: () => void
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
  kind = 'image',
  imageSrc = '/Billboard.jpg',
  videoSrc,
  duration,
  format = 'Billboard',
  tag,
  status = 'Aprovado',
  statusVariant = 'success',
  statusLink,
  statusAsLink,
  onStatusLink,
  defaultSelected = false,
  onViewDetails,
  className,
}: CreativeStatusCardProps) {
  const [selected, setSelected] = useState(defaultSelected)
  const toggle = () => setSelected((s) => !s)
  const isVideo = kind === 'video' && Boolean(videoSrc)

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
        <StaticThumb
          type={isVideo ? 'video' : 'image'}
          src={isVideo && videoSrc ? videoSrc : imageSrc}
          alt={name}
          duration={isVideo ? duration : undefined}
          badge={<Badge variant="neutral" label={format} />}
        />
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
        <CreativeStatusBadge
          className={tag ? styles.status : styles.statusFull}
          status={status}
          statusVariant={statusVariant}
          statusLink={statusLink}
          statusAsLink={statusAsLink}
          onStatusLink={onStatusLink}
        />
      </div>
    </div>
  )
}

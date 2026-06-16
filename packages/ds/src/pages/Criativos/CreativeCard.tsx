import { useState } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker'
import TextField from '../../components/TextField/TextField'
import Select from '../../components/Select/Select'
import Badge from '../../components/Badge/Badge'
import StaticThumb from '../../components/StaticThumb/StaticThumb'
import OptionsMenu from './OptionsMenu'
import { cx } from '../../utils/cx'
import styles from './CreativeCard.module.css'
import type { SelectOption } from '../../components/Select/Select'

const POSITION_OPTIONS: SelectOption[] = [
  { value: 'primeira', label: 'Primeira posição' },
  { value: 'segunda', label: 'Segunda posição' },
  { value: 'terceira', label: 'Terceira posição' },
  { value: 'quarta', label: 'Quarta posição' },
]

export interface CreativeCardProps {
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
  /** Estado inicial de seleção (não controlado). */
  defaultSelected?: boolean
  /** Abre o drawer de detalhes a partir do menu de opções. */
  onViewDetails?: () => void
  className?: string
}

/**
 * Card de configuração de um criativo enviado pelo usuário.
 *
 * Componente de produto em incubação no Playground — evoluirá aqui antes de
 * migrar para o Simulacrum. Header e preview alternam a seleção, sincronizada
 * com o checkbox.
 */
export default function CreativeCard({
  name = 'Nome-do-criativo-enviado-pelo-usuário',
  kind = 'image',
  imageSrc = '/Billboard.jpg',
  videoSrc,
  duration,
  format = 'Billboard',
  defaultSelected = false,
  onViewDetails,
  className,
}: CreativeCardProps) {
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

      <div className={styles.settings}>
        <div className={styles.periodGroup}>
          <DateTimePicker label="Data e horário de início" />
          <DateTimePicker label="Data e horário de fim" />
        </div>

        <TextField
          label="URL de destino"
          mask="url"
          copyable
          placeholder="https://seunegocio.com"
        />

        <TextField
          label="Pixel"
          optional
          mask="url"
          copyable
          placeholder="https://linkdopixel.com"
        />

        <Select label="Posição" placeholder="Selecione" options={POSITION_OPTIONS} />
      </div>
    </div>
  )
}

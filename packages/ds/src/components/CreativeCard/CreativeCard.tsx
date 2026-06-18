import { useState } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import DateTimePicker from '../DateTimePicker/DateTimePicker'
import TextField from '../TextField/TextField'
import Select, { type SelectOption } from '../Select/Select'
import Badge from '../Badge/Badge'
import StaticThumb from '../StaticThumb/StaticThumb'
import CreativeStatusBadge from './CreativeStatusBadge'
import OptionsMenu from './OptionsMenu'
import { DEFAULT_POSITION_OPTIONS } from './positionOptions'
import { cx } from '../../utils/cx'
import styles from './CreativeCard.module.css'
import type { Creative, CreativeFieldsConfig } from './types'

export type { CreativeFieldsConfig }

/**
 * Modo de exibição do card — controla a composição do corpo:
 * - `config`: configurações editáveis (criativo em configuração).
 * - `review`: status + configurações somente leitura (em análise/decidido).
 * - `gallery`: rodapé com tag + status (visão de galeria).
 */
export type CreativeCardMode = 'config' | 'review' | 'gallery'

export interface CreativeCardProps {
  /** Criativo exibido. O status do badge é derivado de `creative.state`. */
  creative: Creative
  /** Composição do corpo do card (default `config`). */
  mode?: CreativeCardMode
  /** Seleção controlada. Quando ausente, o card gerencia o próprio estado. */
  selected?: boolean
  /** Seleção inicial (não controlado). */
  defaultSelected?: boolean
  /** Notifica mudança de seleção. */
  onSelectedChange?: (selected: boolean) => void
  /** Opções do campo "Posição" (default `DEFAULT_POSITION_OPTIONS`). */
  positionOptions?: SelectOption[]
  /** Blocos de configuração habilitados. Omitido = todos visíveis. */
  fields?: CreativeFieldsConfig
  /** Abre os detalhes do criativo (menu de opções / link de status). */
  onViewDetails?: () => void
  /** Inicia o download do arquivo do criativo. */
  onDownload?: () => void
  /** Solicita a exclusão do criativo (confirmação é responsabilidade do consumidor). */
  onDelete?: () => void
  /** Ação do link de status (rejected → "Ver detalhes"). */
  onStatusLink?: () => void
  /** Notifica alteração em qualquer campo de configuração (só disparado em mode="config"). */
  onFieldChange?: (patch: Partial<Creative>) => void
  className?: string
}

/**
 * Card de um criativo publicitário — Business Component.
 *
 * Compõe primitivos do DS (Checkbox, StaticThumb, Badge, DateTimePicker,
 * TextField, Select) num card cujo corpo varia por `mode`. Header (seleção +
 * nome + opções) e preview (mídia + formato) são compartilhados entre os modos.
 */
export default function CreativeCard({
  creative,
  mode = 'config',
  selected,
  defaultSelected = false,
  onSelectedChange,
  positionOptions = DEFAULT_POSITION_OPTIONS,
  fields,
  onViewDetails,
  onDownload,
  onDelete,
  onStatusLink,
  onFieldChange,
  className,
}: CreativeCardProps) {
  const [internalSelected, setInternalSelected] = useState(defaultSelected)
  const isControlled = selected !== undefined
  const isSelected = isControlled ? selected : internalSelected
  const selectable = mode !== 'review'

  function setSelected(value: boolean) {
    if (!isControlled) setInternalSelected(value)
    onSelectedChange?.(value)
  }
  const toggle = () => selectable && setSelected(!isSelected)

  const isVideo = creative.kind === 'video' && Boolean(creative.videoSrc)

  return (
    <div
      className={cx(
        styles.card,
        selectable ? styles.selectable : '',
        selectable && isSelected ? styles.selected : '',
        className ?? ''
      )}
    >
      <div className={styles.header} onClick={toggle}>
        {selectable && (
          <span className={styles.checkboxSlot} onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={isSelected}
              onChange={setSelected}
              aria-label={`Selecionar ${creative.name}`}
            />
          </span>
        )}

        <span className={cx('type-caption-md', styles.name)}>{creative.name}</span>

        <OptionsMenu
          triggerClassName={styles.menuBtn}
          onViewDetails={onViewDetails}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      </div>

      <div className={styles.preview} onClick={toggle}>
        <StaticThumb
          type={isVideo ? 'video' : 'image'}
          src={isVideo && creative.videoSrc ? creative.videoSrc : creative.imageSrc}
          alt={creative.name}
          duration={isVideo ? creative.duration : undefined}
          badge={<Badge variant="neutral" label={creative.format} />}
        />
      </div>

      {mode === 'gallery' && (
        <div className={styles.footer}>
          {creative.tag && (
            <span className={styles.tag}>
              <span
                className={cx('material-symbols-rounded', 'icon-xs', styles.tagIcon)}
                aria-hidden="true"
              >
                shoppingmode
              </span>
              <Badge variant="neutral" label={creative.tag} />
            </span>
          )}
          <CreativeStatusBadge
            className={creative.tag ? styles.status : styles.statusFull}
            state={creative.state}
            onStatusLink={onStatusLink}
          />
        </div>
      )}

      {mode === 'review' && (
        <CreativeStatusBadge
          className={styles.statusBadge}
          state={creative.state}
          onStatusLink={onStatusLink}
        />
      )}

      {(mode === 'config' || mode === 'review') && (
        <CreativeSettings
          creative={creative}
          positionOptions={positionOptions}
          readOnly={mode === 'review'}
          fields={fields}
          onFieldChange={onFieldChange}
        />
      )}
    </div>
  )
}

/**
 * Configurações do criativo — compartilhadas entre `config` (editável) e
 * `review` (somente leitura). `readOnly` alterna entre os dois sem duplicar os
 * campos. `fields` controla quais blocos são exibidos.
 */
function CreativeSettings({
  creative,
  positionOptions,
  readOnly,
  fields,
  onFieldChange,
}: {
  creative: Creative
  positionOptions: SelectOption[]
  readOnly: boolean
  fields?: CreativeFieldsConfig
  onFieldChange?: (patch: Partial<Creative>) => void
}) {
  const show = {
    period: fields?.period ?? true,
    url: fields?.url ?? true,
    pixel: fields?.pixel ?? true,
    position: fields?.position ?? true,
  }

  if (!show.period && !show.url && !show.pixel && !show.position) return null

  return (
    <div className={styles.settings}>
      {show.period && (
        <div className={styles.periodGroup}>
          <DateTimePicker
            label="Data e horário de início"
            {...(readOnly
              ? { value: creative.startDateTime ?? null }
              : { defaultValue: creative.startDateTime })}
            readOnly={readOnly}
            onChange={readOnly ? undefined : (v) => onFieldChange?.({ startDateTime: v })}
          />
          <DateTimePicker
            label="Data e horário de fim"
            {...(readOnly
              ? { value: creative.endDateTime ?? null }
              : { defaultValue: creative.endDateTime })}
            readOnly={readOnly}
            onChange={readOnly ? undefined : (v) => onFieldChange?.({ endDateTime: v })}
          />
        </div>
      )}

      {show.url && (
        <TextField
          label="URL de destino"
          mask="url"
          copyable={!readOnly}
          {...(readOnly
            ? { value: creative.destinationUrl ?? '' }
            : { defaultValue: creative.destinationUrl })}
          placeholder="https://seunegocio.com"
          readOnly={readOnly}
          onChange={
            readOnly ? undefined : (e) => onFieldChange?.({ destinationUrl: e.target.value })
          }
        />
      )}

      {show.pixel && (
        <TextField
          label="Pixel"
          optional
          mask="url"
          copyable={!readOnly}
          {...(readOnly ? { value: creative.pixel ?? '' } : { defaultValue: creative.pixel })}
          placeholder="https://linkdopixel.com"
          readOnly={readOnly}
          onChange={readOnly ? undefined : (e) => onFieldChange?.({ pixel: e.target.value })}
        />
      )}

      {show.position && (
        <Select
          label="Posição"
          placeholder="Selecione"
          options={positionOptions}
          {...(readOnly ? { value: creative.position } : { defaultValue: creative.position })}
          readOnly={readOnly}
          onChange={readOnly ? undefined : (v) => onFieldChange?.({ position: v })}
        />
      )}
    </div>
  )
}

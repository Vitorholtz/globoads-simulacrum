import DateTimePicker from '../../components/DateTimePicker/DateTimePicker'
import TextField from '../../components/TextField/TextField'
import Select from '../../components/Select/Select'
import Badge from '../../components/Badge/Badge'
import OptionsMenu from './OptionsMenu'
import { cx } from '../../utils/cx'
import styles from './CreativePreviewCard.module.css'
import type { SelectOption } from '../../components/Select/Select'
import type { DateTimeValue } from '../../components/DateTimePicker/DateTimePicker'
import type { BadgeVariant } from '../../tokens/badge'

const POSITION_OPTIONS: SelectOption[] = [
  { value: 'primeira', label: 'Primeira posição' },
  { value: 'segunda', label: 'Segunda posição' },
  { value: 'terceira', label: 'Terceira posição' },
  { value: 'quarta', label: 'Quarta posição' },
]

export interface CreativePreviewCardProps {
  /** Nome do criativo — truncado em uma linha quando excede o espaço. */
  name?: string
  /** Imagem de preview do criativo. */
  imageSrc?: string
  /** Formato exibido no badge sobre o preview. */
  format?: string
  /** Texto do status exibido na faixa abaixo do preview. */
  status?: string
  /** Variante semântica do badge de status. */
  statusVariant?: BadgeVariant
  /** Data e horário de início (somente leitura). */
  startDateTime?: DateTimeValue
  /** Data e horário de fim (somente leitura). */
  endDateTime?: DateTimeValue
  /** URL de destino (somente leitura). */
  destinationUrl?: string
  /** Pixel de rastreamento (somente leitura). */
  pixel?: string
  /** Posição selecionada (somente leitura) — value de POSITION_OPTIONS. */
  position?: string
  /** Abre o drawer de detalhes a partir do menu de opções. */
  onViewDetails?: () => void
  className?: string
}

/**
 * Card de visualização de um envio de criativo.
 *
 * Componente de produto em incubação no Playground. Diferente do CreativeCard,
 * é somente leitura: exibe as configurações já feitas pelo usuário em campos
 * desabilitados e preenchidos. Não há checkbox nem estados de seleção/hover —
 * o único elemento interativo é o botão de opções. Uma faixa de status ocupa
 * toda a largura logo abaixo do preview.
 */
export default function CreativePreviewCard({
  name = 'Nome-do-criativo-enviado-pelo-usuário',
  imageSrc = '/Billboard.jpg',
  format = 'Billboard',
  status = 'Aprovado',
  statusVariant = 'success',
  startDateTime = { date: new Date(2025, 10, 24), time: { hours: 9, minutes: 0 } },
  endDateTime = { date: new Date(2025, 11, 25), time: { hours: 23, minutes: 59 } },
  destinationUrl = 'https://globo.com/clube-orfeu',
  pixel = 'https://ads.globo.com/pixel/orfeu',
  position = 'primeira',
  onViewDetails,
  className,
}: CreativePreviewCardProps) {
  return (
    <div className={cx(styles.card, className ?? '')}>
      <div className={styles.header}>
        <span className={cx('type-caption-md', styles.name)}>{name}</span>

        <OptionsMenu triggerClassName={styles.menuBtn} onViewDetails={onViewDetails} />
      </div>

      <div className={styles.preview}>
        <img className={styles.previewImage} src={imageSrc} alt="" />
        <Badge className={styles.formatBadge} variant="neutral" label={format} />
      </div>

      <Badge className={styles.statusBadge} variant={statusVariant} label={status} />

      <div className={styles.settings}>
        <div className={styles.periodGroup}>
          <DateTimePicker label="Data e horário de início" defaultValue={startDateTime} readOnly />
          <DateTimePicker label="Data e horário de fim" defaultValue={endDateTime} readOnly />
        </div>

        <TextField label="URL de destino" mask="url" defaultValue={destinationUrl} readOnly />

        <TextField label="Pixel" mask="url" defaultValue={pixel} readOnly />

        <Select label="Posição" options={POSITION_OPTIONS} defaultValue={position} readOnly />
      </div>
    </div>
  )
}

import { Badge } from '@globo-ads/ds'
import {
  KPI_LABELS,
  OBJETIVOS,
  PLATFORM_DISPLAY_NAMES,
  getAudience,
  type ImpressoesSelection,
} from '../../../../data/impressoes'
import {
  computeImpressoesTotal,
  formatCurrency,
  formatImpressions,
  formatDateLong,
  getCpmOption,
  getCpmSectionLabel,
  getEffectiveCpm,
} from '../../../../data/rules/impressoes'
import ResumoCard, {
  Row,
  CustomRow,
  ResumoDivider,
  ResumoTotal,
} from '../../../../components/ResumoCard/ResumoCard'
import styles from './ImpressoesPricingCard.module.css'

interface ImpressoesPricingCardProps {
  selection: ImpressoesSelection
}

export default function ImpressoesPricingCard({ selection }: ImpressoesPricingCardProps) {
  const { objetivo, kpi, produto, platforms, cpmOptionId, audienceId } = selection
  const objetivoInfo = OBJETIVOS.find((o) => o.id === objetivo)
  const cpmOption = produto ? getCpmOption(produto, cpmOptionId) : undefined
  const cpm = getEffectiveCpm(selection)
  const total = computeImpressoesTotal(selection)
  const audience = audienceId ? getAudience(audienceId) : undefined

  const hasAnything = Boolean(objetivo || produto)

  return (
    <ResumoCard
      hasContent={hasAnything}
      footer={
        cpm > 0 ? (
          <>
            <ResumoDivider />
            <Row label="CPM" value={`${formatCurrency(cpm)} / mil`} />
            {selection.startDate && selection.endDate && (
              <ResumoTotal value={formatCurrency(total)} />
            )}
          </>
        ) : null
      }
    >
      {objetivoInfo && (
        <CustomRow label="Objetivo">
          <span className={styles.objetivoName}>
            <span className="material-symbols-rounded icon-md" aria-hidden="true">
              {objetivoInfo.icon}
            </span>
            <span className="type-body-sm">{objetivoInfo.name}</span>
          </span>
        </CustomRow>
      )}
      {kpi && (
        <CustomRow label="KPI">
          <Badge variant="accent" label={KPI_LABELS[kpi]} />
        </CustomRow>
      )}
      {produto && <Row label="Produto" value={produto.name} />}
      {platforms.length > 0 && (
        <Row
          label={platforms.length === 1 ? 'Plataforma' : 'Plataformas'}
          value={
            platforms.length <= 2
              ? platforms.map((p) => PLATFORM_DISPLAY_NAMES[p]).join(', ')
              : `${platforms.length} selecionadas`
          }
        />
      )}
      {cpmOption && produto && produto.cpmOptions.length > 1 && (
        <Row label={getCpmSectionLabel(produto.id)} value={cpmOption.label} />
      )}
      {audience && <Row label="Audiência" value={audience.name} />}
      {selection.startDate && selection.endDate && (
        <CustomRow label="Período">
          <span className={`type-body-sm ${styles.dateRange}`}>
            {formatDateLong(selection.startDate)}
            <span className="material-symbols-rounded icon-xs" aria-hidden="true">
              arrow_forward
            </span>
            {formatDateLong(selection.endDate)}
          </span>
        </CustomRow>
      )}
      {produto && selection.startDate && selection.endDate && (
        <Row label="Impressões" value={formatImpressions(selection.impressions)} />
      )}
    </ResumoCard>
  )
}

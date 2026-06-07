import { StaticCard, Badge } from '@globo-ads/ds'
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
import styles from './ImpressoesPricingCard.module.css'

interface ImpressoesPricingCardProps {
  selection: ImpressoesSelection
}

interface RowProps {
  label: string
  value: string
}

function Row({ label, value }: RowProps) {
  return (
    <div className={styles.row}>
      <span className={`type-body-sm ${styles.label}`}>{label}</span>
      <span className={`type-body-sm ${styles.value}`}>{value}</span>
    </div>
  )
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
    <StaticCard className={styles.card}>
      <p className={`type-title-sm ${styles.title}`}>Resumo do anúncio</p>

      {!hasAnything ? (
        <p className={`type-body-xs ${styles.hint}`}>
          Suas escolhas aparecerão aqui conforme você avança.
        </p>
      ) : (
        <div className={styles.rows}>
          {objetivoInfo && (
            <div className={styles.row}>
              <span className={`type-body-sm ${styles.label}`}>Objetivo</span>
              <span className={styles.objetivoName}>
                <span className="material-symbols-rounded icon-sm" aria-hidden="true">
                  {objetivoInfo.icon}
                </span>
                <span className={`type-body-sm ${styles.value}`}>{objetivoInfo.name}</span>
              </span>
            </div>
          )}
          {kpi && (
            <div className={styles.row}>
              <span className={`type-body-sm ${styles.label}`}>KPI</span>
              <Badge variant="accent" label={KPI_LABELS[kpi]} />
            </div>
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
            <div className={styles.row}>
              <span className={`type-body-sm ${styles.label}`}>Período</span>
              <span className={`type-body-sm ${styles.value} ${styles.dateRange}`}>
                {formatDateLong(selection.startDate)}
                <span className="material-symbols-rounded icon-xs" aria-hidden="true">
                  arrow_forward
                </span>
                {formatDateLong(selection.endDate)}
              </span>
            </div>
          )}
          {produto && selection.startDate && selection.endDate && (
            <Row label="Impressões" value={formatImpressions(selection.impressions)} />
          )}
        </div>
      )}

      {cpm > 0 && (
        <>
          <div className={styles.divider} />
          <div className={styles.row}>
            <span className={`type-body-sm ${styles.label}`}>CPM</span>
            <span className={`type-body-sm ${styles.value}`}>{formatCurrency(cpm)} / mil</span>
          </div>
          {selection.startDate && selection.endDate && (
            <div className={styles.subtotalRow}>
              <span className={`type-body-sm ${styles.subtotalLabel}`}>Total estimado</span>
              <span className={`type-title-sm ${styles.subtotalValue}`}>
                {formatCurrency(total)}
              </span>
            </div>
          )}
        </>
      )}
    </StaticCard>
  )
}

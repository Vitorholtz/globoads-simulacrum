import { Badge } from '@globo-ads/ds'
import {
  KPI_LABELS,
  OBJETIVOS,
  PLATFORM_DISPLAY_NAMES,
  getAudience,
  getPlatform,
  type ImpressoesConfirmedSelection,
} from '../../data/impressoes'
import {
  computeImpressoesTotal,
  formatCurrency,
  formatImpressions,
  formatDateLong,
  getCpmOption,
  getEffectiveCpm,
} from '../../data/rules/impressoes'
import ImpressoesFormatsAccordion from '../../features/compra-impressoes/components/ImpressoesFormatsAccordion/ImpressoesFormatsAccordion'
import ExpandablePurchaseCard, { MetaText } from '../ExpandablePurchaseCard/ExpandablePurchaseCard'
import PlatformChip from '../PlatformChip/PlatformChip'
import styles from './ImpressoesPurchaseCard.module.css'

function InvoiceContent({ selection }: { selection: ImpressoesConfirmedSelection }) {
  const { produto, objetivo, kpi, platforms, cpmOptionId, audienceId, impressions } = selection
  const objetivoInfo = OBJETIVOS.find((o) => o.id === objetivo)
  const cpmOption = getCpmOption(produto, cpmOptionId)
  const cpm = getEffectiveCpm(selection)
  const audience = getAudience(audienceId)
  const total = computeImpressoesTotal(selection)

  return (
    <>
      <div className={styles.receiptHeader}>
        <div className={styles.receiptHeaderLeft}>
          <div className={styles.objetivoHeaderRow}>
            <div className={styles.objetivoIconWrap}>
              <span
                className={`material-symbols-rounded icon-lg ${styles.objetivoIconColor}`}
                aria-hidden="true"
              >
                {objetivoInfo?.icon ?? 'ads_click'}
              </span>
            </div>
            <div className={styles.receiptProductInfo}>
              <p className={`type-body-sm ${styles.metaValue}`}>{produto.name}</p>
              <div className={styles.objetivoRow}>
                <p className={`type-caption-sm ${styles.metaLabel}`}>{objetivoInfo?.name}</p>
                {kpi && <Badge variant="accent" label={KPI_LABELS[kpi]} />}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.receiptHeaderRight}>
          <span className={`type-caption-md ${styles.metaLabel}`}>
            {platforms.length === 1
              ? PLATFORM_DISPLAY_NAMES[platforms[0]]
              : `${platforms.length} plataformas`}
          </span>
          {cpmOption && produto.cpmOptions.length > 1 && (
            <Badge variant="neutral" label={cpmOption.label} />
          )}
        </div>
      </div>

      <div className={styles.section}>
        <p className={`type-caption-sm ${styles.sectionLabel}`}>Plataformas</p>
        <div className={styles.platformList}>
          {platforms.map((p) => (
            <PlatformChip
              key={p}
              svgPath={getPlatform(p).svgPath}
              name={PLATFORM_DISPLAY_NAMES[p]}
            />
          ))}
        </div>
      </div>

      <div className={styles.detailHeader}>
        <span className={`type-caption-sm ${styles.detailHeadLabel}`}>Configuração</span>
        <span className={`type-caption-sm ${styles.detailHeadLabelRight}`}>Valor</span>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailRow}>
          <span className={`type-body-sm ${styles.detailLabel}`}>Objetivo</span>
          <span className={`type-body-sm ${styles.detailValue}`}>{objetivoInfo?.name ?? '—'}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={`type-body-sm ${styles.detailLabel}`}>KPI</span>
          <span className={`type-body-sm ${styles.detailValue}`}>
            {kpi ? KPI_LABELS[kpi] : '—'}
          </span>
        </div>
        <div className={styles.detailRow}>
          <span className={`type-body-sm ${styles.detailLabel}`}>Audiência</span>
          <span className={`type-body-sm ${styles.detailValue}`}>{audience?.name ?? '—'}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={`type-body-sm ${styles.detailLabel}`}>Período</span>
          <span className={`type-body-sm ${styles.detailValue} ${styles.dateRange}`}>
            {selection.startDate ? formatDateLong(selection.startDate) : '—'}
            <span className="material-symbols-rounded icon-xs" aria-hidden="true">
              arrow_forward
            </span>
            {selection.endDate ? formatDateLong(selection.endDate) : '—'}
          </span>
        </div>
        <div className={styles.detailRow}>
          <span className={`type-body-sm ${styles.detailLabel}`}>Impressões contratadas</span>
          <span className={`type-body-sm ${styles.detailValue}`}>
            {impressions.toLocaleString('pt-BR')}
          </span>
        </div>
        <div className={styles.detailRow}>
          <span className={`type-body-sm ${styles.detailLabel}`}>CPM</span>
          <span className={`type-body-sm ${styles.detailValue}`}>{formatCurrency(cpm)} / mil</span>
        </div>
      </div>

      <div className={styles.receiptTotal}>
        <span className={`type-body-sm ${styles.totalLabel}`}>Total</span>
        <span className={`type-title-sm ${styles.totalValue}`}>{formatCurrency(total)}</span>
      </div>
    </>
  )
}

interface ImpressoesPurchaseCardProps {
  selection: ImpressoesConfirmedSelection
  defaultOpen?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export function ImpressoesPurchaseCard({
  selection,
  defaultOpen = false,
  onEdit,
  onDelete,
}: ImpressoesPurchaseCardProps) {
  const objetivoInfo = OBJETIVOS.find((o) => o.id === selection.objetivo)

  if (!selection.produto) return null

  return (
    <ExpandablePurchaseCard
      icon={objetivoInfo?.icon ?? 'ads_click'}
      name={selection.produto.name}
      total={formatCurrency(computeImpressoesTotal(selection))}
      meta={
        <>
          {objetivoInfo && <MetaText>{objetivoInfo.name}</MetaText>}
          <Badge variant="accent" label={KPI_LABELS[selection.kpi]} />
          <MetaText>{formatImpressions(selection.impressions)} impressões</MetaText>
        </>
      }
      receipt={<InvoiceContent selection={selection} />}
      formats={<ImpressoesFormatsAccordion produto={selection.produto} />}
      defaultOpen={defaultOpen}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}

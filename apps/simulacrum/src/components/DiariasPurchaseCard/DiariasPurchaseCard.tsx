import { Badge } from '@globo-ads/ds'
import {
  getPortal,
  PORTAL_DISPLAY_NAMES,
  formatCurrency,
  formatImpressions,
  getPriceForCoverage,
} from '../../data/diarias'
import type { ConfirmedSelection } from '../../data/diarias'
import { STATE_LABELS, computeTotal } from '../../data/rules/diarias'
import DiariasFormatsAccordion from '../../features/compra-diarias/components/DiariasFormatsAccordion/DiariasFormatsAccordion'
import ExpandablePurchaseCard, { MetaText } from '../ExpandablePurchaseCard/ExpandablePurchaseCard'
import styles from './DiariasPurchaseCard.module.css'

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function summarize(p: ConfirmedSelection): string {
  if (p.produto.isRegional) {
    const totalDays = p.regionalSelections.reduce((s, r) => s + r.dates.length, 0)
    const regions = p.regionalSelections.length
    return `${regions} ${regions === 1 ? 'região' : 'regiões'} · ${totalDays} ${totalDays === 1 ? 'dia' : 'dias'}`
  }
  const n = p.dates.length
  return `${n} ${n === 1 ? 'dia' : 'dias'}`
}

function InvoiceContent({ selection }: { selection: ConfirmedSelection }) {
  const portal = getPortal(selection.portal)
  const { produto, regionalSelections, dates } = selection

  return (
    <>
      <div className={styles.receiptHeader}>
        <div className={styles.receiptHeaderLeft}>
          <div className={styles.portalRow}>
            <div className={styles.receiptIconWrap}>
              <span
                className={`material-symbols-rounded icon-lg ${styles.receiptIcon}`}
                aria-hidden="true"
              >
                {produto.icon}
              </span>
            </div>
            <div className={styles.portalRowInfo}>
              <p className={`type-body-sm ${styles.receiptMetaValue}`}>{produto.name}</p>
              <Badge
                variant={produto.isRegional ? 'accent' : 'neutral'}
                label={produto.isRegional ? 'Regional' : 'Nacional'}
              />
            </div>
          </div>
        </div>
        {portal.svgPath && (
          <span className={styles.portalChip}>
            <img src={portal.svgPath} alt="" aria-hidden="true" className={styles.portalChipLogo} />
            <span className={`type-caption-md ${styles.portalChipName}`}>
              {PORTAL_DISPLAY_NAMES[selection.portal]}
            </span>
          </span>
        )}
      </div>

      <div className={styles.tableHeader}>
        {produto.isRegional ? (
          <>
            <span className={`type-caption-sm ${styles.tableHeadLabel}`}>
              {regionalSelections.length === 1
                ? 'Região'
                : `Regiões (${regionalSelections.length})`}
            </span>
            <span className={`type-caption-sm ${styles.tableHeadLabel}`}>Imp./dia</span>
            <span className={`type-caption-sm ${styles.tableHeadLabel}`}>Preço/dia</span>
            <span className={`type-caption-sm ${styles.tableHeadLabelRight}`}>Total</span>
          </>
        ) : (
          <>
            <span className={`type-caption-sm ${styles.tableHeadLabel}`}>
              {dates.length === 1 ? 'Data de veiculação' : `Dias de veiculação (${dates.length})`}
            </span>
            <span className={`type-caption-sm ${styles.tableHeadLabel}`}>Imp./dia</span>
            <span className={`type-caption-sm ${styles.tableHeadLabel}`}>Preço/dia</span>
            <span className={`type-caption-sm ${styles.tableHeadLabelRight}`}>Total</span>
          </>
        )}
      </div>

      <div className={styles.tableRows}>
        {produto.isRegional ? (
          regionalSelections.map((r) => {
            const covInfo = produto.coverages.find((c) => c.code === r.coverage)
            const priceDay = getPriceForCoverage(produto, r.coverage)
            return (
              <div key={r.coverage} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <p className={`type-caption-md ${styles.tableRegionName}`}>
                    {STATE_LABELS[r.coverage] ?? r.coverage}
                    <span className={`type-caption-md ${styles.tableDayCount}`}>
                      {' '}
                      · {r.dates.length} {r.dates.length === 1 ? 'dia' : 'dias'}
                    </span>
                  </p>
                  <ul className={styles.dateList}>
                    {r.dates.map((d) => (
                      <li key={d.toISOString()} className={`type-body-xs ${styles.regionalDate}`}>
                        {formatDate(d)}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className={`type-body-xs ${styles.tableCellMuted}`}>
                  {covInfo ? `~${formatImpressions(covInfo.impressions)}` : '—'}
                </span>
                <span className={`type-body-xs ${styles.tableCellMuted}`}>
                  {formatCurrency(priceDay)}
                </span>
                <span className={`type-body-sm ${styles.tableCellValue}`}>
                  {formatCurrency(r.dates.length * priceDay)}
                </span>
              </div>
            )
          })
        ) : (
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>
              <p className={`type-caption-md ${styles.tableRegionName}`}>
                Nacional
                <span className={`type-caption-md ${styles.tableDayCount}`}>
                  {' '}
                  · {dates.length} {dates.length === 1 ? 'dia' : 'dias'}
                </span>
              </p>
              <ul className={styles.dateList}>
                {dates.map((d) => (
                  <li key={d.toISOString()} className={`type-body-xs ${styles.regionalDate}`}>
                    {formatDate(d)}
                  </li>
                ))}
              </ul>
            </div>
            <span className={`type-body-xs ${styles.tableCellMuted}`}>
              ~{formatImpressions(produto.coverages[0].impressions)}
            </span>
            <span className={`type-body-xs ${styles.tableCellMuted}`}>
              {formatCurrency(getPriceForCoverage(produto, 'Nacional'))}
            </span>
            <span className={`type-body-sm ${styles.tableCellValue}`}>
              {formatCurrency(dates.length * getPriceForCoverage(produto, 'Nacional'))}
            </span>
          </div>
        )}
      </div>

      <div className={styles.receiptTotal}>
        <span className={`type-body-sm ${styles.totalLabel}`}>Total</span>
        <span className={`type-title-sm ${styles.totalValue}`}>
          {produto.isRegional
            ? formatCurrency(
                regionalSelections.reduce(
                  (sum, r) => sum + r.dates.length * getPriceForCoverage(produto, r.coverage),
                  0
                )
              )
            : formatCurrency(dates.length * getPriceForCoverage(produto, 'Nacional'))}
        </span>
      </div>
    </>
  )
}

interface DiariasPurchaseCardProps {
  selection: ConfirmedSelection
  defaultOpen?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export function DiariasPurchaseCard({
  selection,
  defaultOpen = false,
  onEdit,
  onDelete,
}: DiariasPurchaseCardProps) {
  const { produto } = selection

  return (
    <ExpandablePurchaseCard
      icon={produto.icon}
      name={produto.name}
      total={formatCurrency(computeTotal(selection))}
      meta={
        <>
          <MetaText>{PORTAL_DISPLAY_NAMES[selection.portal]}</MetaText>
          <Badge
            variant={produto.isRegional ? 'accent' : 'neutral'}
            label={produto.isRegional ? 'Regional' : 'Nacional'}
          />
          <MetaText>{summarize(selection)}</MetaText>
        </>
      }
      receipt={<InvoiceContent selection={selection} />}
      formats={<DiariasFormatsAccordion produto={produto} label="Formatos disponíveis" />}
      defaultOpen={defaultOpen}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}

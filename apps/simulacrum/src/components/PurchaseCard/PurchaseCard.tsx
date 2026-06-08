import { useState } from 'react'
import { Button, Badge, Tooltip } from '@globo-ads/ds'
import {
  getPortal,
  PORTAL_DISPLAY_NAMES,
  formatCurrency,
  formatImpressions,
  getPriceForCoverage,
} from '../../data/diarias'
import type { ConfirmedSelection } from '../../data/diarias'
import {
  getFormatSvg,
  getPrimaryDimension,
  STATE_LABELS,
  computeTotal,
} from '../../data/rules/diarias'
import styles from './PurchaseCard.module.css'

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
            {portal.svgPath && (
              <img
                src={portal.svgPath}
                alt={PORTAL_DISPLAY_NAMES[selection.portal]}
                className={styles.portalLogo}
              />
            )}
            <div>
              <p className={`type-caption-sm ${styles.receiptMetaLabel}`}>Portal</p>
              <p className={`type-body-sm ${styles.receiptMetaValue}`}>
                {PORTAL_DISPLAY_NAMES[selection.portal]}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.receiptHeaderRight}>
          <p className={`type-caption-sm ${styles.receiptMetaLabel}`}>Produto</p>
          <div className={styles.produtoRow}>
            <p className={`type-body-sm ${styles.receiptMetaValue}`}>{produto.name}</p>
            <Badge
              variant={produto.isRegional ? 'accent' : 'neutral'}
              label={produto.isRegional ? 'Regional' : 'Nacional'}
            />
          </div>
        </div>
      </div>

      <div className={styles.receiptDivider} />

      <div className={styles.receiptSection}>
        <p className={`type-caption-sm ${styles.receiptSectionLabel}`}>Formatos</p>
        <ul className={styles.formatList}>
          {produto.formats.map((f) => {
            const svgPath = getFormatSvg(f.formatId)
            const dim = getPrimaryDimension(f.formatId)
            return (
              <li key={f.formatId} className={styles.formatItem}>
                {svgPath ? (
                  <img src={svgPath} alt="" aria-hidden="true" className={styles.formatThumb} />
                ) : (
                  <span
                    className={`material-symbols-rounded icon-sm ${styles.formatIcon}`}
                    aria-hidden="true"
                  >
                    {f.formatId === 'in-stream-video' ? 'play_circle' : 'image'}
                  </span>
                )}
                <div className={styles.formatInfo}>
                  <div className={styles.formatHeadline}>
                    <span className={`type-caption-lg ${styles.formatName}`}>{f.formatName}</span>
                    {dim && (
                      <span className={`type-caption-sm ${styles.formatSpecs}`}>
                        {dim.width}×{dim.height} | {f.devices}
                      </span>
                    )}
                  </div>
                  <span className={`type-caption-sm ${styles.formatPositions}`}>
                    {f.positions.join(', ')}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
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

interface ExpandablePurchaseCardProps {
  selection: ConfirmedSelection
  defaultOpen?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export function ExpandablePurchaseCard({
  selection,
  defaultOpen = false,
  onEdit,
  onDelete,
}: ExpandablePurchaseCardProps) {
  const [expanded, setExpanded] = useState(defaultOpen)
  const portal = getPortal(selection.portal)
  const total = computeTotal(selection)

  return (
    <div className={styles.expandableCard}>
      <button
        type="button"
        className={styles.expandableCardHeader}
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <div className={styles.expandableCardLeft}>
          {portal.svgPath && (
            <img src={portal.svgPath} alt="" aria-hidden="true" className={styles.expandableLogo} />
          )}
          <div className={styles.expandableCardInfo}>
            <span className={`type-body-sm ${styles.expandablePortalName}`}>
              {PORTAL_DISPLAY_NAMES[selection.portal]}
            </span>
            <div className={styles.expandableCardMeta}>
              <span className={`type-caption-sm ${styles.expandableMetaText}`}>
                {selection.produto.name}
              </span>
              <Badge
                variant={selection.produto.isRegional ? 'accent' : 'neutral'}
                label={selection.produto.isRegional ? 'Regional' : 'Nacional'}
              />
              <span className={`type-caption-sm ${styles.expandableMetaText}`}>
                {summarize(selection)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.expandableCardRight}>
          <span className={`type-title-sm ${styles.expandableTotalValue}`}>
            {formatCurrency(total)}
          </span>
          <span
            className={`material-symbols-rounded icon-md ${styles.expandableChevron} ${expanded ? styles.chevronOpen : ''}`}
            aria-hidden="true"
          >
            expand_more
          </span>
        </div>
      </button>
      <div
        className={`${styles.expandableCardBody} ${expanded ? styles.expandableCardBodyOpen : ''}`}
      >
        <div className={styles.expandableCardBodyInner}>
          <div className={styles.expandableCardBodyPad}>
            <div className={styles.receipt}>
              <InvoiceContent selection={selection} />
            </div>
            {(onEdit || onDelete) && (
              <div className={styles.expandableCardActions}>
                {onEdit && (
                  <Tooltip text="Editar compra" position="left">
                    <Button
                      variant="tertiary"
                      size="md"
                      iconLeft="edit"
                      onClick={onEdit}
                      aria-label="Editar compra"
                    />
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip text="Excluir compra" position="left">
                    <Button
                      variant="tertiary"
                      size="md"
                      iconLeft="delete"
                      danger
                      onClick={onDelete}
                      aria-label="Excluir compra"
                    />
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

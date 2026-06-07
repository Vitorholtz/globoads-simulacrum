import { useState } from 'react'
import { Button, Badge, Tooltip } from '@globo-ads/ds'
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
  formatDateRange,
  getAdFormat,
  getCpmOption,
  getEffectiveCpm,
  getFormatSvg,
  getPrimaryDimension,
} from '../../data/rules/impressoes'
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
          <p className={`type-caption-sm ${styles.metaLabel}`}>Produto</p>
          <div className={styles.produtoRow}>
            <p className={`type-body-sm ${styles.metaValue}`}>{produto.name}</p>
            {cpmOption && produto.cpmOptions.length > 1 && (
              <Badge variant="neutral" label={cpmOption.label} />
            )}
          </div>
        </div>
        <div className={styles.receiptHeaderRight}>
          <p className={`type-caption-sm ${styles.metaLabel}`}>Objetivo</p>
          <div className={styles.objetivoRow}>
            <p className={`type-body-sm ${styles.metaValue}`}>{objetivoInfo?.name}</p>
            {kpi && <Badge variant="accent" label={KPI_LABELS[kpi]} />}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <p className={`type-caption-sm ${styles.sectionLabel}`}>Formatos</p>
        <ul className={styles.formatList}>
          {produto.formatIds.map((id) => {
            const fmt = getAdFormat(id)
            const svgPath = getFormatSvg(id)
            const dim = getPrimaryDimension(id)
            if (!fmt) return null
            return (
              <li key={id} className={styles.formatItem}>
                {svgPath ? (
                  <img src={svgPath} alt="" aria-hidden="true" className={styles.formatThumb} />
                ) : (
                  <span
                    className={`material-symbols-rounded icon-sm ${styles.formatIcon}`}
                    aria-hidden="true"
                  >
                    {fmt.category === 'video' ? 'play_circle' : 'image'}
                  </span>
                )}
                <div className={styles.formatInfo}>
                  <span className={`type-caption-lg ${styles.formatName}`}>{fmt.name}</span>
                  {dim && (
                    <span className={`type-caption-sm ${styles.formatSpecs}`}>
                      {dim.width}×{dim.height}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={styles.section}>
        <p className={`type-caption-sm ${styles.sectionLabel}`}>Plataformas</p>
        <div className={styles.platformList}>
          {platforms.map((p) => {
            const platform = getPlatform(p)
            return (
              <span key={p} className={styles.platformChip}>
                {platform.svgPath && (
                  <img
                    src={platform.svgPath}
                    alt=""
                    aria-hidden="true"
                    className={styles.platformLogo}
                  />
                )}
                <span className={`type-caption-md ${styles.platformName}`}>
                  {PLATFORM_DISPLAY_NAMES[p]}
                </span>
              </span>
            )
          })}
        </div>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailRow}>
          <span className={`type-body-sm ${styles.detailLabel}`}>Audiência</span>
          <span className={`type-body-sm ${styles.detailValue}`}>{audience?.name ?? '—'}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={`type-body-sm ${styles.detailLabel}`}>Período</span>
          <span className={`type-body-sm ${styles.detailValue}`}>
            {formatDateRange(selection.startDate, selection.endDate)}
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

interface ExpandableImpressoesPurchaseCardProps {
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
}: ExpandableImpressoesPurchaseCardProps) {
  const [expanded, setExpanded] = useState(defaultOpen)
  const total = computeImpressoesTotal(selection)
  const objetivoInfo = OBJETIVOS.find((o) => o.id === selection.objetivo)

  return (
    <div className={styles.expandableCard}>
      <button
        type="button"
        className={styles.expandableCardHeader}
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <div className={styles.expandableCardLeft}>
          <span
            className={`material-symbols-rounded icon-lg ${styles.expandableIcon}`}
            aria-hidden="true"
          >
            {objetivoInfo?.icon ?? 'ads_click'}
          </span>
          <div className={styles.expandableCardInfo}>
            <span className={`type-body-sm ${styles.expandableName}`}>
              {selection.produto.name}
            </span>
            <div className={styles.expandableCardMeta}>
              {objetivoInfo && (
                <span className={`type-caption-sm ${styles.expandableMetaText}`}>
                  {objetivoInfo.name}
                </span>
              )}
              <Badge variant="accent" label={KPI_LABELS[selection.kpi]} />
              <span className={`type-caption-sm ${styles.expandableMetaText}`}>
                {formatImpressions(selection.impressions)} impressões
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

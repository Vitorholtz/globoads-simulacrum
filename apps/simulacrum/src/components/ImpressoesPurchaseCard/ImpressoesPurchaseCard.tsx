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
  formatDateLong,
  getCpmOption,
  getEffectiveCpm,
} from '../../data/rules/impressoes'
import ImpressoesFormatsAccordion from '../../features/compra-impressoes/components/ImpressoesFormatsAccordion/ImpressoesFormatsAccordion'
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

  if (!selection.produto) return null

  return (
    <div className={styles.expandableCard}>
      <button
        type="button"
        className={styles.expandableCardHeader}
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <div className={styles.expandableCardLeft}>
          <div className={styles.expandableIconWrap}>
            <span
              className={`material-symbols-rounded icon-lg ${styles.expandableIcon}`}
              aria-hidden="true"
            >
              {objetivoInfo?.icon ?? 'ads_click'}
            </span>
          </div>
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
            <div className={styles.accordionWrap}>
              <ImpressoesFormatsAccordion produto={selection.produto} />
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

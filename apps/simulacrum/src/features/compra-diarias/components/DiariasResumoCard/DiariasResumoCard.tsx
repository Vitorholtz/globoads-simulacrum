import { StaticCard, Badge } from '@globo-ads/ds'
import {
  getPortal,
  formatCurrency,
  formatImpressions,
  getPriceForCoverage,
} from '../../../../data/diarias'
import { STATE_LABELS } from '../../../../data/rules/diarias'
import { useDiarias } from '../../context/DiariasContext'
import styles from './DiariasResumoCard.module.css'

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

export default function DiariasResumoCard() {
  const { selection } = useDiarias()
  const { portal: portalId, produto, dates, regionalSelections } = selection

  const portal = portalId ? getPortal(portalId) : null
  const hasAnything = Boolean(portalId)

  const activeRegional = regionalSelections.filter((r) => r.dates.length > 0)

  const totalDays = produto?.isRegional
    ? activeRegional.reduce((s, r) => s + r.dates.length, 0)
    : dates.length

  const total =
    produto && totalDays > 0
      ? produto.isRegional
        ? produto.coverages.reduce((sum, c) => {
            const d = regionalSelections.find((r) => r.coverage === c.code)?.dates.length ?? 0
            return sum + d * getPriceForCoverage(produto, c.code)
          }, 0)
        : dates.length * getPriceForCoverage(produto, 'Nacional')
      : 0

  return (
    <StaticCard className={styles.card}>
      <p className={`type-title-sm ${styles.title}`}>Resumo do anúncio</p>

      {!hasAnything ? (
        <p className={`type-body-xs ${styles.hint}`}>
          Suas escolhas aparecerão aqui conforme você avança.
        </p>
      ) : (
        <div className={styles.rows}>
          {portal && (
            <div className={styles.row}>
              <span className={`type-body-sm ${styles.label}`}>Portal</span>
              <span className={styles.portalCell}>
                {portal.svgPath && (
                  <img
                    src={portal.svgPath}
                    alt=""
                    aria-hidden="true"
                    className={styles.portalLogo}
                  />
                )}
              </span>
            </div>
          )}

          {produto && (
            <>
              <div className={styles.row}>
                <span className={`type-body-sm ${styles.label}`}>Produto</span>
                <span className={`type-body-sm ${styles.value}`}>{produto.name}</span>
              </div>
              <div className={styles.row}>
                <span className={`type-body-sm ${styles.label}`}>Cobertura</span>
                <Badge
                  variant={produto.isRegional ? 'accent' : 'neutral'}
                  label={produto.isRegional ? 'Regional' : 'Nacional'}
                />
              </div>
            </>
          )}

          {produto && !produto.isRegional && (
            <>
              <Row
                label="Impressões/dia"
                value={`~${formatImpressions(produto.coverages[0].impressions)}`}
              />
              <Row
                label="Preço/dia"
                value={formatCurrency(getPriceForCoverage(produto, 'Nacional'))}
              />
              {dates.length > 0 && (
                <Row
                  label="Dias"
                  value={`${dates.length} ${dates.length === 1 ? 'dia' : 'dias'}`}
                />
              )}
            </>
          )}

          {produto && produto.isRegional && (
            <>
              {activeRegional.length === 0 ? (
                (() => {
                  const imps = produto.coverages.map((c) => c.impressions)
                  const prices = produto.coverages.map((c) => getPriceForCoverage(produto, c.code))
                  const minImp = Math.min(...imps)
                  const maxImp = Math.max(...imps)
                  const minPrice = Math.min(...prices)
                  const maxPrice = Math.max(...prices)
                  return (
                    <>
                      <Row
                        label="Impressões/estado/dia"
                        value={`~${formatImpressions(minImp)} a ${formatImpressions(maxImp)}`}
                      />
                      <Row
                        label="Preço/dia"
                        value={`${formatCurrency(minPrice)} a ${formatCurrency(maxPrice)}`}
                      />
                    </>
                  )
                })()
              ) : (
                <div className={styles.coverageSection}>
                  <div className={styles.divider} />
                  <span className={`type-caption-sm ${styles.coverageLabel}`}>Por estado</span>
                  {activeRegional.map((r) => {
                    const stateName = STATE_LABELS[r.coverage] ?? r.coverage
                    const pricePerDay = getPriceForCoverage(produto, r.coverage)
                    const subtotal = r.dates.length * pricePerDay
                    return (
                      <div key={r.coverage} className={styles.coverageRow}>
                        <span className={`type-body-sm ${styles.coverageName}`}>{stateName}</span>
                        <div className={styles.coverageMeta}>
                          <span className={`type-body-sm ${styles.coverageDays}`}>
                            {r.dates.length} {r.dates.length === 1 ? 'dia' : 'dias'}
                          </span>
                          <span className={`type-body-sm ${styles.coverageSubtotal}`}>
                            {formatCurrency(subtotal)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {total > 0 && (
        <>
          <div className={styles.divider} />
          <div className={styles.subtotalRow}>
            <span className={`type-body-sm ${styles.subtotalLabel}`}>Total estimado</span>
            <span className={`type-title-sm ${styles.subtotalValue}`}>{formatCurrency(total)}</span>
          </div>
        </>
      )}
    </StaticCard>
  )
}

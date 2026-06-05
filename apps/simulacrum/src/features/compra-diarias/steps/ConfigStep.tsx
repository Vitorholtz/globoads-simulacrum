import { useState } from 'react'
import { Button, StaticCard, Badge, Accordion } from '@globo-ads/ds'
import {
  getPortal,
  formatCurrency,
  formatImpressions,
  getPriceForCoverage,
  MACROREGIONS,
} from '../../../data/diarias'
import type { CoverageInfo, DiariaProduto } from '../../../data/diarias'
import { AD_FORMATS_CATALOG } from '../../../data/catalog/adFormats'
import MultiDateCalendar from '../../../components/MultiDateCalendar/MultiDateCalendar'
import styles from './ConfigStep.module.css'

interface ConfigStepProps {
  produto: DiariaProduto
  initialDates?: Date[]
  initialDatesPerCoverage?: Record<string, Date[]>
  onNext: (
    regionalSelections: import('../../../data/diarias').RegionalSelection[],
    dates: Date[]
  ) => void
  onBack: () => void
}

const STATE_LABELS: Record<string, string> = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
}

function getFormatSvg(formatId: string): string {
  return AD_FORMATS_CATALOG.find((f) => f.id === formatId)?.svgPath ?? ''
}

function getPrimaryDimension(formatId: string) {
  const fmt = AD_FORMATS_CATALOG.find((f) => f.id === formatId)
  if (!fmt || fmt.dimensions.length === 0) return null
  return fmt.dimensions.reduce((best, d) =>
    d.width * d.height > best.width * best.height ? d : best
  )
}

function formatDateShort(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

interface CoverageRowProps {
  cov: CoverageInfo
  produto: DiariaProduto
  dates: Date[]
  isOpen: boolean
  onToggle: () => void
  onDatesChange: (dates: Date[]) => void
}

function CoverageRow({ cov, produto, dates, isOpen, onToggle, onDatesChange }: CoverageRowProps) {
  const priceDay = getPriceForCoverage(produto, cov.code)
  return (
    <>
      <div className={styles.coverageRow} onClick={onToggle}>
        <div className={styles.coverageRowInfo}>
          <div className={styles.coverageRowNameRow}>
            <span className={`type-body-sm ${styles.coverageRowName}`}>
              {STATE_LABELS[cov.code] ?? cov.code}
            </span>
            {dates.length > 0 && (
              <Badge
                variant="accent"
                label={`${dates.length} ${dates.length === 1 ? 'dia' : 'dias'}`}
              />
            )}
          </div>
          {dates.length > 0 && (
            <span className={`type-body-xs ${styles.coverageRowDates}`}>
              {dates.map(formatDateShort).join(' • ')}
            </span>
          )}
        </div>
        <span className={`type-body-xs ${styles.coverageRowMeta}`}>
          ~{formatImpressions(cov.impressions)} imp./dia
        </span>
        <span className={`type-body-xs ${styles.coverageRowPrice}`}>
          {formatCurrency(priceDay)}/dia
        </span>
      </div>
      {isOpen && (
        <div className={styles.inlineCalendarWrapper}>
          <MultiDateCalendar value={dates} onChange={onDatesChange} />
        </div>
      )}
    </>
  )
}

export default function ConfigStep({
  produto,
  initialDates,
  initialDatesPerCoverage,
  onNext,
  onBack,
}: ConfigStepProps) {
  const portal = getPortal(produto.portalId)

  const [dates, setDates] = useState<Date[]>(initialDates ?? [])
  const [datesPerCoverage, setDatesPerCoverage] = useState<Record<string, Date[]>>(
    initialDatesPerCoverage ?? {}
  )
  const [openCalendarCode, setOpenCalendarCode] = useState<string | null>(null)

  const shouldGroup = produto.coverages.length > 8

  function toggleCalendar(code: string) {
    setOpenCalendarCode((prev) => (prev === code ? null : code))
  }

  function updateCoverageDates(code: string, newDates: Date[]) {
    setDatesPerCoverage((prev) => ({ ...prev, [code]: newDates }))
  }

  const canAdvance = produto.isRegional
    ? Object.values(datesPerCoverage).some((d) => d.length > 0)
    : dates.length > 0

  function handleNext() {
    if (!canAdvance) return
    if (produto.isRegional) {
      const finalSelections = produto.coverages
        .filter((c) => (datesPerCoverage[c.code]?.length ?? 0) > 0)
        .map((c) => ({ coverage: c.code, dates: datesPerCoverage[c.code] }))
      onNext(finalSelections, [])
    } else {
      onNext([], dates)
    }
  }

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className="type-title-md">Configure sua Diária</h2>
        <p className={`type-body-sm ${styles.subtitle}`}>
          Defina a localização e os dias em que seu anúncio será veiculado.
        </p>
        <div className={styles.portalContext}>
          <div className={styles.portalContextLeft}>
            {portal.svgPath && (
              <img src={portal.svgPath} alt={portal.name} className={styles.portalLogo} />
            )}
            <span className={`type-body-sm ${styles.portalLabel}`}>
              {portal.url} · {produto.name}
            </span>
          </div>
          <Badge
            variant={produto.isRegional ? 'accent' : 'neutral'}
            label={produto.isRegional ? 'Regional' : 'Nacional'}
          />
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.formColumn}>
          {/* ── Regional flow ── */}
          {produto.isRegional && (
            <fieldset className={styles.fieldset}>
              {shouldGroup ? (
                <div className={styles.regionGroups}>
                  {MACROREGIONS.map(({ label, codes }) => {
                    const covsInGroup = produto.coverages.filter((c) => codes.includes(c.code))
                    if (covsInGroup.length === 0) return null
                    return (
                      <div key={label} className={styles.regionOptionGroup}>
                        <p className={`type-caption-sm ${styles.regionSectionLabel}`}>{label}</p>
                        {covsInGroup.map((cov) => (
                          <CoverageRow
                            key={cov.code}
                            cov={cov}
                            produto={produto}
                            dates={datesPerCoverage[cov.code] ?? []}
                            isOpen={openCalendarCode === cov.code}
                            onToggle={() => toggleCalendar(cov.code)}
                            onDatesChange={(newDates) => updateCoverageDates(cov.code, newDates)}
                          />
                        ))}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className={styles.regionOptionContainer}>
                  {produto.coverages.map((cov) => (
                    <CoverageRow
                      key={cov.code}
                      cov={cov}
                      produto={produto}
                      dates={datesPerCoverage[cov.code] ?? []}
                      isOpen={openCalendarCode === cov.code}
                      onToggle={() => toggleCalendar(cov.code)}
                      onDatesChange={(newDates) => updateCoverageDates(cov.code, newDates)}
                    />
                  ))}
                </div>
              )}
            </fieldset>
          )}

          {/* ── National flow ── */}
          {!produto.isRegional && (
            <div className={styles.calendarCard}>
              <div className={styles.calendarCardHeader}>
                <div className={styles.calendarTitleRow}>
                  <p className={`type-title-sm ${styles.calendarTitle}`}>Dias de veiculação</p>
                  {dates.length > 0 && (
                    <Badge
                      variant="accent"
                      label={`${dates.length} ${dates.length === 1 ? 'dia' : 'dias'}`}
                    />
                  )}
                </div>
                {dates.length > 0 && (
                  <span className={`type-body-xs ${styles.calendarDates}`}>
                    {dates.map(formatDateShort).join(' • ')}
                  </span>
                )}
              </div>
              <div className={styles.calendarCardDivider} />
              <div className={styles.calendarCardBody}>
                <MultiDateCalendar value={dates} onChange={setDates} />
              </div>
            </div>
          )}
        </div>

        <aside className={styles.summaryColumn}>
          <StaticCard className={styles.pricingCard}>
            <p className={`type-title-sm ${styles.summaryTitle}`}>Estimativa de valor</p>

            {produto.isRegional ? (
              <>
                <p className={`type-body-xs ${styles.priceHint}`}>
                  Preço e impressões variam por estado.
                </p>
                {!Object.values(datesPerCoverage).some((d) => d.length > 0) ? (
                  <p className={`type-body-xs ${styles.priceHint}`}>
                    Selecione uma região e os dias para ver o valor.
                  </p>
                ) : (
                  <>
                    {produto.coverages
                      .filter((c) => (datesPerCoverage[c.code]?.length ?? 0) > 0)
                      .map((c) => {
                        const covDates = datesPerCoverage[c.code]
                        const covInfo = produto.coverages.find((cv) => cv.code === c.code)
                        const priceDay = getPriceForCoverage(produto, c.code)
                        return (
                          <div key={c.code} className={styles.priceRegionRow}>
                            <div className={styles.priceRegionInfo}>
                              <span className={`type-caption-sm ${styles.priceRegionLabel}`}>
                                {STATE_LABELS[c.code] ?? c.code}
                                <span className={styles.priceDayCount}>
                                  {' '}
                                  · {covDates.length} {covDates.length === 1 ? 'dia' : 'dias'}
                                </span>
                              </span>
                              {covInfo && (
                                <span className={`type-body-xs ${styles.priceRegionImp}`}>
                                  ~{formatImpressions(covInfo.impressions)} imp./dia
                                </span>
                              )}
                            </div>
                            <span className={`type-body-xs ${styles.priceValue}`}>
                              {formatCurrency(covDates.length * priceDay)}
                            </span>
                          </div>
                        )
                      })}
                    <div className={styles.priceDivider} />
                    <div className={styles.priceSubtotalRow}>
                      <span className={`type-body-sm ${styles.priceSubtotalLabel}`}>Subtotal</span>
                      <span className={`type-title-sm ${styles.priceSubtotalValue}`}>
                        {formatCurrency(
                          produto.coverages.reduce((sum, c) => {
                            const d = datesPerCoverage[c.code]?.length ?? 0
                            return sum + d * getPriceForCoverage(produto, c.code)
                          }, 0)
                        )}
                      </span>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className={styles.priceRow}>
                  <span className={`type-body-sm ${styles.priceLabel}`}>Impressões estimadas</span>
                  <span className={`type-body-sm ${styles.priceValue}`}>
                    ~{formatImpressions(produto.coverages[0].impressions)}/dia
                  </span>
                </div>
                <div className={styles.priceRow}>
                  <span className={`type-body-sm ${styles.priceLabel}`}>Preço por diária</span>
                  <span className={`type-body-sm ${styles.priceValue}`}>
                    {formatCurrency(getPriceForCoverage(produto, 'Nacional'))}
                  </span>
                </div>
                <div className={styles.priceDivider} />
                {dates.length === 0 ? (
                  <p className={`type-body-xs ${styles.priceHint}`}>
                    Selecione os dias para ver o subtotal.
                  </p>
                ) : (
                  <>
                    <div className={styles.priceRow}>
                      <span className={`type-body-sm ${styles.priceLabel}`}>Dias selecionados</span>
                      <span className={`type-body-sm ${styles.priceValue}`}>{dates.length}</span>
                    </div>
                    <div className={styles.priceDivider} />
                    <div className={styles.priceSubtotalRow}>
                      <span className={`type-body-sm ${styles.priceSubtotalLabel}`}>Subtotal</span>
                      <span className={`type-title-sm ${styles.priceSubtotalValue}`}>
                        {formatCurrency(dates.length * getPriceForCoverage(produto, 'Nacional'))}
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </StaticCard>

          <Accordion
            items={[
              {
                id: 'formatos',
                label: 'Formatos incluídos',
                detail: `${produto.formats.length} ${produto.formats.length === 1 ? 'formato' : 'formatos'}`,
                content: (
                  <div className={styles.accordionContent}>
                    <ul className={styles.formatList}>
                      {produto.formats.map((f) => {
                        const svgPath = getFormatSvg(f.formatId)
                        const dim = getPrimaryDimension(f.formatId)
                        return (
                          <li key={f.formatId} className={styles.formatItem}>
                            {svgPath ? (
                              <img
                                src={svgPath}
                                alt=""
                                aria-hidden="true"
                                className={styles.formatThumb}
                              />
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
                                <span className={`type-caption-lg ${styles.formatName}`}>
                                  {f.formatName}
                                </span>
                                {dim && (
                                  <span className={`type-caption-sm ${styles.formatSpecs}`}>
                                    {dim.width}×{dim.height} | {f.devices}
                                  </span>
                                )}
                              </div>
                              <span className={`type-body-xs ${styles.formatPositions}`}>
                                {f.positions.join(' • ')}
                              </span>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ),
              },
            ]}
          />

          <div className={styles.actions}>
            <Button variant="secondary" iconLeft="arrow_back" onClick={onBack}>
              Voltar
            </Button>
            <Button
              variant="primary"
              iconRight="arrow_forward"
              onClick={handleNext}
              disabled={!canAdvance}
            >
              Próximo
            </Button>
          </div>
        </aside>
      </div>
    </section>
  )
}

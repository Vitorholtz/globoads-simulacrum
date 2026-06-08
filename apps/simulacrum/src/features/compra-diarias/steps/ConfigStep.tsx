import { useState, useEffect } from 'react'
import { Button, Badge, MultiDateCalendar } from '@globo-ads/ds'
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import {
  formatCurrency,
  formatImpressions,
  getPriceForCoverage,
  MACROREGIONS,
} from '../../../data/diarias'
import type { CoverageInfo, DiariaProduto } from '../../../data/diarias'
import { STATE_LABELS, formatDateShort } from '../../../data/rules/diarias'
import { useDiarias } from '../context/DiariasContext'
import styles from './ConfigStep.module.css'

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
      <button type="button" className={styles.coverageRow} onClick={onToggle}>
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
      </button>
      {isOpen && (
        <div className={styles.inlineCalendarWrapper}>
          <MultiDateCalendar value={dates} onChange={onDatesChange} />
        </div>
      )}
    </>
  )
}

export default function ConfigStep() {
  const { selection, handleConfigNext: onNext, setStep, updateDatesLive } = useDiarias()
  const produto = selection.produto!
  const initialDates = selection.dates
  const initialDatesPerCoverage = Object.fromEntries(
    selection.regionalSelections.map((r) => [r.coverage, r.dates])
  )

  const [dates, setDates] = useState<Date[]>(initialDates ?? [])
  const [datesPerCoverage, setDatesPerCoverage] = useState<Record<string, Date[]>>(
    initialDatesPerCoverage ?? {}
  )
  const [openCalendarCode, setOpenCalendarCode] = useState<string | null>(null)
  const [showBackConfirm, setShowBackConfirm] = useState(false)

  const shouldGroup = produto.coverages.length > 8

  const hasSelections = produto.isRegional
    ? Object.values(datesPerCoverage).some((d) => d.length > 0)
    : dates.length > 0

  const totalSelectedDays = produto.isRegional
    ? Object.values(datesPerCoverage).reduce((sum, d) => sum + d.length, 0)
    : dates.length

  const canAdvance = hasSelections

  function toggleCalendar(code: string) {
    setOpenCalendarCode((prev) => (prev === code ? null : code))
  }

  function updateCoverageDates(code: string, newDates: Date[]) {
    setDatesPerCoverage((prev) => ({ ...prev, [code]: newDates }))
  }

  function clearSelections() {
    if (produto.isRegional) {
      setDatesPerCoverage({})
      setOpenCalendarCode(null)
    } else {
      setDates([])
    }
  }

  useEffect(() => {
    if (produto.isRegional) {
      const synced = produto.coverages
        .filter((c) => (datesPerCoverage[c.code]?.length ?? 0) > 0)
        .map((c) => ({ coverage: c.code, dates: datesPerCoverage[c.code] }))
      updateDatesLive([], synced)
    } else {
      updateDatesLive(dates, [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates, datesPerCoverage])

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
      </header>

      <div className={styles.formColumn}>
        {/* ── Regional flow ── */}
        {produto.isRegional && (
          <fieldset className={styles.fieldset}>
            {hasSelections && (
              <div className={styles.fieldsetActions}>
                <span className={`type-caption-md ${styles.fieldsetDayCount}`}>
                  {totalSelectedDays}{' '}
                  {totalSelectedDays === 1 ? 'dia selecionado' : 'dias selecionados'}
                </span>
                <Button
                  variant="tertiary"
                  size="sm"
                  iconLeft="remove_done"
                  onClick={clearSelections}
                >
                  Limpar seleção
                </Button>
              </div>
            )}
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
                <div className={styles.calendarTitleActions}>
                  {dates.length > 0 && (
                    <Badge
                      variant="accent"
                      label={`${dates.length} ${dates.length === 1 ? 'dia' : 'dias'}`}
                    />
                  )}
                  {dates.length > 0 && (
                    <Button
                      variant="tertiary"
                      size="sm"
                      iconLeft="remove_done"
                      onClick={clearSelections}
                    >
                      Limpar
                    </Button>
                  )}
                </div>
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

      <div className={styles.actions}>
        <Button
          variant="secondary"
          iconLeft="arrow_back"
          onClick={() => (hasSelections ? setShowBackConfirm(true) : setStep(2))}
        >
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

      <ConfirmDialog
        isOpen={showBackConfirm}
        title="Descartar seleção?"
        description="Você tem dias selecionados. Ao voltar, eles serão descartados e você precisará refazê-los."
        confirmLabel="Descartar e voltar"
        onConfirm={() => {
          setShowBackConfirm(false)
          setStep(2)
        }}
        onCancel={() => setShowBackConfirm(false)}
      />
    </section>
  )
}

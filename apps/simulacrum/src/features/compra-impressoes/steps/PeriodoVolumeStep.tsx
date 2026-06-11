import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Button, DateRangePicker, TextField } from '@globo-ads/ds'
import { MIN_IMPRESSIONS, getDurationDays, isValidImpressions } from '../../../data'
import { useImpressoes } from '../context/ImpressoesContext'
import styles from './PeriodoVolumeStep.module.css'

const PRESETS = [50_000, 100_000, 500_000, 1_000_000]

function formatPreset(n: number): string {
  return n >= 1_000_000 ? `${n / 1_000_000} mi` : `${n / 1_000} mil`
}

export default function PeriodoVolumeStep({
  actionsContainer,
}: {
  actionsContainer: HTMLDivElement | null
}) {
  const { selection, updateSelection, handlePeriodoVolume, setStep } = useImpressoes()

  const [start, setStart] = useState<Date | null>(selection.startDate)
  const [end, setEnd] = useState<Date | null>(selection.endDate)
  const [impressions, setImpressions] = useState<number>(selection.impressions)

  const duration = getDurationDays(start, end)
  const impressionsValid = isValidImpressions(impressions)
  const periodValid = Boolean(start && end && end >= start)
  const canAdvance = impressionsValid && periodValid

  function handleRangeChange(range: { start: Date; end: Date }) {
    setStart(range.start)
    setEnd(range.end)
    updateSelection({ startDate: range.start, endDate: range.end })
  }

  function handleImpressionsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '')
    const n = digits ? parseInt(digits, 10) : 0
    setImpressions(n)
    updateSelection({ impressions: n })
  }

  function applyPreset(n: number) {
    const next = impressions + n
    setImpressions(next)
    updateSelection({ impressions: next })
  }

  function handleNext() {
    if (start && end && impressionsValid) handlePeriodoVolume(start, end, impressions)
  }

  const actions = (
    <div className={styles.actions}>
      <Button variant="secondary" iconLeft="arrow_back" onClick={() => setStep(3)}>
        Voltar
      </Button>
      <Button
        variant="primary"
        iconRight="arrow_forward"
        disabled={!canAdvance}
        onClick={handleNext}
      >
        Próximo
      </Button>
    </div>
  )

  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h2 className="type-title-md">Período e volume de impressões</h2>
          <p className={`type-body-sm ${styles.subtitle}`}>
            Defina por quanto tempo o anúncio será veiculado e quantas impressões deseja contratar.
          </p>
        </header>

        <div className={styles.fields}>
          <div className={styles.field}>
            <DateRangePicker
              label="Período de veiculação"
              helpText="Datas de início e de fim"
              value={{ start, end }}
              onChange={handleRangeChange}
            />
            {duration > 0 && (
              <div className={styles.durationCard}>
                <span className="material-symbols-rounded icon-md" aria-hidden="true">
                  event_available
                </span>
                <span className="type-caption-lg">
                  {duration} {duration === 1 ? 'dia' : 'dias'} de veiculação
                </span>
              </div>
            )}
          </div>

          <div className={styles.field}>
            <TextField
              label="Quantidade de impressões"
              leadingIcon="visibility"
              placeholder="Ex.: 100.000"
              value={impressions > 0 ? impressions.toLocaleString('pt-BR') : ''}
              onChange={handleImpressionsChange}
              errorMessage={
                impressions > 0 && !impressionsValid
                  ? `Mínimo de ${MIN_IMPRESSIONS.toLocaleString('pt-BR')} impressões.`
                  : undefined
              }
              helpText={`Mínimo de ${MIN_IMPRESSIONS.toLocaleString('pt-BR')} impressões.`}
            />
            <div className={styles.presets}>
              {PRESETS.map((n) => (
                <Button
                  key={n}
                  variant="secondary"
                  size="sm"
                  iconLeft="add"
                  onClick={() => applyPreset(n)}
                >
                  {formatPreset(n)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {!actionsContainer && actions}
      </section>

      {actionsContainer && createPortal(actions, actionsContainer)}
    </>
  )
}

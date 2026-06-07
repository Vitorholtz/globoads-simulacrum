import { useState } from 'react'
import { Button, DateRangePicker, TextField } from '@globo-ads/ds'
import { MIN_IMPRESSIONS } from '../../../data/impressoes'
import {
  computeImpressoesTotal,
  formatCurrency,
  getDurationDays,
  getEffectiveCpm,
  isValidImpressions,
} from '../../../data/rules/impressoes'
import { useImpressoes } from '../context/ImpressoesContext'
import styles from './PeriodoVolumeStep.module.css'

const PRESETS = [50_000, 100_000, 500_000, 1_000_000]

function formatPreset(n: number): string {
  return n >= 1_000_000 ? `${n / 1_000_000} mi` : `${n / 1_000} mil`
}

export default function PeriodoVolumeStep() {
  const { selection, updateSelection, handlePeriodoVolume, setStep } = useImpressoes()

  const [start, setStart] = useState<Date | null>(selection.startDate)
  const [end, setEnd] = useState<Date | null>(selection.endDate)
  const [impressions, setImpressions] = useState<number>(selection.impressions)

  const duration = getDurationDays(start, end)
  const cpm = getEffectiveCpm(selection)
  const total = computeImpressoesTotal({ ...selection, impressions })
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
    setImpressions(n)
    updateSelection({ impressions: n })
  }

  function handleNext() {
    if (start && end && impressionsValid) handlePeriodoVolume(start, end, impressions)
  }

  return (
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
            value={{ start, end }}
            onChange={handleRangeChange}
          />
          {duration > 0 && (
            <span className={`type-caption-md ${styles.fieldHint}`}>
              {duration} {duration === 1 ? 'dia' : 'dias'} de veiculação
            </span>
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
            helpText={`Volume mínimo de ${MIN_IMPRESSIONS.toLocaleString('pt-BR')} impressões, sem limite máximo.`}
          />
          <div className={styles.presets}>
            {PRESETS.map((n) => (
              <Button
                key={n}
                variant="tertiary"
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

      {cpm > 0 && impressionsValid && (
        <div className={styles.estimate}>
          <span className={`type-body-sm ${styles.estimateLabel}`}>
            {impressions.toLocaleString('pt-BR')} impressões × {formatCurrency(cpm)}/mil
          </span>
          <span className={`type-title-sm ${styles.estimateValue}`}>{formatCurrency(total)}</span>
        </div>
      )}

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
    </section>
  )
}

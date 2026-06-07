import { useState } from 'react'
import { Badge, Button, InteractiveCard, Radio } from '@globo-ads/ds'
import {
  KPI_DESCRIPTIONS,
  KPI_LABELS,
  OBJETIVOS,
  OBJETIVO_KPIS,
  type ImpressoesObjetivo,
  type KpiId,
} from '../../../data/impressoes'
import { useImpressoes } from '../context/ImpressoesContext'
import styles from './ObjetivoKpiStep.module.css'

export default function ObjetivoKpiStep() {
  const { selection, handleObjetivoKpi } = useImpressoes()
  const [objetivo, setObjetivo] = useState<ImpressoesObjetivo | null>(selection.objetivo)
  const [kpi, setKpi] = useState<KpiId | null>(selection.kpi)

  const kpis = objetivo ? OBJETIVO_KPIS[objetivo] : []

  function selectObjetivo(id: ImpressoesObjetivo) {
    setObjetivo(id)
    // Auto-seleciona o KPI quando há apenas uma opção; senão, exige escolha.
    const options = OBJETIVO_KPIS[id]
    setKpi(options.length === 1 ? options[0] : null)
  }

  const canAdvance = Boolean(objetivo && kpi)

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className="type-title-md">Qual é o objetivo do anúncio?</h2>
        <p className={`type-body-sm ${styles.subtitle}`}>
          Escolha o objetivo e o indicador (KPI) que vão guiar a entrega do seu anúncio.
        </p>
      </header>

      <div className={styles.grid}>
        {OBJETIVOS.map((o) => {
          const isSelected = objetivo === o.id
          return (
            <InteractiveCard
              key={o.id}
              className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              onClick={() => selectObjetivo(o.id)}
              aria-pressed={isSelected}
              aria-label={`Objetivo ${o.name}`}
            >
              <span
                className={`material-symbols-rounded icon-lg ${styles.cardIcon}`}
                aria-hidden="true"
              >
                {o.icon}
              </span>
              <span className={`type-title-sm ${styles.cardTitle}`}>{o.name}</span>
              <span className={`type-body-sm ${styles.cardDesc}`}>{o.description}</span>
            </InteractiveCard>
          )
        })}
      </div>

      {objetivo && (
        <div className={styles.kpiBlock}>
          <p className={`type-title-sm ${styles.kpiTitle}`}>Indicador de desempenho (KPI)</p>
          {kpis.length === 1 ? (
            <div className={styles.kpiSingle}>
              <Badge variant="accent" label={KPI_LABELS[kpis[0]]} />
              <span className="material-symbols-rounded icon-sm" aria-hidden="true">
                arrow_forward
              </span>
              <span className={`type-body-sm ${styles.kpiSingleDesc}`}>
                {KPI_DESCRIPTIONS[kpis[0]]}
              </span>
            </div>
          ) : (
            <div className={styles.kpiOptions}>
              {kpis.map((k) => (
                <Radio
                  key={k}
                  name="kpi"
                  value={k}
                  checked={kpi === k}
                  onChange={() => setKpi(k)}
                  label={KPI_LABELS[k]}
                  helpText={KPI_DESCRIPTIONS[k]}
                  showHelpText
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.actions}>
        <Button
          variant="primary"
          iconRight="arrow_forward"
          disabled={!canAdvance}
          onClick={() => objetivo && kpi && handleObjetivoKpi(objetivo, kpi)}
        >
          Próximo
        </Button>
      </div>
    </section>
  )
}

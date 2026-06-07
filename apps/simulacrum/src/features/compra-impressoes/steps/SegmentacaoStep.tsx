import { useState } from 'react'
import { Button, InteractiveCard } from '@globo-ads/ds'
import { AUDIENCE_CATALOG } from '../../../data/impressoes'
import { useImpressoes } from '../context/ImpressoesContext'
import styles from './SegmentacaoStep.module.css'

export default function SegmentacaoStep() {
  const { selection, updateSelection, handleSegmentacao, setStep } = useImpressoes()
  const [audienceId, setAudienceId] = useState<string | null>(selection.audienceId)

  function select(id: string) {
    setAudienceId(id)
    updateSelection({ audienceId: id })
  }

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className="type-title-md">Quem você quer alcançar?</h2>
        <p className={`type-body-sm ${styles.subtitle}`}>
          Escolha a audiência que melhor representa o público do seu anúncio.
        </p>
      </header>

      <div className={styles.grid}>
        {AUDIENCE_CATALOG.map((a) => {
          const isSelected = audienceId === a.id
          return (
            <InteractiveCard
              key={a.id}
              className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              onClick={() => select(a.id)}
              aria-pressed={isSelected}
              aria-label={`Audiência ${a.name}`}
            >
              <div className={styles.cardHeader}>
                <span
                  className={`material-symbols-rounded icon-lg ${styles.cardIcon}`}
                  aria-hidden="true"
                >
                  {a.icon}
                </span>
                {isSelected && (
                  <span
                    className={`material-symbols-rounded icon-md ${styles.check}`}
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                )}
              </div>
              <span className={`type-title-sm ${styles.cardTitle}`}>{a.name}</span>
              <span className={`type-body-sm ${styles.cardDesc}`}>{a.description}</span>
            </InteractiveCard>
          )
        })}
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" iconLeft="arrow_back" onClick={() => setStep(2)}>
          Voltar
        </Button>
        <Button
          variant="primary"
          iconRight="arrow_forward"
          disabled={!audienceId}
          onClick={() => audienceId && handleSegmentacao(audienceId)}
        >
          Próximo
        </Button>
      </div>
    </section>
  )
}

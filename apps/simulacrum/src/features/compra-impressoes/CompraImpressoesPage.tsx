import { useNavigate, useSearchParams } from 'react-router-dom'
import { Breadcrumb } from '@globo-ads/ds'
import { ImpressoesProvider, useImpressoes, type Step } from './context/ImpressoesContext'
import PageContainer from '../../components/PageContainer/PageContainer'
import ImpressoesPricingCard from './components/ImpressoesPricingCard/ImpressoesPricingCard'
import ImpressoesFormatsAccordion from './components/ImpressoesFormatsAccordion/ImpressoesFormatsAccordion'
import ObjetivoKpiStep from './steps/ObjetivoKpiStep'
import ProdutoConfigStep from './steps/ProdutoConfigStep'
import SegmentacaoStep from './steps/SegmentacaoStep'
import PeriodoVolumeStep from './steps/PeriodoVolumeStep'
import ResumoStep from './steps/ResumoStep'
import { isValidImpressions } from '../../data/rules/impressoes'
import styles from './CompraImpressoesPage.module.css'

const STEP_LABELS: Record<Step, string> = {
  1: 'Objetivo',
  2: 'Produto',
  3: 'Audiência',
  4: 'Volume',
  5: 'Resumo',
}

const STEP_ICONS: Record<Step, string> = {
  1: 'flag',
  2: 'inventory_2',
  3: 'groups',
  4: 'event',
  5: 'receipt_long',
}

export default function CompraImpressoesPage() {
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')

  return (
    <ImpressoesProvider editCartItemId={editId}>
      <CompraImpressoesContent />
    </ImpressoesProvider>
  )
}

function CompraImpressoesContent() {
  const navigate = useNavigate()
  const { step, selection } = useImpressoes()
  const showAside = step !== 1 && step !== 5

  return (
    <PageContainer>
      <Breadcrumb
        items={[
          { label: 'Página Inicial', onClick: () => navigate('/') },
          { label: 'Compra por Impressões' },
        ]}
      />

      <div className={styles.pageHeader}>
        <h1 className="type-display-md">Compra por Impressões</h1>
        <p className={`type-body-md ${styles.pageSubtitle}`}>
          Contrate impressões por CPM e alcance seu público nas plataformas digitais da Globo
        </p>
      </div>

      <StepIndicator />

      <div className={`${styles.body} ${showAside ? '' : styles.bodyFull}`}>
        <div key={step} className={styles.stepContent}>
          <ActiveStep />
        </div>

        {showAside && (
          <aside className={styles.summaryColumn}>
            <ImpressoesPricingCard selection={selection} />
            {selection.produto && <ImpressoesFormatsAccordion produto={selection.produto} />}
          </aside>
        )}
      </div>
    </PageContainer>
  )
}

function ActiveStep() {
  const { step, selection } = useImpressoes()

  if (step === 1) return <ObjetivoKpiStep />
  if (step === 2 && selection.objetivo) return <ProdutoConfigStep />
  if (step === 3 && selection.produto) return <SegmentacaoStep />
  if (step === 4 && selection.audienceId) return <PeriodoVolumeStep />
  if (
    step === 5 &&
    selection.produto &&
    selection.audienceId &&
    selection.startDate &&
    selection.endDate &&
    isValidImpressions(selection.impressions)
  ) {
    return <ResumoStep />
  }

  return null
}

function StepIndicator() {
  const { step: currentStep, setStep } = useImpressoes()
  const steps: Step[] = [1, 2, 3, 4, 5]

  return (
    <nav className={styles.stepIndicator} aria-label="Progresso da compra">
      {steps.flatMap((s, index) => {
        const state = s < currentStep ? 'done' : s === currentStep ? 'active' : 'pending'
        const isDone = state === 'done'
        const inner = (
          <>
            <div className={styles.stepDotContainer}>
              <div className={`${styles.stepDot} ${styles[state]}`}>
                <span className="material-symbols-rounded icon-sm" aria-hidden="true">
                  {isDone ? 'check' : STEP_ICONS[s]}
                </span>
              </div>
            </div>
            <span className={`type-caption-sm ${styles.stepLabel} ${styles[state]}`}>
              {STEP_LABELS[s]}
            </span>
          </>
        )
        const item = isDone ? (
          <button
            key={s}
            type="button"
            className={`${styles.stepItem} ${styles.stepItemClickable}`}
            onClick={() => setStep(s)}
            aria-label={`Voltar para ${STEP_LABELS[s]}`}
          >
            {inner}
          </button>
        ) : (
          <div key={s} className={styles.stepItem}>
            {inner}
          </div>
        )
        if (index < steps.length - 1) {
          return [
            item,
            <div
              key={`line-${s}`}
              className={`${styles.stepLine} ${isDone ? styles.lineDone : ''}`}
            />,
          ]
        }
        return [item]
      })}
    </nav>
  )
}

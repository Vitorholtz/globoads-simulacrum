import { useNavigate } from 'react-router-dom'
import { Breadcrumb, BadgeCounter } from '@globo-ads/ds'
import { DiariasProvider, useDiarias, type Step } from './context/DiariasContext'
import PortalStep from './steps/PortalStep'
import ProdutoStep from './steps/ProdutoStep'
import ConfigStep from './steps/ConfigStep'
import ResumoStep from './steps/ResumoStep'
import RecibosStep from './steps/RecibosStep'
import styles from './CompraDiariasPage.module.css'

const STEP_LABELS: Record<Step, string> = {
  1: 'Portal',
  2: 'Produto',
  3: 'Configuração',
  4: 'Resumo',
}

const STEP_ICONS: Record<Step, string> = {
  1: 'language',
  2: 'inventory_2',
  3: 'tune',
  4: 'receipt_long',
}

export default function CompraDiariasPage() {
  return (
    <DiariasProvider>
      <CompraDiariasContent />
    </DiariasProvider>
  )
}

function CompraDiariasContent() {
  const navigate = useNavigate()
  const { step, setStep, purchases, showReceipts } = useDiarias()

  return (
    <div className={styles.page}>
      <Breadcrumb
        items={[{ label: 'Página Inicial', onClick: () => navigate('/') }, { label: 'Diárias' }]}
      />

      <div className={styles.pageHeader}>
        <h1 className="type-display-md">Diárias na Globo</h1>
        <p className={`type-body-md ${styles.pageSubtitle}`}>
          Anuncie por 24 horas em um dos portais da família G e Globoplay
        </p>
      </div>

      {!showReceipts && (
        <StepIndicator
          currentStep={step}
          onStepClick={setStep}
          pendingCount={purchases.length + (step === 4 ? 1 : 0)}
        />
      )}

      <div key={showReceipts ? 'receipts' : step} className={styles.stepContent}>
        {showReceipts ? <RecibosStep /> : <ActiveStep />}
      </div>
    </div>
  )
}

function ActiveStep() {
  const { step, selection } = useDiarias()

  if (step === 1) return <PortalStep />

  if (step === 2 && selection.portal) return <ProdutoStep />

  if (step === 3 && selection.produto) return <ConfigStep />

  if (
    step === 4 &&
    selection.portal &&
    selection.produto &&
    (selection.produto.isRegional
      ? selection.regionalSelections.length > 0
      : selection.dates.length > 0)
  ) {
    return <ResumoStep />
  }

  return null
}

interface StepIndicatorProps {
  currentStep: Step
  onStepClick: (step: Step) => void
  pendingCount: number
}

function StepIndicator({ currentStep, onStepClick, pendingCount }: StepIndicatorProps) {
  const steps: Step[] = [1, 2, 3, 4]

  return (
    <nav className={styles.stepIndicator} aria-label="Progresso da compra">
      {steps.flatMap((s, index) => {
        const state = s < currentStep ? 'done' : s === currentStep ? 'active' : 'pending'
        const isDone = state === 'done'
        const showBadge = s === 4 && pendingCount > 0
        const inner = (
          <>
            <div className={styles.stepDotContainer}>
              <div className={`${styles.stepDot} ${styles[state]}`}>
                {isDone ? (
                  <span className="material-symbols-rounded icon-sm" aria-hidden="true">
                    check
                  </span>
                ) : (
                  <span className="material-symbols-rounded icon-sm" aria-hidden="true">
                    {STEP_ICONS[s]}
                  </span>
                )}
              </div>
              {showBadge && <BadgeCounter value={pendingCount} className={styles.stepBadge} />}
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
            onClick={() => onStepClick(s)}
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

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, BadgeCounter } from '@globo-ads/ds'
import type {
  ConfirmedSelection,
  DiariaProduto,
  DiariasSelection,
  PortalId,
  RegionalSelection,
} from '../../data/diarias'
import PortalStep from './steps/PortalStep'
import ProdutoStep from './steps/ProdutoStep'
import ConfigStep from './steps/ConfigStep'
import ResumoStep from './steps/ResumoStep'
import RecibosStep from './steps/RecibosStep'
import styles from './CompraDiariasPage.module.css'

type Step = 1 | 2 | 3 | 4

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

const EMPTY_SELECTION: DiariasSelection = {
  portal: null,
  produto: null,
  regionalSelections: [],
  dates: [],
}

const SESSION_KEY = 'diarias_wizard'

function readSession(): {
  step: Step
  selection: DiariasSelection
  purchases: ConfirmedSelection[]
} | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      step: parsed.step as Step,
      selection: {
        ...parsed.selection,
        dates: (parsed.selection.dates ?? []).map((d: string) => new Date(d)),
        regionalSelections: (parsed.selection.regionalSelections ?? []).map(
          (r: { coverage: string; dates: string[] }) => ({
            ...r,
            dates: r.dates.map((d) => new Date(d)),
          })
        ),
      },
      purchases: (parsed.purchases ?? []).map(
        (p: {
          portal: PortalId
          produto: DiariaProduto
          dates: string[]
          regionalSelections: { coverage: string; dates: string[] }[]
        }) => ({
          ...p,
          dates: (p.dates ?? []).map((d) => new Date(d)),
          regionalSelections: (p.regionalSelections ?? []).map((r) => ({
            ...r,
            dates: r.dates.map((d) => new Date(d)),
          })),
        })
      ),
    }
  } catch {
    return null
  }
}

export default function CompraDiariasPage() {
  const navigate = useNavigate()
  const saved = readSession()
  const [step, setStep] = useState<Step>(saved?.step ?? 1)
  const [selection, setSelection] = useState<DiariasSelection>(saved?.selection ?? EMPTY_SELECTION)
  const [purchases, setPurchases] = useState<ConfirmedSelection[]>(saved?.purchases ?? [])
  const [showReceipts, setShowReceipts] = useState(false)

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ step, selection, purchases }))
    } catch {
      // sessionStorage indisponível
    }
  }, [step, selection, purchases])

  function handlePortalSelect(portalId: PortalId) {
    setSelection({ portal: portalId, produto: null, regionalSelections: [], dates: [] })
    setStep(2)
  }

  function handleProdutoSelect(produto: DiariaProduto) {
    setSelection((prev) => ({ ...prev, produto, regionalSelections: [], dates: [] }))
    setStep(3)
  }

  function handleConfigNext(regionalSelections: RegionalSelection[], dates: Date[]) {
    setSelection((prev) => ({ ...prev, regionalSelections, dates }))
    setStep(4)
  }

  function handleAddToCart(confirmed: ConfirmedSelection) {
    setPurchases((prev) => [...prev, confirmed])
    setSelection(EMPTY_SELECTION)
    setStep(1)
  }

  function handleFinalize(confirmed: ConfirmedSelection) {
    setPurchases((prev) => [...prev, confirmed])
    setShowReceipts(true)
  }

  function handleEditPurchase(purchase: ConfirmedSelection, index: number) {
    setPurchases((prev) => prev.filter((_, i) => i !== index))
    setSelection(purchase)
    setStep(3)
  }

  function handleDeletePurchase(index: number) {
    setPurchases((prev) => prev.filter((_, i) => i !== index))
  }

  function handleDeleteCurrentPurchase() {
    setSelection(EMPTY_SELECTION)
    setStep(1)
  }

  function handleReset() {
    setPurchases([])
    setSelection(EMPTY_SELECTION)
    setStep(1)
    setShowReceipts(false)
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // sessionStorage indisponível
    }
  }

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
        {showReceipts ? (
          <RecibosStep purchases={purchases} onReset={handleReset} />
        ) : (
          <>
            {step === 1 && <PortalStep onSelect={handlePortalSelect} />}

            {step === 2 && selection.portal && (
              <ProdutoStep
                portalId={selection.portal}
                onSelect={handleProdutoSelect}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && selection.produto && (
              <ConfigStep
                produto={selection.produto}
                initialDates={selection.dates}
                initialDatesPerCoverage={Object.fromEntries(
                  selection.regionalSelections.map((r) => [r.coverage, r.dates])
                )}
                onNext={handleConfigNext}
                onBack={() => setStep(2)}
              />
            )}

            {step === 4 &&
              selection.portal &&
              selection.produto &&
              (selection.produto.isRegional
                ? selection.regionalSelections.length > 0
                : selection.dates.length > 0) && (
                <ResumoStep
                  selection={selection as ConfirmedSelection}
                  purchases={purchases}
                  onBack={() => setStep(3)}
                  onAddToCart={handleAddToCart}
                  onFinalize={handleFinalize}
                  onEditPurchase={handleEditPurchase}
                  onDeletePurchase={handleDeletePurchase}
                  onDeleteCurrentPurchase={handleDeleteCurrentPurchase}
                />
              )}
          </>
        )}
      </div>
    </div>
  )
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

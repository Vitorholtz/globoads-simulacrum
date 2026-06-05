/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type {
  ConfirmedSelection,
  DiariasSelection,
  DiariaProduto,
  PortalId,
  RegionalSelection,
} from '../../../data/diarias'

export type Step = 1 | 2 | 3 | 4

const EMPTY_SELECTION: DiariasSelection = {
  portal: null,
  produto: null,
  regionalSelections: [],
  dates: [],
}

const SESSION_KEY = 'diarias_wizard'
const VALID_STEPS = new Set<number>([1, 2, 3, 4])

function parseDate(d: unknown): Date | null {
  if (typeof d !== 'string') return null
  const date = new Date(d)
  return isNaN(date.getTime()) ? null : date
}

function parseDates(arr: unknown[]): Date[] {
  return arr.flatMap((d) => {
    const date = parseDate(d)
    return date ? [date] : []
  })
}

function readSession(): {
  step: Step
  selection: DiariasSelection
  purchases: ConfirmedSelection[]
} | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const step = Number(parsed.step)
    if (!VALID_STEPS.has(step)) return null
    return {
      step: step as Step,
      selection: {
        ...parsed.selection,
        dates: parseDates(parsed.selection.dates ?? []),
        regionalSelections: (parsed.selection.regionalSelections ?? []).map(
          (r: { coverage: string; dates: unknown[] }) => ({
            ...r,
            dates: parseDates(r.dates ?? []),
          })
        ),
      },
      purchases: (parsed.purchases ?? []).map(
        (p: {
          portal: PortalId
          produto: DiariaProduto
          dates: unknown[]
          regionalSelections: { coverage: string; dates: unknown[] }[]
        }) => ({
          ...p,
          dates: parseDates(p.dates ?? []),
          regionalSelections: (p.regionalSelections ?? []).map((r) => ({
            ...r,
            dates: parseDates(r.dates ?? []),
          })),
        })
      ),
    }
  } catch {
    return null
  }
}

interface DiariasContextValue {
  step: Step
  selection: DiariasSelection
  purchases: ConfirmedSelection[]
  showReceipts: boolean
  setStep: (step: Step) => void
  handlePortalSelect: (portalId: PortalId) => void
  handleProdutoSelect: (produto: DiariaProduto) => void
  handleConfigNext: (regionalSelections: RegionalSelection[], dates: Date[]) => void
  handleAddToCart: (confirmed: ConfirmedSelection) => void
  handleFinalize: (confirmed: ConfirmedSelection) => void
  handleEditPurchase: (purchase: ConfirmedSelection, index: number) => void
  handleDeletePurchase: (index: number) => void
  handleDeleteCurrentPurchase: () => void
  handleReset: () => void
}

const DiariasContext = createContext<DiariasContextValue | null>(null)

export function DiariasProvider({ children }: { children: ReactNode }) {
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
    <DiariasContext.Provider
      value={{
        step,
        selection,
        purchases,
        showReceipts,
        setStep,
        handlePortalSelect,
        handleProdutoSelect,
        handleConfigNext,
        handleAddToCart,
        handleFinalize,
        handleEditPurchase,
        handleDeletePurchase,
        handleDeleteCurrentPurchase,
        handleReset,
      }}
    >
      {children}
    </DiariasContext.Provider>
  )
}

export function useDiarias(): DiariasContextValue {
  const ctx = useContext(DiariasContext)
  if (!ctx) throw new Error('useDiarias must be used within DiariasProvider')
  return ctx
}

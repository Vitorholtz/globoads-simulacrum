/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  ConfirmedSelection,
  DiariasSelection,
  DiariaProduto,
  PortalId,
  RegionalSelection,
} from '../../../data/diarias'
import { computeTotal } from '../../../data/rules/diarias'
import { useCart } from '../../../cart/CartContext'

export type Step = 1 | 2 | 3 | 4

const EMPTY_SELECTION: DiariasSelection = {
  portal: null,
  produto: null,
  regionalSelections: [],
  dates: [],
}

const SESSION_KEY = 'diarias_wizard'
const VALID_STEPS = new Set<number>([1, 2, 3, 4])

export function clearDiariasWizardSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // sessionStorage unavailable
  }
}

function parseDate(d: unknown): Date | null {
  if (d instanceof Date) return isNaN(d.getTime()) ? null : d
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

function parseSelection(raw: {
  portal: PortalId | null
  produto: DiariaProduto | null
  regionalSelections: { coverage: string; dates: unknown[] }[]
  dates: unknown[]
}): DiariasSelection {
  return {
    ...raw,
    dates: parseDates(raw.dates ?? []),
    regionalSelections: (raw.regionalSelections ?? []).map((r) => ({
      ...r,
      dates: parseDates(r.dates ?? []),
    })),
  }
}

function readSession(): { step: Step; selection: DiariasSelection } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const step = Number(parsed.step)
    if (!VALID_STEPS.has(step)) return null
    return { step: step as Step, selection: parseSelection(parsed.selection) }
  } catch {
    return null
  }
}

interface DiariasContextValue {
  step: Step
  selection: DiariasSelection
  isEditMode: boolean
  setStep: (step: Step) => void
  handlePortalSelect: (portalId: PortalId) => void
  handleProdutoSelect: (produto: DiariaProduto) => void
  handleConfigNext: (regionalSelections: RegionalSelection[], dates: Date[]) => void
  updateDatesLive: (dates: Date[], regionalSelections: RegionalSelection[]) => void
  updateProdutoLive: (produto: DiariaProduto | null) => void
  handleAddToCart: (confirmed: ConfirmedSelection) => void
  handleUpdateCartItem: (confirmed: ConfirmedSelection) => void
  handleCancel: () => void
}

const DiariasContext = createContext<DiariasContextValue | null>(null)

interface DiariasProviderProps {
  children: ReactNode
  editCartItemId?: string | null
}

export function DiariasProvider({ children, editCartItemId }: DiariasProviderProps) {
  const navigate = useNavigate()
  const { items, addItem, updateItem, removeItem } = useCart()

  const editItem = editCartItemId
    ? items.find((item) => item.id === editCartItemId && item.modality === 'diarias')
    : undefined

  const savedSession = readSession()

  const [step, setStep] = useState<Step>(() => {
    if (editItem) return 3
    return savedSession?.step ?? 1
  })

  const [selection, setSelection] = useState<DiariasSelection>(() => {
    if (editItem?.modality === 'diarias')
      return parseSelection(editItem.data as Parameters<typeof parseSelection>[0])
    return savedSession?.selection ?? EMPTY_SELECTION
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ step, selection }))
    } catch {
      // sessionStorage unavailable
    }
  }, [step, selection])

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

  function updateDatesLive(dates: Date[], regionalSelections: RegionalSelection[]) {
    setSelection((prev) => ({ ...prev, dates, regionalSelections }))
  }

  function updateProdutoLive(produto: DiariaProduto | null) {
    setSelection((prev) => ({ ...prev, produto, regionalSelections: [], dates: [] }))
  }

  function handleAddToCart(confirmed: ConfirmedSelection) {
    addItem({ modality: 'diarias', data: confirmed, subtotal: computeTotal(confirmed) })
    setSelection(EMPTY_SELECTION)
    setStep(1)
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // sessionStorage unavailable
    }
    navigate('/carrinho')
  }

  function handleUpdateCartItem(confirmed: ConfirmedSelection) {
    if (!editCartItemId) return
    updateItem(editCartItemId, confirmed, computeTotal(confirmed))
    navigate('/carrinho')
  }

  function handleCancel() {
    if (editCartItemId) {
      removeItem(editCartItemId)
      navigate('/carrinho')
      return
    }
    setSelection(EMPTY_SELECTION)
    setStep(1)
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // sessionStorage unavailable
    }
  }

  return (
    <DiariasContext.Provider
      value={{
        step,
        selection,
        isEditMode: Boolean(editItem),
        setStep,
        handlePortalSelect,
        handleProdutoSelect,
        handleConfigNext,
        updateDatesLive,
        updateProdutoLive,
        handleAddToCart,
        handleUpdateCartItem,
        handleCancel,
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

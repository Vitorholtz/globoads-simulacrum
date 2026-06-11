/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MIN_IMPRESSIONS,
  getProduto,
  computeImpressoesTotal,
  type ImpressoesConfirmedSelection,
  type ImpressoesObjetivo,
  type ImpressoesProduto,
  type ImpressoesSelection,
  type KpiId,
  type PlatformId,
} from '../../../data'
import { useCart } from '../../../cart/CartContext'

export type Step = 1 | 2 | 3 | 4 | 5

const EMPTY_SELECTION: ImpressoesSelection = {
  objetivo: null,
  kpi: null,
  produto: null,
  platforms: [],
  cpmOptionId: null,
  audienceId: null,
  startDate: null,
  endDate: null,
  impressions: 0,
}

const SESSION_KEY = 'impressoes_wizard'
const VALID_STEPS = new Set<number>([1, 2, 3, 4, 5])

export function clearImpressoesWizardSession() {
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

interface RawSelection extends Omit<ImpressoesSelection, 'produto' | 'startDate' | 'endDate'> {
  produto: ImpressoesProduto | null
  startDate: unknown
  endDate: unknown
}

function parseSelection(raw: RawSelection): ImpressoesSelection {
  // Re-hidrata o produto a partir do catálogo (fonte da verdade) quando possível.
  const produto = raw.produto ? (getProduto(raw.produto.id) ?? raw.produto) : null
  return {
    ...raw,
    produto,
    impressions: raw.impressions ?? MIN_IMPRESSIONS,
    startDate: parseDate(raw.startDate),
    endDate: parseDate(raw.endDate),
  }
}

function readSession(): { step: Step; selection: ImpressoesSelection } | null {
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

interface ImpressoesContextValue {
  step: Step
  selection: ImpressoesSelection
  isEditMode: boolean
  setStep: (step: Step) => void
  /** Atualiza campos da seleção ao vivo (mantém o pricing card lateral sincronizado). */
  updateSelection: (partial: Partial<ImpressoesSelection>) => void
  handleObjetivoKpi: (objetivo: ImpressoesObjetivo, kpi: KpiId) => void
  handleProdutoConfig: (
    produto: ImpressoesProduto,
    platforms: PlatformId[],
    cpmOptionId: string
  ) => void
  handleSegmentacao: (audienceId: string) => void
  handlePeriodoVolume: (startDate: Date, endDate: Date, impressions: number) => void
  handleAddToCart: (confirmed: ImpressoesConfirmedSelection) => void
  handleUpdateCartItem: (confirmed: ImpressoesConfirmedSelection) => void
  handleCancel: () => void
}

const ImpressoesContext = createContext<ImpressoesContextValue | null>(null)

interface ImpressoesProviderProps {
  children: ReactNode
  editCartItemId?: string | null
}

export function ImpressoesProvider({ children, editCartItemId }: ImpressoesProviderProps) {
  const navigate = useNavigate()
  const { items, addItem, updateItem, removeItem } = useCart()

  const editItem = editCartItemId
    ? items.find((item) => item.id === editCartItemId && item.modality === 'impressoes')
    : undefined

  const savedSession = readSession()

  const [step, setStep] = useState<Step>(() => {
    if (editItem) return 4
    return savedSession?.step ?? 1
  })

  const [selection, setSelection] = useState<ImpressoesSelection>(() => {
    if (editItem?.modality === 'impressoes')
      return parseSelection(editItem.data as unknown as RawSelection)
    return savedSession?.selection ?? EMPTY_SELECTION
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ step, selection }))
    } catch {
      // sessionStorage unavailable
    }
  }, [step, selection])

  function updateSelection(partial: Partial<ImpressoesSelection>) {
    setSelection((prev) => ({ ...prev, ...partial }))
  }

  function handleObjetivoKpi(objetivo: ImpressoesObjetivo, kpi: KpiId) {
    setSelection((prev) => {
      // Troca de objetivo invalida o produto e a configuração a jusante.
      const objetivoChanged = prev.objetivo !== objetivo
      return {
        ...prev,
        objetivo,
        kpi,
        produto: objetivoChanged ? null : prev.produto,
        platforms: objetivoChanged ? [] : prev.platforms,
        cpmOptionId: objetivoChanged ? null : prev.cpmOptionId,
      }
    })
    setStep(2)
  }

  function handleProdutoConfig(
    produto: ImpressoesProduto,
    platforms: PlatformId[],
    cpmOptionId: string
  ) {
    setSelection((prev) => ({ ...prev, produto, platforms, cpmOptionId }))
    setStep(3)
  }

  function handleSegmentacao(audienceId: string) {
    setSelection((prev) => ({ ...prev, audienceId }))
    setStep(4)
  }

  function handlePeriodoVolume(startDate: Date, endDate: Date, impressions: number) {
    setSelection((prev) => ({ ...prev, startDate, endDate, impressions }))
    setStep(5)
  }

  function resetSession() {
    setSelection(EMPTY_SELECTION)
    setStep(1)
    clearImpressoesWizardSession()
  }

  function handleAddToCart(confirmed: ImpressoesConfirmedSelection) {
    addItem({
      modality: 'impressoes',
      data: confirmed,
      subtotal: computeImpressoesTotal(confirmed),
    })
    resetSession()
    navigate('/carrinho')
  }

  function handleUpdateCartItem(confirmed: ImpressoesConfirmedSelection) {
    if (!editCartItemId) return
    updateItem(editCartItemId, confirmed, computeImpressoesTotal(confirmed))
    navigate('/carrinho')
  }

  function handleCancel() {
    if (editCartItemId) {
      removeItem(editCartItemId)
      navigate('/carrinho')
      return
    }
    resetSession()
  }

  return (
    <ImpressoesContext.Provider
      value={{
        step,
        selection,
        isEditMode: Boolean(editItem),
        setStep,
        updateSelection,
        handleObjetivoKpi,
        handleProdutoConfig,
        handleSegmentacao,
        handlePeriodoVolume,
        handleAddToCart,
        handleUpdateCartItem,
        handleCancel,
      }}
    >
      {children}
    </ImpressoesContext.Provider>
  )
}

export function useImpressoes(): ImpressoesContextValue {
  const ctx = useContext(ImpressoesContext)
  if (!ctx) throw new Error('useImpressoes must be used within ImpressoesProvider')
  return ctx
}

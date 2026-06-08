// Funções puras da Compra por Impressões: filtros, CPM efetivo, total e formatação de período.
// Formatadores genéricos (moeda/impressões) e helpers de formato são reaproveitados de Diárias.

import {
  IMPRESSOES_CATALOG,
  MIN_IMPRESSIONS,
  type CpmOption,
  type ImpressoesObjetivo,
  type ImpressoesProduto,
  type ImpressoesSelection,
} from '../impressoes'

export { formatCurrency, formatImpressions } from '../diarias'
export { getAdFormat, getFormatSvg, getPrimaryDimension } from './diarias'

// ── Labels de seção de CPM ────────────────────────────────────────────────────

export function getCpmSectionLabel(produtoId: string): string {
  if (['v-globo', 'v-globoplay', 'globo-dai'].includes(produtoId)) return 'Duração do vídeo'
  if (['binge-ads', 'pause-ads'].includes(produtoId)) return 'Dispositivos'
  if (produtoId === 'fast') return 'Canal e duração do vídeo'
  return 'Secundagem'
}

// ── Filtragem por objetivo ─────────────────────────────────────────────────────

export function getProductsByObjetivo(objetivo: ImpressoesObjetivo): ImpressoesProduto[] {
  return IMPRESSOES_CATALOG.filter((p) => p.objetivos.includes(objetivo))
}

// ── CPM ────────────────────────────────────────────────────────────────────────

export function getCpmOption(
  produto: ImpressoesProduto,
  cpmOptionId: string | null
): CpmOption | undefined {
  if (!cpmOptionId) return undefined
  return produto.cpmOptions.find((o) => o.id === cpmOptionId)
}

/** CPM efetivo da seleção atual (0 quando produto/variante ainda não definidos). */
export function getEffectiveCpm(sel: Pick<ImpressoesSelection, 'produto' | 'cpmOptionId'>): number {
  if (!sel.produto) return 0
  return getCpmOption(sel.produto, sel.cpmOptionId)?.cpm ?? 0
}

/** Faixa de CPM de um produto (para exibir "a partir de" nos cards). */
export function getCpmRange(produto: ImpressoesProduto): { min: number; max: number } {
  const values = produto.cpmOptions.map((o) => o.cpm)
  return { min: Math.min(...values), max: Math.max(...values) }
}

// ── Total ────────────────────────────────────────────────────────────────────

/** Valor total = (impressões / 1000) × CPM. */
export function computeImpressoesTotal(
  sel: Pick<ImpressoesSelection, 'produto' | 'cpmOptionId' | 'impressions'>
): number {
  const cpm = getEffectiveCpm(sel)
  if (cpm <= 0 || sel.impressions <= 0) return 0
  return Math.round((sel.impressions / 1000) * cpm)
}

export function isValidImpressions(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_IMPRESSIONS
}

// ── Período ────────────────────────────────────────────────────────────────────

export function formatDateLong(d: Date): string {
  const day = d.getDate()
  const month = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
  const year = d.getFullYear()
  return `${day} de ${month}/${year}`
}

export function formatDateRange(start: Date | null, end: Date | null): string {
  if (!start || !end) return '—'
  return `${formatDateLong(start)} → ${formatDateLong(end)}`
}

/** Número de dias do período (inclusivo). */
export function getDurationDays(start: Date | null, end: Date | null): number {
  if (!start || !end) return 0
  const ms = end.getTime() - start.getTime()
  if (ms < 0) return 0
  return Math.floor(ms / (1000 * 60 * 60 * 24)) + 1
}

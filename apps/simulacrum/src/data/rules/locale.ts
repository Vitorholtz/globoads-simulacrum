// Formatadores genéricos (moeda, impressões, datas em pt-BR), reaproveitados por todas as
// modalidades de compra.

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export function formatImpressions(n: number): string {
  if (n >= 1_000_000) {
    const val = parseFloat((n / 1_000_000).toFixed(1))
    return `${val.toString().replace('.', ',')} mi`
  }
  return `${Math.round(n / 1_000)} mil`
}

export function formatDateShort(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

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

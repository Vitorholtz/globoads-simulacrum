/** Formata segundos como m:ss (ex.: 15 → "0:15"). Vazio quando indefinido. */
export function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) return ''
  const s = Math.round(totalSeconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

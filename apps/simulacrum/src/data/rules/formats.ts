import { AD_FORMATS_CATALOG } from '../catalog/adFormats'

// ── Formatos publicitários ───────────────────────────────────────────────────

export function getAdFormat(formatId: string) {
  return AD_FORMATS_CATALOG.find((f) => f.id === formatId)
}

export function getFormatSvg(formatId: string): string {
  return getAdFormat(formatId)?.svgPath ?? ''
}

export function getPrimaryDimension(formatId: string) {
  const fmt = getAdFormat(formatId)
  if (!fmt || fmt.dimensions.length === 0) return null
  return fmt.dimensions.reduce((best, d) =>
    d.width * d.height > best.width * best.height ? d : best
  )
}

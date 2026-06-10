// Guard de integridade referencial entre catálogos (somente DEV).
// Garante que toda referência por ID resolve em sua fonte de verdade — transforma
// "drift silencioso" em erro visível no console durante o desenvolvimento.
import { AD_FORMATS_CATALOG } from './catalog/adFormats'
import { CHANNEL_CATALOG } from './channels'
import { DIARIAS_CATALOG } from './diarias'
import { IMPRESSOES_CATALOG } from './impressoes'

/** Retorna a lista de inconsistências encontradas (vazia = tudo conectado). */
export function validateCatalogs(): string[] {
  const issues: string[] = []
  const formatIds = new Set(AD_FORMATS_CATALOG.map((f) => f.id))
  const channelIds = new Set(CHANNEL_CATALOG.map((c) => c.id))

  for (const p of DIARIAS_CATALOG) {
    if (!channelIds.has(p.portalId)) {
      issues.push(`Diárias "${p.id}": portalId "${p.portalId}" ausente em CHANNEL_CATALOG`)
    }
    for (const f of p.formats) {
      if (!formatIds.has(f.formatId)) {
        issues.push(`Diárias "${p.id}": formatId "${f.formatId}" ausente em AD_FORMATS_CATALOG`)
      }
    }
  }

  for (const p of IMPRESSOES_CATALOG) {
    for (const plat of p.platforms) {
      if (!channelIds.has(plat)) {
        issues.push(`Impressões "${p.id}": plataforma "${plat}" ausente em CHANNEL_CATALOG`)
      }
    }
    for (const id of p.formatIds) {
      if (!formatIds.has(id)) {
        issues.push(`Impressões "${p.id}": formatId "${id}" ausente em AD_FORMATS_CATALOG`)
      }
    }
  }

  return issues
}

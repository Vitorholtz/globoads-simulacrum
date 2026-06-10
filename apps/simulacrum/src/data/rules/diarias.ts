import { getPriceForCoverage, type ConfirmedSelection } from '../diarias'

// ── Formatação de datas ──────────────────────────────────────────────────────

export function formatDateShort(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

// ── Estados brasileiros ──────────────────────────────────────────────────────

export const STATE_LABELS: Record<string, string> = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
}

// ── Cálculo de totais ────────────────────────────────────────────────────────

export function computeTotal(p: ConfirmedSelection): number {
  if (p.produto.isRegional) {
    return p.regionalSelections.reduce(
      (sum, r) => sum + r.dates.length * getPriceForCoverage(p.produto, r.coverage),
      0
    )
  }
  return p.dates.length * getPriceForCoverage(p.produto, 'Nacional')
}

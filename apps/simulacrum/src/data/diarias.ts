import { CHANNEL_CATALOG } from './channels'

export type PortalId = 'g1' | 'ge' | 'globo-com' | 'gshow' | 'globoplay'

export interface Portal {
  id: PortalId
  name: string
  svgPath: string
  description: string
  url: string
}

export interface FormatInfo {
  formatId: string
  formatName: string
  positions: string[]
  devices: string
}

export interface CoverageInfo {
  code: string
  impressions: number
}

export interface DiariaProduto {
  id: string
  name: string
  portalId: PortalId
  formats: FormatInfo[]
  coverages: CoverageInfo[]
  isRegional: boolean
  cpm: number
}

export interface RegionalSelection {
  coverage: string
  dates: Date[]
}

export interface DiariasSelection {
  portal: PortalId | null
  produto: DiariaProduto | null
  regionalSelections: RegionalSelection[]
  dates: Date[]
}

export interface ConfirmedSelection {
  portal: PortalId
  produto: DiariaProduto
  regionalSelections: RegionalSelection[]
  dates: Date[]
}

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

export function getPriceForCoverage(produto: DiariaProduto, code: string): number {
  const cov = produto.coverages.find((c) => c.code === code)
  if (!cov) return 0
  return Math.round((cov.impressions * produto.cpm) / 1_000 / 100) * 100
}

const PORTAL_URLS: Record<PortalId, string> = {
  g1: 'g1.globo.com',
  ge: 'ge.globo.com',
  'globo-com': 'globo.com',
  gshow: 'gshow.globo.com',
  globoplay: 'globoplay.globo.com',
}

const PORTAL_DESCRIPTIONS: Record<PortalId, string> = {
  g1: 'Líder em jornalismo digital no Brasil. Alcance um público qualificado que busca informação relevante.',
  ge: 'Principal destino do esporte brasileiro. Conecte sua marca à paixão de milhões de fãs e consumidores.',
  'globo-com':
    'O portal mais acessado do Brasil. Visibilidade máxima para campanhas de alcance nacional.',
  gshow:
    'Hub de entretenimento, cultura pop e TV. Engaje com a audiência conectada ao universo Globo.',
  globoplay:
    'Streaming premium com conteúdo exclusivo. Impacte usuários com alto engajamento e intenção de compra.',
}

export const PORTALS: Portal[] = (
  ['g1', 'ge', 'globo-com', 'gshow', 'globoplay'] as PortalId[]
).map((id) => {
  const ch = CHANNEL_CATALOG.find((c) => c.id === id)!
  return {
    id,
    name: ch.name,
    svgPath: ch.svgPath,
    description: PORTAL_DESCRIPTIONS[id],
    url: PORTAL_URLS[id],
  }
})

export const PORTAL_DISPLAY_NAMES: Record<PortalId, string> = {
  g1: 'G1',
  ge: 'GE',
  'globo-com': 'Globo.com',
  gshow: 'gshow',
  globoplay: 'Globoplay',
}

export const DIARIAS_CATALOG: DiariaProduto[] = [
  // ─── G1 — CPM R$ 25 ──────────────────────────────────────────────────────────

  {
    id: 'g1-nacional-1',
    name: 'Diária Nacional 1',
    portalId: 'g1',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['1ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'sticky-ad',
        formatName: 'Sticky Ad',
        positions: ['1ª posição'],
        devices: 'Mobile',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 880_000 }],
    isRegional: false,
    cpm: 25,
  },
  {
    id: 'g1-nacional-2',
    name: 'Diária Nacional 2',
    portalId: 'g1',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['2ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: ['2ª posição'],
        devices: 'Mobile',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 600_000 }],
    isRegional: false,
    cpm: 25,
  },
  {
    id: 'g1-regional',
    name: 'Diária Regional',
    portalId: 'g1',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['1ª posição', '3ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: ['2ª posição', '3ª posição', '4ª posição', 'Home Fim', 'Home Feed'],
        devices: 'Mobile',
      },
    ],
    coverages: [
      { code: 'SP', impressions: 180_000 },
      { code: 'RJ', impressions: 120_000 },
      { code: 'MG', impressions: 100_000 },
      { code: 'PE', impressions: 60_000 },
      { code: 'DF', impressions: 40_000 },
    ],
    isRegional: true,
    cpm: 25,
  },
  {
    id: 'g1-touchpoint',
    name: 'Diária Touchpoint',
    portalId: 'g1',
    formats: [
      {
        formatId: 'touchpoint-imagetico',
        formatName: 'Touchpoint Imagético',
        positions: ['Rodapé da página'],
        devices: 'Mobile e Desktop',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 480_000 }],
    isRegional: false,
    cpm: 25,
  },
  {
    id: 'g1-homeday',
    name: 'Diária Homeday',
    portalId: 'g1',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['1ª posição', '3ª posição', 'Rodapé da página'],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: ['1ª posição', '3ª posição', 'Rodapé da página'],
        devices: 'Mobile',
      },
      {
        formatId: 'touchpoint-imagetico',
        formatName: 'Touchpoint Imagético',
        positions: ['Rodapé da página'],
        devices: 'Mobile e Desktop',
      },
      {
        formatId: 'sticky-ad',
        formatName: 'Sticky Ad',
        positions: ['1ª posição'],
        devices: 'Mobile',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 2_080_000 }],
    isRegional: false,
    cpm: 25,
  },

  // ─── GE — CPM R$ 22 ──────────────────────────────────────────────────────────

  {
    id: 'ge-nacional-1',
    name: 'Diária Nacional 1',
    portalId: 'ge',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['1ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'sticky-ad',
        formatName: 'Sticky Ad',
        positions: ['1ª posição'],
        devices: 'Mobile',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 820_000 }],
    isRegional: false,
    cpm: 22,
  },
  {
    id: 'ge-nacional-2',
    name: 'Diária Nacional 2',
    portalId: 'ge',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['2ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: ['2ª posição'],
        devices: 'Mobile',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 545_000 }],
    isRegional: false,
    cpm: 22,
  },
  {
    id: 'ge-nacional-3',
    name: 'Diária Nacional 3',
    portalId: 'ge',
    formats: [
      {
        formatId: 'half-page',
        formatName: 'Half-Page',
        positions: ['3ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: ['3ª posição'],
        devices: 'Mobile',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 364_000 }],
    isRegional: false,
    cpm: 22,
  },
  {
    id: 'ge-touchpoint',
    name: 'Diária Touchpoint',
    portalId: 'ge',
    formats: [
      {
        formatId: 'touchpoint-imagetico',
        formatName: 'Touchpoint Imagético',
        positions: ['Rodapé da página'],
        devices: 'Mobile e Desktop',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 454_000 }],
    isRegional: false,
    cpm: 22,
  },
  {
    id: 'ge-homeday',
    name: 'Diária Homeday',
    portalId: 'ge',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['1ª posição', '2ª posição', '4ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'half-page',
        formatName: 'Half-Page',
        positions: ['3ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: ['2ª posição', '3ª posição', '4ª posição', 'Home Fim', 'Home Feed'],
        devices: 'Mobile',
      },
      {
        formatId: 'touchpoint-imagetico',
        formatName: 'Touchpoint Imagético',
        positions: ['Rodapé da página'],
        devices: 'Mobile e Desktop',
      },
      {
        formatId: 'sticky-ad',
        formatName: 'Sticky Ad',
        positions: ['1ª posição'],
        devices: 'Mobile',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 2_045_000 }],
    isRegional: false,
    cpm: 22,
  },

  // ─── Globo.com — CPM R$ 30 ───────────────────────────────────────────────────

  {
    id: 'globo-com-super-premium',
    name: 'Diária Super Premium',
    portalId: 'globo-com',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['1ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: ['1ª posição'],
        devices: 'Mobile',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 1_500_000 }],
    isRegional: false,
    cpm: 30,
  },
  {
    id: 'globo-com-premium',
    name: 'Diária Premium',
    portalId: 'globo-com',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['2ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: ['2ª posição'],
        devices: 'Mobile',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 1_067_000 }],
    isRegional: false,
    cpm: 30,
  },
  {
    id: 'globo-com-touchpoint',
    name: 'Diária Touchpoint',
    portalId: 'globo-com',
    formats: [
      {
        formatId: 'touchpoint-imagetico',
        formatName: 'Touchpoint Imagético',
        positions: ['Rodapé da página'],
        devices: 'Mobile e Desktop',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 733_000 }],
    isRegional: false,
    cpm: 30,
  },
  {
    id: 'globo-com-regional',
    name: 'Diária Regional',
    portalId: 'globo-com',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['3ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: ['3ª posição'],
        devices: 'Mobile',
      },
    ],
    coverages: [
      { code: 'SP', impressions: 316_000 },
      { code: 'RJ', impressions: 176_000 },
      { code: 'MG', impressions: 143_000 },
      { code: 'PR', impressions: 76_000 },
      { code: 'RS', impressions: 66_000 },
      { code: 'BA', impressions: 63_000 },
      { code: 'PE', impressions: 56_000 },
      { code: 'CE', impressions: 46_000 },
      { code: 'GO', impressions: 36_000 },
      { code: 'SC', impressions: 36_000 },
      { code: 'ES', impressions: 27_000 },
      { code: 'PA', impressions: 27_000 },
      { code: 'DF', impressions: 26_000 },
      { code: 'AM', impressions: 20_000 },
      { code: 'MT', impressions: 16_000 },
      { code: 'MS', impressions: 16_000 },
      { code: 'MA', impressions: 13_000 },
      { code: 'PB', impressions: 13_000 },
      { code: 'RN', impressions: 13_000 },
      { code: 'AL', impressions: 10_000 },
      { code: 'PI', impressions: 10_000 },
      { code: 'RO', impressions: 7_000 },
      { code: 'TO', impressions: 7_000 },
      { code: 'SE', impressions: 7_000 },
      { code: 'AP', impressions: 5_000 },
      { code: 'RR', impressions: 3_500 },
      { code: 'AC', impressions: 3_000 },
    ],
    isRegional: true,
    cpm: 30,
  },
  {
    id: 'globo-com-homeday',
    name: 'Diária Homeday',
    portalId: 'globo-com',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: [
          '1ª posição',
          '2ª posição',
          '3ª posição',
          '4ª posição',
          '5ª posição',
          '6ª posição',
        ],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: [
          '1ª posição',
          '2ª posição',
          '3ª posição',
          '4ª posição',
          '5ª posição',
          '6ª posição',
          '7ª posição',
        ],
        devices: 'Mobile',
      },
      {
        formatId: 'touchpoint-imagetico',
        formatName: 'Touchpoint Imagético',
        positions: ['Rodapé da página'],
        devices: 'Mobile e Desktop',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 3_267_000 }],
    isRegional: false,
    cpm: 30,
  },

  // ─── Globoplay — CPM R$ 48 ───────────────────────────────────────────────────

  {
    id: 'globoplay-primeirissima',
    name: 'Primeiríssima',
    portalId: 'globoplay',
    formats: [
      {
        formatId: 'in-stream-video',
        formatName: 'In-Stream Vídeo',
        positions: ['1º pré-roll'],
        devices: 'Mobile, Desktop, App e TV Conectada',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 1_208_000 }],
    isRegional: false,
    cpm: 48,
  },
  {
    id: 'globoplay-segundissima',
    name: 'Segundíssima',
    portalId: 'globoplay',
    formats: [
      {
        formatId: 'in-stream-video',
        formatName: 'In-Stream Vídeo',
        positions: ['2º pré-roll'],
        devices: 'Mobile, Desktop, App e TV Conectada',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 833_000 }],
    isRegional: false,
    cpm: 48,
  },

  // ─── gshow — CPM R$ 20 ───────────────────────────────────────────────────────

  {
    id: 'gshow-homeday',
    name: 'Diária Homeday',
    portalId: 'gshow',
    formats: [
      {
        formatId: 'billboard',
        formatName: 'Billboard',
        positions: ['2ª posição', '3ª posição', '4ª posição'],
        devices: 'Desktop',
      },
      {
        formatId: 'retangulo-medio',
        formatName: 'Retângulo Médio',
        positions: ['2ª posição', '3ª posição', '4ª posição', 'Home Fim', 'Home Feed'],
        devices: 'Mobile',
      },
      {
        formatId: 'touchpoint-imagetico',
        formatName: 'Touchpoint Imagético',
        positions: ['Rodapé da página'],
        devices: 'Mobile e Desktop',
      },
    ],
    coverages: [{ code: 'Nacional', impressions: 700_000 }],
    isRegional: false,
    cpm: 20,
  },
]

export function getPortal(id: PortalId): Portal {
  return PORTALS.find((p) => p.id === id)!
}

export function getProductsByPortal(portalId: PortalId): DiariaProduto[] {
  return DIARIAS_CATALOG.filter((p) => p.portalId === portalId)
}

export function getPortalStats(portalId: PortalId): {
  productCount: number
  hasNational: boolean
  hasRegional: boolean
  maxImpressions: number
} {
  const prods = getProductsByPortal(portalId)
  const allImpressions = prods.flatMap((p) => p.coverages.map((c) => c.impressions))
  return {
    productCount: prods.length,
    hasNational: prods.some((p) => !p.isRegional),
    hasRegional: prods.some((p) => p.isRegional),
    maxImpressions: Math.max(...allImpressions),
  }
}

export const MACROREGIONS: { label: string; codes: string[] }[] = [
  { label: 'Sudeste', codes: ['SP', 'RJ', 'MG', 'ES'] },
  { label: 'Sul', codes: ['PR', 'RS', 'SC'] },
  { label: 'Nordeste', codes: ['BA', 'CE', 'PE', 'MA', 'PB', 'RN', 'PI', 'AL', 'SE'] },
  { label: 'Centro-Oeste', codes: ['DF', 'GO', 'MT', 'MS'] },
  { label: 'Norte', codes: ['AM', 'PA', 'RO', 'AC', 'AP', 'RR', 'TO'] },
]

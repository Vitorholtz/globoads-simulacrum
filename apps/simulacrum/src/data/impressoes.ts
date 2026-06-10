// Modelo de dados da modalidade Compra por Impressões (CPM).
// Tipos + catálogos mock (objetivos, KPIs, produtos, audiências). Regras puras em rules/impressoes.ts.
// Reaproveita formatos (AD_FORMATS_CATALOG) e logos de plataforma (CHANNEL_CATALOG).

import { CHANNEL_CATALOG, getChannelName } from './channels'

// ── Objetivos & KPIs ──────────────────────────────────────────────────────────

export type ImpressoesObjetivo =
  | 'alcance'
  | 'visibilidade'
  | 'clique'
  | 'trafego'
  | 'conversao'
  | 'visualizacao-video'

export type KpiId =
  | 'impressoes'
  | 'viewability'
  | 'ctr'
  | 'visitas'
  | 'lead'
  | 'instalacao-app'
  | 'vendas'
  | 'vtr'

export interface ObjetivoInfo {
  id: ImpressoesObjetivo
  name: string
  description: string
  icon: string
}

export const OBJETIVOS: ObjetivoInfo[] = [
  {
    id: 'alcance',
    name: 'Alcance',
    description: 'Apareça para o maior número possível de pessoas com seu anúncio.',
    icon: 'groups',
  },
  {
    id: 'visibilidade',
    name: 'Visibilidade',
    description: 'Garanta que seu anúncio seja efetivamente visto na tela do usuário.',
    icon: 'visibility',
  },
  {
    id: 'clique',
    name: 'Clique',
    description: 'Incentive interações e cliques diretos no seu anúncio.',
    icon: 'ads_click',
  },
  {
    id: 'trafego',
    name: 'Tráfego',
    description: 'Leve as pessoas para o seu site ou página de destino.',
    icon: 'travel_explore',
  },
  {
    id: 'conversao',
    name: 'Conversão',
    description: 'Gere ações de valor como leads, instalações ou vendas.',
    icon: 'shopping_cart_checkout',
  },
  {
    id: 'visualizacao-video',
    name: 'Visualização de vídeo',
    description: 'Maximize as visualizações completas dos seus vídeos.',
    icon: 'smart_display',
  },
]

export const KPI_LABELS: Record<KpiId, string> = {
  impressoes: 'Impressões',
  viewability: 'Viewability',
  ctr: 'CTR',
  visitas: 'Visitas',
  lead: 'Lead',
  'instalacao-app': 'Instalação de APP',
  vendas: 'Vendas',
  vtr: 'VTR',
}

export const KPI_DESCRIPTIONS: Record<KpiId, string> = {
  impressoes: 'Número de vezes que o anúncio é exibido.',
  viewability: 'Percentual de anúncios efetivamente visíveis na tela.',
  ctr: 'Taxa de cliques sobre as impressões entregues.',
  visitas: 'Sessões geradas no site de destino.',
  lead: 'Cadastros e contatos qualificados gerados.',
  'instalacao-app': 'Instalações do aplicativo a partir do anúncio.',
  vendas: 'Vendas atribuídas ao anúncio.',
  vtr: 'Taxa de visualização completa do vídeo.',
}

export const OBJETIVO_KPIS: Record<ImpressoesObjetivo, KpiId[]> = {
  alcance: ['impressoes'],
  visibilidade: ['viewability'],
  clique: ['ctr'],
  trafego: ['visitas'],
  conversao: ['lead', 'instalacao-app', 'vendas'],
  'visualizacao-video': ['vtr'],
}

// ── Plataformas ───────────────────────────────────────────────────────────────

export type PlatformId = 'globo-com' | 'g1' | 'ge' | 'gshow' | 'receitas' | 'globoplay'

export interface Platform {
  id: PlatformId
  name: string
  svgPath: string
}

// Derivado do CHANNEL_CATALOG (fonte única). Record explícito preserva exaustividade por PlatformId.
export const PLATFORM_DISPLAY_NAMES: Record<PlatformId, string> = {
  'globo-com': getChannelName('globo-com'),
  g1: getChannelName('g1'),
  ge: getChannelName('ge'),
  gshow: getChannelName('gshow'),
  receitas: getChannelName('receitas'),
  globoplay: getChannelName('globoplay'),
}

/** Família G — propriedades de display/vídeo com seleção múltipla de plataformas. */
export const FAMILIA_G: PlatformId[] = ['globo-com', 'g1', 'ge', 'gshow', 'receitas']

export function getPlatform(id: PlatformId): Platform {
  const ch = CHANNEL_CATALOG.find((c) => c.id === id)
  return { id, name: getChannelName(id), svgPath: ch?.svgPath ?? '' }
}

// ── Produtos ──────────────────────────────────────────────────────────────────

/** Variante de precificação escolha-única (secundagem de vídeo ou local de exibição). */
export interface CpmOption {
  id: string
  label: string
  cpm: number
}

export interface ImpressoesProduto {
  id: string
  name: string
  description: string
  /** IDs de formatos no AD_FORMATS_CATALOG. */
  formatIds: string[]
  platforms: PlatformId[]
  /** 'multiple' → usuário escolhe um subconjunto; 'fixed' → plataformas pré-definidas. */
  platformSelection: 'multiple' | 'fixed'
  cpmOptions: CpmOption[]
  objetivos: ImpressoesObjetivo[]
}

export const IMPRESSOES_CATALOG: ImpressoesProduto[] = [
  {
    id: 'd-globo',
    name: 'D Globo',
    description:
      'Formatos de display entregues rotativamente em todas as posições das páginas da Família G.',
    formatIds: ['billboard', 'maxiboard', 'retangulo-medio', 'sticky-ad', 'half-page', 'carrossel'],
    platforms: FAMILIA_G,
    platformSelection: 'multiple',
    cpmOptions: [{ id: 'unico', label: 'Display', cpm: 20 }],
    objetivos: ['alcance', 'visibilidade', 'clique', 'trafego', 'conversao'],
  },
  {
    id: 'v-globo',
    name: 'V Globo',
    description: 'Vídeo entregue rotativamente nos espaços in-stream na Família G.',
    formatIds: ['in-stream-video'],
    platforms: FAMILIA_G,
    platformSelection: 'multiple',
    cpmOptions: [
      { id: '6s', label: '6s', cpm: 80 },
      { id: '15s', label: '15s', cpm: 150 },
      { id: '180s', label: '180s', cpm: 120 },
    ],
    objetivos: ['alcance', 'visualizacao-video'],
  },
  {
    id: 'touchpoint-rotativo',
    name: 'Touchpoint Rotativo',
    description:
      'Formato imagético de alta visibilidade no rodapé das páginas da Família G, que acompanha o scroll.',
    formatIds: ['touchpoint-imagetico'],
    platforms: FAMILIA_G,
    platformSelection: 'multiple',
    cpmOptions: [{ id: 'unico', label: 'Touchpoint', cpm: 18 }],
    objetivos: ['alcance', 'visibilidade', 'clique', 'trafego', 'conversao'],
  },
  {
    id: 'v-globoplay',
    name: 'V Globoplay',
    description:
      'Formato de vídeo rotativo dentro do player do Globoplay, com alta viewability em ambiente de streaming.',
    formatIds: ['in-stream-video'],
    platforms: ['globoplay'],
    platformSelection: 'fixed',
    cpmOptions: [
      { id: '6s', label: '6s', cpm: 80 },
      { id: '15s', label: '15s', cpm: 150 },
      { id: '30-180s', label: '30s a 180s', cpm: 120 },
    ],
    objetivos: ['alcance', 'visualizacao-video'],
  },
  {
    id: 'binge-ads',
    name: 'Binge Ads',
    description:
      'Publicidade exibida na transição entre conteúdos maratonáveis no Globoplay, no canto inferior direito da tela.',
    formatIds: ['binge-ads'],
    platforms: ['globoplay'],
    platformSelection: 'fixed',
    cpmOptions: [
      { id: 'web-app', label: 'Web e APP', cpm: 60 },
      { id: 'tv', label: 'TV Conectada', cpm: 65 },
    ],
    objetivos: ['alcance', 'clique'],
  },
  {
    id: 'pause-ads',
    name: 'Pause Ads',
    description: 'Anúncio em display acionado quando o usuário pausa um vídeo no Globoplay.',
    formatIds: ['pause-ads'],
    platforms: ['globoplay'],
    platformSelection: 'fixed',
    cpmOptions: [
      { id: 'web-app', label: 'Web e APP', cpm: 60 },
      { id: 'tv', label: 'TV Conectada', cpm: 65 },
    ],
    objetivos: ['alcance', 'clique'],
  },
  {
    id: 'globo-dai',
    name: 'Globo DAI',
    description: 'Formato de vídeo no break, dentro da programação ao vivo do Globoplay.',
    formatIds: ['globo-dai'],
    platforms: ['globoplay'],
    platformSelection: 'fixed',
    cpmOptions: [
      { id: '5-6s', label: '5s ou 6s', cpm: 64 },
      { id: '15s', label: '15s', cpm: 120 },
      { id: '20-30s', label: '20s a 30s', cpm: 160 },
    ],
    objetivos: ['alcance', 'visualizacao-video'],
  },
  {
    id: 'fast',
    name: 'FAST',
    description:
      'Canais FAST da Globo com programação gratuita — novelas clássicas, gastronomia e esportes — em ambiente digital.',
    formatIds: ['in-stream-video'],
    platforms: ['globoplay'],
    platformSelection: 'fixed',
    cpmOptions: [
      { id: 'getv-5-6s', label: 'GETV 5s ou 6s', cpm: 40 },
      { id: 'getv-15s', label: 'GETV 15s', cpm: 75 },
      { id: 'getv-20-30s', label: 'GETV 20s ou 30s', cpm: 100 },
      { id: 'malhacao-5-6s', label: 'Malhação 5s ou 6s', cpm: 40 },
      { id: 'malhacao-15s', label: 'Malhação 15s', cpm: 75 },
      { id: 'malhacao-20-30s', label: 'Malhação 20s ou 30s', cpm: 100 },
      { id: 'receitas-5-6s', label: 'Receitas 5s ou 6s', cpm: 40 },
      { id: 'receitas-15s', label: 'Receitas 15s', cpm: 75 },
      { id: 'receitas-20-30s', label: 'Receitas 20s ou 30s', cpm: 100 },
    ],
    objetivos: ['alcance'],
  },
]

// ── Audiências (segmentação) ────────────────────────────────────────────────

export interface AudienceSegment {
  id: string
  name: string
  description: string
  icon: string
}

export const AUDIENCE_CATALOG: AudienceSegment[] = [
  {
    id: 'run-of-network',
    name: 'Run of Network',
    description: 'Distribuição ampla por toda a rede, sem recorte — máximo alcance possível.',
    icon: 'public',
  },
  {
    id: 'jovens-18-24',
    name: 'Jovens 18–24',
    description: 'Público jovem, conectado e early-adopter de tendências e cultura digital.',
    icon: 'group',
  },
  {
    id: 'esporte',
    name: 'Apaixonados por Esporte',
    description: 'Torcedores e praticantes engajados com conteúdo esportivo no GE e SporTV.',
    icon: 'sports_soccer',
  },
  {
    id: 'entretenimento',
    name: 'Fãs de Entretenimento',
    description: 'Audiência de novelas, realities e cultura pop conectada ao universo Globo.',
    icon: 'theater_comedy',
  },
  {
    id: 'noticias',
    name: 'Leitores de Notícias',
    description: 'Público qualificado que consome jornalismo e informação no G1 e GloboNews.',
    icon: 'newspaper',
  },
  {
    id: 'alta-renda',
    name: 'Alta Renda',
    description: 'Consumidores das classes A/B com alto poder de compra e intenção premium.',
    icon: 'diamond',
  },
]

// ── Seleção (estado do wizard) ────────────────────────────────────────────────

export const MIN_IMPRESSIONS = 1000

export interface ImpressoesSelection {
  objetivo: ImpressoesObjetivo | null
  kpi: KpiId | null
  produto: ImpressoesProduto | null
  platforms: PlatformId[]
  cpmOptionId: string | null
  audienceId: string | null
  startDate: Date | null
  endDate: Date | null
  impressions: number
}

export interface ImpressoesConfirmedSelection {
  objetivo: ImpressoesObjetivo
  kpi: KpiId
  produto: ImpressoesProduto
  platforms: PlatformId[]
  cpmOptionId: string
  audienceId: string
  startDate: Date
  endDate: Date
  impressions: number
}

export function getProduto(id: string): ImpressoesProduto | undefined {
  return IMPRESSOES_CATALOG.find((p) => p.id === id)
}

export function getAudience(id: string): AudienceSegment | undefined {
  return AUDIENCE_CATALOG.find((a) => a.id === id)
}

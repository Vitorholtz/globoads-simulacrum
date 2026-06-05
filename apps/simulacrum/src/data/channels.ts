export type ChannelCategory = 'tv-aberta' | 'tv-assinatura' | 'streaming' | 'digital'

export interface Channel {
  id: string
  name: string
  category: ChannelCategory
  svgPath: string
}

export const CHANNEL_CATEGORY_LABELS: Record<ChannelCategory, string> = {
  'tv-aberta': 'TV Aberta',
  'tv-assinatura': 'TV por Assinatura',
  streaming: 'Streaming',
  digital: 'Digital',
}

const svgModules = import.meta.glob<string>('../assets/channels/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

function svg(name: string): string {
  return svgModules[`../assets/channels/${name}.svg`] ?? ''
}

export const CHANNEL_CATALOG: Channel[] = [
  { id: 'tv-globo', name: 'TV Globo', category: 'tv-aberta', svgPath: svg('tv-globo') },
  { id: 'gnt', name: 'GNT', category: 'tv-assinatura', svgPath: svg('gnt') },
  { id: 'multishow', name: 'Multishow', category: 'tv-assinatura', svgPath: svg('multishow') },
  { id: 'sportv', name: 'sportv', category: 'tv-assinatura', svgPath: svg('sportv') },
  { id: 'globonews', name: 'GloboNews', category: 'tv-assinatura', svgPath: svg('globonews') },
  { id: 'premiere', name: 'Premiere', category: 'tv-assinatura', svgPath: svg('premiere') },
  { id: 'futura', name: 'Futura', category: 'tv-assinatura', svgPath: svg('futura') },
  { id: 'combate', name: 'Combate', category: 'tv-assinatura', svgPath: svg('combate') },
  { id: 'viva', name: 'VIVA', category: 'tv-assinatura', svgPath: svg('viva') },
  { id: 'off', name: 'OFF', category: 'tv-assinatura', svgPath: svg('off') },
  { id: 'bis', name: 'BIS', category: 'tv-assinatura', svgPath: svg('bis') },
  { id: 'telecine', name: 'Telecine', category: 'tv-assinatura', svgPath: svg('telecine') },
  {
    id: 'canal-brasil',
    name: 'Canal Brasil',
    category: 'tv-assinatura',
    svgPath: svg('canal-brasil'),
  },
  { id: 'universal', name: 'Universal', category: 'tv-assinatura', svgPath: svg('universal') },
  { id: 'globoplay', name: 'Globoplay', category: 'streaming', svgPath: svg('globoplay') },
  { id: 'globo-com', name: 'Globo.com', category: 'digital', svgPath: svg('globo-com') },
  { id: 'g1', name: 'G1', category: 'digital', svgPath: svg('g1') },
  { id: 'ge', name: 'ge', category: 'digital', svgPath: svg('ge') },
  { id: 'gshow', name: 'gshow', category: 'digital', svgPath: svg('gshow') },
  { id: 'receitas', name: 'Receitas', category: 'digital', svgPath: svg('receitas') },
]

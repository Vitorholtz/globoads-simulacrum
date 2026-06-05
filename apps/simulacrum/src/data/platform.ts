export type ChannelType = 'tv' | 'digital'

export interface PlatformChannel {
  id: string
  name: string
  type: ChannelType
}

export interface PlatformInfo {
  name: string
  description: string
  channels: PlatformChannel[]
}

export const PLATFORM_INFO: PlatformInfo = {
  name: 'Globo Ads',
  description:
    'Plataforma self-service da Globo para compra de espaços publicitários tanto na grade da TV Globo e afiliadas quanto nas plataformas digitais, como Globo.com, G1, GE, gshow, Receitas e Globoplay.',
  channels: [
    { id: 'tv-globo', name: 'TV Globo', type: 'tv' },
    { id: 'afiliadas', name: 'Afiliadas', type: 'tv' },
    { id: 'globo-com', name: 'Globo.com', type: 'digital' },
    { id: 'g1', name: 'G1', type: 'digital' },
    { id: 'ge', name: 'GE', type: 'digital' },
    { id: 'gshow', name: 'gshow', type: 'digital' },
    { id: 'receitas', name: 'Receitas', type: 'digital' },
    { id: 'globoplay', name: 'Globoplay', type: 'digital' },
  ],
}

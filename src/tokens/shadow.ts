export type ShadowToken = {
  name: string
  variable: string
  cssValue: string
  description: string
}

export const SHADOW_TOKENS: ShadowToken[] = [
  {
    name: 'Shadow Ground',
    variable: '--shadows-ground',
    cssValue: '0 0 0 1px #0000001F',
    description: 'Sombra de contorno sutil. Delimita elementos flutuantes sobre superfícies de mesma cor, como menus sobre fundo branco.',
  },
  {
    name: 'Shadow Low',
    variable: '--shadows-low',
    cssValue: '0 4px 8px 2px #0000001F',
    description: 'Elevação baixa. Usada em dropdowns, tooltips e elementos levemente destacados da superfície.',
  },
  {
    name: 'Shadow Base',
    variable: '--shadows-base',
    cssValue: '0 4px 16px 0 #00000033',
    description: 'Elevação base. Padrão para cards interativos, modais e componentes de destaque intermediário.',
  },
  {
    name: 'Shadow High',
    variable: '--shadows-high',
    cssValue: '0 8px 24px 0 #00000033',
    description: 'Elevação alta. Reservada para overlays, drawers e painéis que se sobrepõem ao conteúdo principal.',
  },
  {
    name: 'Shadow Diffuse',
    variable: '--shadows-diffuse',
    cssValue: '0 8px 40px 0 #00000033',
    description: 'Elevação máxima. Usada em diálogos e elementos que requerem a maior separação visual da camada base.',
  },
]

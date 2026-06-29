import type { GuidelineDef, VariantDef } from './types'

export type TabPosition = 'top' | 'bottom' | 'left' | 'right'

export const TAB_POSITIONS: VariantDef<TabPosition>[] = [
  {
    id: 'top',
    label: 'Top',
    description:
      'Posição padrão. Indicador de aba ativa na borda inferior do item; barra separadora abaixo do conjunto.',
  },
  {
    id: 'bottom',
    label: 'Bottom',
    description:
      'Tabs abaixo do conteúdo. Indicador na borda superior do item ativo; barra separadora acima do conjunto.',
  },
  {
    id: 'left',
    label: 'Left',
    description: 'Tabs em coluna alinhadas à esquerda. Indicador na borda direita do item ativo.',
  },
  {
    id: 'right',
    label: 'Right',
    description: 'Tabs em coluna alinhadas à direita. Indicador na borda esquerda do item ativo.',
  },
]

export const TAB_CONTENT_VARIANTS: VariantDef<string>[] = [
  {
    id: 'text',
    label: 'Somente texto',
    description:
      'Forma mais simples. Use quando os rótulos são suficientemente claros e o espaço é limitado.',
  },
  {
    id: 'icon',
    label: 'Com ícone',
    description: 'Ícone precede o rótulo, reforçando a identificação visual da seção.',
  },
  {
    id: 'badge',
    label: 'Com contador',
    description: 'Badge vermelho sinaliza itens não lidos ou pendentes. Use com moderação.',
  },
]

export interface TabItem {
  id: string
  label: string
  icon?: string
  badge?: string | number
}

export const DEMO_TEXT_TABS: TabItem[] = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
]

export const DEMO_ICON_TABS: TabItem[] = [
  { id: 'tab1', label: 'Início', icon: 'home' },
  { id: 'tab2', label: 'Relatórios', icon: 'analytics' },
  { id: 'tab3', label: 'Campanhas', icon: 'campaign' },
]

export const DEMO_BADGE_TABS: TabItem[] = [
  { id: 'tab1', label: 'Tudo', badge: '12' },
  { id: 'tab2', label: 'Novos', badge: '3' },
  { id: 'tab3', label: 'Lidos' },
]

export const TABS_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Use tabs para visualizações paralelas',
    body: 'Tabs são adequadas para conteúdos distintos que compartilham o mesmo contexto. Não use para fluxos sequenciais — prefira steppers nesses casos.',
  },
  {
    title: 'Mantenha os rótulos curtos e descritivos',
    body: 'O texto de cada tab deve ser conciso e deixar claro o que o usuário vai encontrar ao clicar. Evite labels genéricas como "Mais" ou "Outros".',
  },
  {
    title: 'Escolha a posição adequada ao layout',
    body: 'Top é a posição padrão e a mais familiar. Use Left/Right apenas em interfaces com layout vertical predominante, como painéis de configuração.',
  },
  {
    title: 'Use o contador com moderação',
    body: 'Badges de contagem chamam atenção para itens pendentes ou novidades. Evite usá-los em todas as tabs simultaneamente — isso reduz o impacto visual e cria ruído.',
  },
]

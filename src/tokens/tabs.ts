export type TabPosition = 'top' | 'bottom' | 'left' | 'right'

export interface TabPositionDef {
  id: TabPosition
  label: string
  description: string
}

export interface TabContentVariantDef {
  id: string
  label: string
  description: string
}

export interface TabsGuidelineDef {
  title: string
  body: string
  rule: string
}

export const TAB_POSITIONS: TabPositionDef[] = [
  {
    id: 'top',
    label: 'Top',
    description: 'Posição padrão. Indicador de aba ativa na borda inferior do item; barra separadora abaixo do conjunto.',
  },
  {
    id: 'bottom',
    label: 'Bottom',
    description: 'Tabs abaixo do conteúdo. Indicador na borda superior do item ativo; barra separadora acima do conjunto.',
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

export const TAB_CONTENT_VARIANTS: TabContentVariantDef[] = [
  {
    id: 'text',
    label: 'Somente texto',
    description: 'Forma mais simples. Use quando os rótulos são suficientemente claros e o espaço é limitado.',
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

export const TABS_GUIDELINES: TabsGuidelineDef[] = [
  {
    title: 'Use tabs para visualizações paralelas',
    body: 'Tabs são adequadas para conteúdos distintos que compartilham o mesmo contexto. Não use para fluxos sequenciais — prefira steppers nesses casos.',
    rule: 'Regra: nunca use tabs para guiar o usuário por etapas que dependem de ordem.',
  },
  {
    title: 'Mantenha os rótulos curtos e descritivos',
    body: 'O texto de cada tab deve ser conciso e deixar claro o que o usuário vai encontrar ao clicar. Evite labels genéricas como "Mais" ou "Outros".',
    rule: 'Regra: idealmente 1–2 palavras por label; máximo 3 em caso de necessidade.',
  },
  {
    title: 'Escolha a posição adequada ao layout',
    body: 'Top é a posição padrão e a mais familiar. Use Left/Right apenas em interfaces com layout vertical predominante, como painéis de configuração.',
    rule: 'Padrão: Top. Use outras posições somente quando o layout exige.',
  },
  {
    title: 'Use o contador com moderação',
    body: 'Badges de contagem chamam atenção para itens pendentes ou novidades. Evite usá-los em todas as tabs simultaneamente — isso reduz o impacto visual e cria ruído.',
    rule: 'Regra: aplique badges apenas quando a contagem tem valor de ação para o usuário.',
  },
]

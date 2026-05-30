import type { GuidelineDef } from './types'

export interface BreadcrumbDepthDef {
  label: string
  levels: number
  items: string[]
}

export const BREADCRUMB_DEPTHS: BreadcrumbDepthDef[] = [
  {
    label: '2 níveis',
    levels: 2,
    items: ['Início', 'Página atual'],
  },
  {
    label: '3 níveis',
    levels: 3,
    items: ['Início', 'Campanhas', 'Página atual'],
  },
  {
    label: '4 níveis',
    levels: 4,
    items: ['Início', 'Campanhas', 'Relatórios', 'Página atual'],
  },
  {
    label: '5 níveis',
    levels: 5,
    items: ['Início', 'Campanhas', 'Relatórios', 'Detalhes', 'Página atual'],
  },
]

export const BREADCRUMB_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Reflete sempre a hierarquia real',
    body: 'Cada item do breadcrumb deve corresponder a um nível real na arquitetura do produto. Não pule níveis nem invente categorias inexistentes — o usuário deve poder reproduzir o caminho clicando nos itens.',
    rule: 'Regra: nunca use breadcrumbs como atalhos temáticos; use-os apenas para hierarquia de localização.',
  },
  {
    title: 'Página atual nunca é clicável',
    body: 'O último item representa onde o usuário está agora. Torná-lo um link seria confuso e não produziria efeito. Ele deve ser visualmente diferente dos anteriores — mais escuro, sem sublinhado e com peso maior.',
    rule: 'Regra: o item atual sempre usa estilo texto primário, sem interação.',
  },
  {
    title: 'Limite de profundidade recomendado',
    body: 'Breadcrumbs com mais de 5 níveis tendem a ser longos demais para serem úteis. Em hierarquias profundas, considere truncar os níveis intermediários com reticências ("…") e manter o primeiro e os últimos visíveis.',
    rule: 'Padrão: exibir no máximo 5 níveis; truncar se necessário.',
  },
  {
    title: 'Não substitui a navegação principal',
    body: 'O breadcrumb é um componente de orientação secundário — indica onde o usuário está, mas não é o mecanismo principal de navegação. A navegação primária deve estar sempre acessível na sidebar ou no header.',
    rule: 'Regra: nunca use breadcrumb como único meio de navegação entre seções.',
  },
]

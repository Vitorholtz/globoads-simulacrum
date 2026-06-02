import type { GuidelineDef, StateDef, VariantDef } from './types'

export const ACCORDION_VARIANTS: VariantDef<string>[] = [
  {
    id: 'with-icon',
    label: 'Com Ícone',
    description:
      'Ícone à esquerda do label reforça visualmente a categoria ou natureza da seção, facilitando o escaneamento quando há muitos itens.',
  },
  {
    id: 'with-detail',
    label: 'Com Detalhe',
    description:
      'Texto secundário à direita do label exibe informações contextuais compactas — como um valor, data ou status — sem expandir a seção.',
  },
  {
    id: 'with-badge',
    label: 'Com Badge',
    description:
      'Badge sinaliza o estado ou categoria da seção com cor semântica (success, warning, critical), útil para dashboards e listas de revisão.',
  },
  {
    id: 'with-all',
    label: 'Completo',
    description:
      'Combinação de ícone, detalhe e badge para seções que concentram múltiplas informações no cabeçalho, como linhas de campanha ou itens de configuração.',
  },
]

export const ACCORDION_STATES: StateDef<string>[] = [
  {
    id: 'collapsed',
    label: 'Recolhido',
    description:
      'O item exibe apenas o cabeçalho com ícone de seta para baixo. O conteúdo fica oculto.',
  },
  {
    id: 'expanded',
    label: 'Expandido',
    description:
      'O item abre revelando o conteúdo. A seta rotaciona para cima indicando que a seção pode ser fechada.',
  },
]

export const ACCORDION_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Uma seção aberta por vez',
    body: 'O comportamento padrão do Accordion é manter apenas uma seção expandida por vez. Ao abrir uma nova seção, a anterior é fechada automaticamente, reduzindo o scroll e mantendo o contexto da interface compacto.',
    rule: 'Não use múltiplos Accordions sobrepostos para representar a mesma hierarquia de conteúdo.',
  },
  {
    title: 'Labels claros e concisos',
    body: 'O texto de cada cabeçalho deve descrever com precisão o conteúdo que será revelado. Evite rótulos genéricos como "Seção 1". Use termos descritivos alinhados ao contexto da interface, como "Configurações de segmentação" ou "Detalhes do formato".',
    rule: 'Prefira labels de até 5 palavras que antecipem o conteúdo da seção.',
  },
  {
    title: 'Conteúdo adequado para colapso',
    body: 'Use o Accordion para conteúdos secundários ou detalhes que não precisam estar visíveis por padrão. Não use para informações críticas ao fluxo principal — itens que o usuário precisa ver sem clicar devem permanecer visíveis.',
    rule: 'Não oculte informações obrigatórias ou ações principais dentro do Accordion.',
  },
  {
    title: 'Consistência no grupo',
    body: 'Todos os itens de um mesmo Accordion devem seguir o mesmo padrão visual e de conteúdo. Misturar tipos diferentes de conteúdo — texto, formulários, listas — sem critério visual cria inconsistência e desorientação.',
    rule: 'Mantenha o mesmo tipo e estrutura de conteúdo em todos os itens do mesmo Accordion.',
  },
]

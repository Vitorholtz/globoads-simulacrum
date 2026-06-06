import type { GuidelineDef, StateDef } from './types'

export type CardStyle = 'on-primary' | 'on-secondary'

export type CardStyleDef = {
  id: CardStyle
  name: string
  tagline: string
  description: string
  when: string[]
}

export const CARD_STYLES: CardStyleDef[] = [
  {
    id: 'on-primary',
    name: 'On Primary',
    tagline: 'sobre fundo claro (superfície primária)',
    description:
      'Fundo secundário (#F7F7F7). Utilizado sobre a superfície primária da aplicação — fundos brancos de páginas, modais e painéis.',
    when: [
      'Cards sobre fundos brancos ou superfície primária',
      'Dashboards e listagens em fundo claro',
      'Contextos de alto contraste entre card e página',
    ],
  },
  {
    id: 'on-secondary',
    name: 'On Secondary',
    tagline: 'sobre fundo cinza (superfície secundária)',
    description:
      'Fundo primário (#FFFFFF). Utilizado sobre superfícies secundárias — áreas recuadas, seções com fundo cinza ou containers aninhados.',
    when: [
      'Cards sobre fundos cinza ou superfície secundária',
      'Cards dentro de outros containers ou seções recuadas',
      'Painéis e áreas com fundo secundário',
    ],
  },
]

export const STATIC_CARD_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Função exclusivamente estrutural',
    body: 'Static Cards agrupam e organizam conteúdo visual e informativo. Não possuem comportamento de interação no container principal — cliques em ações devem ocorrer em botões ou links internos ao card.',
    rule: 'Container estático: interações ficam dentro do card, não no card.',
  },
  {
    title: 'Contraste com o contexto',
    body: 'Escolha o estilo baseado no fundo onde o card aparece: "On Primary" para fundos brancos e "On Secondary" para fundos cinza. O card deve ser sempre visualmente distinguível do seu entorno.',
    rule: 'On Primary sobre branco; On Secondary sobre cinza.',
  },
  {
    title: 'Hierarquia e densidade de conteúdo',
    body: 'Cards funcionam melhor com conteúdo bem definido: título claro, corpo conciso e — quando aplicável — uma ação principal ao final. Evite sobrecarregar o card com múltiplas informações ou ações de igual peso.',
    rule: 'Uma informação principal por card.',
  },
  {
    title: 'Espaçamento interno',
    body: 'O padding interno padrão recomendado é 20px. Cards são amplamente usados e o contexto de uso pode variar bastante — adapte conforme a densidade e hierarquia do conteúdo. Nunca utilize padding menor que 12px para preservar legibilidade.',
    rule: 'Padding padrão: 20px. Mínimo aceitável: 12px.',
  },
]

export const INTERACTIVE_CARD_STATES: StateDef<'normal' | 'hover' | 'focus' | 'active'>[] = [
  { id: 'normal', label: 'Normal', description: 'Estado padrão em repouso.' },
  { id: 'hover', label: 'Hover', description: 'Cursor sobre o card — sombra de elevação.' },
  {
    id: 'focus',
    label: 'Focus',
    description: 'Foco via teclado — anel de acessibilidade e sombra.',
  },
  { id: 'active', label: 'Active', description: 'Card pressionado — sombra de rebaixamento.' },
]

export const INTERACTIVE_CARD_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Container como área de ação',
    body: 'Interactive Cards transformam todo o container em uma área clicável. Use quando a ação principal é navegar, selecionar ou abrir detalhes pelo próprio card — sem depender de um botão interno.',
    rule: 'O card inteiro é a ação — não adicione botões primários dentro.',
  },
  {
    title: 'Semântica e acessibilidade',
    body: 'Use o prop `as` para adequar o elemento raiz ao contexto: `button` (padrão) para ações in-page; `a` para navegação real com URL; `label` para cards de seleção que envolvem um input oculto (radio ou checkbox); `div` para containers com múltiplos controles internos, exigindo tabIndex e role manuais. Forneça aria-label quando o conteúdo visual não for suficiente.',
    rule: 'button → ação; a → link; label → seleção; div → controles aninhados.',
  },
  {
    title: 'Contraste com o contexto',
    body: 'Mesma regra dos Static Cards: "On Primary" sobre fundos brancos e "On Secondary" sobre fundos cinza. Os estados visuais de interação devem ser percebidos claramente sobre o fundo escolhido.',
    rule: 'On Primary sobre branco; On Secondary sobre cinza.',
  },
  {
    title: 'Espaçamento interno',
    body: 'O padding interno padrão recomendado é 20px. O Interactive Card já usa 20px por padrão. Adapte conforme a densidade e o contexto de uso — em listas compactas ou cards encaixados, valores menores são aceitáveis. Nunca utilize padding menor que 12px.',
    rule: 'Padding padrão: 20px. Mínimo aceitável: 12px.',
  },
  {
    title: 'Ações filhas e propagação de eventos',
    body: 'Se o card contiver ações secundárias (menu de contexto, botão de favoritar), use stopPropagation para evitar que o clique no filho acione o card pai. Ações filhas não devem competir com a área acionável principal.',
    rule: 'stopPropagation em ações filhas para não disparar o card pai.',
  },
]

export type SemanticVariantDef = {
  as: 'button' | 'a' | 'label' | 'div'
  label: string
  when: string
  example: string
  accessibility: string
}

export const INTERACTIVE_CARD_SEMANTIC_VARIANTS: SemanticVariantDef[] = [
  {
    as: 'button',
    label: 'Button (padrão)',
    when: 'Ações in-page: navegação via router, abertura de modal, disparo de seleção.',
    example: '<InteractiveCard onClick={handleClick}>…</InteractiveCard>',
    accessibility: 'Focalizável e ativável por teclado nativamente. Semântica de ação clara.',
  },
  {
    as: 'a',
    label: 'Anchor',
    when: 'Navegação real com URL — links para páginas externas ou destinos absolutos.',
    example: '<InteractiveCard as="a" href="/rota">…</InteractiveCard>',
    accessibility:
      'Anunciado como link por leitores de tela. Suporta Ctrl+click e abertura em nova aba.',
  },
  {
    as: 'label',
    label: 'Label',
    when: 'Cards de seleção: um input oculto (radio ou checkbox) fica dentro do card, e o label estilizado é a área clicável.',
    example:
      '<InteractiveCard as="label">\n  <input type="radio" className="sr-only" name="grupo" />\n  …\n</InteractiveCard>',
    accessibility:
      'O foco e o estado checado ficam no input nativo. Compatível com Screen Readers e navegação por teclado sem JS extra.',
  },
  {
    as: 'div',
    label: 'Div',
    when: 'Containers com múltiplos controles interativos aninhados (switch, stepper, select). O card em si não é a ação — seus filhos são.',
    example: '<InteractiveCard as="div" role="group" aria-label="Controles">…</InteractiveCard>',
    accessibility:
      'Responsabilidade do consumidor: tabIndex, role e handlers de teclado devem ser adicionados manualmente.',
  },
]

import type { GuidelineDef, VariantDef } from './types'

export type PaginationVariant = 'default' | 'pages' | 'items' | 'buttons'

export type PaginationVariantDef = VariantDef<PaginationVariant>

export const PAGINATION_VARIANTS: PaginationVariantDef[] = [
  {
    id: 'default',
    label: 'Default',
    description:
      'Apenas setas de navegação. Ideal quando o contexto dispensa indicadores de progresso — listas curtas ou fluxos de navegação simples.',
  },
  {
    id: 'pages',
    label: 'Pages',
    description:
      'Setas + campo editável com a página atual + total de páginas. Permite navegação direta digitando qualquer número de página.',
  },
  {
    id: 'items',
    label: 'Items',
    description:
      'Setas + intervalo de itens exibidos + total de registros. Útil quando o usuário precisa saber quantos itens está visualizando.',
  },
  {
    id: 'buttons',
    label: 'Buttons',
    description:
      'Setas + botões numerados para as páginas próximas à atual. Facilita saltos em coleções de tamanho médio.',
  },
]

export const PAGINATION_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Escolha a variante pelo contexto',
    body: 'Default para listas simples sem necessidade de orientação numérica. Pages e Items quando o volume de dados é relevante. Buttons quando saltar para uma página específica é uma ação frequente do usuário.',
  },
  {
    title: 'Desabilite setas nos extremos',
    body: 'A seta "anterior" deve estar desabilitada na primeira página e a "próxima" na última. Isso previne cliques sem efeito e comunica claramente os limites da coleção.',
  },
  {
    title: 'Posicione próximo ao conteúdo',
    body: 'A paginação deve estar imediatamente abaixo da lista ou tabela que controla. Evite posicionamento distante ou flutuante, pois isso desassocia visualmente o controle do conteúdo paginado.',
  },
  {
    title: 'Persista a página entre interações',
    body: 'Ao aplicar filtros, ordenações ou navegar para outra tela e voltar, o usuário espera retornar à mesma posição. Persista o número de página na URL ou no estado da aplicação conforme necessário.',
  },
]

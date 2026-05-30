export type InlineLoaderType = 'spinner' | 'rippler' | 'sparkle' | 'ellipsis'
export type InlineLoaderSize = 'sm' | 'md' | 'lg'
export type InlineLoaderColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'critical'
  | 'inverse'

export interface InlineLoaderTypeDef {
  id: InlineLoaderType
  label: string
  description: string
}

export interface InlineLoaderSizeDef {
  id: InlineLoaderSize
  label: string
  px: number
}

export interface InlineLoaderColorDef {
  id: InlineLoaderColor
  label: string
  cssVar: string
}

export interface InlineLoaderGuidelineDef {
  title: string
  body: string
  rule: string
}

export const INLINE_LOADER_TYPES: InlineLoaderTypeDef[] = [
  {
    id: 'spinner',
    label: 'Spinner',
    description: 'Arco circular em rotação contínua. Uso mais comum — comunica carregamento genérico sem duração estimada. Ideal para chamadas de API, submissões de formulário e transições de tela.',
  },
  {
    id: 'rippler',
    label: 'Rippler',
    description: 'Ponto central com ondas concêntricas se expandindo. Comunica conectividade, sincronização em tempo real ou aguardo de resposta — como na entrada de uma sessão ao vivo.',
  },
  {
    id: 'sparkle',
    label: 'Sparkle',
    description: 'Estrela de quatro pontas em rotação suave. Associado a ações de inteligência artificial ou geração de conteúdo. Use para indicar processamento de IA ou sugestões automáticas.',
  },
  {
    id: 'ellipsis',
    label: 'Ellipsis',
    description: 'Texto seguido de três pontos que aparecem sequencialmente. Ideal para indicadores textuais de estado — como "Digitando…", "Salvando…" ou "Enviando…" — em contextos com espaço para texto.',
  },
]

export const INLINE_LOADER_SIZES: InlineLoaderSizeDef[] = [
  { id: 'sm', label: 'SM', px: 16 },
  { id: 'md', label: 'MD', px: 20 },
  { id: 'lg', label: 'LG', px: 24 },
]

export const INLINE_LOADER_COLORS: InlineLoaderColorDef[] = [
  { id: 'primary',   label: 'Primary',   cssVar: 'var(--color-fill-primary)' },
  { id: 'secondary', label: 'Secondary', cssVar: 'var(--color-fill-secondary)' },
  { id: 'tertiary',  label: 'Tertiary',  cssVar: 'var(--color-fill-tertiary)' },
  { id: 'accent',    label: 'Accent',    cssVar: 'var(--color-fill-accent)' },
  { id: 'success',   label: 'Success',   cssVar: 'var(--color-fill-success)' },
  { id: 'warning',   label: 'Warning',   cssVar: 'var(--color-fill-warning)' },
  { id: 'critical',  label: 'Critical',  cssVar: 'var(--color-fill-critical)' },
  { id: 'inverse',   label: 'Inverse',   cssVar: 'var(--color-fill-inverse)' },
]

export const INLINE_LOADER_GUIDELINES: InlineLoaderGuidelineDef[] = [
  {
    title: 'Não bloqueie a interface',
    body: 'O Inline Loader é para carregamentos pontuais dentro de componentes. Para carregamentos que impedem toda a interação da página, use um Page Loader com overlay.',
    rule: 'Regra: se o usuário não pode fazer mais nada enquanto aguarda, o Inline Loader é o componente errado.',
  },
  {
    title: 'Não substitua o Skeleton',
    body: 'O Skeleton comunica a estrutura de conteúdo que ainda está chegando — ideal para listas, cards e feeds. O Inline Loader indica processamento ativo de uma ação já iniciada.',
    rule: 'Regra: use Skeleton para carregamento inicial de conteúdo; Inline Loader para ações em andamento.',
  },
  {
    title: 'Escolha o tipo pelo contexto semântico',
    body: 'Spinner para estados genéricos. Rippler para conectividade e sessões ao vivo. Sparkle exclusivamente para processamento de IA. Ellipsis para feedback textual com espaço disponível.',
    rule: 'Regra: não troque Sparkle por Spinner em contextos de IA — a distinção visual carrega significado para o usuário.',
  },
  {
    title: 'Remova assim que concluir',
    body: 'O loader deve ser substituído imediatamente pelo resultado da ação — seja conteúdo, mensagem de sucesso ou erro. Mantê-lo visível após a conclusão cria desorientação.',
    rule: 'Regra: nunca deixe o loader visível por mais tempo do que a ação demora — use estado da aplicação para controlá-lo.',
  },
]

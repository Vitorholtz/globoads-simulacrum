export type SkeletonType =
  | 'button'
  | 'input'
  | 'avatar'
  | 'body'
  | 'title'
  | 'caption'
  | 'display'
  | 'card'

export type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

import { GuidelineDef, VariantDef } from './types'

export interface SkeletonSizeDef {
  id: SkeletonSize
  label: string
  px: number
}

export const SKELETON_TYPES: VariantDef<SkeletonType>[] = [
  {
    id: 'button',
    label: 'Button',
    description:
      'Representa um botão com bordas arredondadas. Use para sinalizar que uma ação ainda está sendo carregada.',
  },
  {
    id: 'input',
    label: 'Input',
    description:
      'Representa um campo de formulário com rótulo e caixa de entrada. Use para indicar campos em carregamento.',
  },
  {
    id: 'avatar',
    label: 'Avatar',
    description:
      'Representa uma imagem de perfil circular. Use quando uma foto ou ícone redondo ainda não foi carregado.',
  },
  {
    id: 'body',
    label: 'Body',
    description:
      'Representa uma linha de texto corrido. Use para indicar parágrafos ou blocos de conteúdo textual em carregamento.',
  },
  {
    id: 'title',
    label: 'Title',
    description:
      'Representa um título ou cabeçalho de seção. Use para indicar títulos hierárquicos ainda carregando.',
  },
  {
    id: 'caption',
    label: 'Caption',
    description:
      'Representa um texto auxiliar pequeno. Use para legendas, rótulos e metadados em carregamento.',
  },
  {
    id: 'display',
    label: 'Display',
    description:
      'Representa um texto de grande destaque. Use para títulos de display em páginas ou hero sections em carregamento.',
  },
  {
    id: 'card',
    label: 'Card',
    description:
      'Representa um cartão de conteúdo retangular. Use para cards, imagens ou blocos de conteúdo em carregamento.',
  },
]

export const SKELETON_BUTTON_SIZES: SkeletonSizeDef[] = [
  { id: 'sm', label: 'SM', px: 32 },
  { id: 'md', label: 'MD', px: 40 },
  { id: 'lg', label: 'LG', px: 48 },
]

export const SKELETON_INPUT_SIZES: SkeletonSizeDef[] = [
  { id: 'sm', label: 'SM', px: 32 },
  { id: 'md', label: 'MD', px: 40 },
  { id: 'lg', label: 'LG', px: 48 },
]

export const SKELETON_AVATAR_SIZES: SkeletonSizeDef[] = [
  { id: 'xs', label: 'XS', px: 24 },
  { id: 'sm', label: 'SM', px: 32 },
  { id: 'md', label: 'MD', px: 40 },
  { id: 'lg', label: 'LG', px: 56 },
  { id: 'xl', label: 'XL', px: 80 },
]

export const SKELETON_BODY_SIZES: SkeletonSizeDef[] = [
  { id: 'xs', label: 'XS', px: 16 },
  { id: 'sm', label: 'SM', px: 20 },
  { id: 'md', label: 'MD', px: 24 },
  { id: 'lg', label: 'LG', px: 28 },
]

export const SKELETON_TITLE_SIZES: SkeletonSizeDef[] = [
  { id: 'sm', label: 'SM', px: 20 },
  { id: 'md', label: 'MD', px: 24 },
  { id: 'lg', label: 'LG', px: 32 },
]

export const SKELETON_CAPTION_SIZES: SkeletonSizeDef[] = [
  { id: 'sm', label: 'SM', px: 14 },
  { id: 'md', label: 'MD', px: 16 },
  { id: 'lg', label: 'LG', px: 20 },
]

export const SKELETON_DISPLAY_SIZES: SkeletonSizeDef[] = [
  { id: 'sm', label: 'SM', px: 32 },
  { id: 'md', label: 'MD', px: 40 },
  { id: 'lg', label: 'LG', px: 48 },
  { id: 'xl', label: 'XL', px: 64 },
  { id: '2xl', label: '2XL', px: 80 },
  { id: '3xl', label: '3XL', px: 96 },
]

export const SKELETON_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Use apenas para conteúdo com estrutura previsível',
    body: 'O Skeleton é ideal quando você conhece a forma do conteúdo que será carregado — listas, cards, perfis. Para estados genéricos sem estrutura definida, prefira o Inline Loader.',
    rule: 'Regra: não use Skeleton para dados dinâmicos cujo layout você não consegue prever com antecedência.',
  },
  {
    title: 'Mantenha aria-hidden="true" sempre',
    body: 'O Skeleton é puramente visual. Leitores de tela não devem anunciá-lo como conteúdo. O atributo aria-hidden="true" deve estar sempre presente no componente.',
    rule: 'Regra: nunca omita aria-hidden — o placeholder pode confundir tecnologias assistivas se anunciado.',
  },
  {
    title: 'Respeite as proporções do componente real',
    body: 'Escolha o tipo e tamanho que mais se aproximam do componente real. Um Skeleton de tamanho errado causa um salto de layout (CLS) quando o conteúdo é renderizado.',
    rule: 'Regra: o Skeleton deve ocupar exatamente o mesmo espaço que o conteúdo final para evitar layout shift.',
  },
  {
    title: 'Não substitua o Page Loader ou Inline Loader',
    body: 'Use o Page Loader para bloqueios de página inteira. Use o Inline Loader para feedback de ações pontuais em andamento. O Skeleton cobre apenas o carregamento inicial de conteúdo estruturado.',
    rule: 'Regra: Skeleton = carregamento inicial de conteúdo. Inline Loader = ação em progresso. Page Loader = bloqueio total.',
  },
]

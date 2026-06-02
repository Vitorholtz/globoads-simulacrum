import type { GuidelineDef, VariantDef } from './types'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarVariant = 'initial' | 'photo' | 'placeholder'

export interface AvatarSizeDef {
  id: AvatarSize
  label: string
  px: number
  description: string
  recommended?: boolean
}

export const AVATAR_SIZES: AvatarSizeDef[] = [
  {
    id: 'xs',
    label: 'XS',
    px: 24,
    description: 'Uso em contextos muito densos — tabelas, listas compactas, comentários inline.',
  },
  {
    id: 'sm',
    label: 'SM',
    px: 32,
    description: 'Listagens, feeds e componentes de baixa hierarquia visual.',
  },
  {
    id: 'md',
    label: 'MD',
    px: 40,
    description: 'Tamanho padrão para a maioria dos contextos de produto.',
    recommended: true,
  },
  {
    id: 'lg',
    label: 'LG',
    px: 56,
    description: 'Cabeçalhos de perfil, cards de usuário com destaque moderado.',
  },
  {
    id: 'xl',
    label: 'XL',
    px: 80,
    description:
      'Páginas de perfil, modais de apresentação e contextos com máximo destaque visual.',
  },
]

export const AVATAR_VARIANTS: VariantDef<AvatarVariant>[] = [
  {
    id: 'initial',
    label: 'Initials',
    description:
      'Exibe as iniciais do primeiro e último nome do usuário. Fallback padrão quando não há foto disponível.',
  },
  {
    id: 'placeholder',
    label: 'Placeholder',
    description:
      'Estado genérico sem identidade associada. Usado em grupos ou listas antes de os dados do usuário serem carregados.',
  },
  {
    id: 'photo',
    label: 'Photo',
    description:
      'Exibe a foto do usuário preenchendo todo o espaço circular. Priorize sempre que uma imagem de perfil estiver disponível.',
  },
]

export const AVATAR_GROUP_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Limite de exibição',
    body: 'Exiba no máximo 3 a 5 avatares sobrepostos. Quando houver mais participantes, use um avatar de contagem (+N) ao final do grupo para não sobrecarregar a interface.',
    rule: 'Nunca exiba mais de 5 avatares sem um indicador de contagem.',
  },
  {
    title: 'Consistência de variante',
    body: 'Dentro de um mesmo grupo, use sempre a mesma variante. Misturar Photos e Initials no mesmo grupo cria inconsistência visual.',
    rule: 'Um grupo, uma variante.',
  },
  {
    title: 'Texto complementar',
    body: 'O texto ao lado do grupo deve descrever quem ou quantos são os participantes. Seja específico: "3 pessoas curtiram" é mais informativo do que apenas o grupo de avatares.',
    rule: 'Sempre acompanhe o grupo de um texto descritivo.',
  },
]

export const AVATAR_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Iniciais como fallback',
    body: 'A variação Initials é o fallback padrão quando o usuário não possui foto de perfil. As iniciais exibem sempre o primeiro caractere do primeiro e do último nome.',
    rule: 'Nunca exiba um avatar vazio — garanta que as iniciais sejam derivadas do nome real do usuário.',
  },
  {
    title: 'Tamanho e hierarquia',
    body: 'O tamanho do avatar comunica a importância do usuário no contexto. XL para páginas de perfil, MD para listas e cabeçalhos, XS/SM para contextos densos.',
    rule: 'Use tamanhos menores (XS, SM) em listas ou tabelas; reserve XL para páginas de destaque.',
  },
  {
    title: 'Consistência no mesmo contexto',
    body: 'Dentro de uma mesma lista ou grupo de avatares, use sempre o mesmo tamanho. Misturar tamanhos em uma grade ou lista cria desordem visual.',
    rule: 'Um contexto, um tamanho.',
  },
  {
    title: 'Proporção e recorte da foto',
    body: 'Fotos de perfil são exibidas em círculo com object-fit: cover. O recorte é centralizado — oriente os usuários a enviarem imagens com o rosto centralizado.',
    rule: 'Fotos devem ter proporção 1:1 para evitar distorção.',
  },
]

import { GuidelineDef, StateDef } from './types'

export type CollapseSize = 'xs' | 'sm' | 'md' | 'lg'

export interface CollapseSizeDef {
  id: CollapseSize
  label: string
  description: string
  recommended?: boolean
  fontSize: number
  lineHeight: number
  iconSize: number
  gap: number
}

export const COLLAPSE_SIZES: CollapseSizeDef[] = [
  {
    id: 'xs',
    label: 'XS',
    description: 'Para contextos muito compactos, como tabelas densas e filtros secundários.',
    fontSize: 12,
    lineHeight: 16,
    iconSize: 14,
    gap: 2,
  },
  {
    id: 'sm',
    label: 'SM',
    description: 'Ideal para listas, painéis laterais e seções com hierarquia secundária.',
    fontSize: 14,
    lineHeight: 20,
    iconSize: 16,
    gap: 4,
  },
  {
    id: 'md',
    label: 'MD',
    recommended: true,
    description: 'Tamanho padrão para a maioria dos formulários e páginas de conteúdo.',
    fontSize: 16,
    lineHeight: 24,
    iconSize: 20,
    gap: 4,
  },
  {
    id: 'lg',
    label: 'LG',
    description: 'Para acionadores com hierarquia visual de título ou destaque principal.',
    fontSize: 20,
    lineHeight: 32,
    iconSize: 24,
    gap: 4,
  },
]

export const COLLAPSE_STATES: StateDef<string>[] = [
  {
    id: 'normal',
    label: 'Normal',
    description: 'Estado padrão. Cor azul primária sem decoração de texto.',
  },
  {
    id: 'hover',
    label: 'Hover',
    description: 'Cursor sobre o acionador. Azul escurece e sublinhado aparece.',
  },
  {
    id: 'focus',
    label: 'Focus',
    description: 'Foco via teclado. Anel de foco visível ao redor do acionador.',
  },
  {
    id: 'active',
    label: 'Active',
    description: 'Acionador pressionado. Tom azul mais escuro com sublinhado.',
  },
]

export const COLLAPSE_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Use para conteúdo complementar',
    body: 'O Collapse é ideal para ocultar informações secundárias que não precisam estar visíveis o tempo todo — como detalhes adicionais, textos explicativos longos ou seções opcionais de configuração de campanha.',
    rule: 'Não use para esconder informações críticas ao fluxo principal do usuário.',
  },
  {
    title: 'Label clara e descritiva',
    body: 'O texto do acionador deve descrever com precisão o que será revelado ao expandir. Evite rótulos genéricos como "Ver mais" sem contexto suficiente para o usuário entender o que esperar.',
    rule: 'Prefira "Ver detalhes da campanha" a "Ver mais" em contextos específicos.',
  },
  {
    title: 'Estado inicial adequado',
    body: 'Decida se o conteúdo deve iniciar aberto ou fechado com base na relevância para o usuário. Conteúdo importante para a maioria dos casos deve iniciar expandido para garantir visibilidade imediata.',
    rule: 'Use defaultOpen={true} quando o conteúdo for relevante para a maioria dos usuários.',
  },
  {
    title: 'Consistência em grupos',
    body: 'Quando múltiplos Collapses aparecem na mesma seção, mantenha o mesmo tamanho e padrão de label para todos. Variações sem justificativa visual criam inconsistência na interface.',
    rule: 'Mantenha tamanho e padrão de label consistentes em todos os Collapses de um grupo.',
  },
]

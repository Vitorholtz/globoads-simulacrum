import type { GuidelineDef, StateDef } from './types'

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

export const COLLAPSE_PREVIEW_TEXT =
  'A segmentação desta campanha está configurada para atingir usuários entre 25 e 45 anos, residentes nas regiões Sudeste e Sul do Brasil. O público-alvo inclui pessoas com interesse em esportes, entretenimento digital e consumo de mídia online. A frequência máxima de exibição está limitada a 3 impressões por usuário por dia, garantindo relevância sem saturação. O período de exclusão cobre os últimos 30 dias de conversão para evitar reimpacto de usuários que já converteram. Estimativa de alcance semanal: 2,4 milhões de usuários únicos.'

export const COLLAPSE_MATRIX_STATES: {
  id: string
  label: string
  force: 'hover' | 'focus' | 'active' | undefined
}[] = [
  { id: 'normal', label: 'Normal', force: undefined },
  { id: 'hover', label: 'Hover', force: 'hover' },
  { id: 'focus', label: 'Focus', force: 'focus' },
  { id: 'active', label: 'Active', force: 'active' },
]

export const COLLAPSE_DEMO_ITEMS: {
  key: string
  size: CollapseSize
  label: string
  text: string
}[] = [
  {
    key: 'segmentacao',
    size: 'lg',
    label: 'Sobre a segmentação',
    text: 'A segmentação desta campanha está configurada para atingir usuários entre 25 e 45 anos, residentes nas regiões Sudeste e Sul do Brasil. O público-alvo inclui pessoas com interesse em esportes, entretenimento digital e consumo de mídia online. A frequência máxima de exibição está limitada a 3 impressões por usuário por dia, garantindo relevância sem saturação. O período de exclusão cobre os últimos 30 dias de conversão para evitar reimpacto de usuários que já converteram. Estimativa de alcance semanal: 2,4 milhões de usuários únicos, com CPM médio projetado de R$ 18,50.',
  },
  {
    key: 'specs',
    size: 'md',
    label: 'Especificações técnicas',
    text: 'O formato Video Bumper exige arquivos MP4 ou WebM com resolução mínima de 1280×720px e duração fixa de 6 segundos. O peso máximo aceito é 50 MB, com taxa de bits de vídeo de até 8 Mbps e codec H.264 ou VP9. O áudio deve estar codificado em AAC-LC com amostragem de 44.1 kHz. Legendas no formato SRT são opcionais mas recomendadas para garantir acessibilidade e desempenho em reproduções sem som. Arquivos fora das especificações serão rejeitados automaticamente durante o processo de upload.',
  },
  {
    key: 'termos',
    size: 'sm',
    label: 'Termos de veiculação',
    text: 'A veiculação deste anúncio está sujeita às políticas de conteúdo da Globo Ads e às diretrizes de publicidade responsável do CONAR. O anunciante é o único responsável pela veracidade das informações divulgadas e pela conformidade com a LGPD no tratamento de dados coletados via píxel de conversão. Campanhas com conteúdo sensível — incluindo produtos financeiros, saúde e bebidas alcoólicas — requerem aprovação prévia da equipe de moderação com antecedência mínima de 48 horas úteis antes da data de início da veiculação.',
  },
]

export const COLLAPSE_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Use para conteúdo complementar',
    body: 'O Collapse é ideal para ocultar informações secundárias que não precisam estar visíveis o tempo todo — como detalhes adicionais, textos explicativos longos ou seções opcionais de configuração de campanha.',
  },
  {
    title: 'Label clara e descritiva',
    body: 'O texto do acionador deve descrever com precisão o que será revelado ao expandir. Evite rótulos genéricos como "Ver mais" sem contexto suficiente para o usuário entender o que esperar.',
  },
  {
    title: 'Estado inicial adequado',
    body: 'Decida se o conteúdo deve iniciar aberto ou fechado com base na relevância para o usuário. Conteúdo importante para a maioria dos casos deve iniciar expandido para garantir visibilidade imediata.',
  },
  {
    title: 'Consistência em grupos',
    body: 'Quando múltiplos Collapses aparecem na mesma seção, mantenha o mesmo tamanho e padrão de label para todos. Variações sem justificativa visual criam inconsistência na interface.',
  },
]

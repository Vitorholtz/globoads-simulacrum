export type IconVariant = 'outlined' | 'filled'

export type IconClassToken = {
  className: string
  size: number
  cssVar: string
  description: string
  usedIn: string
  recommended?: boolean
}

export type IconModifierToken = {
  className: string
  cssValue: string
  description: string
  usedIn: string
}

export type IconSizeToken = {
  value: number
  label: string
  description: string
  recommended?: boolean
}

export type IconVariantRule = {
  variant: IconVariant
  title: string
  tagline: string
  when: string[]
  examples: string
}

export type IconGuideline = {
  title: string
  body: string
}

export type IconEntry = {
  name: string
  label: string
}

export type IconCategory = {
  id: string
  name: string
  description: string
  icons: IconEntry[]
}

export const ICON_CLASS_TOKENS: IconClassToken[] = [
  {
    className: 'icon-xs',
    size: 14,
    cssVar: '--font-size-087',
    description: 'Ícones em componentes compactos onde o espaço é restrito',
    usedIn: 'Checkbox · Switch · ChipInput',
  },
  {
    className: 'icon-sm',
    size: 16,
    cssVar: '--font-size-100',
    description: 'Ícones em linha com texto de interface — chips e separadores',
    usedIn: 'ChipAssist · ChipFilter · Breadcrumb',
  },
  {
    className: 'icon-md',
    size: 20,
    cssVar: '--font-size-125',
    description: 'Padrão de produto — botões, campos de texto e abas',
    usedIn: 'Button · Tabs · Accordion · Sidebar',
  },
  {
    className: 'icon-lg',
    size: 24,
    cssVar: '--font-size-150',
    description: 'Ações de destaque — campos lg, calendário e paginação',
    usedIn: 'DatePicker · Pagination',
    recommended: true,
  },
  {
    className: 'icon-xl',
    size: 32,
    cssVar: '--font-size-200',
    description: 'Empty states, ilustrações de suporte e destaques visuais',
    usedIn: 'Prévia de biblioteca · Showcases',
  },
]

export const ICON_FILLED_MODIFIER: IconModifierToken = {
  className: 'icon-filled',
  cssValue: 'FILL 1',
  description:
    'Ativa o eixo FILL da variable font. Comunica estado ativo, selecionado ou de alta ênfase.',
  usedIn: 'Nav ativo · Favorito · Toggle marcado',
}

export const ICON_SIZES: IconSizeToken[] = [
  {
    value: 20,
    label: '20px',
    description: 'Inline com texto pequeno, badges, tags compactas e captions',
  },
  {
    value: 24,
    label: '24px',
    description: 'Padrão de interface — navegação, botões e ações de produto',
    recommended: true,
  },
  {
    value: 32,
    label: '32px',
    description: 'Ações em destaque, cabeçalhos de card e itens de lista ampliados',
  },
]

export const VARIANT_DEMO_ICONS = [
  'home',
  'notifications',
  'bookmark',
  'favorite',
  'star',
  'settings',
]

export const ICON_VARIANT_RULES: IconVariantRule[] = [
  {
    variant: 'outlined',
    title: 'Outlined',
    tagline: 'Estado padrão e inativo',
    when: [
      'Itens de navegação no estado padrão (não selecionado)',
      'Ações de baixa ênfase ou complementares ao conteúdo',
      'Contextos informativos onde o ícone é suporte visual',
      'Quando o ícone é secundário ao elemento principal da UI',
    ],
    examples: 'Nav bar inativo · Botões terciários · Labels informativos',
  },
  {
    variant: 'filled',
    title: 'Filled',
    tagline: 'Estado ativo e selecionado',
    when: [
      'Item de navegação ativo ou página atual selecionada',
      'Toggles ativados: favorito, salvo, curtido, marcado',
      'Ações de alta ênfase e destaque visual na interface',
      'Quando o ícone é o elemento principal e comunicador de estado',
    ],
    examples: 'Nav bar ativo · Toggle marcado · Ação confirmada',
  },
]

export const ICON_GUIDELINES: IconGuideline[] = [
  {
    title: 'Consistência de variante',
    body: 'Nunca misture Outlined e Filled para itens equivalentes em um mesmo componente. A mudança de variante deve sempre comunicar alteração de estado — não ser uma escolha estética.',
  },
  {
    title: 'Tamanho mínimo e toque',
    body: 'O tamanho mínimo recomendado é 24px para interfaces de produto. Em alvos de toque mobile, o container interativo deve ter no mínimo 44×44px, independentemente do tamanho visual do ícone.',
  },
  {
    title: 'Espaçamento com texto',
    body: 'Ao parear ícone com rótulo, mantenha gap mínimo de 8px entre os dois elementos. Alinhe sempre ao centro vertical. O ícone deve ter a mesma cor do texto por herança — não defina cores isoladas.',
  },
  {
    title: 'Cor e semântica de estado',
    body: 'Ícones herdam a cor do elemento pai por padrão. Use tokens de cor semânticos (Fill Success, Fill Critical, Fill Accent) apenas quando o ícone comunica um estado do sistema — nunca para fins puramente decorativos.',
  },
]

export const ICON_CATEGORIES: IconCategory[] = [
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Movimentação, orientação e estrutura de interface',
    icons: [
      { name: 'home', label: 'home' },
      { name: 'menu', label: 'menu' },
      { name: 'search', label: 'search' },
      { name: 'arrow_back', label: 'arrow_back' },
      { name: 'arrow_forward', label: 'arrow_forward' },
      { name: 'close', label: 'close' },
      { name: 'expand_more', label: 'expand_more' },
      { name: 'chevron_right', label: 'chevron_right' },
      { name: 'settings', label: 'settings' },
      { name: 'more_vert', label: 'more_vert' },
    ],
  },
  {
    id: 'actions',
    name: 'Actions',
    description: 'Ações do usuário, edição e interações principais',
    icons: [
      { name: 'add', label: 'add' },
      { name: 'edit', label: 'edit' },
      { name: 'delete', label: 'delete' },
      { name: 'share', label: 'share' },
      { name: 'download', label: 'download' },
      { name: 'upload', label: 'upload' },
      { name: 'refresh', label: 'refresh' },
      { name: 'bookmark', label: 'bookmark' },
      { name: 'favorite', label: 'favorite' },
      { name: 'star', label: 'star' },
    ],
  },
  {
    id: 'status',
    name: 'Status & Feedback',
    description: 'Indicadores de estado, alertas e retorno ao usuário',
    icons: [
      { name: 'check_circle', label: 'check_circle' },
      { name: 'error', label: 'error' },
      { name: 'warning', label: 'warning' },
      { name: 'info', label: 'info' },
      { name: 'help', label: 'help' },
      { name: 'pending', label: 'pending' },
      { name: 'cancel', label: 'cancel' },
      { name: 'block', label: 'block' },
    ],
  },
  {
    id: 'media',
    name: 'Media',
    description: 'Reprodução, controle e elementos de mídia audiovisual',
    icons: [
      { name: 'play_arrow', label: 'play_arrow' },
      { name: 'pause', label: 'pause' },
      { name: 'stop', label: 'stop' },
      { name: 'volume_up', label: 'volume_up' },
      { name: 'volume_off', label: 'volume_off' },
      { name: 'fullscreen', label: 'fullscreen' },
      { name: 'replay', label: 'replay' },
      { name: 'skip_next', label: 'skip_next' },
    ],
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Mensagens, notificações e canais de comunicação',
    icons: [
      { name: 'mail', label: 'mail' },
      { name: 'chat', label: 'chat' },
      { name: 'notifications', label: 'notifications' },
      { name: 'phone', label: 'phone' },
      { name: 'send', label: 'send' },
      { name: 'forum', label: 'forum' },
      { name: 'comment', label: 'comment' },
      { name: 'contact_mail', label: 'contact_mail' },
    ],
  },
  {
    id: 'content',
    name: 'Content',
    description: 'Arquivos, documentos e organização de conteúdo',
    icons: [
      { name: 'article', label: 'article' },
      { name: 'image', label: 'image' },
      { name: 'folder', label: 'folder' },
      { name: 'file_copy', label: 'file_copy' },
      { name: 'description', label: 'description' },
      { name: 'note', label: 'note' },
      { name: 'attach_file', label: 'attach_file' },
      { name: 'link', label: 'link' },
    ],
  },
]

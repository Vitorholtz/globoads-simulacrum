export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonVariantDef = {
  id: ButtonVariant
  name: string
  tagline: string
  description: string
  when: string[]
}

export type ButtonSizeDef = {
  id: ButtonSize
  label: string
  paddingY: number
  paddingX: number
  paddingXIconSide: number
  paddingXTextSide: number
  paddingIconOnly: number
  fontSize: number
  iconSize: number
  gap: number
  description: string
  recommended?: boolean
}

export const BUTTON_VARIANTS: ButtonVariantDef[] = [
  {
    id: 'primary',
    name: 'Primary',
    tagline: 'Ação principal',
    description:
      'Botão de maior destaque visual. Reservado para a ação mais importante da tela. Use com parcimônia — uma tela deve ter no máximo um Primary.',
    when: [
      'Confirmar, salvar ou enviar formulários',
      'Ação principal de uma modal ou painel',
      'CTA principal de hero ou onboarding',
    ],
  },
  {
    id: 'secondary',
    name: 'Secondary',
    tagline: 'Ação secundária',
    description:
      'Botão outlined com texto em gradiente. Para ações complementares que acompanham um Primary, ou quando o Primary causaria sobrecarga visual.',
    when: [
      'Alternativa ao Primary ("Cancelar" ao lado de "Salvar")',
      'Ações de edição ou configuração em cards',
      'Contextos onde o Primary seria visualmente excessivo',
    ],
  },
  {
    id: 'tertiary',
    name: 'Tertiary',
    tagline: 'Ação terciária / Ghost',
    description:
      'Botão sem borda com texto em gradiente. Máxima leveza visual. Ideal para ações de baixa prioridade e links com semântica de botão.',
    when: [
      '"Ver mais", "Saiba mais" em listagens',
      'Links de navegação com comportamento de botão',
      'Ações de baixa prioridade em toolbars densas',
    ],
  },
]

export const BUTTON_SIZES: ButtonSizeDef[] = [
  {
    id: 'sm',
    label: 'Small',
    paddingY: 8,
    paddingX: 12,
    paddingXIconSide: 8,
    paddingXTextSide: 12,
    paddingIconOnly: 8,
    fontSize: 14,
    iconSize: 16,
    gap: 4,
    description: 'Tabelas, listas densas, toolbars, tags acionáveis.',
  },
  {
    id: 'md',
    label: 'Medium',
    paddingY: 10,
    paddingX: 16,
    paddingXIconSide: 12,
    paddingXTextSide: 16,
    paddingIconOnly: 10,
    fontSize: 16,
    iconSize: 20,
    gap: 6,
    description: 'Tamanho padrão para a maioria dos contextos de produto.',
    recommended: true,
  },
  {
    id: 'lg',
    label: 'Large',
    paddingY: 14,
    paddingX: 20,
    paddingXIconSide: 16,
    paddingXTextSide: 20,
    paddingIconOnly: 14,
    fontSize: 20,
    iconSize: 20,
    gap: 8,
    description: 'CTAs proeminentes: heroes, modais de alta hierarquia, onboarding.',
  },
]

export const BUTTON_STATES = [
  { id: 'normal',   label: 'Normal',   description: 'Estado padrão em repouso.' },
  { id: 'hover',    label: 'Hover',    description: 'Cursor sobre o elemento.' },
  { id: 'focus',    label: 'Focus',    description: 'Foco via teclado — anel de acessibilidade.' },
  { id: 'active',   label: 'Active',   description: 'Botão pressionado.' },
  { id: 'disabled', label: 'Disabled', description: 'Indisponível — opacidade 48%.' },
  { id: 'loading',  label: 'Loading',  description: 'Aguardando resposta — spinner substitui ícone.' },
] as const

export const BUTTON_CONTENT_VARIANTS = [
  { id: 'text',      label: 'Text only',  icon: undefined, iconRight: undefined },
  { id: 'iconLeft',  label: 'Icon left',  icon: 'add',     iconRight: undefined },
  { id: 'iconRight', label: 'Icon right', icon: undefined, iconRight: 'arrow_forward' },
  { id: 'iconOnly',  label: 'Icon only',  icon: 'add',     iconRight: undefined, noLabel: true },
] as const

export const BUTTON_GUIDELINES = [
  {
    title: 'Hierarquia de ênfase',
    body: 'Nunca combine dois botões Primary na mesma tela. A hierarquia Primary → Secondary → Tertiary deve refletir a importância relativa das ações.',
    rule: 'Uma tela, um Primary.',
  },
  {
    title: 'Ícones e semântica',
    body: 'Ícone à esquerda reforça a natureza da ação (add, edit, delete). Ícone à direita indica consequência ou destino (arrow_forward, open_in_new). Icon only exige tooltip.',
    rule: 'Ícone reforça; nunca substitui a label sem tooltip.',
  },
  {
    title: 'Tamanho mínimo de toque',
    body: 'O tamanho mínimo de área de toque é 40×40px. O botão SM (32px de altura) deve ser complementado com padding extra ou área de toque expandida em contextos touch.',
    rule: 'Área de toque ≥ 40×40px.',
  },
  {
    title: 'Estado loading',
    body: 'Ao disparar uma ação assíncrona, aplique o estado loading imediatamente para prevenir cliques duplos. O botão permanece visível (não some) — o spinner substitui o ícone.',
    rule: 'Feedback imediato ao clique.',
  },
]

/* ── Danger variants ── */

export const DANGER_BUTTON_VARIANTS: ButtonVariantDef[] = [
  {
    id: 'primary',
    name: 'Danger Primary',
    tagline: 'Ação destrutiva principal',
    description:
      'Máximo destaque para ações irreversíveis. Reservado para confirmações de exclusão permanente ou operações de alto risco que exigem clareza absoluta.',
    when: [
      'Confirmar exclusão permanente de dados',
      'Ação principal de modais de confirmação destrutiva',
      'CTAs de desativação, remoção ou cancelamento irreversível',
    ],
  },
  {
    id: 'secondary',
    name: 'Danger Secondary',
    tagline: 'Ação destrutiva secundária',
    description:
      'Borda neutra com texto vermelho. Sinaliza perigo com menor impacto visual — adequado quando a ação destrutiva acompanha uma ação segura ou não é a principal.',
    when: [
      'Opção destrutiva ao lado de uma ação segura',
      'Ações de remoção em listagens ou configurações',
      'Contextos onde o Danger Primary seria visualmente excessivo',
    ],
  },
  {
    id: 'tertiary',
    name: 'Danger Tertiary',
    tagline: 'Ação destrutiva ghost',
    description:
      'Sem borda, texto vermelho. Máxima leveza com sinalização de perigo. Para ações destrutivas de menor prioridade em toolbars ou interfaces densas.',
    when: [
      '"Remover" ou "Excluir" em linhas de tabela',
      'Ações de limpeza em formulários',
      'Opções destrutivas de baixa prioridade em menus',
    ],
  },
]

export const DANGER_BUTTON_GUIDELINES = [
  {
    title: 'Reserve para ações irreversíveis',
    body: 'Botões Danger sinalizam perigo real. Use-os apenas quando a ação não pode ser desfeita: exclusão permanente, remoção de conta, cancelamento definitivo.',
    rule: 'Se existe "Desfazer", não use Danger.',
  },
  {
    title: 'Confirme antes de executar',
    body: 'Um Danger Primary nunca deve agir diretamente na primeira ação do usuário. Interponha uma modal de confirmação para prevenir cliques acidentais em operações destrutivas.',
    rule: 'Danger Primary exige confirmação explícita.',
  },
  {
    title: 'Hierarquia dentro de Danger',
    body: 'Use Primary para a ação destrutiva principal, Secondary para alternativa destrutiva e Tertiary para opções destrutivas de baixa prioridade. Nunca combine dois Danger Primary.',
    rule: 'Uma interface, um Danger Primary.',
  },
  {
    title: 'Label explícita e específica',
    body: 'O label de um botão Danger deve deixar claro o que será destruído: "Excluir campanha" é melhor que "Confirmar". Ícones como delete ou warning reforçam o contexto destrutivo.',
    rule: 'Seja específico: o que exatamente será destruído?',
  },
]

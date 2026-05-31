export type TextFieldSize = 'sm' | 'md' | 'lg'

export type TextFieldSizeDef = {
  id: TextFieldSize
  label: string
  paddingY: number
  paddingX: number
  fontSize: number
  iconSize: number
  description: string
  recommended?: boolean
}

export const TEXT_FIELD_SIZES: TextFieldSizeDef[] = [
  {
    id: 'sm',
    label: 'Small',
    paddingY: 6,
    paddingX: 8,
    fontSize: 14,
    iconSize: 16,
    description: 'Tabelas densas, filtros compactos, formulários com muitos campos.',
  },
  {
    id: 'md',
    label: 'Medium',
    paddingY: 8,
    paddingX: 12,
    fontSize: 16,
    iconSize: 20,
    description: 'Tamanho padrão para a maioria dos formulários e campos de busca.',
    recommended: true,
  },
  {
    id: 'lg',
    label: 'Large',
    paddingY: 12,
    paddingX: 12,
    fontSize: 16,
    iconSize: 24,
    description: 'Destaque visual em formulários de cadastro, landing pages e onboarding.',
  },
]

export const TEXT_FIELD_STATES = [
  { id: 'normal', label: 'Normal', description: 'Estado padrão em repouso.' },
  { id: 'hover', label: 'Hover', description: 'Cursor sobre o campo — borda escurece.' },
  { id: 'focus', label: 'Focus', description: 'Campo ativo com foco — borda azul 2px.' },
  { id: 'error', label: 'Error', description: 'Validação falhou — borda e fundo crítico.' },
  { id: 'disabled', label: 'Disabled', description: 'Campo indisponível — opacidade 48%.' },
] as const

export const TEXT_FIELD_GUIDELINES = [
  {
    title: 'Label sempre visível',
    body: 'Nunca substitua a label por placeholder. O placeholder some quando o usuário começa a digitar, deixando o campo sem contexto. A label deve estar sempre posicionada acima do campo.',
    rule: 'Label acima, placeholder dentro — nunca um pelo outro.',
  },
  {
    title: 'Mensagens de erro claras',
    body: 'O texto de erro deve explicar o que está errado e como corrigir. Evite mensagens genéricas como "Campo inválido". Seja específico: "Email deve ter o formato nome@domínio.com".',
    rule: 'Diga o que está errado e como corrigir.',
  },
  {
    title: 'Ícone como apoio contextual',
    body: 'Use o ícone à esquerda para reforçar o tipo de dado esperado (search, mail, phone). O ícone nunca deve substituir a label. Reserve o ícone de erro (à direita) exclusivamente para validação.',
    rule: 'Ícone reforça contexto — nunca substitui label.',
  },
  {
    title: 'Campo opcional explícito',
    body: 'Marque campos opcionais com a tag "Opcional" em vez de marcar os obrigatórios com asterisco. A exceção são formulários onde todos os campos são opcionais — aí omita a marcação.',
    rule: 'Marque o opcional, não o obrigatório.',
  },
]

export const TEXT_FIELD_MATRIX_STATES: {
  id: string
  label: string
  force: 'hover' | 'focus' | 'error' | 'disabled' | undefined
}[] = [
  { id: 'normal', label: 'Normal', force: undefined },
  { id: 'hover', label: 'Hover', force: 'hover' },
  { id: 'focus', label: 'Focus', force: 'focus' },
  { id: 'error', label: 'Error', force: 'error' },
  { id: 'disabled', label: 'Disabled', force: 'disabled' },
]

export const TEXT_FIELD_MATRIX_COLS: {
  id: string
  label: string
  value: string
  icon: string | undefined
}[] = [
  { id: 'placeholder', label: 'Placeholder', value: '', icon: undefined },
  { id: 'filled', label: 'Filled', value: 'Text here', icon: undefined },
  { id: 'icon-ph', label: 'Com ícone', value: '', icon: 'search' },
  { id: 'icon-filled', label: 'Ícone+Texto', value: 'Text here', icon: 'search' },
]

export type TextFieldMask = 'cpf' | 'cnpj' | 'phone' | 'cep' | 'date'

export interface TextFieldMaskDef {
  id: TextFieldMask
  label: string
  placeholder: string
  example: string
  description: string
}

export const TEXT_FIELD_MASKS: TextFieldMaskDef[] = [
  { id: 'phone', label: 'Telefone', placeholder: '(11) 91234-5678',   example: '(11) 91234-5678',   description: 'Celular (11 dígitos) e fixo (10 dígitos) com DDD.' },
  { id: 'cpf',   label: 'CPF',      placeholder: '000.000.000-00',     example: '123.456.789-09',     description: 'Cadastro de Pessoa Física — XXX.XXX.XXX-XX.' },
  { id: 'cnpj',  label: 'CNPJ',     placeholder: '00.000.000/0000-00', example: '12.345.678/0001-90', description: 'Cadastro de Pessoa Jurídica — XX.XXX.XXX/XXXX-XX.' },
  { id: 'cep',   label: 'CEP',      placeholder: '00000-000',          example: '01310-100',           description: 'Código de Endereçamento Postal — XXXXX-XXX.' },
  { id: 'date',  label: 'Data',     placeholder: 'DD/MM/AAAA',         example: '31/12/2025',          description: 'Data no formato brasileiro DD/MM/AAAA.' },
]

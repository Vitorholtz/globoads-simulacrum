export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'critical' | 'accent'

export interface BadgeVariantDef {
  id: BadgeVariant
  label: string
  description: string
}

export interface BadgeGuidelineDef {
  title: string
  body: string
  rule: string
}

export const BADGE_VARIANTS: BadgeVariantDef[] = [
  {
    id: 'neutral',
    label: 'Neutral',
    description: 'Estado padrão sem conotação semântica. Usado para categorias, rótulos genéricos ou informações sem urgência.',
  },
  {
    id: 'success',
    label: 'Success',
    description: 'Confirma a conclusão bem-sucedida de uma ação ou estado positivo: publicado, aprovado, ativo, concluído.',
  },
  {
    id: 'warning',
    label: 'Warning',
    description: 'Sinaliza um estado que exige atenção sem ser crítico: pendente, em revisão, quase no limite.',
  },
  {
    id: 'critical',
    label: 'Critical',
    description: 'Indica falha, erro ou estado urgente que requer ação imediata: recusado, bloqueado, expirado.',
  },
  {
    id: 'accent',
    label: 'Accent',
    description: 'Destaque com a cor de marca. Usado para estados especiais, novidades ou itens em destaque na plataforma.',
  },
]

export const BADGE_GUIDELINES: BadgeGuidelineDef[] = [
  {
    title: 'Use texto conciso',
    body: 'O badge deve conter no máximo 2 palavras. Textos longos quebram o padrão visual e comprometem a legibilidade em listas e tabelas.',
    rule: 'Regra: evite frases completas — prefira: "Ativo", "Em revisão", "Expirado".',
  },
  {
    title: 'Escolha a variante pela semântica',
    body: 'Cada variante carrega uma conotação emocional e deve ser usada de forma consistente. Misturar variantes para fins estéticos confunde o usuário sobre o real estado do item.',
    rule: 'Regra: critical só para erros e bloqueios; success para conclusões positivas; warning para alertas não urgentes.',
  },
  {
    title: 'Não use como ação',
    body: 'O badge é um indicador passivo — não possui interação. Para ações ou filtros clicáveis, use Chips ou Tags interativos.',
    rule: 'Regra: badges não devem ter cursor pointer nem responder a cliques do usuário.',
  },
  {
    title: 'Combine com outros elementos',
    body: 'Badges ganham mais contexto quando combinados com o nome do item que qualificam — em linhas de tabela, cabeçalhos de card ou ao lado de títulos de seção.',
    rule: 'Padrão: posicione o badge à direita do texto que ele qualifica ou abaixo em cards verticais.',
  },
]

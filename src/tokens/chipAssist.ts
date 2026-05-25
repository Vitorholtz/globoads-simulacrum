export type ChipAssistGuidelineDef = {
  title: string
  body: string
  rule: string
}

export const CHIP_ASSIST_GUIDELINES: ChipAssistGuidelineDef[] = [
  {
    title: 'Ações contextuais e dinâmicas',
    body: 'Chips de assistência devem emergir a partir do contexto detectado — uma data no texto gera "Criar evento", um endereço gera "Ver no mapa". Nunca exiba chips de assist como lista fixa ou menu de ações.',
    rule: 'Chips surgem do contexto — não são menus estáticos.',
  },
  {
    title: 'Ícone obrigatório',
    body: 'O ícone à esquerda é fundamental: ele comunica o tipo de ação antes de o usuário ler o rótulo. Sem ícone, o chip de assist perde seu diferencial visual e pode ser confundido com um chip de sugestão.',
    rule: 'Ícone é obrigatório e deve refletir a ação com precisão.',
  },
  {
    title: 'Ação única e direta',
    body: 'Cada chip representa uma única ação — não um menu. O rótulo deve ser um verbo + objeto quando possível ("Ligar para João", "Criar evento"). Chips com label genérico como "Mais" ou "Ação" não comunicam utilidade.',
    rule: 'Um chip, uma ação. Label no formato verbo + objeto.',
  },
  {
    title: 'Temporalidade e descarte',
    body: 'Chips de assist devem desaparecer após a ação ser executada ou quando o contexto que os gerou muda. Mantê-los visíveis após a conclusão da ação cria ruído e reduz a confiança no sistema.',
    rule: 'Remova o chip imediatamente após a ação ser concluída.',
  },
]

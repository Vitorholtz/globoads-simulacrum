import type { GuidelineDef } from './types'

export const CHIP_ASSIST_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Ações contextuais e dinâmicas',
    body: 'Chips de assistência devem emergir a partir do contexto detectado — uma data no texto gera "Criar evento", um endereço gera "Ver no mapa". Nunca exiba chips de assist como lista fixa ou menu de ações.',
  },
  {
    title: 'Ícone obrigatório',
    body: 'O ícone à esquerda é fundamental: ele comunica o tipo de ação antes de o usuário ler o rótulo. Sem ícone, o chip de assist perde seu diferencial visual e pode ser confundido com um chip de sugestão.',
  },
  {
    title: 'Ação única e direta',
    body: 'Cada chip representa uma única ação — não um menu. O rótulo deve ser um verbo + objeto quando possível ("Ligar para João", "Criar evento"). Chips com label genérico como "Mais" ou "Ação" não comunicam utilidade.',
  },
  {
    title: 'Temporalidade e descarte',
    body: 'Chips de assist devem desaparecer após a ação ser executada ou quando o contexto que os gerou muda. Mantê-los visíveis após a conclusão da ação cria ruído e reduz a confiança no sistema.',
  },
]

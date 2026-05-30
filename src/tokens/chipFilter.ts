import type { GuidelineDef, BehaviorDef } from './types'

export type ChipFilterBehavior = 'unchecked' | 'checked'

export const CHIP_FILTER_BEHAVIORS: BehaviorDef<ChipFilterBehavior>[] = [
  {
    id: 'unchecked',
    label: 'Unchecked',
    description:
      'Filtro inativo — fundo branco com borda neutra. Dropdown indica que há opções adicionais de refinamento.',
  },
  {
    id: 'checked',
    label: 'Checked',
    description:
      'Filtro ativo — checkmark + destaque em azul confirmam que o critério está sendo aplicado ao conteúdo.',
  },
]

export const CHIP_FILTER_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Filtragem de conteúdo existente',
    body: 'Chips de filtro restringem o conteúdo já exibido — não adicionam dados novos. Use-os para segmentação em listas, galerias e resultados de busca quando checkbox ou botões segmentados seriam pesados demais visualmente.',
    rule: 'Filtros reduzem o que está visível, não adicionam itens.',
  },
  {
    title: 'Dropdown indica sub-opções',
    body: 'O ícone de seta indica que o chip abre um painel ou menu de refinamento. Quando o filtro é uma escolha binária (ativo/inativo), omita a seta para comunicar a simplicidade da interação.',
    rule: 'Seta → sub-opções disponíveis. Sem seta → toggle direto.',
  },
  {
    title: 'Feedback visual imediato',
    body: 'Ao clicar, a transição para o estado Checked deve ser instantânea. O resultado filtrado pode levar um momento para carregar, mas a seleção do chip deve ser refletida sem delay perceptível.',
    rule: 'Mude para Checked imediatamente ao clicar, antes do dado carregar.',
  },
  {
    title: 'Agrupamento por categoria',
    body: 'Organize chips relacionados na mesma linha ou grupo. Filtros de categorias diferentes (ex: "Tipo" e "Status") devem ser separados visualmente para que o usuário entenda quais dimensões está controlando.',
    rule: 'Chips da mesma categoria ficam juntos — categorias diferentes, separadas.',
  },
]

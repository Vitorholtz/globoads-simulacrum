import type { GuidelineDef } from './types'

export const CONFIRM_DIALOG_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Reserve para ações irreversíveis',
    body: 'ConfirmDialog serve para barrar ações que não podem ser desfeitas — excluir, descartar, encerrar sessão. Para ações reversíveis (ex: remover com opção de desfazer via Toast), a confirmação adiciona fricção desnecessária.',
  },
  {
    title: 'Título e rótulo que nomeiam a ação',
    body: 'O título deve nomear exatamente o que vai acontecer — "Excluir criativo?" é melhor que "Tem certeza?". O rótulo do botão confirmar deve repetir o verbo da ação ("Excluir", "Descartar"), não usar "Confirmar" genérico.',
  },
  {
    title: 'Foco inicia no Cancelar',
    body: 'Ao abrir, o foco vai automaticamente para o botão "Cancelar" — padrão defensivo que protege o usuário de confirmar uma ação destrutiva por acidente com Enter ou Space.',
  },
  {
    title: 'Não empilhe overlays',
    body: 'Evite abrir um ConfirmDialog a partir de outro modal, drawer ou dialog. Overlays aninhados aumentam a profundidade cognitiva e dificultam o caminho de saída do usuário.',
  },
]

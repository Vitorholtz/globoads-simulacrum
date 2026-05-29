export type ToastType = 'neutral' | 'success' | 'warning' | 'critical'

export interface ToastVariantDef {
  id: ToastType
  label: string
  description: string
  icon: string
  exampleTitle: string
  exampleDescription: string
}

export const TOAST_VARIANTS: ToastVariantDef[] = [
  {
    id: 'neutral',
    label: 'Neutral',
    description: 'Para mensagens informativas gerais sem urgência. Confirmações de ações rotineiras ou notificações contextuais que não exigem ação imediata.',
    icon: 'info',
    exampleTitle: 'Campanha salva',
    exampleDescription: 'Todas as alterações foram salvas. O rascunho está disponível para edição.',
  },
  {
    id: 'success',
    label: 'Success',
    description: 'Confirma que uma ação foi concluída com êxito. O usuário deve sentir que seu objetivo foi alcançado sem precisar verificar o resultado.',
    icon: 'check_circle',
    exampleTitle: 'Publicada com sucesso',
    exampleDescription: 'A campanha está ativa e já está sendo veiculada.',
  },
  {
    id: 'warning',
    label: 'Warning',
    description: 'Indica uma situação que requer atenção mas não impede a continuação do fluxo. O usuário deve ser alertado sem alarmismo.',
    icon: 'warning',
    exampleTitle: 'Orçamento quase esgotado',
    exampleDescription: 'Você atingiu 90% do limite diário desta campanha.',
  },
  {
    id: 'critical',
    label: 'Critical',
    description: 'Sinaliza um erro ou falha na operação solicitada. Deve comunicar o problema de forma clara para que o usuário saiba o que aconteceu.',
    icon: 'error',
    exampleTitle: 'Falha ao publicar',
    exampleDescription: 'Não foi possível publicar a campanha. Tente novamente.',
  },
]

export interface ToastGuidelineDef {
  title: string
  body: string
  rule: string
}

export const TOAST_GUIDELINES: ToastGuidelineDef[] = [
  {
    title: 'Mensagens curtas e diretas',
    body: 'O Toast é visto por apenas alguns segundos. O título deve comunicar a essência em até cinco palavras e a descrição deve complementar sem ser redundante. O usuário não deve precisar ler duas vezes para entender.',
    rule: 'Evite textos longos ou instruções detalhadas no Toast. Se a mensagem precisa de mais contexto, use um Info Panel ou modal.',
  },
  {
    title: 'Duração proporcional ao conteúdo',
    body: 'Toasts com apenas título desaparecem em cerca de 3 segundos. Com título e descrição, mantenha-os visíveis por ao menos 5 segundos. Para mensagens críticas, ofereça sempre a opção de fechar manualmente.',
    rule: 'Nunca exiba um Toast por mais de 7 segundos — para mensagens persistentes, use Info Panel.',
  },
  {
    title: 'Não bloqueie o conteúdo principal',
    body: 'O Toast deve ser posicionado em uma área que não interfira com a ação que o usuário está executando. Posições recomendadas: canto inferior direito ou centro inferior da viewport.',
    rule: 'Evite sobrepor botões de ação, campos de formulário ou elementos interativos com o Toast.',
  },
  {
    title: 'Um Toast por vez',
    body: 'Exibir múltiplos toasts simultaneamente cria ruído visual e dificulta a leitura. Enfileire os toasts e exiba-os sequencialmente, sempre aguardando o anterior ser dispensado antes de mostrar o próximo.',
    rule: 'Se múltiplas ações gerarem toasts em sequência rápida, agrupe-os em uma única mensagem resumida.',
  },
]

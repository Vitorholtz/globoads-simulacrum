export type InfoPanelType = 'neutral' | 'success' | 'warning' | 'critical'

export interface InfoPanelVariantDef {
  id: InfoPanelType
  label: string
  description: string
  icon: string
}

export const INFO_PANEL_VARIANTS: InfoPanelVariantDef[] = [
  {
    id: 'neutral',
    label: 'Neutral',
    description:
      'Destaca informações gerais ou fornece contexto adicional sem urgência. Use para dicas úteis ou avisos informativos que não exigem ação imediata.',
    icon: 'info',
  },
  {
    id: 'success',
    label: 'Success',
    description:
      'Confirma que uma ação foi concluída com êxito ou que um estado positivo foi atingido. Reforça ao usuário que tudo está correto.',
    icon: 'check_circle',
  },
  {
    id: 'warning',
    label: 'Warning',
    description:
      'Alerta sobre uma situação que merece atenção mas não impede o fluxo. O usuário deve estar ciente antes de prosseguir.',
    icon: 'warning',
  },
  {
    id: 'critical',
    label: 'Critical',
    description:
      'Indica um erro grave ou uma condição bloqueante que exige ação imediata. O fluxo não deve continuar até que a situação seja resolvida.',
    icon: 'error',
  },
]

export interface InfoPanelContentDef {
  label: string
  description: string
  showTitle: boolean
  showDescription: boolean
  exampleTitle?: string
  exampleDescription?: string
}

export const INFO_PANEL_CONTENT_VARIANTS: InfoPanelContentDef[] = [
  {
    label: 'Título e descrição',
    description:
      'Configuração padrão e recomendada. O título comunica a essência em uma linha e a descrição fornece o contexto necessário.',
    showTitle: true,
    showDescription: true,
    exampleTitle: 'Verifique suas configurações',
    exampleDescription:
      'Algumas configurações da campanha precisam ser revisadas antes da publicação.',
  },
  {
    label: 'Apenas título',
    description:
      'Use quando a mensagem é simples o suficiente para ser comunicada em uma única linha. O título deve ser autoexplicativo.',
    showTitle: true,
    showDescription: false,
    exampleTitle: 'Seus dados foram salvos automaticamente.',
  },
  {
    label: 'Apenas descrição',
    description:
      'Adequado para mensagens mais longas e contextuais que não precisam de um cabeçalho. Mais fluido, menos hierárquico.',
    showTitle: false,
    showDescription: true,
    exampleDescription:
      'Esta campanha está ativa e pode ser editada a qualquer momento. As alterações entram em vigor imediatamente após salvar.',
  },
]

import { GuidelineDef } from './types'

export const INFO_PANEL_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Permanência intencional',
    body: 'O Info Panel permanece visível na tela enquanto a condição que o originou persistir. Diferente de toasts ou snackbars, ele não desaparece automaticamente — está "impresso" na interface.',
    rule: 'Nunca use Info Panel para mensagens transitórias. Use Toast para feedback temporário pós-ação.',
  },
  {
    title: 'Escolha o tipo correto',
    body: 'O tipo deve refletir fielmente a natureza da informação: Neutral para contexto, Success para confirmações, Warning para alertas não-bloqueantes e Critical para erros ou bloqueios graves.',
    rule: 'Não use Critical para avisos rotineiros — reserve-o para situações que realmente exijam ação imediata.',
  },
  {
    title: 'Conteúdo direto e objetivo',
    body: 'Escreva títulos curtos que comuniquem a essência da mensagem. Descrições devem complementar o título, não repeti-lo. Evite jargões técnicos ou explicações excessivamente longas.',
    rule: 'Se o texto precisar de mais de três linhas, avalie se o Info Panel é o componente adequado ou se um modal seria mais apropriado.',
  },
  {
    title: 'Posicionamento contextual',
    body: 'Posicione o Info Panel próximo ao conteúdo ao qual se refere. Alertas de página ficam no topo do conteúdo; alertas de campo ficam adjacentes ao campo. Evite empilhar múltiplos painéis.',
    rule: 'Se precisar exibir mais de um Info Panel simultâneo, priorize o Critical e oculte os demais ou agrupe a informação em um único painel.',
  },
]

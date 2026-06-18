import type { GuidelineDef, VariantDef } from './types'
import type { CreativeCardMode } from '../components/CreativeCard/CreativeCard'
import type { CreativeState } from '../components/CreativeCard/types'

export type CreativeCardModeDef = {
  id: CreativeCardMode
  label: string
  tagline: string
  description: string
  when: string[]
}

/** Modos de exibição do CreativeCard — controlam a composição do corpo. */
export const CREATIVE_CARD_MODES: CreativeCardModeDef[] = [
  {
    id: 'config',
    label: 'Config',
    tagline: 'Configuração',
    description:
      'Corpo com campos editáveis de período, URL de destino, pixel e posição. Exibido enquanto o criativo está sendo configurado pelo anunciante antes do envio para validação.',
    when: [
      'Criativo recém-adicionado à galeria de um envio.',
      'Anunciante precisa preencher ou ajustar configurações.',
      'Estado configuring — "Pronto para anunciar".',
    ],
  },
  {
    id: 'review',
    label: 'Review',
    tagline: 'Revisão / Somente leitura',
    description:
      'Status destacado no topo; seleção desabilitada e campos em somente leitura. Exibido enquanto o criativo aguarda ou recebeu o resultado da validação.',
    when: [
      'Criativo enviado para análise (estado analyzing).',
      'Validação concluída (estados approved ou rejected).',
      'Usuário não deve mais alterar as configurações.',
    ],
  },
  {
    id: 'gallery',
    label: 'Gallery',
    tagline: 'Galeria',
    description:
      'Rodapé compacto com tag de categoria e badge de status no lugar das configurações. Para listagem de criativos em visão de overview.',
    when: [
      'Galeria de todos os criativos de uma campanha.',
      'Contexto de seleção em lote.',
      'Visão de resumo sem necessidade de editar campos.',
    ],
  },
]

/** Estados do ciclo de vida — fonte única em `creativeLifecycle.CREATIVE_STATUS`. */
export const CREATIVE_CARD_STATES: VariantDef<CreativeState>[] = [
  {
    id: 'configuring',
    label: 'Pronto para anunciar',
    description: 'Criativo adicionado à galeria, editável e ainda não enviado para validação.',
  },
  {
    id: 'analyzing',
    label: 'Em análise',
    description:
      'Criativo enviado e em validação interna da Globo. As configurações ficam somente leitura.',
  },
  {
    id: 'approved',
    label: 'Aprovado',
    description: 'Validação concluída com sucesso — o criativo já pode ser veiculado.',
  },
  {
    id: 'rejected',
    label: 'Recusado',
    description:
      'Validação recusada. O badge ganha o link "Ver detalhes", que abre a aba de etapas de validação com o motivo.',
  },
]

export const CREATIVE_CARD_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Escolha o modo pelo momento do ciclo',
    body: 'Cada modo cobre uma etapa: `config` para configurar, `review` para revisar um envio e `gallery` para listar. O header e o preview são compartilhados; só o corpo muda.',
    rule: 'Regra: não recrie o card por contexto — passe `mode` ao mesmo componente.',
  },
  {
    title: 'O status é derivado do estado',
    body: 'O badge de status vem de `creative.state` via `CREATIVE_STATUS` em `creativeLifecycle`. Não existe prop de rótulo/variante de status para passar à mão.',
    rule: 'Regra: transicione o estado por `applyTransition`; nunca escreva o texto do status direto.',
  },
  {
    title: 'Ações de negócio pertencem ao consumidor',
    body: 'Enviar, aprovar e recusar não são responsabilidade do card — ele apenas reflete o estado e emite callbacks (`onViewDetails`, `onStatusLink`). A transição é feita por quem orquestra o fluxo.',
    rule: 'Regra: mantenha botões de ação fora do card; dirija o estado pelo lado de fora.',
  },
  {
    title: 'Seleção controlada ou não',
    body: 'Nos modos `config`/`gallery` o card é selecionável (checkbox + header/preview clicáveis). Use `selected`/`onSelectedChange` para controlar, ou `defaultSelected` para deixar o card gerenciar. O modo `review` não tem seleção.',
    rule: 'Padrão: controle a seleção quando precisar de seleção em lote; senão use `defaultSelected`.',
  },
]

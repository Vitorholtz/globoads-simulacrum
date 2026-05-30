import type { GuidelineDef, VariantDef } from './types'

export type ChipInputStyle = 'default' | 'person' | 'icon'

export const CHIP_INPUT_STYLES: VariantDef<ChipInputStyle>[] = [
  {
    id: 'default',
    label: 'Default',
    description:
      'Representa um valor de texto inserido, como uma tag ou palavra-chave. Label à esquerda e ícone de remoção à direita.',
  },
  {
    id: 'person',
    label: 'Person',
    description:
      'Representa um contato ou pessoa selecionada. O avatar à esquerda permite identificação visual rápida do destinatário.',
  },
  {
    id: 'icon',
    label: 'Icon',
    description:
      'Representa uma entidade tipada como um arquivo, localização ou categoria. O ícone à esquerda comunica o tipo do dado inserido.',
  },
]

export const CHIP_INPUT_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Chips como tokens de entrada',
    body: 'Cada chip representa um valor discreto e já confirmado pelo usuário — como um e-mail, tag ou filtro digitado. Após a inserção, o foco retorna ao campo de entrada para permitir a adição de mais valores.',
    rule: 'Um chip = um valor discreto e confirmado.',
  },
  {
    title: 'Estilo por tipo de dado',
    body: 'Use Default para texto genérico, Person para contatos (o avatar facilita reconhecimento facial) e Icon para entidades tipadas onde a natureza do dado importa. Misturar estilos diferentes na mesma lista cria inconsistência.',
    rule: 'Escolha um estilo por contexto — não misture na mesma lista.',
  },
  {
    title: 'Remoção individual obrigatória',
    body: 'Todo chip de entrada deve ter o botão de remoção visível (×). O usuário precisa poder desfazer cada valor individualmente sem apagar toda a entrada. Chips sem remoção criam frustração desnecessária.',
    rule: 'Sempre visível: o ícone × de remoção individual.',
  },
  {
    title: 'Edição por clique',
    body: 'Quando suportado pelo contexto, clicar em um chip deve abrir o valor para edição — retornando o texto ao campo de entrada. Esse comportamento é esperado pelo usuário e reduz o custo de correção de erros.',
    rule: 'Clique no chip → reabrir para edição quando possível.',
  },
]

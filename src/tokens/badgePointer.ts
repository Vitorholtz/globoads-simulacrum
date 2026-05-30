import { GuidelineDef } from './types'

export const BADGE_POINTER_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Sinaliza mudança, não quantidade',
    body: 'O Badge Pointer indica apenas a presença de algo novo — uma atualização, notificação ou acréscimo. Ele não exibe contagem. Para exibir um número, use o Badge Counter.',
    rule: 'Regra: se precisar mostrar "3 novos itens", use Badge Counter. O pointer responde à pergunta "tem algo novo?" — não "quantos?".',
  },
  {
    title: 'Posicione no canto do elemento anotado',
    body: 'O pointer deve ser sobreposto ao elemento que ele qualifica — geralmente no canto superior direito de um ícone, avatar ou item de navegação. Não o coloque isolado no layout.',
    rule: 'Padrão: position absolute com top e right negativos sobre o elemento pai com position relative.',
  },
  {
    title: 'Remove ao interagir',
    body: 'Assim que o usuário visualiza ou acessa o conteúdo sinalizado, o pointer deve desaparecer. Mantê-lo visível após a interação cria ruído e perde o valor de sinalização.',
    rule: 'Regra: controle a visibilidade do pointer via estado da aplicação — nunca o exiba de forma permanente.',
  },
  {
    title: 'Não substitua texto acessível',
    body: 'O pointer é um reforço visual. O conteúdo que ele anuncia deve ter descrição textual acessível no item pai — como aria-label="Notificações, item novo" no botão ou link correspondente.',
    rule: 'Regra: adicione aria-label ou aria-describedby no elemento pai para garantir acessibilidade a leitores de tela.',
  },
]

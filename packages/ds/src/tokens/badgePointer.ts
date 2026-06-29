import type { GuidelineDef } from './types'

export const BADGE_POINTER_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Sinaliza mudança, não quantidade',
    body: 'O Badge Pointer indica apenas a presença de algo novo — uma atualização, notificação ou acréscimo. Ele não exibe contagem. Para exibir um número, use o Badge Counter.',
  },
  {
    title: 'Posicione no canto do elemento anotado',
    body: 'O pointer deve ser sobreposto ao elemento que ele qualifica — geralmente no canto superior direito de um ícone, avatar ou item de navegação. Não o coloque isolado no layout.',
  },
  {
    title: 'Remove ao interagir',
    body: 'Assim que o usuário visualiza ou acessa o conteúdo sinalizado, o pointer deve desaparecer. Mantê-lo visível após a interação cria ruído e perde o valor de sinalização.',
  },
  {
    title: 'Não substitua texto acessível',
    body: 'O pointer é um reforço visual. O conteúdo que ele anuncia deve ter descrição textual acessível no item pai — como aria-label="Notificações, item novo" no botão ou link correspondente.',
  },
]

import type { GuidelineDef, StateDef, VariantDef } from './types'

export type InteractiveThumbType = 'image' | 'video'

export const INTERACTIVE_THUMB_TYPES: VariantDef<InteractiveThumbType>[] = [
  {
    id: 'image',
    label: 'Image',
    description:
      'Miniatura quadrada com ícone de lupa. Ao clicar, abre a imagem ampliada em um modal.',
  },
  {
    id: 'video',
    label: 'Video',
    description:
      'Miniatura widescreen (16:9) com a duração do vídeo. Ao clicar, abre um modal que reproduz o vídeo.',
  },
]

export const INTERACTIVE_THUMB_STATES: StateDef[] = [
  {
    id: 'normal',
    label: 'Normal',
    description:
      'Estado de repouso. A imagem mostra a lupa discreta; o vídeo mostra a duração — ambos no canto inferior esquerdo.',
  },
  {
    id: 'hover',
    label: 'Hover',
    description:
      'Um backdrop semitransparente cobre a miniatura e o ícone (lupa ou play) é centralizado e ganha destaque.',
  },
  {
    id: 'focus',
    label: 'Focus',
    description: 'Mesmo realce do hover, com anel de foco visível para navegação por teclado.',
  },
  {
    id: 'active',
    label: 'Active',
    description:
      'Estado pressionado: backdrop e ícone centralizado, antecipando a abertura do modal.',
  },
]

export const INTERACTIVE_THUMB_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Tipo combina com o asset',
    body: 'Use Image para imagens estáticas e Video para vídeos. O ícone (lupa vs. play), a proporção e a ação ao clicar comunicam o tipo de mídia que o usuário vai abrir.',
    rule: 'O tipo do thumb deve refletir o tipo do asset.',
  },
  {
    title: 'Texto alternativo sempre',
    body: 'Forneça um `alt` descritivo nas imagens. O thumb expõe um nome acessível ("Ampliar imagem" / "Reproduzir vídeo") e abre um modal com `role="dialog"`, então leitores de tela anunciam a ação e o conteúdo.',
    rule: 'Nunca deixe um thumb de imagem sem alt.',
  },
  {
    title: 'Duração legível no vídeo',
    body: 'A duração aparece no formato m:ss no canto inferior esquerdo. É derivada automaticamente dos metadados do vídeo, mas pode ser fixada via prop quando já se conhece o valor.',
    rule: 'Vídeos sempre exibem a duração.',
  },
  {
    title: 'Dimensão vem do container',
    body: 'O thumb não tem tamanho próprio: ocupa 100% do container pai e se adapta a qualquer proporção. Defina largura, altura ou proporção no contexto de uso; a mídia cabe inteira no container, sem corte (object-fit contain), e os overlays acompanham o redimensionamento.',
    rule: 'O contexto define o tamanho — o thumb apenas o preenche.',
  },
]

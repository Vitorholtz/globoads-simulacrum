import type { GuidelineDef, VariantDef } from './types'

export type StaticThumbType = 'image' | 'video'

export const STATIC_THUMB_TYPES: VariantDef<StaticThumbType>[] = [
  {
    id: 'image',
    label: 'Image',
    description:
      'Miniatura quadrada que exibe apenas o preview da imagem — sem ícone de lupa, sem hover e sem interação.',
  },
  {
    id: 'video',
    label: 'Video',
    description:
      'Miniatura widescreen (16:9) que exibe o preview do vídeo com a duração no canto inferior esquerdo — sem ícone de play, sem hover e sem interação.',
  },
]

export const STATIC_THUMB_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Sem interação por design',
    body: 'O Static Thumb é puramente de leitura: não tem ícone de ação, estados de hover/foco clicável nem modal. Use quando o usuário só precisa identificar o asset rapidamente.',
    rule: 'Precisa ampliar ou reproduzir? Use o Interactive Thumb.',
  },
  {
    title: 'Consistência com o Interactive Thumb',
    body: 'Compartilha a mesma moldura do Interactive Thumb (dimensões, borda, raio e o chip de duração do vídeo). A única diferença é a ausência de affordances de ação.',
    rule: 'Mesma moldura, sem affordances de ação.',
  },
  {
    title: 'Duração legível no vídeo',
    body: 'A duração aparece no formato m:ss no canto inferior esquerdo. É derivada automaticamente dos metadados do vídeo, mas pode ser fixada via prop.',
    rule: 'Vídeos sempre exibem a duração.',
  },
  {
    title: 'Dimensão vem do container',
    body: 'O thumb não tem tamanho próprio: ocupa 100% do container pai e se adapta a qualquer proporção. Defina largura, altura ou proporção no contexto de uso; a mídia cabe inteira no container, sem corte (object-fit contain).',
    rule: 'O contexto define o tamanho — o thumb apenas o preenche.',
  },
]

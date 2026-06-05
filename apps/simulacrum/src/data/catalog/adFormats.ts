import type { AdFormat } from '../types/adFormat'

const svgModules = import.meta.glob<string>('../../assets/ad-formats/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

function svg(id: string): string {
  return svgModules[`../../assets/ad-formats/${id}.svg`] ?? ''
}

export const AD_FORMATS_CATALOG: AdFormat[] = [
  // ─── Display ────────────────────────────────────────────────────────────────

  {
    id: 'billboard',
    name: 'Billboard',
    svgPath: svg('billboard'),
    description:
      'Formato horizontal padrão IAB distribuído em diversos ambientes desktop nas propriedades Globo. Pode ser encontrado nas homes e internas de forma determinada ou rotativa.',
    category: 'display',
    devices: ['desktop'],
    dimensions: [{ width: 970, height: 250 }],
    fileLimits: { staticKB: 250, html5KB: 550 },
    acceptedFileTypes: ['JPG', 'PNG', 'HTML5', 'GIF'],
  },

  {
    id: 'maxiboard',
    name: 'Maxiboard',
    svgPath: svg('maxiboard'),
    description:
      'Formato horizontal desktop distribuído em diversos ambientes das propriedades Globo. Difere-se do Billboard por sua altura reduzida e pode ser encontrado em home e internas de forma determinada ou rotativa.',
    category: 'display',
    devices: ['desktop'],
    dimensions: [{ width: 970, height: 150 }],
    fileLimits: { staticKB: 200, html5KB: 450 },
    acceptedFileTypes: ['JPG', 'PNG', 'HTML5', 'GIF'],
  },

  {
    id: 'super-leaderboard',
    name: 'Super Leaderboard',
    svgPath: svg('super-leaderboard'),
    description:
      'Formato horizontal desktop distribuído em diversos ambientes das propriedades Globo. Difere-se do Billboard e Maxiboard por sua altura reduzida, pode ser encontrado em home e internas de forma determinada ou rotativa.',
    category: 'display',
    devices: ['desktop'],
    dimensions: [{ width: 970, height: 90 }],
    fileLimits: { staticKB: 150, html5KB: 350 },
    acceptedFileTypes: ['JPG', 'PNG', 'HTML5', 'GIF'],
  },

  {
    id: 'half-page',
    name: 'Half-Page',
    svgPath: svg('half-page'),
    description:
      'Formato vertical padrão IAB desktop conhecido como Meia Página na proporção 300x600, encontrado ao lado direito das páginas de conteúdo/feed lateral.',
    category: 'display',
    devices: ['desktop'],
    dimensions: [{ width: 300, height: 600 }],
    fileLimits: { staticKB: 250, html5KB: 550 },
    acceptedFileTypes: ['JPG', 'PNG', 'HTML5', 'GIF'],
  },

  {
    id: 'retangulo-medio',
    name: 'Retângulo Médio',
    svgPath: svg('retangulo-medio'),
    description:
      'Formato padrão IAB presente em todas as propriedades Globo, podendo ser distribuído como Desktop e/ou Mobile em home e internas.',
    category: 'display',
    devices: ['desktop', 'mobile'],
    dimensions: [{ width: 300, height: 250 }],
    fileLimits: { staticKB: 150, html5KB: 350 },
    acceptedFileTypes: ['JPG', 'PNG', 'HTML5', 'GIF'],
  },

  {
    id: 'sticky-ad',
    name: 'Sticky Ad',
    svgPath: svg('sticky-ad'),
    description:
      'Formato horizontal padrão IAB exclusivo em mobile, encontrado em Cartola e Home Globo.com.',
    category: 'display',
    devices: ['mobile'],
    dimensions: [
      { width: 320, height: 50 },
      { width: 320, height: 100 },
    ],
    fileLimits: { staticKB: 100, html5KB: 150 },
    acceptedFileTypes: ['JPG', 'PNG', 'HTML5', 'GIF'],
  },

  {
    id: 'touchpoint-imagetico',
    name: 'Touchpoint Imagético',
    svgPath: svg('touchpoint-imagetico'),
    description:
      'Formato que aparece na parte inferior da tela fixo durante o scroll, em mobile e desktop. Conta com imagem de fundo e botão de call-to-action (CTA) com texto editável.',
    category: 'display',
    devices: ['desktop', 'mobile'],
    dimensions: [
      { width: 1920, height: 100, label: 'Desktop' },
      { width: 430, height: 140, label: 'Mobile' },
    ],
    fileLimits: { staticKB: 250 },
    acceptedFileTypes: ['JPG', 'PNG'],
    textFields: [{ name: 'CTA', maxChars: 10 }],
    deliveryNotes:
      'Enviar .zip com 3 peças: imagem 1920x100px (Desktop), imagem 430x140px (Mobile) e .txt com texto do CTA, cor #hex do texto do CTA e cor #hex do fundo do botão.',
  },

  // ─── Vídeo ───────────────────────────────────────────────────────────────────

  {
    id: 'in-stream-video',
    name: 'In-Stream Vídeo',
    svgPath: svg('in-stream-video'),
    description:
      'Formato de vídeo Pre-roll, Mid-roll ou Post-roll dentro do player Globo em homes de editorias, internas, Globoplay e ambientes de terceiros.',
    category: 'video',
    devices: ['desktop', 'mobile'],
    dimensions: [
      { width: 1280, height: 720, label: '720p' },
      { width: 1920, height: 1080, label: '1080p' },
    ],
    fileLimits: { videoMB: 512 },
    acceptedFileTypes: ['MP4', 'MOV', 'AVI'],
    videoDurations: [
      { label: 'Até 6s (bumper)', maxSeconds: 6, skippable: false },
      { label: 'Até 15s (sem skip)', maxSeconds: 15, skippable: false },
      { label: '30s a 180s (com skip)', maxSeconds: 180, skippable: true },
    ],
  },

  {
    id: 'globo-dai',
    name: 'Globo DAI',
    svgPath: svg('globo-dai'),
    description:
      'Formato de vídeo no break da programação ao vivo do Globoplay. Entregue em todas as telas — TV conectada, app e desktop — de forma segmentada.',
    category: 'video',
    devices: ['desktop', 'mobile'],
    dimensions: [
      { width: 1280, height: 720, label: '720p' },
      { width: 1920, height: 1080, label: '1080p' },
    ],
    fileLimits: { videoMB: 512 },
    acceptedFileTypes: ['MP4', 'MOV', 'AVI'],
    videoDurations: [
      { label: '5s (Simulcast)', maxSeconds: 5, skippable: false },
      { label: '6s (Simulcast)', maxSeconds: 6, skippable: false },
      { label: '15s (Simulcast)', maxSeconds: 15, skippable: false },
      { label: '20s a 30s (Simulcast)', maxSeconds: 30, skippable: false },
    ],
  },

  // ─── Native ──────────────────────────────────────────────────────────────────

  {
    id: 'carrossel',
    name: 'Carrossel',
    svgPath: svg('carrossel'),
    description:
      'Formato nativo no estilo carrossel veiculado em desktop e mobile, composto por 4 imagens com título e subtítulo.',
    category: 'native',
    devices: ['desktop', 'mobile'],
    dimensions: [{ width: 400, height: 300 }],
    fileLimits: { perImageKB: 60 },
    acceptedFileTypes: ['JPG', 'PNG'],
    textFields: [
      { name: 'Título', maxChars: 20 },
      { name: 'Subtítulo', maxChars: 45 },
    ],
    deliveryNotes:
      'Enviar .zip com 5 peças: 4 imagens 400x300px e 1 arquivo .txt com título e subtítulo.',
  },

  {
    id: 'binge-ads',
    name: 'Binge Ads',
    svgPath: svg('binge-ads'),
    description:
      'Publicidade exibida na transição entre episódios maratonáveis no Globoplay, no canto inferior direito da tela, composta por imagem principal e logotipo.',
    category: 'native',
    devices: ['desktop', 'mobile'],
    dimensions: [
      { width: 996, height: 640, label: 'Imagem principal (fundo transparente)' },
      { width: 25, height: 25, label: 'Logotipo (fundo transparente)' },
    ],
    fileLimits: { staticKB: 1024 },
    acceptedFileTypes: ['JPG', 'PNG'],
    deliveryNotes: 'Imagem principal e logotipo devem ser enviados juntos em um arquivo .zip.',
  },

  {
    id: 'pause-ads',
    name: 'Pause Ads',
    svgPath: svg('pause-ads'),
    description:
      'Anúncio no formato display acionado quando o usuário pausa um vídeo no Globoplay. Presente em mais de 2.000 conteúdos de VOD do catálogo premium da Globo.',
    category: 'native',
    devices: ['desktop', 'mobile'],
    dimensions: [{ width: 996, height: 640 }],
    fileLimits: { staticKB: 900 },
    acceptedFileTypes: ['PNG'],
    deliveryNotes: 'Imagem com fundo transparente obrigatório.',
  },
]

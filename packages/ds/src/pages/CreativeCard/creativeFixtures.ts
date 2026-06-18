import {
  addedStep,
  analyzingStep,
  approvedStep,
  rejectedStep,
} from '../../components/CreativeCard/creativeLifecycle'
import type { Creative } from '../../components/CreativeCard/types'

/**
 * Criativos de exemplo para a documentação e a simulação do CreativeCard.
 *
 * Dados de demonstração (não fazem parte do componente). Cobrem os quatro
 * estados do ciclo de vida; a timeline de cada um usa os builders de
 * `creativeLifecycle` para manter o conteúdo coerente com o componente.
 */
export const SAMPLE_CREATIVES: Creative[] = [
  {
    id: 'billboard-home-clube-orfeu',
    name: 'billboard-home-clube-orfeu',
    imageSrc: '/Billboard.jpg',
    format: 'Billboard',
    dimension: '970x250',
    extension: 'JPG',
    size: '100 kB',
    uploadedAt: '17/05 às 15h30',
    state: 'approved',
    tag: 'Clube Orfeu',
    position: 'primeira',
    destinationUrl: 'https://globo.com/clube-orfeu',
    pixel: 'https://pixel.ads.globo.com/track?id=101',
    startDateTime: { date: new Date('2025-05-17'), time: { hours: 9, minutes: 0 } },
    endDateTime: { date: new Date('2025-06-30'), time: { hours: 23, minutes: 59 } },
    validation: [
      addedStep('17/05/2025 às 15:30h'),
      analyzingStep('17/05/2025 às 15:35h'),
      approvedStep('18/05/2025 às 10:12h'),
    ],
  },
  {
    id: 'banner-home-clube-orfeu-2025-promo-verao',
    name: 'banner-home-clube-orfeu-2025-promo-verao',
    imageSrc: '/Billboard.jpg',
    format: 'Billboard',
    dimension: '970x250',
    extension: 'JPG',
    size: '128 kB',
    uploadedAt: '02/06 às 09h12',
    state: 'analyzing',
    tag: 'Clube Orfeu',
    position: 'segunda',
    destinationUrl: 'https://globo.com/promo-verao-2025',
    pixel: 'https://pixel.ads.globo.com/track?id=102',
    startDateTime: { date: new Date('2025-06-02'), time: { hours: 9, minutes: 0 } },
    endDateTime: { date: new Date('2025-07-31'), time: { hours: 23, minutes: 59 } },
    validation: [addedStep('02/06/2025 às 09:12h'), analyzingStep('02/06/2025 às 09:20h')],
  },
  {
    id: 'masthead-globo-com-campanha-natal',
    name: 'masthead-globo-com-campanha-natal',
    imageSrc: '/Billboard.jpg',
    format: 'Billboard',
    dimension: '970x250',
    extension: 'JPG',
    size: '96 kB',
    uploadedAt: '25/12 às 20h45',
    state: 'rejected',
    position: 'terceira',
    destinationUrl: 'https://redeglobo.globo.com/campanha-natal',
    pixel: 'https://pixel.ads.globo.com/track?id=202',
    startDateTime: { date: new Date('2024-12-20'), time: { hours: 0, minutes: 0 } },
    endDateTime: { date: new Date('2025-01-06'), time: { hours: 23, minutes: 59 } },
    validation: [
      addedStep('24/12/2024 às 18:00h', { unlinked: true }),
      analyzingStep('25/12/2024 às 09:30h'),
      rejectedStep('25/12/2024 às 20:45h', ['O criativo não tem logotipo.']),
    ],
  },
  {
    id: 'in-stream-cafe-orfeu-gerador-de-criativos',
    name: 'video-cafe-orfeu-gerador-de-criativos',
    kind: 'video',
    imageSrc: '',
    videoSrc: '/video-cafe-orfeu-gerador-de-criativos.mp4',
    duration: '0:15',
    format: 'In-Stream Vídeo',
    dimension: '1920x1080',
    extension: 'MP4',
    size: '8,4 MB',
    uploadedAt: '10/06 às 14h05',
    state: 'configuring',
    position: 'primeira',
    destinationUrl: 'https://cafes.orfeu.com.br',
    pixel: 'https://pixel.ads.globo.com/track?id=303',
    startDateTime: { date: new Date('2025-06-10'), time: { hours: 8, minutes: 0 } },
    endDateTime: { date: new Date('2025-07-31'), time: { hours: 23, minutes: 59 } },
    validation: [addedStep('10/06/2025 às 14:05h', { unlinked: true })],
  },
]

# Domínio: Catálogo de Formatos Publicitários

## Fonte única de verdade

`src/data/catalog/adFormats.ts` → exporta `AD_FORMATS_CATALOG: AdFormat[]`

Todos os tipos estão em `src/data/types/adFormat.ts`. O barrel `src/data/index.ts` re-exporta tudo.

```typescript
import { AD_FORMATS_CATALOG, type AdFormat } from '../data'
```

## Formatos disponíveis (12 no total)

### Display (7)

| id                     | Nome                 | Dispositivos    |
| ---------------------- | -------------------- | --------------- |
| `billboard`            | Billboard            | desktop         |
| `maxiboard`            | Maxiboard            | desktop         |
| `super-leaderboard`    | Super Leaderboard    | desktop         |
| `half-page`            | Half-Page            | desktop         |
| `retangulo-medio`      | Retângulo Médio      | desktop, mobile |
| `sticky-ad`            | Sticky Ad            | mobile          |
| `touchpoint-imagetico` | Touchpoint Imagético | desktop, mobile |

### Vídeo (2)

| id                | Nome            | Dispositivos    |
| ----------------- | --------------- | --------------- |
| `in-stream-video` | In-Stream Vídeo | desktop, mobile |
| `globo-dai`       | Globo DAI       | desktop, mobile |

### Native (3)

| id          | Nome      | Dispositivos    |
| ----------- | --------- | --------------- |
| `carrossel` | Carrossel | desktop, mobile |
| `binge-ads` | Binge Ads | desktop, mobile |
| `pause-ads` | Pause Ads | desktop, mobile |

## Como filtrar o catálogo

```typescript
// Por categoria
const displayFormats = AD_FORMATS_CATALOG.filter((f) => f.category === 'display')

// Por dispositivo
const mobileFormats = AD_FORMATS_CATALOG.filter((f) => f.devices.includes('mobile'))

// Por id
const format = AD_FORMATS_CATALOG.find((f) => f.id === 'billboard')

// Formatos que aceitam vídeo
const videoFormats = AD_FORMATS_CATALOG.filter((f) => f.acceptedFileTypes.includes('MP4'))
```

## Como adicionar um novo formato

1. Adicione uma entrada ao array `AD_FORMATS_CATALOG` em `catalog/adFormats.ts`
2. Se o novo formato exigir um novo tipo de arquivo ou categoria, atualize os union types em `types/adFormat.ts`
3. Mantenha o `id` em kebab-case único

## Glossário

**Simulcast:** Transmissão simultânea em múltiplas plataformas (TV, app, desktop) em tempo real. Aplicável ao Globo DAI.

**Pre-roll / Mid-roll / Post-roll:** Anúncios em vídeo exibidos antes, durante ou após o conteúdo, respectivamente. Aplicável ao In-Stream Vídeo.

**VOD (Video on Demand):** Conteúdo de vídeo disponível para assistir a qualquer momento (não ao vivo). Aplicável ao Pause Ads.

**Criativo:** A peça publicitária em si (banner, vídeo, imagem) que é enviada pelo anunciante e vinculada a um formato.

## Jornadas que consomem este catálogo

- **Galeria de Criativos** — exibe formatos disponíveis e orienta o upload de peças
- **Criação de campanhas** — filtra formatos compatíveis com o produto/modalidade selecionada
- **Validação de criativos** — confere dimensões, peso e tipos de arquivo contra as regras do formato
- **Modalidades de compra** — determina quais formatos estão disponíveis por produto

---

## Informações da plataforma

`src/data/platform.ts` → exporta `PLATFORM_INFO: PlatformInfo`

Descreve o que é o Globo Ads, quais canais cobre e como posicioná-la em jornadas e documentações.

```typescript
import { PLATFORM_INFO } from '../data'

// Listar canais digitais
const digital = PLATFORM_INFO.channels.filter((c) => c.type === 'digital')

// Listar canais de TV
const tv = PLATFORM_INFO.channels.filter((c) => c.type === 'tv')
```

Para adicionar novos dados à plataforma (tagline, produtos, objetivos de campanha…),
expanda a interface `PlatformInfo` em `platform.ts`.

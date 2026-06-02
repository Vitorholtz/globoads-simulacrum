# Camada de tokens

> **Quando ler:** ao criar/alterar tokens ou entender de onde vem o conteúdo de uma página.
> **Valores exatos** das CSS variables vivem em [`src/global.css`](../src/global.css) `:root` —
> esta doc é o **mapa**, não a lista. Não duplicar valores aqui.

`src/tokens/*` é a fonte única de **conteúdo**. Cada componente/página tem um token file
correspondente; a página importa e mapeia sobre ele.

## Foundation

| Arquivo           | Exporta / conceito                                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `colors.ts`       | `COLOR_GROUPS`. Cada token é união discriminada: `SolidToken {type:'solid';value}` ou `GradientToken {type:'gradient';stops:[a,b]}` |
| `typography.ts`   | `FONT_FAMILIES` + `TYPOGRAPHY_GROUPS` (Display → Title → Body → Caption)                                                            |
| `icons.ts`        | `ICON_CATEGORIES`, `ICON_SIZES`, `ICON_VARIANT_RULES`, `ICON_GUIDELINES`, `VARIANT_DEMO_ICONS`                                      |
| `borderWidth.ts`  | `BORDER_WIDTH_TOKENS` — 6 tokens (None→2XL)                                                                                         |
| `borderRadius.ts` | `BORDER_RADIUS_TOKENS` — 10 tokens (None→Full)                                                                                      |
| `spacing.ts`      | escala de espaçamento (página `/dimensions`, via `SpacingRow`)                                                                      |
| `shadow.ts`       | tokens de sombra/elevação (página `/effects`, via `ShadowRow`)                                                                      |
| `focus.ts`        | tokens de focus-ring (página `/effects`, via `FocusCard`)                                                                           |

## Demais grupos

- **Visual resources:** `avatar.ts`.
- **Actions:** `buttons.ts` (`BUTTON_VARIANTS/SIZES/STATES/CONTENT_VARIANTS/GUIDELINES`,
  `DANGER_BUTTON_VARIANTS/GUIDELINES`; danger reusa `ButtonVariantDef` de propósito — ver [decisoes.md](decisoes.md)).
- **Structures:** `cards.ts` (`CARD_STYLES`, guidelines static/interactive; estilos `on-primary`|`on-secondary` valem para os dois cards).
- **Navigations:** `hyperlinks.ts`, `tabs.ts`, `pagination.ts`, `breadcrumb.ts`.
- **Indicators:** `badge.ts`, `badgePointer.ts`, `badgeCounter.ts`, `inlineLoader.ts`, `skeleton.ts`.
- **Inputs:** `checkbox.ts`, `radio.ts`, `switch.ts`, `chip{Suggestion,Filter,Input,Assist}.ts`,
  `textField.ts`, `textarea.ts`, `select.ts`, `combobox.ts`, `datePicker.ts`.
- **Utilities / Alerts / Overlays:** `collapse.ts`, `accordion.ts`, `infoPanel.ts`, `toast.ts`, `tooltip.ts`.
- **Tipos base compartilhados:** [`types.ts`](../src/tokens/types.ts) (`GuidelineDef`, `StateDef`, …).

## CSS variables (resumo conceitual)

Definidas em [`src/global.css`](../src/global.css) `:root`. Grupos principais (valores no arquivo):

- `--font-family*`, `--shadow-card*` (= none), `--focus-ring` (indicador unificado de foco).
- `--border-width-*` (none/sm/md/lg/xl/2xl) e `--border-radius-*` (none/xs/sm/md/lg/xl/2xl/3xl/4xl/full).
- Cores `--color-<grupo>-<semântico>` nos grupos **Fill**, **Surface**, **Border**. **Sem aliases
  semânticos** — ver regra em [convencoes.md](convencoes.md#tokens-a-regra-mais-quebrada).

As regras de **uso** desses tokens (nunca hardcode px, etc.) estão em [convencoes.md](convencoes.md).

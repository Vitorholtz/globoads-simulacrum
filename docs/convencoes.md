# Convenções

> **Quando ler:** antes de escrever ou alterar qualquer CSS, token ou nome de identificador.
> Estas são as regras que **não se quebram**. O _porquê_ de cada uma está em [decisoes.md](decisoes.md).

## CSS

- Todo estilo é **CSS Modules** (`.module.css`), escopado por componente/página.
- Fundos são **planos**: `#f7f7f8` para áreas recuadas, `#ffffff` para cards. **Sem sombras** em
  lugar nenhum (`--shadow-card: none`).
- Arquivos CSS de página contêm **apenas** o layout específico daquela página. Estilos de header e
  section-header vivem em `PageHeader.module.css` e `SectionHeader.module.css` — nunca duplicar.
- Grids de ícones usam `repeat(auto-fit, minmax(Xpx, 1fr))` — **`auto-fit`**, nunca `auto-fill`
  (evita colunas vazias que expõem o fundo cinza do gap).
- Painéis laterais de altura total em flex rows usam `align-self: stretch` (não altura fixa).

## Tokens (a regra mais quebrada)

Sempre referencie via `var(--token-*)`. **Nunca** hardcode valores px/rem.

| Propriedade                    | ✅ Correto                               | ❌ Errado             |
| ------------------------------ | ---------------------------------------- | --------------------- |
| Espessura de borda / `outline` | `border: var(--border-width-sm) solid …` | `border: 1px solid …` |
| Raio de borda                  | `border-radius: var(--border-radius-md)` | `border-radius: 8px`  |
| Espaçamento                    | `padding: var(--spacing-…)`              | `padding: 16px`       |
| Cor                            | `color: var(--color-fill-primary)`       | `color: #1a1a1a`      |

- **Exceção:** valores de _spread_ em `box-shadow` (focus rings) podem ser px — vão para `box-shadow`,
  não para `border`/`outline`.
- **Sem aliases semânticos de cor.** Não existem `--color-text-*`, `--color-bg-*`, `--color-border-ui`.
  Use os tokens crus: `--color-fill-primary` (texto), `--color-surface-primary` (fundo de card),
  `--color-border-tertiary` (separadores de UI). Mapa completo em [tokens.md](tokens.md).

## Tipografia (utility classes)

- **Todo elemento de texto referencia uma utility class** da escala `type-*`. **Nunca** declare
  `font-size`/`font-weight`/`font-family`/`line-height` direto no CSS Module.
- Ícones (Material Symbols Rounded) usam a classe `material-symbols-rounded` + utility de tamanho
  (`icon-xs`/`sm`/`md`/`lg`/`xl`) e o modificador `icon-filled`. **Nunca** definir
  `fontVariationSettings` inline.

## Naming

- **Escalas tipográficas** usam abreviações t-shirt: `Display 2XL/XL/LG/MD/SM` (mesmo padrão para
  Title e Body). Variantes de peso anexam o nome Inter: `Body MD Medium` (`fontWeight: 500`).
- **Caption:** `Caption MD`, `Caption SM`, `Overline`.
- **Tamanhos de fonte** são múltiplos de 4px. Display: 80/60/44/36/28. Title: 32/28/24/20/16.
  Body usa valores pragmáticos de interface (20/18/16/14/13) onde o grid estrito prejudicaria leitura.
- **CSS variables:** `--type-<categoria>-<escala>` (tipografia), `--color-<grupo>-<semântico>` (cores).
- **Tipos TypeScript:** sufixo `Def` para objetos de definição — `ButtonVariantDef`, `ButtonSizeDef`.

## Idioma (PT/EN)

- **Conteúdo** em arquivos de token (descrições, notas de uso) e documentação (`/docs`) → **Português**.
- **Identificadores de código**, nomes de tokens e comandos → **Inglês**.

## Usar o Design System

- Ao construir interfaces, **sempre** use os componentes existentes em `src/components/` — nunca HTML puro.
- Ao **modificar** um componente, atualize todos os consumidores (páginas/componentes pai) que o usam.

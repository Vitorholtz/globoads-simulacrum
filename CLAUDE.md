# CLAUDE.md

Guia para o Claude Code neste repositório. Mantenha **enxuto** — só o que precisa estar presente
em todo turno. O detalhe vive em `docs/` e é lido sob demanda (links abaixo, não `@import`, para não
inflar o contexto a cada turno).

**Globo Ads Simulacrum** — app de documentação de Design System (estilo Storybook). Biblioteca de
componentes e fundações reutilizáveis, deliberadamente simples. Stack: React 19 + Vite 8 + TS 6 +
CSS Modules + React Router v7. Sem bibliotecas de UI.

## Golden rules (não quebrar)

1. **Tokens, nunca hardcode.** Borda/raio/espaçamento/cor sempre via `var(--token-*)`. Nunca `1px`,
   `8px`, `#fff` em `border`/`border-radius`/`padding`/`color`. (Exceção: spread de `box-shadow`.)
2. **Sem aliases semânticos de cor.** Use tokens crus (`--color-fill-primary`, `--color-surface-primary`,
   `--color-border-tertiary`). Não existem `--color-text-*`/`--color-bg-*`.
3. **Texto via utility class `type-*`.** Nunca declarar `font-*`/`line-height` direto no CSS Module.
   Ícones via `material-symbols-rounded` + utility de tamanho; nunca `fontVariationSettings` inline.
4. **CSS Modules apenas**, escopado por componente/página. Sem sombras. Fundos planos.
5. **`registry.tsx` é a fonte única de navegação.** Nova página = token + componente + página +
   **uma** entrada em `src/pages/registry.tsx`. Nunca editar rotas em `App.tsx`/`Sidebar.tsx`.
6. **Sem dado hardcoded em páginas.** Conteúdo vem de `src/tokens/*`; páginas importam e mapeiam.
7. **Use o Design System.** Componha com `src/components/*`, nunca HTML puro. Ao alterar um
   componente, atualize todos os consumidores.
8. **Idioma:** conteúdo (tokens/docs) em **português**; identificadores de código e comandos em **inglês**.
9. **pnpm** apenas — nunca npm/yarn.

## Comandos

```powershell
pnpm dev          # dev server em http://localhost:5173
pnpm build        # tsc -b && vite build
pnpm lint         # eslint   (lint:css = stylelint)
pnpm test         # vitest run
```

Lista completa de scripts: [`package.json`](package.json) e [README.md](README.md).

## Documentação (leia sob demanda)

| Tarefa                                                 | Leia                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| Entender como tudo se conecta (router, camadas, fluxo) | [docs/arquitetura.md](docs/arquitetura.md)                   |
| Escrever/alterar CSS, tokens, nomes                    | [docs/convencoes.md](docs/convencoes.md)                     |
| Adicionar componente / página                          | [docs/guia-novo-componente.md](docs/guia-novo-componente.md) |
| Entender o _porquê_ de uma escolha                     | [docs/decisoes.md](docs/decisoes.md)                         |
| Mapa da camada de tokens                               | [docs/tokens.md](docs/tokens.md)                             |

> Inventários (páginas, valores de CSS vars, props) vivem no código — `registry.tsx`, `global.css`,
> `src/tokens/*`, os `.tsx`. Não os duplique nesta doc nem em `docs/`.

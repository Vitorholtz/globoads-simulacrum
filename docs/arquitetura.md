# Arquitetura

> **Quando ler:** ao entender como as peças se conectam, refatorar fluxo de dados ou navegação.
> Para extensão prática use [guia-novo-componente.md](guia-novo-componente.md); para o _porquê_ das
> escolhas, [decisoes.md](decisoes.md).

**Globo Ads Simulacrum** é um app de documentação de Design System (estilo Storybook).
Stack: React 19 + Vite 8 + TypeScript 6 + CSS Modules + React Router v7. Sem bibliotecas de UI.

## Camadas

```
tokens (src/tokens/*)  →  componentes (src/components/*)  →  páginas (src/pages/*)  →  registry
   fonte de conteúdo        display reutilizável               layout específico       fonte de rotas
```

- **Tokens** são a fonte de verdade de **conteúdo**: cada página importa tokens e mapeia sobre eles —
  zero dado hardcoded em páginas. Visão geral da camada em [tokens.md](tokens.md).
- **Componentes** vivem cada um em seu diretório com `.module.css` co-localizado. Há primitivas
  compartilhadas (`PageHeader`, `SectionHeader`, `Section`, `GuidelinesGrid`, `StateMatrix`,
  `FieldLabel`, `FieldMessage`) reaproveitadas por várias páginas.
- **Páginas:** uma pasta por página (`*Page.tsx` + `*Page.module.css`), só com layout próprio.
- **Utils** em `src/utils/`: `cx.ts` (junta classes truthy), `color.ts` (`hexLuminance`, `isLightColor`).

## Navegação (registry como fonte única)

[`main.tsx`](../src/main.tsx) envolve o app em `<BrowserRouter>` (React Router v7, `react-router-dom`).

[`src/pages/registry.tsx`](../src/pages/registry.tsx) é a **fonte única de verdade** de navegação:
exporta `PAGES: PageDef[]` (`path`, `label`, `icon`, `category`, `component`, opcionais
`disabled`/`badge`) + `CATEGORIES` + `DEFAULT_PATH`.

- `App.tsx` mapeia `PAGES` para `<Route>`s.
- `Sidebar.tsx` agrupa `PAGES` por `category` em `<NavLink>`s (com active-state).

➡️ O **inventário de páginas vive no `registry.tsx`**, não nesta doc. Para a lista atual, leia o registry.

## Fonts

- **Inter Variable** — via `@fontsource-variable/inter`, importado em `global.css`.
- **Globotipo Corporativa** — fonte proprietária via `@font-face` de `src/assets/fonts/*.woff2`.
- **Material Symbols Rounded** — via `@material-symbols/font-400` (`rounded.css`); ver regras de uso
  em [convencoes.md](convencoes.md#tipografia-utility-classes).

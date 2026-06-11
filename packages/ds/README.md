# Globo Ads Design System

Design-system documentation app for Globo Ads — built with React + Vite, no UI libraries.

## Stack

|           |                                            |
| --------- | ------------------------------------------ |
| Framework | React 19 + React Router v7                 |
| Build     | Vite 8 + TypeScript 6                      |
| Styles    | CSS Modules (no Tailwind, no UI library)   |
| Tests     | Vitest + Testing Library (55 tests)        |
| Linting   | ESLint + Stylelint + Prettier              |
| CI        | GitHub Actions (tsc → lint → test → build) |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

## Commands

```bash
pnpm dev          # dev server
pnpm build        # tsc -b && vite build
pnpm preview      # preview production build
pnpm lint         # eslint
pnpm lint:css     # stylelint
pnpm tsc --noEmit # type-check only
pnpm test         # vitest run (CI mode)
pnpm test:watch   # vitest watch
```

## Architecture

```
src/
├── components/     # Reusable components (design system + layout primitives)
├── pages/          # One directory per page (*Page.tsx + *Page.module.css)
│   └── registry.tsx      # Single source of truth for routes and sidebar nav
├── tokens/         # Token constants (variants, sizes, states, guidelines)
│   └── types.ts          # Shared base types (GuidelineDef, StateDef, …)
└── utils/          # cx (class joiner), color (hexLuminance, isLightColor)
```

Layers flow `tokens → components → pages → registry`. One entry in
[`src/pages/registry.tsx`](src/pages/registry.tsx) wires up both the route and the sidebar nav item.

## Documentation

Detailed docs live in [`docs/`](docs/) (in Portuguese, AI-facing):

- [docs/arquitetura.md](docs/arquitetura.md) — how the layers, router and registry connect
- [docs/convencoes.md](docs/convencoes.md) — CSS / token / naming rules (the non-negotiables)
- [docs/guia-novo-componente.md](docs/guia-novo-componente.md) — step-by-step to add a component/page
- [docs/decisoes.md](docs/decisoes.md) — why each structural choice was made
- [docs/tokens.md](docs/tokens.md) — map of the token layer

`CLAUDE.md` is the lean entry point (project identity + golden rules + pointers into `docs/`).

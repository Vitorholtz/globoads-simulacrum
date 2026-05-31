# Globo Ads Simulacrum

Design-system documentation app for Globo Ads — a Storybook-like reference built with React + Vite, no UI libraries.

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
│   ├── Section/          # Page section wrapper (SectionHeader + spacing)
│   ├── GuidelinesGrid/   # 2-col guideline card grid
│   ├── StateMatrix/      # State × variation documentation matrix
│   ├── DimensionRow/     # Foundation token row (spacing/border)
│   ├── FieldLabel/       # Input label row (label + tooltip + optional tag)
│   ├── FieldMessage/     # Input help/error line
│   └── ...               # All design system components
├── pages/          # One directory per page (*Page.tsx + *Page.module.css)
│   └── registry.tsx      # Single source of truth for routes and sidebar nav
├── tokens/         # Token constants (variants, sizes, states, guidelines)
│   └── types.ts          # Shared base types (GuidelineDef, StateDef, …)
└── utils/
    ├── cx.ts             # cx(...classes) — joins truthy class names
    └── color.ts          # hexLuminance, isLightColor
```

### Adding a page

One entry in [`src/pages/registry.tsx`](src/pages/registry.tsx) wires up both the route and the sidebar nav item — no edits to `App.tsx` or `Sidebar.tsx` needed.

### Token layer

All content lives in `src/tokens/`. Pages import and map over tokens — no hardcoded data in page components.

### CSS conventions

- All styles are CSS Modules — no global utility classes except the `type-*` typography scale.
- Colors, border widths, border radii, and spacing always use `var(--token-*)` — never hardcoded values.
- Shared component markup (labels, messages, section headers, guideline cards) lives in the shared components above, not duplicated per page.

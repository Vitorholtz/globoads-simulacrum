# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```powershell
pnpm dev          # start dev server at http://localhost:5173
pnpm build        # tsc -b && vite build
pnpm lint         # eslint
pnpm tsc --noEmit # type-check only, no emit
```

Package manager is **pnpm** (lockfile present). Do not use npm or yarn.

## Architecture

**Globo Ads Simulacrum** is a design-system documentation app (Storybook-like). Stack: React 19 + Vite 8 + TypeScript 6 + CSS Modules. No UI libraries — custom CSS only.

### Navigation

There is no router. `App.tsx` holds `useState<string>('colors')` for the active page and renders the matching page component conditionally. Sidebar calls `onNavigate(page)`. Adding a new page = token file + page component + one `<NavItem>` in `Sidebar.tsx` + conditional render in `App.tsx`.

### Token layer (`src/tokens/`)

Single source of truth for all content. Pages import these and map over them — no hardcoded data in page components.

- `colors.ts` — `COLOR_GROUPS: ColorGroup[]`. Each token is a discriminated union: `SolidToken { type: 'solid'; value: string }` or `GradientToken { type: 'gradient'; stops: [string, string] }`.
- `typography.ts` — `FONT_FAMILIES: FontFamilyDef[]` and `TYPOGRAPHY_GROUPS: TypographyGroup[]` (Display → Title → Body → Caption).
- `icons.ts` — `ICON_CATEGORIES`, `ICON_SIZES`, `ICON_VARIANT_RULES`, `ICON_GUIDELINES`, `VARIANT_DEMO_ICONS`.
- `buttons.ts` — `BUTTON_VARIANTS`, `BUTTON_SIZES`, `BUTTON_STATES`, `BUTTON_CONTENT_VARIANTS`, `BUTTON_GUIDELINES`, `DANGER_BUTTON_VARIANTS`, `DANGER_BUTTON_GUIDELINES`. Danger variants reuse `ButtonVariantDef` intentionally — the `id` ('primary'|'secondary'|'tertiary') maps to CSS via `danger={true}` prop on Button.
- `cards.ts` — `CARD_STYLES: CardStyleDef[]`, `STATIC_CARD_GUIDELINES`, `INTERACTIVE_CARD_STATES: CardStateDef[]`, `INTERACTIVE_CARD_GUIDELINES`. Shared between StaticCard and InteractiveCard — same two style variants (`on-primary` | `on-secondary`) apply to both.

### Component structure

- `src/components/` — reusable display components. Each lives in its own directory with a co-located `.module.css`.
  - **PageHeader** — shared page header (breadcrumb, title, subtitle, stats). Used by all pages.
  - **SectionHeader** — shared section header (icon + title + optional count badge). Used by all pages.
  - **Button** — interactive component with `variant`, `size`, `danger`, `forceState` props.
  - **StaticCard** — structural container card. Props: `style` ('on-primary' | 'on-secondary'), `children`, `className`. No interaction — renders a `<div>`.
  - **InteractiveCard** — clickable container card. Extends `ButtonHTMLAttributes`. Props: `style`, `forceState` ('hover' | 'focus' | 'active'). Renders a `<button>`. States driven by CSS via `data-state` attribute (same pattern as Button).
  - ColorSwatch, ColorGroup, FontFamilyCard, TypeSpecimen, Sidebar — domain-specific display components.
- `src/pages/` — one directory per page, each with `*Page.tsx` + `*Page.module.css`. Page CSS contains only the layout specific to that page — shared header/section styles live in their respective component modules.
- `src/utils/` — helpers shared across pages:
  - `color.ts` — `hexLuminance`, `isLightColor`
  - `iconVariation.ts` — `fvar(fill, opsz)` helper and named constants (`FVAR_OUTLINED_SM`, `FVAR_FILLED_SM`, `FVAR_OUTLINED_MD`, `FVAR_FILLED_MD`). Import from here — never define fontVariationSettings strings locally.

### Design tokens (CSS variables)

Defined in `:root` in `src/global.css`. Key variables:

```
--color-text-primary / secondary / tertiary
--color-bg-app / bg-sidebar
--color-border-ui                          /* #e8e8ea — UI chrome separator */
--font-family / font-family-display / font-family-body / font-family-code
--radius-sm / md / lg                      /* 4 / 8 / 12px */
--shadow-card / shadow-card-hover          /* both: none */
--focus-ring                               /* unified focus indicator for all interactive components */

/* Color tokens (Fill, Surface, Border) */
--color-fill-accent: #185CFB
--color-fill-critical: #B70634
--color-surface-primary: #FFFFFF
/* ... full list in global.css :root */
```

### Fonts

- **Inter Variable** — loaded via `@fontsource-variable/inter` npm package, imported in `global.css`.
- **Globotipo Corporativa** — proprietary font loaded via `@font-face` from `src/assets/fonts/*.woff2`.
- **Material Symbols Rounded** — loaded via `@material-symbols/font-400` package (`rounded.css`). Used with class `material-symbols-rounded`. Icon fill/weight controlled by inline `fontVariationSettings` using helpers from `src/utils/iconVariation.ts`.

### CSS conventions

- All styles are CSS Modules (`.module.css`), scoped per component/page.
- Backgrounds are flat (`#f7f7f8` for recessed areas, `#ffffff` for cards). No shadows anywhere (`--shadow-card: none`).
- Icon grids use `repeat(auto-fit, minmax(Xpx, 1fr))` — must be `auto-fit`, not `auto-fill`, to avoid empty column tracks that expose the gray grid-gap background.
- Full-height side panels in flex rows use `align-self: stretch` (not fixed height) so they grow with sibling content.
- Page CSS files contain only layout styles specific to that page. Header and section-header styles live in `PageHeader.module.css` and `SectionHeader.module.css`.

### Active pages

| Page | Key | Status |
|------|-----|--------|
| Colors | `colors` | Live — Fill (9), Surface (7), Border (8) tokens |
| Typography | `typography` | Live — 2 font families, 4 token groups (Display, Title, Body, Caption) |
| Iconography | `icons` | Live — library card, variants, size scale, guidelines, catalog |
| Button | `button` | Live — 3 variants, 3 sizes, 6 states, 4 content configs |
| Button · Danger | `danger-button` | Live — wrapper for `ButtonPage` with `isDanger={true}` |
| Static Cards | `static-card` | Live — 2 styles, guidelines |
| Interactive Cards | `interactive-card` | Live — 2 styles, 4 states, guidelines |
| Navigations (Hyperlinks, Tabs, Pagination, Breadcrumb, Summary Stepper) | — | Disabled in sidebar ("Em breve") |

## Adding a new component

Follow this checklist — every step is required:

1. **Token file** → `src/tokens/<name>.ts` — types + constants (variants, sizes, states, guidelines).
2. **Component** → `src/components/<Name>/` — `<Name>.tsx` + `<Name>.module.css`.
3. **Page** → `src/pages/<Name>/<Name>Page.tsx` + `<Name>Page.module.css` — import `PageHeader` and `SectionHeader` for consistent layout.
4. **Sidebar** → add `<NavItem>` in `Sidebar.tsx` under the appropriate category (Actions, Structures, Navigations, etc.).
5. **App** → add conditional render `{activePage === '<key>' && <NamePage />}` in `App.tsx`.

## Token naming conventions

- **All typographic scales** use t-shirt size abbreviations: `Display 2XL`, `Display XL`, `Display LG`, `Display MD`, `Display SM` — same pattern for Title and Body. Weight variants append the weight label using the Inter weight name: `Body MD Medium`.
- **Body tokens**: `Body 2XL`, `Body XL`, `Body LG`, `Body LG Medium`, `Body MD`, `Body MD Medium`, `Body SM`, `Body SM Medium`. Medium variants use `fontWeight: 500` (Inter Medium).
- **Caption tokens**: `Caption MD`, `Caption SM`, `Overline`.
- **Font sizes** must be multiples of 4px. Display sizes: 80/60/44/36/28px. Title sizes: 32/28/24/20/16px. Body sizes use pragmatic interface values (20/18/16/14/13px) where strict grid alignment would compromise readability.
- **CSS variables** follow `--type-<category>-<scale>` for typography and `--color-<group>-<semantic>` for colors.
- **TypeScript types** use `Def` suffix for definition objects: `ButtonVariantDef`, `ButtonSizeDef`.
- Content in token files (descriptions, usage notes) is written in **Portuguese**; code identifiers are in **English**.

## Design decisions

- **CSS Modules over Tailwind**: full control over specificity, easier DevTools inspection, no utility class generation overhead.
- **No router**: 5 documentation pages don't need deep-linking or browser history. Add React Router only when the number of pages or linking requirements make it necessary.
- **Light mode only (v1)**: dark mode is intentionally out of scope. All color values are hardcoded for light theme. Adding dark mode requires a `@media (prefers-color-scheme: dark)` override in `global.css` and potentially a separate token layer.
- **No state management library**: the only global state is `activePage` in `App.tsx`. If shared state grows (e.g., theme switching, search), add `useContext` before reaching for Zustand/Redux.
- **Danger variants on same Button component**: `danger={true}` prop toggles the CSS class `.danger` which overrides fill/border/text colors. This avoids duplicating the component while keeping variants well-defined in tokens.
- **`BUTTON_STATES` does not include CSS property definitions**: state visual behavior (backgrounds, brightness) lives in `Button.module.css`. The token list is for documentation only — it drives the state matrix in `ButtonPage`.

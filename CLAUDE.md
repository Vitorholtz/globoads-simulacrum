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

**Globo Ads Simulacrum** is a design-system documentation app (Storybook-like). Stack: React 19 + Vite 8 + TypeScript 6 + CSS Modules + React Router v7. No UI libraries — custom CSS only.

### Navigation

The app uses **React Router v7** (`react-router-dom`). `main.tsx` wraps the app in `<BrowserRouter>`. `App.tsx` uses `<Routes>/<Route>` to map paths to page components. `Sidebar.tsx` uses `<NavLink>` for active-state highlighting. Adding a new page = token file + page component + `<Route>` in `App.tsx` + `<NavItem to="/path">` in `Sidebar.tsx`.

### Token layer (`src/tokens/`)

Single source of truth for all content. Pages import these and map over them — no hardcoded data in page components. Every component/page has a corresponding token file.

**Foundation**
- `colors.ts` — `COLOR_GROUPS: ColorGroup[]`. Each token is a discriminated union: `SolidToken { type: 'solid'; value: string }` or `GradientToken { type: 'gradient'; stops: [string, string] }`.
- `typography.ts` — `FONT_FAMILIES: FontFamilyDef[]` and `TYPOGRAPHY_GROUPS: TypographyGroup[]` (Display → Title → Body → Caption).
- `icons.ts` — `ICON_CATEGORIES`, `ICON_SIZES`, `ICON_VARIANT_RULES`, `ICON_GUIDELINES`, `VARIANT_DEMO_ICONS`.
- `borderWidth.ts` — `BORDER_WIDTH_TOKENS: BorderWidthToken[]`. Six tokens: None → SM → MD → LG → XL → 2XL (0 / 1 / 2 / 4 / 6 / 8px in rem).
- `borderRadius.ts` — `BORDER_RADIUS_TOKENS: BorderRadiusToken[]`. Ten tokens: None → XS → SM → MD → LG → XL → 2XL → 3XL → 4XL → Full (0 / 2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 999px in rem).

**Actions**
- `buttons.ts` — `BUTTON_VARIANTS`, `BUTTON_SIZES`, `BUTTON_STATES`, `BUTTON_CONTENT_VARIANTS`, `BUTTON_GUIDELINES`, `DANGER_BUTTON_VARIANTS`, `DANGER_BUTTON_GUIDELINES`. Danger variants reuse `ButtonVariantDef` intentionally — the `id` ('primary'|'secondary'|'tertiary') maps to CSS via `danger={true}` prop on Button.

**Structures**
- `cards.ts` — `CARD_STYLES: CardStyleDef[]`, `STATIC_CARD_GUIDELINES`, `INTERACTIVE_CARD_STATES: CardStateDef[]`, `INTERACTIVE_CARD_GUIDELINES`. Shared between StaticCard and InteractiveCard — same two style variants (`on-primary` | `on-secondary`) apply to both.

**Navigations**
- `hyperlinks.ts`, `tabs.ts`, `pagination.ts`, `breadcrumb.ts` — variants, sizes, states, guidelines for each component.

**Indicators**
- `badge.ts`, `badgePointer.ts`, `badgeCounter.ts`, `inlineLoader.ts`, `skeleton.ts`

**Inputs**
- `checkbox.ts`, `radio.ts`, `switch.ts`, `chipSuggestion.ts`, `chipFilter.ts`, `chipInput.ts`, `chipAssist.ts`, `textField.ts`, `textarea.ts`, `select.ts`, `combobox.ts`, `datePicker.ts`

**Utilities / Alerts / Overlays**
- `collapse.ts`, `accordion.ts`, `infoPanel.ts`, `toast.ts`, `tooltip.ts`

### Component structure

- `src/components/` — reusable display components. Each lives in its own directory with a co-located `.module.css`.
  - **PageHeader** — shared page header (breadcrumb, title, subtitle, stats). Used by all pages.
  - **SectionHeader** — shared section header (icon + title + optional count badge). Used by all pages.
  - **Button** — interactive component with `variant`, `size`, `danger`, `forceState` props.
  - **StaticCard** — structural container card. Props: `style` ('on-primary' | 'on-secondary'), `children`, `className`. No interaction — renders a `<div>`.
  - **InteractiveCard** — clickable container card. Extends `ButtonHTMLAttributes`. Props: `style`, `forceState` ('hover' | 'focus' | 'active'). Renders a `<button>`. States driven by CSS via `data-state` attribute (same pattern as Button).
  - **Hyperlink**, **Tabs**, **Pagination**, **Breadcrumb** — navigation display components.
  - **Badge**, **BadgePointer**, **BadgeCounter**, **InlineLoader**, **Skeleton** — indicator display components.
  - **Checkbox**, **Radio**, **Switch** — selection input display components.
  - **ChipAssist**, **ChipFilter**, **ChipInput**, **ChipSuggestion** — chip variants display components.
  - **TextField**, **Textarea**, **Select**, **Combobox** — text input display components.
  - **DatePicker**, **DateRangePicker**, **Calendar** — date input display components.
  - **Collapse**, **Accordion** — utility display components.
  - **InfoPanel**, **Toast** — alert display components.
  - **Tooltip** — overlay display component.
  - **SpacingRow** — displays a single spacing token (name, rem/px, CSS variable, visual bar). Used by DimensionsEffectsPage.
  - **BorderWidthRow** — displays a single border-width token (name, rem/px, CSS variable, bordered rectangle demo). Used by DimensionsEffectsPage.
  - **BorderRadiusRow** — displays a single border-radius token (name, rem/px, CSS variable, rounded rectangle demo). Used by DimensionsEffectsPage.
  - **ColorSwatch**, **ColorGroup**, **FontFamilyCard**, **TypeSpecimen**, **Sidebar** — domain-specific display components.
- `src/pages/` — one directory per page, each with `*Page.tsx` + `*Page.module.css`. Page CSS contains only the layout specific to that page — shared header/section styles live in their respective component modules.
- `src/utils/` — helpers shared across pages:
  - `color.ts` — `hexLuminance`, `isLightColor`

### Design tokens (CSS variables)

Defined in `:root` in `src/global.css`. Key variables:

```
--font-family / font-family-display / font-family-body / font-family-code
--shadow-card / shadow-card-hover          /* both: none */
--focus-ring                               /* unified focus indicator for all interactive components; uses --color-focus-default */

/* Border width tokens */
--border-width-none: 0rem
--border-width-sm: 0.063rem   /* 1px — default component border */
--border-width-md: 0.125rem   /* 2px — focus/active emphasis */
--border-width-lg: 0.25rem    /* 4px — strong emphasis */
--border-width-xl: 0.375rem   /* 6px */
--border-width-2xl: 0.5rem    /* 8px */

/* Border radius tokens */
--border-radius-none: 0rem
--border-radius-xs:   0.125rem   /* 2px */
--border-radius-sm:   0.25rem    /* 4px — checkboxes, inputs */
--border-radius-md:   0.5rem     /* 8px — cards, menus */
--border-radius-lg:   0.75rem    /* 12px — containers, modals */
--border-radius-xl:   1rem       /* 16px */
--border-radius-2xl:  1.25rem    /* 20px */
--border-radius-3xl:  1.5rem     /* 24px */
--border-radius-4xl:  2rem       /* 32px */
--border-radius-full: 62.4375rem /* 999px — pill / circle shapes */

/* Color tokens (Fill, Surface, Border) */
--color-fill-accent: #185CFB
--color-fill-critical: #B70634
--color-surface-primary: #FFFFFF
--color-border-tertiary: #00000014  /* UI chrome separator (~8% black) */
/* ... full list in global.css :root */
```

There are **no semantic color aliases** (`--color-text-*`, `--color-bg-*`, `--color-border-ui`). Components reference the raw tokens directly — e.g. `color: var(--color-fill-primary)` for body text, `background: var(--color-surface-primary)` for card backgrounds, `border-color: var(--color-border-tertiary)` for UI separators.

### Fonts

- **Inter Variable** — loaded via `@fontsource-variable/inter` npm package, imported in `global.css`.
- **Globotipo Corporativa** — proprietary font loaded via `@font-face` from `src/assets/fonts/*.woff2`.
- **Material Symbols Rounded** — loaded via `@material-symbols/font-400` package (`rounded.css`). Used with class `material-symbols-rounded`. Icon size and fill are controlled by utility classes: `icon-xs` / `icon-sm` / `icon-md` / `icon-lg` / `icon-xl` for size, plus `icon-filled` modifier for the filled variant. Never define `fontVariationSettings` inline.

### CSS conventions

- All styles are CSS Modules (`.module.css`), scoped per component/page.
- Backgrounds are flat (`#f7f7f8` for recessed areas, `#ffffff` for cards). No shadows anywhere (`--shadow-card: none`).
- **Border widths** always use `var(--border-width-*)` tokens — never hardcode `1px`, `2px`, `4px` etc. in `border`, `border-*`, or `outline` properties. `box-shadow` spread values are exempt (focus rings).
- **Border radius** always use `var(--border-radius-*)` tokens — never hardcode px values in `border-radius` properties.
- Icon grids use `repeat(auto-fit, minmax(Xpx, 1fr))` — must be `auto-fit`, not `auto-fill`, to avoid empty column tracks that expose the gray grid-gap background.
- Full-height side panels in flex rows use `align-self: stretch` (not fixed height) so they grow with sibling content.
- Page CSS files contain only layout styles specific to that page. Header and section-header styles live in `PageHeader.module.css` and `SectionHeader.module.css`.

### Active pages

| Category | Page | Route | Status |
|----------|------|-------|--------|
| Foundation | Colors | `/colors` | Live — Fill (9), Surface (7), Border (8) tokens |
| Foundation | Typography | `/typography` | Live — 2 font families, 4 token groups |
| Foundation | Iconography | `/icons` | Live — library card, variants, sizes, guidelines, catalog |
| Foundation | Dimensões e Efeitos | `/dimensions-effects` | Live — 26 spacing tokens + 6 border-width tokens + 10 border-radius tokens |
| Actions | Button | `/button` | Live — 3 variants, 3 sizes, 6 states, 4 content configs |
| Actions | Button · Danger | `/danger-button` | Live — wrapper for `ButtonPage` with `isDanger={true}` |
| Structures | Static Cards | `/static-card` | Live — 2 styles, guidelines |
| Structures | Interactive Cards | `/interactive-card` | Live — 2 styles, 4 states, guidelines |
| Navigations | Hyperlinks | `/hyperlinks` | Live |
| Navigations | Tabs | `/tabs` | Live |
| Navigations | Pagination | `/pagination` | Live |
| Navigations | Breadcrumb | `/breadcrumb` | Live |
| Navigations | Summary Stepper | — | Disabled in sidebar ("Em breve") |
| Indicators | Badge Status | `/badge` | Live |
| Indicators | Badge Pointer | `/badge-pointer` | Live |
| Indicators | Badge Counter | `/badge-counter` | Live |
| Indicators | Inline Loader | `/inline-loader` | Live |
| Indicators | Skeleton | `/skeleton` | Live |
| Inputs | Text Field | `/text-field` | Live |
| Inputs | Textarea | `/textarea` | Live |
| Inputs | Select | `/select` | Live |
| Inputs | Combobox | `/combobox` | Live |
| Inputs | Checkbox | `/checkbox` | Live |
| Inputs | Radio Button | `/radio` | Live |
| Inputs | Switch | `/switch` | Live |
| Inputs | Chips | `/chips` | Live |
| Inputs | Date Picker | `/date-picker` | Live |
| Utilities | Collapse | `/collapse` | Live |
| Utilities | Accordion | `/accordion` | Live |
| Alerts | Info Panel | `/info-panel` | Live |
| Alerts | Toast | `/toast` | Live |
| Overlays | Tooltip | `/tooltip` | Live |

## Adding a new component

Follow this checklist — every step is required:

1. **Token file** → `src/tokens/<name>.ts` — types + constants (variants, sizes, states, guidelines).
2. **Component** → `src/components/<Name>/` — `<Name>.tsx` + `<Name>.module.css`.
3. **Page** → `src/pages/<Name>/<Name>Page.tsx` + `<Name>Page.module.css` — import `PageHeader` and `SectionHeader` for consistent layout.
4. **Sidebar** → add `<NavItem icon="..." label="..." to="/<path>" />` in `Sidebar.tsx` under the appropriate category.
5. **App** → add `<Route path="/<path>" element={<NamePage />} />` inside `<Routes>` in `App.tsx`.

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
- **React Router v7**: adopted when the page count grew beyond what simple conditional rendering could handle ergonomically. Enables deep-linking and browser history.
- **Light mode only (v1)**: dark mode is intentionally out of scope. All color values are hardcoded for light theme. Adding dark mode requires a `@media (prefers-color-scheme: dark)` override in `global.css` and potentially a separate token layer.
- **No state management library**: no global shared state beyond routing. If shared state grows (e.g., theme switching, search), add `useContext` before reaching for Zustand/Redux.
- **Danger variants on same Button component**: `danger={true}` prop toggles the CSS class `.danger` which overrides fill/border/text colors. This avoids duplicating the component while keeping variants well-defined in tokens.
- **`BUTTON_STATES` does not include CSS property definitions**: state visual behavior (backgrounds, brightness) lives in `Button.module.css`. The token list is for documentation only — it drives the state matrix in `ButtonPage`.
- **No semantic color aliases**: variables like `--color-text-primary` or `--color-border-ui` were removed. Components use raw tokens directly (`--color-fill-primary`, `--color-border-tertiary`, etc.). This keeps the token layer flat and avoids a redundant indirection layer.

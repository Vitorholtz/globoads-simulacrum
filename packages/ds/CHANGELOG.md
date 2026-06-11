# Changelog

Todas as mudanças notáveis do Globo Ads Design System são documentadas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).
Versionamento semântico conforme [SemVer](https://semver.org/lang/pt-BR/).

---

## [1.0.0] — 2026-06-02

Primeira versão estável do Globo Ads Design System.

### Adicionado

**Fundações**

- Tokens de cor: 5 grupos semânticos (Fill, Surface, Border, Ação, Luminosidade) — 41 tokens
- Tokens de espaçamento: escala de 4px com 24 passos (`--spacing-000` a `--spacing-2400`)
- Tokens de tipografia: famílias Globotipo Corporativa, Inter Variable e SF Mono
- Utility classes tipográficas: `type-display-*`, `type-title-*`, `type-body-*`, `type-caption-*`, `hyperlink-*`
- Tokens de motion: durações (fast/base/slow) e easings
- Tokens de sombra, foco, border-radius e border-width
- Utility classes de ícones: `icon-xs` a `icon-xl`, `icon-filled`

**Componentes (35)**

- Ações: Button, Hyperlink, Pagination, Breadcrumb
- Inputs: TextField, Textarea, Select, Combobox, Checkbox, Radio, Switch, DatePicker, DateRangePicker
- Chips: ChipAssist, ChipFilter, ChipInput, ChipSuggestion
- Badges: Badge, BadgeCounter, BadgePointer
- Cards: StaticCard, InteractiveCard
- Containers: Accordion, Collapse, Tabs, Calendar, InfoPanel, Toast, Tooltip
- Visual: Avatar, AvatarGroup, InlineLoader, Skeleton

> Lista reflete o estado em 2026-06-02 (v1.0.0). Para o inventário atual, ver `src/components/`.

**Documentação (35 páginas)**

- Página dedicada para cada componente com variantes, tamanhos, estados e diretrizes de uso
- 21 componentes de documentação reutilizáveis (Section, StateMatrix, GuidelinesGrid, etc.)
- Fundações: Colors, Typography, Icons, Dimensions, Effects, Transitions
- Playground interativo

**Infraestrutura**

- Roteamento com `registry.tsx` como fonte única de verdade (rotas + sidebar)
- Code-splitting via `React.lazy` + `Suspense`
- CSS Modules com naming convention `${componentName}__${className}`
- Pre-commit hooks: ESLint + Prettier + Stylelint
- CI: type-check + lint + lint:css + test + build + E2E Playwright

### Token `--color-border-accent-strong`

Adicionado token de borda para itens selecionados em dropdowns e listboxes.
Corresponde ao accent azul com opacidade reduzida (`#185cfbcc`).

---

## Tipos de mudança

- **Adicionado** — nova funcionalidade
- **Alterado** — mudança em funcionalidade existente
- **Depreciado** — funcionalidade que será removida em versão futura
- **Removido** — funcionalidade removida
- **Corrigido** — correção de bug
- **Segurança** — correção de vulnerabilidade

# CLAUDE.md — Simulacrum

App de **interfaces, jornadas e fluxos** do Globo Ads, construído sobre o Design System
(`@globo-ads/ds`). Foco em **experiência e prototipação funcional** — sem backend, sem banco.
Regras do workspace no [CLAUDE.md raiz](../../CLAUDE.md); regras do DS em [packages/ds](../../packages/ds/CLAUDE.md).

## Golden rules (não quebrar)

1. **Sempre o DS.** Importe componentes de `@globo-ads/ds` (`import { Button } from '@globo-ads/ds'`).
   Nunca HTML puro para controles de UI nem reimplemente algo que o DS já oferece. HTML semântico
   (`header`, `nav`, `main`, `ul`) é permitido apenas como estrutura de layout do shell.
2. **Tokens, nunca hardcode.** Mesmas regras de CSS do DS: cor/borda/raio/espaçamento via
   `var(--token-*)`; texto via utility `type-*`; ícones via `material-symbols-rounded` + `icon-*`.
   (Dimensões de layout — `width`/`height`/`min-height` — em px são aceitáveis.)
3. **Navegação vem de `src/shell/routes.ts`** (fonte única de labels/ícones/sidebar). Rotas com
   componente real vivem em `src/shell/features.ts`. Nova jornada = feature em
   `src/features/<dominio>/` + entrada em `NAV` (routes.ts) + entrada em `FEATURES` (features.ts).
4. **Sem backend.** Dados são mocks tipados em `src/data/mock/`; regras de negócio são funções
   puras em `src/data/rules/`. Estado de sessão via React Context — sem libs de estado por ora.
5. **Componente específico nasce aqui.** Em `src/components/`. Só promova ao DS quando houver
   valor real de reutilização — nunca antecipe.
6. **Idioma:** conteúdo em **português**; identificadores e comandos em **inglês**.

## Estrutura

```
src/
├── shell/        # layout persistente: AppShell, Header, Sidebar, Footer, routes.ts
├── features/     # uma pasta por jornada (flows, data.ts, DOMAIN.md)
├── components/   # componentes específicos do produto (não-DS)
└── data/         # mock/ (dados tipados) · rules/ (funções puras) · types/ (domain types)
```

Cada feature complexa documenta suas regras de negócio em `src/features/<dominio>/DOMAIN.md`.

## Comandos

```powershell
pnpm dev          # dev server em http://localhost:5174
pnpm build        # tsc -b && vite build
pnpm lint         # eslint
```

> Inventário de jornadas vive em `src/shell/routes.ts`. Componentes e tokens do DS vivem no DS —
> não os duplique aqui.

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
4. **Sem backend.** Dados são mocks tipados em `src/data/`: cada domínio agrupa tipos + dados +
   helpers num arquivo (`diarias.ts`, `impressoes.ts`); catálogos e tipos compartilhados ficam em
   `catalog/`, `channels.ts` e `types/`. Cálculo puro de regra de negócio fica em `src/data/rules/`
   (`locale.ts` reúne formatação de moeda/impressões/data, reaproveitada por todas as modalidades).
   O barrel `index.ts` re-exporta tudo — importe sempre de `'../data'` (caminho relativo até
   `src/data`), nunca de arquivos internos. Estado de sessão via React Context — sem libs de estado
   por ora.
5. **Componente específico nasce aqui.** Em `src/components/`. Só promova ao DS quando houver
   valor real de reutilização — nunca antecipe.
6. **Idioma:** conteúdo em **português**; identificadores e comandos em **inglês**.

## Estrutura

```
src/
├── shell/        # layout persistente: AppShell, Header, Sidebar, Footer, routes.ts
├── features/     # uma pasta por jornada (página, steps/, context/, components/, DOMAIN.md opcional)
├── components/   # componentes específicos do produto (não-DS)
└── data/         # mocks por domínio (diarias.ts…) · rules/ (cálculo puro) · catalog/ · types/
```

Cada feature complexa documenta suas regras de negócio em `src/features/<dominio>/DOMAIN.md`.

## Como adicionar uma modalidade de compra

Diárias e Impressões não compartilham uma abstração comum de "produto" — os modelos de precificação
divergem demais para isso valer a pena com apenas dois casos. Ao adicionar uma 3ª modalidade,
replique a costura existente:

1. Catálogo + tipos próprios em `src/data/<modalidade>.ts` (referencie `AD_FORMATS_CATALOG` e
   `CHANNEL_CATALOG` por ID — nunca duplique nome/dimensão/formato).
2. Regras puras em `src/data/rules/<modalidade>.ts`; reaproveite `rules/locale.ts` (formatação) e
   `rules/formats.ts` (helpers de `AdFormat`).
3. Feature em `src/features/<modalidade>/` com `context/`, `steps/`, `DOMAIN.md` e página principal.
4. Novo membro na union `CartItem` em `src/cart/types.ts`.
5. Entradas em `NAV_SECTIONS`/`NAV` (`shell/routes.ts`) e `FEATURES` (`shell/features.ts`).
6. Rode `validateCatalogs()` (`src/data/validate.ts`, ativo em DEV) — qualquer ID novo precisa
   resolver em `AD_FORMATS_CATALOG`/`CHANNEL_CATALOG`.

Se uma 3ª modalidade reusar o mesmo conceito de "portal/plataforma" hoje fragmentado entre
`PortalId` (diarias.ts) e `PlatformId` (impressoes.ts), é o gatilho para unificar os três IDs de
canal numa entidade transversal — não antecipe isso sem um caso concreto.

## Comandos

```powershell
pnpm dev          # dev server em http://localhost:5174
pnpm build        # tsc -b && vite build
pnpm lint         # eslint
```

> Inventário de jornadas vive em `src/shell/routes.ts`. Componentes e tokens do DS vivem no DS —
> não os duplique aqui.

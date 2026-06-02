# CLAUDE.md — Workspace

Monorepo **pnpm** da iniciativa Globo Ads. Mantenha este guia **enxuto**: regras específicas de
cada pacote vivem no `CLAUDE.md` do próprio pacote (lidos sob demanda ao trabalhar nele).

## Pacotes

| Pacote                                                        | O que é                                                              |
| ------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`packages/ds`](packages/ds/CLAUDE.md) — `@globo-ads/ds`      | Design System: tokens, componentes, fundações e app de documentação. |
| [`apps/simulacrum`](apps/simulacrum/CLAUDE.md) — `simulacrum` | Interfaces, jornadas e fluxos do produto, consumindo o DS.           |

## Regras do workspace (não quebrar)

1. **Direção de dependência:** `simulacrum` depende de `@globo-ads/ds` (`workspace:*`). O DS **nunca**
   importa do Simulacrum.
2. **Sempre usar o DS.** Interfaces no Simulacrum compõem `@globo-ads/ds`; nunca HTML puro nem
   reimplementação de componente que já existe no DS.
3. **Promoção ao DS é deliberada.** Componente específico do produto nasce em `apps/simulacrum/src/components/`.
   Só migra para o DS quando há valor real de reutilização — nunca antecipe.
4. **Config de tooling é compartilhada e vive só na raiz:** `eslint.config.js`, `.prettierrc`,
   `.stylelintrc.json`, `.husky/`. Cada pacote tem scripts `lint`/`test`/`build` próprios que
   resolvem essas configs por busca ascendente — rode-os de dentro do pacote.
5. **pnpm** apenas — nunca npm/yarn. Comandos por pacote via `pnpm --filter`.

## Comandos (raiz)

```powershell
pnpm install            # instala todo o workspace
pnpm dev:ds             # documentação do DS  (porta 5173)
pnpm dev:sim            # app Simulacrum       (porta 5174)
pnpm build              # build de todos os pacotes
pnpm test               # testes de todos os pacotes
pnpm lint               # eslint em todo o workspace
pnpm lint:css           # stylelint em todo o workspace
```

> Ao trabalhar dentro de um pacote, leia o `CLAUDE.md` dele. Inventários (componentes, tokens,
> rotas) vivem no código — não duplique em docs.

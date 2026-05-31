# Guia: adicionar um componente / página

> **Quando ler:** sempre que for criar um novo componente, página ou foundation no Design System.
> Todo passo é obrigatório. As regras de estilo/naming aplicáveis estão em [convencoes.md](convencoes.md).

## Checklist

1. **Token file** → `src/tokens/<name>.ts`
   Tipos + constantes (variants, sizes, states, guidelines). É a **fonte de verdade** do conteúdo —
   a página vai importar e mapear sobre isso. Nada de dado hardcoded na página. Reutilize os tipos
   base de [`src/tokens/types.ts`](../src/tokens/types.ts) (`GuidelineDef`, `StateDef`, …).

2. **Component** → `src/components/<Name>/`
   `<Name>.tsx` + `<Name>.module.css` co-localizados. Reaproveite as primitivas compartilhadas
   (`FieldLabel`, `FieldMessage`, `Section`, `GuidelinesGrid`, `StateMatrix`) em vez de remarcar HTML.

3. **Page** → `src/pages/<Name>/<Name>Page.tsx` + `<Name>Page.module.css`
   Importe `PageHeader` e `SectionHeader` para layout consistente. O CSS da página só contém o
   layout específico dela.

4. **Registry** → uma entrada `PageDef` em `PAGES` de [`src/pages/registry.tsx`](../src/pages/registry.tsx)
   (`path`, `label`, `icon`, `category`, `component`). **Essa única entrada conecta tanto a rota
   (`App.tsx`) quanto o item de nav da sidebar (`Sidebar.tsx`)** — não edite esses arquivos.
   Use `disabled: true` + `badge` para um item que aparece na sidebar sem rota ainda.

## Como verificar

```powershell
pnpm tsc --noEmit   # tipos
pnpm lint           # eslint
pnpm lint:css       # stylelint (pega px hardcoded em border/radius)
pnpm test           # vitest
pnpm dev            # confirmar visualmente em http://localhost:5173
```

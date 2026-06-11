# DOMAIN — Compra de Diárias

Modalidade em que o anunciante contrata uma **veiculação de 24 horas** em posições fixas de um
portal, com **CPM fixo por portal** definido no catálogo. Diferente de Impressões, não há seleção
de objetivo/KPI nem volume — o anunciante escolhe **portal → produto → dias de veiculação**.

## Fluxo (4 etapas)

1. **Portal** — escolhe um dos portais (G1, GE, Globo.com, gshow, Globoplay).
2. **Produto** — produtos filtrados pelo portal escolhido (ex.: Diária Nacional, Touchpoint,
   Homeday, Regional).
3. **Configuração** — seleciona os dias de veiculação. Produtos `isRegional: true` exigem um
   calendário por UF (`coverages`); produtos nacionais usam um único calendário.
4. **Resumo** — revisão e envio ao carrinho.

## Modelo de cobertura (`coverages`)

Cada produto define `coverages: CoverageInfo[]` — pares `{ code, impressions }` com a estimativa
diária de impressões. Produtos nacionais têm uma única cobertura `code: 'Nacional'`; produtos
`isRegional: true` têm uma cobertura por UF (rótulos em `STATE_LABELS`,
`src/data/rules/diarias.ts`).

`getPriceForCoverage(produto, code)` calcula o preço/dia de uma cobertura a partir do `cpm` do
produto, **arredondado para a centena de reais mais próxima** (`round(impressions × cpm / 1000 /
100) × 100`). Não reimplemente esse arredondamento fora da função.

## Agrupamento regional (`MACROREGIONS`)

Quando `coverages.length > 8`, a etapa de Configuração agrupa os estados por macrorregião
(`MACROREGIONS`, `src/data/diarias.ts`) para facilitar a navegação. Produtos com poucas coberturas
exibem a lista de UFs sem agrupamento.

## CPM por portal

Cada produto tem um `cpm: number` fixo — produtos do mesmo portal compartilham o mesmo CPM. Valores
vivem em `DIARIAS_CATALOG` (`src/data/diarias.ts`) — não duplicar aqui.

## Cálculo do total

`computeTotal()` (`src/data/rules/diarias.ts`):

- Produto nacional: `dias selecionados × getPriceForCoverage(produto, 'Nacional')`.
- Produto regional: soma, por UF selecionada, de `dias selecionados na UF ×
getPriceForCoverage(produto, UF)`.

## Arquitetura

- Dados/tipos: `src/data/diarias.ts` (`DIARIAS_CATALOG`, `PORTALS`, `MACROREGIONS`) · regras puras:
  `src/data/rules/diarias.ts` (`STATE_LABELS`, `computeTotal`) — formatação genérica vem de
  `src/data/rules/locale.ts`.
- Estado do wizard: `context/DiariasContext.tsx` (sessionStorage `diarias_wizard`, modo edição).
- Componentes próprios: `components/DiariasFormatsAccordion`, `components/DiariasResumoCard` e
  `src/components/DiariasPurchaseCard` (invoice, consumido também pelo carrinho).
- Carrinho: membro `CartItemDiarias` na union de `src/cart/types.ts`.

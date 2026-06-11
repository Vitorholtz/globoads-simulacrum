# DOMAIN — Compra por Impressões (CPM)

Modalidade em que o anunciante contrata um **volume de impressões** e a Globo entrega via
veiculação nas plataformas digitais. Precificação por **CPM** (custo por mil impressões).

**Total = (impressões / 1000) × CPM.** Volume mínimo: **1.000 impressões**, sem máximo.

## Fluxo (5 etapas)

1. **Objetivo & KPI** — escolhe o objetivo; o KPI é derivado (auto quando único; Conversão tem 3).
2. **Produto & Configuração** — produtos filtrados pelo objetivo. Configura plataformas e a variante
   de entrega (secundagem/local) que define o CPM.
3. **Segmentação** — escolhe uma audiência.
4. **Período & Volume** — intervalo de datas + quantidade de impressões (recálculo ao vivo).
5. **Resumo** — revisão e envio ao carrinho.

## Objetivo → KPI

Mapeamento em `OBJETIVO_KPIS` (`src/data/impressoes.ts`); rótulos em `KPI_LABELS` — não duplicar
aqui. Regra geral: cada objetivo deriva um KPI único, exceto Conversão (3 KPIs à escolha).

## Objetivo → Produtos

Cada produto do `IMPRESSOES_CATALOG` lista seus objetivos compatíveis no campo `objetivos` — não
duplicar aqui. `getProductsByObjetivo()` (`src/data/rules/impressoes.ts`) filtra o catálogo por
objetivo na etapa "Produto & Configuração".

## CPM por produto

O CPM varia por **variante de entrega** (`cpmOptions`, escolha-única). Produtos da Família G
(D Globo, V Globo, Touchpoint Rotativo) têm seleção **múltipla** de plataformas; produtos de
Globoplay têm plataforma **fixa**. Valores e variantes vivem em
[`src/data/impressoes.ts`](../../data/impressoes.ts) (`IMPRESSOES_CATALOG`) — não duplicar aqui.

## Arquitetura

- Dados/tipos: `src/data/impressoes.ts` · regras puras: `src/data/rules/impressoes.ts`
  (reaproveita formatadores e o catálogo de formatos de Diárias).
- Estado do wizard: `context/ImpressoesContext.tsx` (sessionStorage `impressoes_wizard`, modo edição).
- Componentes próprios da modalidade (não compartilham classes com Diárias):
  `components/ImpressoesProductCard`, `components/ImpressoesPricingCard` e
  `src/components/ImpressoesPurchaseCard` (invoice, consumido também pelo carrinho).
- Carrinho: membro `CartItemImpressoes` na union de `src/cart/types.ts`.

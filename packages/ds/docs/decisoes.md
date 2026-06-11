# Decisões de design (ADR-lite)

> **Quando ler:** ao questionar _por que_ algo é assim, ou antes de propor mudar uma escolha
> estrutural. O _como aplicar_ está em [convencoes.md](convencoes.md) e [guia-novo-componente.md](guia-novo-componente.md).

- **CSS Modules em vez de Tailwind** — controle total de especificidade, inspeção fácil no DevTools,
  sem overhead de geração de utility classes.
- **React Router v7** — adotado quando a contagem de páginas passou do que renderização condicional
  simples comportava. Habilita deep-linking e histórico de browser.
- **Light mode apenas (v1)** — dark mode está fora de escopo de propósito. Todos os valores de cor são
  para tema claro. Adicionar dark mode exigiria um override `@media (prefers-color-scheme: dark)` em
  `global.css` e possivelmente uma camada de token separada.
- **Sem biblioteca de state management** — não há estado global além do roteamento. Se estado
  compartilhado crescer (ex.: troca de tema, busca), use `useContext` antes de recorrer a Zustand/Redux.
- **Variantes Danger no mesmo componente Button** — a prop `danger={true}` alterna a classe `.danger`,
  que sobrescreve fill/border/text. Evita duplicar o componente mantendo as variantes nos tokens.
- **`BUTTON_STATES` não inclui definições de CSS** — o comportamento visual de estado (backgrounds,
  brilho) vive em `Button.module.css`. A lista de tokens é só documentação — alimenta a matriz de
  estados em `ButtonPage`.
- **Sem aliases semânticos de cor** — evita uma camada de indireção redundante sobre os tokens crus;
  mantém a camada de token plana. Lista de tokens corretos em
  [convencoes.md](convencoes.md#tokens-a-regra-mais-quebrada).

## Escopo e governança

Este é um Design System **deliberadamente simples** — uma biblioteca de componentes/fundações
reutilizáveis para apoiar interfaces futuras do Globo Ads em projeto separado, **sem** a governança
de um DS corporativo completo. A prioridade é **escalabilidade com baixo atrito**: adicionar
componente, criar token ou alterar variável deve ser fácil sem comprometer consistência.

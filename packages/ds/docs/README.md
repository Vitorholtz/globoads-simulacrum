# Documentação — índice

Mapa de "qual doc para qual pergunta". Cada arquivo tem dono único de seus fatos; nada é duplicado.
Inventários (páginas, valores de token, props) vivem no **código**, não aqui.

| Pergunta                                                  | Doc                                                |
| --------------------------------------------------------- | -------------------------------------------------- |
| Como tudo se conecta? Router, camadas, fluxo de dados?    | [arquitetura.md](arquitetura.md)                   |
| Quais regras eu não posso quebrar ao escrever CSS/tokens? | [convencoes.md](convencoes.md)                     |
| Como adiciono um componente ou página?                    | [guia-novo-componente.md](guia-novo-componente.md) |
| Por que essa escolha estrutural foi feita?                | [decisoes.md](decisoes.md)                         |
| Que tokens existem e onde vivem?                          | [tokens.md](tokens.md)                             |
| Como rodo / instalo o projeto? (humanos)                  | [../README.md](../README.md)                       |

## Fontes de verdade no código (não documentar à mão)

- Inventário de páginas/rotas → [`src/pages/registry.tsx`](../src/pages/registry.tsx)
- Valores de CSS variables → [`src/global.css`](../src/global.css)
- Conteúdo de tokens → [`src/tokens/*`](../src/tokens/)
- Props de componentes → o respectivo `.tsx`
- Scripts → [`package.json`](../package.json)

# Catálogo de Pokémons

Aplicação React que consome a [PokeAPI](https://pokeapi.co/) e exibe um catálogo interativo dos 151 pokémons da primeira geração, com busca, ordenação, modal de detalhes e favoritos. Projeto da **Avaliação Prática AP2**.

## Funcionalidades

- Listagem em grid responsivo (1 coluna no mobile, 2 em `sm`, 3 em `md`, 4 em `lg` e 5 em `xl`).
- Busca por nome (sem diferenciar maiúsculas de minúsculas) e ordenação por número, A–Z ou Z–A.
- Formulário controlado com botão "Limpar" e mensagem amigável quando não há resultados.
- Modal de detalhes (imagem, altura, peso, tipos, habilidades e stats base). Fecha pelo botão, clicando no fundo ou com a tecla Esc.
- Favoritos com botão de coração no card e no modal, persistidos no `localStorage`, e filtro "Somente favoritos".
- Spinner de carregamento e mensagem de erro com botão "Tentar novamente".
- Acessibilidade básica: `label` nos campos, `alt` nas imagens, `aria-label` nos botões de ícone, foco visível, `role="dialog"` e `aria-modal` no modal.

## Tecnologias utilizadas

Versões conforme o `package.json`:

| Tecnologia | Versão |
| --- | --- |
| React / React DOM | ^19.3.1 |
| Vite | ^8.3.4 |
| @vitejs/plugin-react | ^6.1.2 |
| Tailwind CSS | ^4.3.3 |
| @tailwindcss/vite | ^4.3.3 |
| Oxlint (lint) | ^1.88.0 |

JavaScript puro (`.js` e `.jsx`), `fetch` nativo, sem bibliotecas de UI, de rotas ou de requisições.

## Pré-requisitos, instalação e execução

Pré-requisito: Node.js e npm instalados.

O projeto fica na pasta `ap2-pokedex/` do repositório; rode os comandos abaixo dentro dela.

```bash
npm install       # instala as dependências
npm run dev       # servidor de desenvolvimento (URL exibida no terminal)
npm run build     # gera a versão de produção em dist/
npm run lint      # verifica o código com o oxlint
```

## API utilizada

[PokeAPI](https://pokeapi.co/api/v2), pública e sem chave de acesso.

| Endpoint | Uso |
| --- | --- |
| `GET /pokemon?limit=151` | Lista dos 151 primeiros pokémons |
| `GET /pokemon/{id}` | Detalhes exibidos no modal |

Imagens: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`

Exemplo resumido da lista (o `id` sai da `url`):

```json
{
  "count": 1351,
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" }
  ]
}
```

Exemplo resumido dos detalhes:

```json
{
  "id": 1,
  "name": "bulbasaur",
  "height": 7,
  "weight": 69,
  "types": [{ "type": { "name": "grass" } }],
  "abilities": [{ "ability": { "name": "overgrow" }, "is_hidden": false }],
  "stats": [{ "base_stat": 45, "stat": { "name": "hp" } }]
}
```

`height` vem em decímetros e `weight` em hectogramas; a interface converte para metros e quilos.

## Estrutura do projeto

```
src/
├── components/
│   ├── ItemCard.jsx         # card individual (recebe props, dispara callbacks)
│   ├── ItemList.jsx         # grid que renderiza um ItemCard por item
│   ├── SearchForm.jsx       # formulário controlado de busca e ordenação
│   ├── ItemDetails.jsx      # modal com os detalhes do pokémon selecionado
│   ├── FavoriteButton.jsx   # botão de coração reutilizado no card e no modal
│   └── LoadingSpinner.jsx   # indicador de carregamento
├── hooks/
│   ├── useFetch.js          # custom hook genérico de requisições HTTP
│   └── useLocalStorage.js   # custom hook genérico de estado persistido
├── services/
│   ├── api.js               # URL base e funções auxiliares da API
│   └── typeColors.js        # mapa constante tipo -> classes Tailwind
├── pages/
│   └── Home.jsx             # página principal, concentra o estado
├── App.jsx                  # fundo da página e renderização de Home
├── main.jsx                 # ponto de entrada
└── index.css                # apenas @import "tailwindcss"
```

## Mapeamento com a rubrica

| Critério | Onde é atendido |
| --- | --- |
| **Props e comunicação** | Dados descem por props e eventos sobem por callbacks, sem Context. `pages/Home.jsx:103-116` passa `favorites`, `onSelect`, `onToggleFavorite`, `onClose`; `components/ItemList.jsx:8` repassa ao `ItemCard`, que chama `onSelect(item.id)` (`ItemCard.jsx:9`). `SearchForm.jsx:1` recebe `search`, `sort`, `onSearchChange`, `onSortChange`, `onClear`. `FavoriteButton.jsx` é reutilizado no card e no modal. |
| **useState** | `pages/Home.jsx:26-29`: `search`, `sort`, `onlyFavorites` e `selectedId`. |
| **useEffect e consumo de API** | Toda requisição fica dentro do `useEffect` de `hooks/useFetch.js:11`, com dependências `[url, key]`, `AbortController` (linha 14) e `abort()` no cleanup (linha 27). `Home.jsx:19` busca a lista e `ItemDetails.jsx:20` busca os detalhes. O Esc do modal usa `useEffect` com cleanup do listener em `ItemDetails.jsx:24-32`. |
| **Custom hooks** | `hooks/useFetch.js` retorna `{ data, loading, error, refetch }` e não faz requisição se `url` for nula. `hooks/useLocalStorage.js` retorna `[value, setValue]`, com `try/catch` para JSON inválido (linhas 5-10). Nenhum dos dois tem código específico de Pokémon; são usados em `Home.jsx:19,31` e `ItemDetails.jsx:20`. |
| **Formulário controlado** | `components/SearchForm.jsx`: `input` e `select` com `value` + `onChange` (linhas 21-22 e 34-35), `preventDefault` no submit (linha 3), botão "Limpar" e `label` com `htmlFor`. O estado fica em `Home.jsx:26-27`. |
| **Tailwind** | Somente classes utilitárias; `index.css` tem apenas o `@import`. Responsivo em `ItemList.jsx:5` (`sm:`, `md:`, `lg:`, `xl:`); estados `hover:`, `focus-visible:` e `active:` com `transition` nos botões e cards; sombras e gradientes em `App.jsx`, `Home.jsx` e `ItemDetails.jsx`; cores por tipo em `services/typeColors.js:1` (objeto constante `TYPE_COLORS`). |
| **Organização** | Um componente por arquivo, componentes em PascalCase, hooks começando com `use`, `key` em todas as listas (`ItemList.jsx:7`, `ItemDetails.jsx:105,129,141`), sem `console.log`, sem código morto. |
| **Acessibilidade** | `label`/`htmlFor` em `SearchForm.jsx`; `alt` nas imagens; `aria-label` e `aria-pressed` em `FavoriteButton.jsx`; `aria-label` no botão de fechar; `role="dialog"` e `aria-modal` em `ItemDetails.jsx:46-47`; foco visível com `focus-visible:outline`. |

## Decisões técnicas

- **AbortController no `useFetch`:** cancela a requisição anterior quando a URL muda ou o componente desmonta. Evita race conditions (resposta antiga sobrescrevendo a nova) e atualização de estado após o desmonte. O `AbortError` é ignorado de propósito.
- **`loading` derivado, sem `setState` no effect:** o hook guarda o resultado junto da chave da requisição (`url` + tentativa). Se a chave guardada não é a atual, está carregando. Isso evita renders em cascata (aviso do lint) e mostra o spinner sem dado antigo.
- **`refetch` por contador:** incrementar o contador de tentativas muda a chave e reexecuta o effect, sem duplicar a lógica de busca.
- **Filtro e ordenação no cliente:** a lista tem só 151 itens e já foi baixada, então não há nova requisição a cada tecla. Usa `useMemo` para recalcular apenas quando algo muda.
- **Busca a cada tecla:** o submit do formulário só chama `preventDefault`, para o Enter não recarregar a página.
- **`limit=151`:** limita à primeira geração, o que mantém a página leve e o tema coeso.
- **Sem Context:** o estado fica em `Home.jsx` e desce no máximo dois níveis (Home, ItemList, ItemCard), então não há prop drilling relevante.
- **Favoritos como lista de ids** no `localStorage` (chave `favorites`): simples de ler e de filtrar. O hook trata JSON inválido e storage bloqueado, e o app continua funcionando.
- **Cores por tipo só no modal:** a lista da API não traz os tipos, e buscá-los para os 151 cards exigiria 151 requisições extras. Por isso a cor por tipo aparece apenas nos detalhes. Tipos e habilidades ficam com o nome em inglês, como vêm da API.
- **`style` inline nas barras de stats:** a largura é calculada em tempo de execução, e o Tailwind não gera classes para valores dinâmicos.
- **Card como `div` com dois botões:** evita botão dentro de botão (HTML inválido) ao colocar o coração sobre o card.
- **Lint com oxlint:** é o linter que já vem configurado no template do projeto (`npm run lint`).
- **Modal com `useCallback`:** `onClose` estável para o effect do Esc não recriar o listener a cada render.

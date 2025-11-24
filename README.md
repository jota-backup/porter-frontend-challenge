# Desafio Técnico Frontend React - Porter

Salve pessoal da Porter! Sou o Jota e esta é a minha proposta de solução para o Desafio Técnico de vocês. Neste README vocês poderão acompanhar as decisões que tomei durante o projeto, o contexto em torno delas, documentação relativa à estrutura do repositório, como rodar a aplicação, etc.

> _Gostaria de registrar aqui que me comprometo em não utilizar IA nesta parte de documentação para explicar as minhas decisões e ferramentas utilizadas. Sua ajuda foi só para formatar o documento e implementar seções como a "Como rodar o projeto" e "Estrutura do projeto"_

---

## TL;DR

Single Page Application (SPA) desenvolvida com **React 19 + TypeScript + Vite**, consumindo a [API do Rick and Morty](https://rickandmortyapi.com/graphql) via **GraphQL (Apollo Client)**. Implementa sistema de favoritos persistentes com **Zustand** + localStorage, internacionalização com **i18next**, estilização com **Styled Components**, e testes com **Vitest Browser Mode**. Containerizada com **Docker** (NGINX + multistage build).

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/) instalado globalmente

### Ambiente de Desenvolvimento

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:jota-backup/porter-frontend-challenge.git
   cd porter-frontend-challenge
   ```

2. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```

3. **Instale as dependências:**
   ```bash
   pnpm install
   ```

4. **Rode o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```
   > O projeto estará disponível em `http://localhost:5173`

### Rodando os Testes

```bash
pnpm test
```

### Build de Produção (Local)

```bash
pnpm build
pnpm preview
```

### Docker

Para construir e rodar a imagem Docker em produção:

```bash
# Build da imagem
docker build -t porter-frontend-challenge .

# Executar o container
docker run -p 8080:8080 porter-frontend-challenge
```

> A aplicação estará disponível em `http://localhost:8080`

---

## 📱 Sobre a Aplicação

A aplicação consome a API GraphQL do Rick and Morty e permite:

- ✅ Listagem paginada de personagens
- ✅ Busca de personagens por nome (com debounce)
- ✅ Sistema de favoritos com persistência em localStorage
- ✅ Visualização detalhada de cada personagem em modal
- ✅ Filtro para exibir apenas favoritos
- ✅ Feedback visual com toasts
- ✅ Suporte a internacionalização (i18n)
- ✅ Tratamento de erros com Error Boundaries
- ✅ Loading states e transições suaves

### Estrutura do Projeto

```
porter-frontend-challenge/
├── src/
│   ├── types/           # Definições de tipos TypeScript
│   ├── hooks/           # Custom hooks React
│   ├── i18n/            # Configuração de internacionalização
│   ├── graphql/         # Lógica de serviços e GraphQL
│   ├── store/           # Gerenciamento de estado (Zustand)
│   └── ui/              # Componentes React
│       ├── components/  # Componentes reutilizáveis
│       └── theme/       # Tema do Styled Components
├── .env.example         # Exemplo de variáveis de ambiente
├── Dockerfile           # Configuração Docker
└── package.json         # Dependências e scripts
```

---

## ✨ Destaques Técnicos

- **Arquitetura e Setup:**
  - Internacionalização desde o princípio (com tipagem das mensagens)
  - Imagem Docker otimizada com build multistage (NGINX)
  - Sistema de tema no Styled Components com cores, sombras e tipografia
  - Configuração de ferramentas de qualidade: Biome, Husky, Commitlint

- **GraphQL e TypeScript:**
  - Apollo Client com Suspense API
  - GraphQL Code Generator para tipagem automática dos recursos da API
  - TypeScript estrito em todo o projeto

- **Performance e UX:**
  - Suspense API do React para loading states
  - Transition API para manter UI responsiva durante carregamentos
  - Debounce na busca por nome (protege a API e melhora UX)

- **Hooks Customizados:**
  - `useFavoriteCharacter`: abstrai lógica de favoritos com seletor otimizado que previne re-renders desnecessários
  - Reutilização de código e melhor separação de responsabilidades

- **Componentização:**
  - Separação clara entre camada de apresentação e camada de dados para renderização dos cards
  - Modal decomposto em subcomponentes com responsabilidades claras
  - Renderização condicional baseada em filtros sem repetição de código

- **Acessibilidade (a11y):**
  - Cards navegáveis por teclado com atributos ARIA apropriados
  - Modal usando elemento nativo `<dialog>` do HTML
  - Manipulação de eventos de teclado para interações

- **Qualidade e Testes:**
  - Error Boundaries para casos de erro de rede/requisição
  - Feedback ao usuário via toast (adição/remoção de favoritos)
  - Testes implementados com Vitest Browser Mode (ambiente nativo)

---

## 🔧 Decisões Técnicas e Ferramentas

### Arquitetura e Framework

**React com Vite (SPA)**

Como essa é uma aplicação relativamente simples, não vi necessidade de construir com um framework full-stack como Next.js ou TanStack Start. SSR é algo cada vez mais importante no cenário atual de performance de aplicações React, mas também existe um overhead no setup inicial que não julguei necessário para esse caso. Optei por criar uma SPA usando **Vite** pela experiência de desenvolvimento superior e build otimizado.

### Consumo de Dados

**GraphQL com Apollo Client**

Implementei o diferencial técnico de usar **GraphQL**. Tenho familiaridade com o assunto mas nunca havia utilizado o Apollo Client — foi uma boa oportunidade para demonstrar adaptabilidade. Além disso, a biblioteca já possui APIs necessárias para atingir certas demandas do desafio, como loading states e tratativa de erros.

**GraphQL Code Generator**

Descobri durante a pesquisa que posso gerar automaticamente os tipos TypeScript a partir do schema GraphQL da API. Isso melhora significativamente a DX e garante type-safety em todas as queries.

### Gerenciamento de Estado

**Zustand com persistência**

O gerenciamento de estado está principalmente ligado ao requisito funcional dos favoritos. Avaliei 3 opções:

- **Context API**: Muito boa para resolver "prop drilling", mas com setup verboso. Melhor para dados mais "atômicos" como tema do usuário.

- **Redux**: Era a ferramenta padrão no desenvolvimento de frontend, oferece controle fino sobre o estado com Pub/Sub, mas possui API mais burocrática (mesmo com RTK) e setup custoso.

- **Zustand**: API intuitiva, setup simples, e já possui documentação para persistência no localStorage — perfeito para o caso de uso. Foi minha escolha.

**Por que Map para armazenar favoritos?**

Utilizei `Map` dentro da store de favoritos para indexar cada personagem pelo ID. Isso torna operações de acesso, adição e deleção em tese O(1), muito mais eficientes que arrays. Também salvo o timestamp do momento em que se favoritou para permitir implementações futuras de reconciliação/refetch.

### Estilização

**Styled Components**

Segui a indicação do desafio. Implementei um tema base com cores, sombras e tipografia que é consumido por todos os componentes.

### Testes

**Vitest + RTL**

Implementei os testes utilizando Vitest e RTL. Inicialmente, havia testado o Browser mode do Vitest por estar em versão estável e ser um ambiente nativo, garantindo maior segurança aos testes. Mas me atentei que o desafio requer especificamente o uso desse setup (Vitest é compatível com a API do Jest), resolvi mudar e utilizar o RTL com JSDOM.

### Decisões de UX e Performance

**Suspense API**

Utilizo a Suspense API do React para garantir uma boa UX:
- No primeiro carregamento: spinner em tela cheia
- Durante paginação: uso da `useTransition` para manter a tela funcional enquanto carrega, com spinner no botão de paginação e cards antigos visíveis

**Debounce na busca**

Implementei debounce de 500ms na busca por nome para evitar sobrecarga de requisições e melhorar a experiência do usuário.

**Error Boundaries**

Componentes que fazem queries Apollo estão envoltos em Error Boundaries. Em caso de erro de rede, mostra mensagem ao usuário sem quebrar a aplicação já carregada.

### Decisões de Acessibilidade

**Cards com role e eventos de teclado**

Pensei em converter os cards em `<button>` para acionar o modal, mas a especificação HTML não permite buttons aninhados. Mantive como `<div>` mas adicionei atributos ARIA, role, e manipulação de eventos de teclado para navegação acessível.

**Modal com elemento `<dialog>`**

Implementei usando o elemento nativo HTML `<dialog>`, que já garante vários recursos de acessibilidade. Para controlá-lo, uso `useEffect` para chamar os métodos nativos `.showModal()` e `.close()` (controle via atributo `open` não adiciona backdrop). Este é um dos [poucos casos aceitáveis de useEffect](https://react.dev/reference/react/useEffect#controlling-a-non-react-widget) segundo a documentação React.

### Internacionalização

**react-i18next**

Configurei i18n desde o início com tipagem das mensagens, facilitando manutenção e expansão futura para outros idiomas.

### Containerização

**Docker com multistage build**

Adotei boas práticas com processo multistage:
1. Stage de build: instala dependências + compila aplicação
2. Stage de produção: serve arquivos estáticos via NGINX

Isso resulta em imagem final leve e otimizada.

---

## 💾 Funcionamento da Persistência de Favoritos

Como o documento do desafio pede uma explicação sobre esse assunto, vou adicionar uma seção dedicada.

A persistência no localStorage só pode ser feita utilizando strings. Isso coloca a necessidade de serializar/desserializar nosso estado. Geralmente, temos isso facilitado pelos métodos nativos do JS para transformar em JSON - formato utilizado em larga escala para comunicação entre cliente e servidor na web.

Com isso, torna-se uma questão de entender a API específica da biblioteca que estamos utilizando (Zustand) e ver se precisamos fazer alguma adequação especial considerando nossa estrutura de dados.

Para este projeto, resolvi adotar `Map` (decisão explicada acima) para armazenar favoritos. Isso significa que temos que dar um passo adicional além de utilizar a API do Zustand para persistência.

`Map` não é um "objeto" comum ao JSON, ele é do domínio do JavaScript. Por isso, precisamos transformá-lo em um Array - uma "dimensão" compartilhada por ambas as especificações.

### Serialização (Map → JSON)

Como no JS podemos construir Arrays a partir de qualquer objeto iterável com `Array.from`, basta pegarmos nosso iterável do Map - utilizando o método `.entries()` - e fazer a conversão.

### Desserialização (JSON → Map)

O caminho de "volta" é mais fácil ainda - utilizamos o construtor do Map com o Array formado após o parsing do JSON.

A API de persistência do Zustand permite configurar essas transformações customizadas, garantindo que o Map seja corretamente persistido e restaurado.

---

## 📚 Processo de Desenvolvimento

Para detalhes sobre o processo de desenvolvimento, primeiras impressões, reflexões pós-implementação e diário detalhado das atividades, consulte o [development.md](./docs/development.md).

---

## 🛠️ Scripts Disponíveis

```bash
pnpm dev        # Inicia servidor de desenvolvimento
pnpm build      # Build de produção
pnpm preview    # Preview do build de produção
pnpm test       # Executa testes
pnpm codegen    # Gera tipos TypeScript do schema GraphQL
pnpm lint       # Executa linter (Biome)
pnpm format     # Formata código (Biome)
pnpm check      # Executa lint + format
```

---

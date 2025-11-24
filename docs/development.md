# Diário de Desenvolvimento

Este documento registra o processo de desenvolvimento do projeto, incluindo primeiras impressões, reflexões finais e um diário detalhado das atividades realizadas.

## Primeiras Impressões

O desafio é bem objetivo - viabilizar o consumo de dados de uma API, permitir interações básicas dentro da aplicação e gerenciamento de estado. Minha leitura dessa proposta é que devo prezar por adotar boas práticas e, principalmente, colocar em evidência meu conhecimento sobre elas.

Além disso, acredito que seja fundamental implementar os diferenciais técnicos. É uma boa forma de ir além e mostrar habilidades que possuo. Vou documentar no tópico de decisões as minhas expectativas de tecnologias e ferramentas que pretendo adotar.

Neste último final de semana participei do Front in Floripa e curti a proposta apresentada pelo Vedovelli para uso de IA nos seus projetos. Assim, passei o desafio técnico para o Claude e pedi para ele elaborar um PRD que servirá de referência ao agente para me ajudar durante o desenvolvimento.

## Reflexões Pós-Implementação

Curti muito fazer o projeto. Achei ele num tamanho bem adequado, e com ele pude colocar em prática vários conhecimentos de React e boas práticas de desenvolvimento Frontend em geral. A ideia de usar a API do Rick e Morty me fascinou tanto que comecei a assistir o desenho novamente rs. Coisas que senti que me ajudaram muito foram: i) criar um design com auxílio de IA; ii) fazer a estruturação inicial do projeto completamente na mão - pensar bibliotecas, estrutura de pastas, organização de componentes, construção do tema e outros providers; iii) ciclo de análise → implementação → observação → refatoração.

Principal dificuldade: pensar em como organizar a renderização dos cards baseado no filtro de favoritos. Passei algum tempo pensando na forma mais "DRY" possível e percebi que poderia enveredar por caminhos com muitos condicionais e carregar dados do mesmo "tipo" de dois lugares diferentes (API e Store) no mesmo componente - receita para dar algo errado. Gostei muito da minha solução de separar a camada de apresentação (que é igual para ambos) da camada que faz a busca dos dados, assim temos o melhor dos dois mundos - pouca repetição de código e separação de responsabilidades.

Gostaria, talvez em uma oportunidade no futuro, de adicionar lógica de refetch/reconciliação dos dados armazenados no localStorage. Acho que ia ser um diferencial massa!

## Diário de Atividades

> **20/11 (~18h)**: Terminei o esboço do README. Coloquei minhas primeiras impressões, escolhas de ferramentas e minhas opiniões sobre alguns tópicos. Agora pretendo avançar na criação da aplicação. Fazer o bootstrap com Vite, ajustes de tooling (Biome) e em seguida já garantir a internacionalização com react-i18next e a containerização com Docker. Assim já deixo dois diferenciais técnicos bem encaminhados.

> **20/11 (~20h30)**: Para a implementação do Docker, resolvi adotar as boas práticas de ter um processo multistep para instalar dependências + buildar a aplicação e, a partir dos arquivos gerados em `/dist`, servir a aplicação através de uma imagem NGINX. Já em termos de i18n, implementei a ferramenta seguindo a documentação da mesma e mantendo defaults (como namespace). Adicionei também um arquivo de declaração de tipos para utilizar somente mensagens existentes, assim melhorando a DX com TypeScript.

> **20/11 (21h)**: Vou utilizar a ferramenta UXPilot para gerar um design referência para essa entrega. Vou adicionar na pasta `/docs` depois o prompt usado e prints contendo os resultados.

> **21/11 (12h)**: Agora vou focar na parte que acredito que pode demorar um pouco mais de tempo: configurar o Apollo Client e garantir o consumo dos dados que vou precisar, conforme orientação dada pelo PDF do desafio + design de referência.

> **21/11 (13h30)**: Passei a última hora e meia lendo a documentação do Apollo Client. Gostei muito do que li sobre o uso de Suspense e maneiras de manipular o carregamento de queries - pretendo usar isso para fazer certas otimizações. Mas a cereja do bolo foi descobrir a existência do GraphQL Codegen. Fiz alguns testes e, pelo visto, ele é compatível com os schemas disponibilizados pela API do Rick and Morty. Vou investir um tempo nisso já que um dos critérios do desafio é o uso bem feito de TS.

> **21/11 (17h)**: Com algumas pausas e leituras de documentação, fiz o setup do Styled Components junto de um tema base para a aplicação. Agora é hora de começar a dar vida à UI, já que já consigo consumir a API do GraphQL.

> **22/11 (09h)**: Ontem, explorei ideias de implementação, testando queries e formas de montar a página. Depois dessa exploração, deletei quase todos os arquivos e agora pretendo começar a fazer a construção da página de baixo para cima - vou começar fazendo renderizar os cards dos personagens, e depois avanço para a parte dos filtros.

> **22/11 (16h)**: Implementei o primeiro grupo de requisitos que é a tela de usuários. Gastei um tempo para adicionar transições, refatorar para utilizar o `useSuspenseQuery` e garantir uma boa UX. Agora, pretendo implementar os filtros de maneira crua, sem funcionalidade, depois instalar o Zustand e configurar a store para salvar o estado dos filtros e torná-los funcionais.

> **22/11 (18h30)**: Store de filtros criadas e input de pesquisa por nome já operando. O foco agora é construir a funcionalidade de favoritos. Vou deixar o modal de detalhes do personagem pro fim já que deve ser uma parte mais tranquila.

> **22/11 (20h)**: Criei a store de favoritos e enfrentei uma das maiores refatorações até aqui - separar a lógica de buscar os personagens da camada de apresentação para garantir um código DRY. Isso permitiu fazer uma renderização condicional a depender do filtro selecionado, buscar os dados necessários, e manter um lugar centralizado para a apresentação com uma única instanciação de paginação, cards e grid (critério de reutilização de componentes). Também adicionei um toast para atender o requisito do desafio de feedback ao usuário.

> **23/11 (15h)**: Implementei o modal de detalhes do usuário. Essa parte já foi bem mais intuitiva. Implementei um Error Boundary nele também para, em caso de erro das requests, mostrar um erro ao usuário sem impedir que ele continue usando a aplicação que já havia carregado. Adotei o uso da Suspense query com retorno de dados parciais em caso de termos já em memória cacheado algumas das coisas presentes na query. Também fiz alguns ajustes para manter a a11y dos cards.

> **23/11 (17h)**: Passei as últimas horas refatorando e deixando a codebase o mais limpa possível. No caso dos componentes de UI, optei por deixar os estilos juntos aos componentes nos casos em que o componente não era tão grande. Nos casos de componentes maiores, resolvi fazer a quebra com um arquivo dedicado a estilos.

> **23/11 (18h)**: Para este desafio, resolvi adotar o setup de testes com Vitest + novo browser mode. Gosto da ideia de testar em um ambiente nativo, e com Playwright funcionando por debaixo dos panos a performance também não deve ser prejudicada. Essa feature acabou de ser lançada em caráter estável também.

# Desafio Técnico Frontend React - Porter

Salve pessoal da Porter! Sou o Jota e esta é a minha proposta de solução para o Desafio Técnico de vocês. Nesse readme vocês poderão acompanhar as decisões que tomei durante o projeto, o contexto envolta delas, documentação relativa a estrutura do repositório, como rodar a aplicação, etc.

>_Gostaria de registrar aqui que me comprometo em não utilizar IA nesta parte documental por entender que conseguir sustentar minhas escolhas e explicá-las é uma das partes mais importantes nesse tipo de avaliação._

---

## Primeiras impressões

O desafio é bem objetivo - viabilizar o consumo de dados de uma API, permitir interações básicas dentro da aplicação e gerenciamento de estado. Minha leitura dessa proposta é que devo prezar por adotar boas práticas e, principalmente, colocar em evidência meu conhecimento sobre elas.

Além disso, acredito que seja fundamental implementar os diferenciais técnicos. É uma boa forma de ir além e mostrar habilidades que possuo. Vou documentar no tópico de decisões as minhas expectativas de tecnologias e ferramentas que pretendo adotar.

Neste último final de semana participei do Front in Floripa e curti a proposta apresentada pelo Vedovelli para uso de IA nos seus projetos. Assim, passei o desafio técnico para o Claude e pedi para ele elaborar um PRD que servirá de referência ao agente para me ajudar durante o desenvolvimento.

## Diário

> 20/11 (~18h): Terminei o esboço do README. Coloquei minhas primeiras impressões, escolhas de ferramentas e minhas opiniões sobre alguns tópicos. Agora pretendo avançar na criação da aplicação. Fazer o bootstrap com Vite, ajustes de tooling (Biome) e em seguida já garantir a internacionalização com react-i18next e a containeirização com Docker. Assim já deixo dois diferenciais técnicos bem encaminhados.

## Decisões técnicas

### Sobre as Ferramentas e tecnologias:

- React: Como essa será uma aplicação bem simples, não vejo necessidade de construir a aplicação com um framework como Tanstack / Next / etc. SSR é algo cada vez mais importante no cenário atual de performance de aplicações React, mas também existe um overhead no setup inicial que não acho que seja necessário para esse caso. Posso aprofundar esse tema posteriormente na conversa técnica. Portanto, acredito que o melhor para esse caso é criar uma SPA usando **Vite**
- Consumo de dados: aqui pretendo implementar o diferencial técnico de usar **GraphQL**. Tenho uma certa familiaridade com o assunto mas nunca utilizei o Apollo Client - boa oportunidade para demonstrar adaptabilidade. Além disso, olhando rapidamente na documentação, a biblioteca já possui APIs necessárias para atingir certas demandas do desafio - como loading state e tratativa de erros.
- Gerenciamento de estado: o gerenciamento de estado está principalmente ligado ao requisito funcional dos usuários favoritos. Temos 3 opções de bibliotecas, vou comentar rapidamente minha visão sobre elas.
  - A Context API é muito boa para resolver o problema "prop drilling" no React - ou seja, compartilhar um estado que possa ser utilizado em vários pontos da aplicação. Seu setup é um pouco verboso e, mesmo sendo possível implementar lógicas mais complexas com reducers, acredito que seu valor de uso está para casos pontuais como por ex. persistir o tema do usuário - dados de natureza mais "atômico" e não tão estruturados.
  - O Redux era a ferramenta padrão para gerenciamento de estado até algum tempo atrás. A partir de uma store global, temos um controle muito mais fino sobre o consumo e publicação de mudanças. No meu jeito de ver, possui uma API um pouco mais burocrática e não intuitiva, mesmo com o mais recente RTK. O setup inicial também é mais custoso.
  - O Zustand se tornou rapidamente um xodó dos devs já que possui uma API bem intuitiva e uma facilidade grande no setup inicial. Quando li o desafio, já estava convencido que iria utilizar ela, principalmente considerando o aspecto tempo de implementação. Lendo rapidamente o readme deles agora, vi que já existe até uma seção documentando a persistência dos dados do estado no localStorage do navegador, outro requisito do desafio. **Zustand** é minha escolha.
- Estilos: vou seguir a indicação do Styled Components.

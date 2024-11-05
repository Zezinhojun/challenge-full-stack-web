## Backend - Decisão da Arquitetura Utilizada

Utilizei a arquitetura MVC (Model-View-Controller) por sua simplicidade e eficiência, que permite uma boa organização do código e facilita a manutenção e a testabilidade da aplicação.

### Ferramentas de Qualidade de Código

- ESLint: Analisador de código estático para identificar e corrigir problemas de estilo e qualidade.
- Prettier: Formatador de código que garante um estilo consistente.
- Husky: Gerenciador de hooks do Git para garantir que o código esteja formatado e testado antes do commit.
- Lint-staged: Executa linters apenas em arquivos que estão prestes a serem commitados.

### Bibliotecas

- Express: Framework para construir a API REST.
- PostgreSQL (pg): Cliente para interagir com o banco de dados PostgreSQL.
- Bcrypt: Biblioteca para hashing de senhas.
- JSON Web Token (jsonwebtoken): Biblioteca para autenticação usando tokens JWT.
- CORS: Middleware para habilitar CORS nas rotas da API.
- TypeORM: ORM para gerenciar o banco de dados com TypeScript.
- Swagger JSDoc e Swagger UI Express: Ferramentas para gerar e apresentar a documentação da API.

### Frameworks

- TypeScript: Superset do JavaScript que adiciona tipagem estática à linguagem.
- Jest: Framework para testes unitários e de integração.
- ts-jest: Utilitário para utilizar Jest com TypeScript.

## Frontend - Decisão da Arquitetura Utilizada

Utilizei a arquitetura Vue.js com Vuex para gerenciamento de estado, proporcionando uma estrutura clara e eficiente para o desenvolvimento de interfaces responsivas.

### Ferramentas de Qualidade de Código

- ESLint: Ferramenta para análise e correção de problemas de estilo de código.
- Prettier: Formatador de código para garantir consistência no estilo.

### Bibliotecas

- Vue: Framework progressivo para construir interfaces de usuário.
- Vuetify: Framework de componentes para Vue.js que implementa o Material Design.
- Vue Router: Gerenciador de rotas para aplicações Vue.js.
- Vuex: Biblioteca para gerenciamento de estado em aplicações Vue.js.
- Axios: Cliente HTTP para fazer requisições a APIs.
- Vee-validate: Biblioteca para validação de formulários.

### Frameworks

- Vite: Ferramenta de construção de front-end que oferece um ambiente de desenvolvimento rápido e eficiente.
- TypeScript: Para garantir tipagem estática e segurança no código.

## O que Você Melhoraria se Tivesse Mais Tempo

Se eu tivesse mais tempo, eu:

### Implementação de Testes End-to-End (E2E)

Para garantir que toda a aplicação funcione corretamente em um ambiente real, utilizando ferramentas como Cypress ou Playwright.

### Criação de Documentação com Storybook

Para documentar e visualizar os componentes do front-end, facilitando a colaboração entre desenvolvedores e a reutilização de componentes.

### Aprimoramento dos Testes Unitários no Front-end

Embora já tenha utilizado o Vue Test Utils e Jest, poderia expandir a cobertura de testes unitários para incluir mais cenários e casos de borda.

Essas melhorias ajudariam a aumentar a confiabilidade e a usabilidade do projeto, garantindo que a aplicação se mantenha robusta e fácil de manter à medida que evolui.

### Requisitos Obrigatórios que Não Foram Entregues

Todos os requisitos obrigatórios foram entregues, incluindo a autenticação e autorização de usuários com JWT, que era um requisito diferencial.

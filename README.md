# 📝 Notes API

API REST para gerenciamento de anotações, desenvolvida utilizando **Node.js puro**, sem frameworks como Express.

O projeto foi criado com o objetivo de praticar os fundamentos do desenvolvimento Back-end, compreender o funcionamento do protocolo HTTP e implementar operações CRUD (Create, Read, Update e Delete).

Atualmente, a API utiliza um array em memória para armazenar as anotações. A integração com **PostgreSQL** está em desenvolvimento para implementar persistência de dados.

## 🚀 Tecnologias utilizadas

- **Node.js** — Ambiente de execução JavaScript.
- **JavaScript (ES Modules)** — Linguagem utilizada no projeto.
- **HTTP nativo** — Criação do servidor sem frameworks.
- **PostgreSQL** — Banco de dados relacional em processo de integração.
- **node-postgres (`pg`)** — Biblioteca para comunicação com PostgreSQL.
- **Postman** — Testes das requisições HTTP.

## ⚙️ Funcionalidades

A API oferece as seguintes operações:

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/notes` | Lista todas as anotações |
| GET | `/notes/:id` | Busca uma anotação pelo ID |
| POST | `/notes` | Cria uma anotação |
| PATCH | `/notes/:id` | Atualiza uma anotação existente |
| DELETE | `/notes/:id` | Exclui uma anotação pelo ID |

## 📂 Estrutura do projeto

```text
notes_api/
├── index.js
├── database.js
├── package.json
├── package-lock.json
├── .env
└── .gitignore
```

O arquivo `.env` contém informações sensíveis e não deve ser enviado ao GitHub.

## 🛠️ Como executar o projeto

### Pré-requisitos

- Node.js instalado
- npm

### 1. Clone o repositório

```bash
git clone URL_DO_SEU_REPOSITORIO
```

### 2. Acesse a pasta

```bash
cd notes-api-nodejs
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor

```bash
npm start
```

A API estará disponível em:

```text
http://localhost:3000
```

**Observação:** nesta versão, as rotas ainda utilizam armazenamento em memória. A conexão com PostgreSQL está sendo implementada separadamente.

## 📌 Exemplo de requisição

### Criar uma anotação

**POST** `/notes`

Corpo da requisição:

```json
{
  "title": "O Hobbit",
  "content": "Uma aventura de Bilbo Bolseiro com Gandalf e os anões."
}
```

### Consultar as anotações

**GET** `/notes`

Retorna as anotações armazenadas durante a execução do servidor.

### Atualizar uma anotação

**PATCH** `/notes/1`

```json
{
  "title": "O Hobbit: Uma Jornada Inesperada"
}
```

É possível atualizar somente o título, somente o conteúdo ou ambos.

## 🗄️ Integração com PostgreSQL

A estrutura inicial do banco de dados já foi criada:

```sql
CREATE TABLE notes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255),
    content TEXT
);
```

O banco será utilizado para substituir o armazenamento temporário em memória.

**Status:** integração em desenvolvimento.

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, foram praticados:

- Criação de servidores utilizando o módulo `http` do Node.js.
- Manipulação de requisições e respostas HTTP.
- Implementação de rotas e métodos HTTP.
- Recebimento e processamento de dados JSON.
- Utilização de métodos de arrays, como `find()`, `findIndex()`, `push()` e `splice()`.
- Tratamento básico de registros não encontrados.
- Introdução ao SQL e ao PostgreSQL.
- Configuração de usuários e permissões de banco de dados.
- Conceitos de persistência e segurança de credenciais.

## 🔄 Próximas melhorias

- [ ] Finalizar a integração com PostgreSQL.
- [ ] Substituir o array por consultas SQL.
- [ ] Implementar validação dos dados recebidos.
- [ ] Melhorar o tratamento de erros e respostas HTTP.
- [ ] Adicionar testes automatizados.
- [ ] Organizar a aplicação em módulos.

## 👨‍💻 Autor

Desenvolvido por Kaique Moura como projeto de estudos em desenvolvimento Back-end e Engenharia de Software.
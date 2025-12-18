# 📘 Documentação da API de Enquetes (Polls API)

Bem-vindo à documentação oficial da API de Enquetes. Este sistema permite criar enquetes, gerenciar votações e autenticar usuários, com integração de moderação automática de conteúdo para garantir um ambiente seguro.

## 🛠️ Instalação e Execução

### Requisitos
* **Node.js** instalado na máquina.

### Passo a Passo

1.  **Instalação das dependências:**
    Execute o comando abaixo na raiz do projeto:
    ```bash
    npm install
    ```

2.  **Execução do servidor:**
    Inicie a aplicação com o seguinte comando:
    ```bash
    node src/app.js
    ```

---

## 📡 Rotas (Endpoints)

Abaixo estão detalhados os endpoints disponíveis na API.

> 🔒 **Autenticação:** As rotas protegidas requerem um Token JWT no Header `Authorization`.
> **Exemplo de Header:**
> `Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9uYWxkbyIsImVtYWlsIjoicm9yb0BlbWFpbC5jb20iLCJpYXQiOjE3NjU4NTMzMjh9.ECo1R545R62CXsPNq1EaEFSmUi4tf3iay7TuaJllY3Y `

### 📊 Enquetes (Polls)
**Base URL:** `/polls`

#### 1. Criar Nova Enquete
Cria uma enquete com título, descrição e opções de voto. O conteúdo é validado automaticamente.

* **Rota:** `POST /create`
* **Controller:** `create`

**Body (JSON):**
```json
{
  "title": "Qual a linguagem mais moderna?",
  "description": "Enquete sobre linguagens de programação.",
  "visibility": "PUBLIC", 
  "startAt": "2025-12-01T09:00:00Z",
  "endAt": "2025-12-10T23:59:59Z",
  "expectedVotes": 100,
  "categories": ["programming", "tech"],
  "options": [
    { "text": "JavaScript" },
    { "text": "Python" },
    { "text": "Java" }
  ]
}

```

#### 2. Encerrar Enquete

Finaliza o período de votação de uma enquete específica.

* **Rota:** `POST /:pollId/close`
* **Controller:** `updatePoll`
* **Exemplo de URL:** `http://localhost:3000/polls/b7984d82-f459-4116-a90c-3a33438a98fd/close`

#### 3. Estender Prazo

Prorroga a data de término e/ou a meta de votos de uma enquete.

* **Rota:** `POST /:pollId/extend`
* **Controller:** `updatePoll`
* **Exemplo de URL:** `http://localhost:3000/polls/b7984d82-f459-4116-a90c-3a33438a98fd/extend`

**Body (JSON):**

```json
{
  "endAt": "2025-12-25T23:59:59Z",
  "expectedVotes": 200
}

```

#### 4. Votar

Registra um voto em uma opção específica.

* **Rota:** `POST /:pollId/votes`
* **Controller:** `votar`
* **Exemplo de URL:** `http://localhost:3000/polls/b7984d82-f459-4116-a90c-3a33438a98fd/votes`

**Body (JSON):**

```json
{
  "optionId": "7e4ad6b2-2f09-417f-9aa5-159455c717f6"
}

```

#### 5. Ver Resultados

Retorna as parciais e estatísticas atuais da enquete.

* **Rota:** `GET /:pollId/results`
* **Controller:** `showPartials`
* **Exemplo de URL:** `http://localhost:3000/polls/b7984d82-f459-4116-a90c-3a33438a98fd/results`

---

### 👤 Usuários (Users)

**Base URL:** `/users`

#### 1. Registrar Usuário

Cria uma nova conta no sistema.

* **Rota:** `POST /`
* **Controller:** `userController.create`

**Body (JSON):**

```json
{
  "name": "ronaldo roig",
  "cpf": "04134650046",
  "email": "roro@email.com",
  "password": "1234"
}

```

#### 2. Autenticação (Login)

Realiza o login e retorna o token de acesso (JWT).

* **Rota:** `POST /auth`
* **Controller:** `authController.login`

**Body (JSON):**

```json
{
  "email": "roro@email.com",
  "password": "1234"
}

```

#### 3. Perfil do Usuário

Retorna os dados do usuário logado (necessita Header de Autorização).

* **Rota:** `GET /profile`
* **Controller:** `userController.getProfile`

---

## 🛡️ Segurança e Moderação de Conteúdo

O sistema possui uma integração obrigatória com uma **API Externa de Detecção de Palavras Ofensivas**.

1. **Interceptação:** Antes de persistir qualquer enquete na rota `/create`, o texto (título, descrição e opções) é enviado para validação.
2. **Bloqueio:** Se a API externa identificar termos ofensivos, a criação é **abortada** e o servidor retorna um erro ao cliente.
* *Objetivo:* Garantir que conteúdo impróprio não chegue ao banco de dados.
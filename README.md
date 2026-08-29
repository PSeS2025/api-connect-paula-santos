# API Connect - Gestão de Usuários (MVP)

O **API Connect** é uma solução RESTful desenvolvida em Node.js e Express para o gerenciamento básico de usuários (CRUD). Este projeto foi construído como um Produto Mínimo Viável (MVP) voltado para arquiteturas de software leves, utilizando persistência simulada em memória RAM e identificadores únicos universais (UUID).

---

## 🚀 Tecnologias Utilizadas

- **Node.js** (v24+) - Ambiente de execução JavaScript do lado do servidor.
- **Express.js** (v4.19+) - Framework web para roteamento e tratamento de requisições HTTP.
- **Node Crypto (`node:crypto`)** - Módulo nativo para geração de UUIDs RFC 4122.
- **CORS** - Middleware para controle de acesso às rotas HTTP.
- **Thunder Client / VS Code** - Cliente HTTP para execução e validação dos testes automatizados.

---

## 🏛️ Arquitetura do Projeto

A aplicação adota o padrão de arquitetura em 3 camadas (Controller, Routes, Data), garantindo baixo acoplamento e separação clara de responsabilidades:

```text
meu-primeiro-servidor/
├── src/
│   ├── controllers/
│   │   └── userController.js    # Regras de negócio, validações e retornos HTTP
│   ├── data/
│   │   └── userData.js          # Estrutura de persistência em memória (RAM)
│   └── routes/
│       └── userRoutes.js        # Mapeamento dos endpoints e verbos HTTP
├── server.js                    # Ponto de entrada da aplicação e middlewares
├── package.json                 # Dependências e scripts do projeto
└── .gitignore                   # Exclusão do node_modules e arquivos locais

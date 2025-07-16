# API - Calculadora de Comissões

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express)
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render)

API RESTful desenvolvida para realizar cálculos complexos de comissões de vendas, baseada em um conjunto de regras de negócio específicas da empresa. Este projeto serve como o backend para a ferramenta interna de comissões e é o ponto de partida para um sistema de gestão de vendas mais robusto.

---

## 📋 Tabela de Conteúdos

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Começando](#-começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Uso da API](#-uso-da-api)
- [Roteiro do Projeto](#-roteiro-do-projeto-roadmap)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O objetivo desta API é automatizar e padronizar o cálculo de comissões, eliminando erros manuais e fornecendo clareza sobre os valores a serem recebidos pelos vendedores. A lógica de negócio implementada lida com diferentes faixas de comissão e regras de adiantamento sobre a entrada da venda.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Backend:** Node.js, Express.js
- **Hospedagem:** Render
- **Utilitários:** Cors, Dotenv

---

## 🏁 Começando

Siga estas instruções para obter uma cópia do projeto em funcionamento na sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Você precisa ter o Node.js (versão 18.x ou superior) e o npm instalados em sua máquina.

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

### Instalação

1.  **Clone o repositório:**
    ```sh
    git clone [https://github.com/lucasstuker/calculadora-backend.git](https://github.com/lucasstuker/calculadora-backend.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```sh
    cd api-calculadora-comissoes
    ```
3.  **Instale as dependências:**
    ```sh
    npm install
    ```
4.  **Configure as variáveis de ambiente:**
    - Crie um arquivo `.env` na raiz do projeto.
    - Adicione a seguinte variável, que define a porta em que o servidor irá rodar:
      ```
      PORT=3001
      ```
5.  **Inicie o servidor:**
    ```sh
    npm start
    ```
    O servidor estará disponível em `http://localhost:3001`.

---

## 🔌 Uso da API

A API possui um endpoint principal para realizar os cálculos.

### Calcular Comissão

Realiza o cálculo da comissão com base nos dados da venda.

- **URL:** `/api/calculate`
- **Método:** `POST`
- **Body (corpo da requisição):**

| Parâmetro            | Tipo    | Descrição                                |
| -------------------- | ------- | ------------------------------------------ |
| `valor_plano`        | `Number`| O valor total do plano vendido.           |
| `valor_entrada`      | `Number`| O valor pago como entrada pelo cliente.    |
| `percentual_comissao`| `Number`| O percentual de comissão do vendedor (ex: 30 para 30%). |
| `numero_parcelas`    | `Number`| O número de parcelas do restante.          |

- **Exemplo de Requisição:**

```json
{
    "valor_plano": 5000,
    "valor_entrada": 1000,
    "percentual_comissao": 30,
    "numero_parcelas": 10
}
```

- ✅ **Resposta de Sucesso (200 OK):**

```json
{
    "comissao_total": 1500,
    "entrada_vendedor": 420,
    "saldo_comissao_a_receber": 1080,
    "comissao_por_parcela": 108
}
```

- ❌ **Resposta de Erro (400 Bad Request):**

```json
{
    "error": "Todos os campos são obrigatórios."
}
```

---

## 🗺️ Roteiro do Projeto (Roadmap)

- [x] Estrutura inicial da API de cálculo de comissão.
- [x] Lógica de cálculo implementada no controller.
- [x] Deploy da API na plataforma Render.
- [ ] Criação do frontend para consumir a API.
- [ ] Integração com banco de dados (ex: PostgreSQL) para persistir dados.
- [ ] Criação de rotas CRUD para Vendedores e Vendas.
- [ ] Adicionar sistema de autenticação e autorização (JWT).

---



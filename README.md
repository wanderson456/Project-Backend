# Projeto Backend
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
## Sobre o Projeto

Este projeto é um backend para uma aplicação de e-commerce, construído com Node.js e Sequelize,Express e Jsonwebtoken . Ele fornece uma API RESTful para gerenciar produtos, categorias, e opções de produtos, permitindo operações CRUD completas. O projeto também oferece funcionalidades como busca com paginação e filtros, além de relacionamentos entre tabelas de produtos, categorias e imagens.

## Funcionalidades
- CRUD de usuarios
- CRUD de produtos
- CRUD de categorias
- CRUD de imagens 
- CRUD de opções de produtos
- Busca com filtros, paginação e ordenação
- Autenticação e geração de tokens JWT

## Tecnologias Utilizadas
- **Node.js** - Runtime de JavaScript para construir a API.
- **Express.js** - Framework web utilizado para construir o servidor.
- **Sequelize** - ORM para modelagem de dados e manipulação de banco de dados.
- **MySQL** - Sistema de gerenciamento de banco de dados utilizado.
- **dotenv** - Carregar variáveis de ambiente a partir de um arquivo .env.
- **jsonwebtoken (JWT):** - Para autenticação e geração de tokens.

## Estrutura do Projeto

```
├── config/
│   ├── connection.js-----------------------# Configuração da conexão com o banco de dados
├── controllers/
│   ├── ProductController.js----------------# Controlador para gerenciar produtos
│   ├── ProductCategoryController.js--------# Controlador para gerenciar categorias de produtos
│   ├── ProductImagesController.js----------# Controlador para gerenciar imagens de produtos
│   ├── ProductOptionsController.js---------# Controlador para gerenciar opções de produtos
│   ├── AuthController.js-------------------# Controlador para autenticação
│   ├── UserController.js-------------------# Controlador para gerenciar usuários
├── models/
│   ├── CategoryModel.js--------------------# Modelo de Categoria
│   ├── ProductImagesModel.js---------------# Modelo de Imagens de Produto
│   ├── ProductOptionsModel.js--------------# Modelo de Opções de Produto
│   ├── ProductCategoryModel.js-------------# Modelo de Relacionamento Produto-Categoria
│   ├── ProductsModel.js--------------------# Modelo de Produto
├── routes/
│   ├── ProductRoutes.js--------------------# Rotas para produtos
│   ├── ProductCategoryRoutes.js------------# Rotas para categorias de produtos
│   ├── ProductImagesRoutes.js--------------# Rotas para imagens de produtos
│   ├── ProductOptionsRoutes.js-------------# Rotas para opções de produtos
│   ├── AuthRoutes.js-----------------------# Rotas para autenticação
│   ├── UserRoutes.js-----------------------# Rotas para usuários
├── .env------------------------------------# Variáveis de ambiente
├── package.json----------------------------# Arquivo de dependências e scripts do Node.js
└── README.md-------------------------------# Documentação do projeto
```

# Instalação e Configuração
## Pré-requisitos
- Node.js (versão 14 ou superior)
- MySQL

## Passos para Configuração
```bash
git clone https://github.com/wanderson456/Project-Backend.git
cd Project-Backend
```
## Instale as dependências
```bash
npm install
```
## Configure as variáveis de ambiente:
No arquivo connection.js faça as seguintes alterações:
```bash
dialect= mysql
database=nome_do_banco
port=3306
host=localhost
username=root
password=sua_senha

```

## Crie o banco de dados:

```bash
CREATE DATABASE nome_do_banco; 
```

## Crie  sua chave secreta 
no arquivo .env voce cria sua chave secreta , se preferir pode as informaçoes das variaveis de ambiente nesse aquivo e usar como variavel no connection.js
```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=nome_do_banco
DB_DIALECT=mysql
APP_KEY_TOKEN=sua_chave_secreta
```
Caso faça isso seu aquivo connection.js deve ficar assim:
```bash
dialect= DB_DIALECT
database=DB_NAME
port=3306
host=DB_HOST
username=DB_USER
password=DB_PASS

```
## Execute as migrações:
```bash
node database/sync.force.js
```
## Rodando o Projeto
```bash
npm start
```
O servidor estará disponível em http://localhost:3000.

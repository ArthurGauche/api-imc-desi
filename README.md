# API REST - Monitoramento de Temperaturas

## 1. Sobre o Projeto

Este projeto consiste no desenvolvimento de uma API REST utilizando Node.js, Express e MySQL, com o objetivo de registrar, consultar, atualizar e excluir medições de temperatura.

A API realiza conversões entre Celsius (°C) e Fahrenheit (°F), além de classificar as temperaturas como Frio, Ameno ou Quente.

## 2. Tecnologias Utilizadas

- Node.js: execução do JavaScript no servidor.
- Express: criação das rotas da API.
- MySQL: armazenamento dos dados.
- mysql2: conexão com o banco de dados.
- dotenv: configuração das variáveis de ambiente.
- Nodemon: reinicialização automática do servidor durante o desenvolvimento.

## 3. Estrutura do Banco de Dados

Banco de dados: `monitoramento_db`

Tabela: `medicoes`

| Campo | Descrição |
|---|---|
| id | Identificador da medição |
| descricao | Descrição da medição |
| tipo | Tipo de medição |
| valor_original | Temperatura informada |
| unidade_original | Unidade original |
| valor_convertido | Resultado da conversão |
| unidade_convertida | Unidade convertida |
| classificacao | Classificação da temperatura |
| criado_em | Data de criação do registro |

## 4. Instalação e Configuração

Primeiro, instale as dependências do projeto:

```bash
npm install
```

Crie um arquivo `.env` na pasta principal do projeto e configure:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=monitoramento_db
```

O arquivo `db.js` utiliza essas informações para realizar a conexão com o MySQL.

Para iniciar o servidor, utilize:

```bash
npm run dev
```

A API ficará disponível em:

`http://localhost:3000`

## 5. Conversão de Temperatura

A API realiza conversões entre duas unidades:

- Celsius para Fahrenheit.
- Fahrenheit para Celsius.

A classificação é realizada utilizando a temperatura em Celsius:

- Frio: abaixo de 15 °C.
- Ameno: de 15 °C até abaixo de 30 °C.
- Quente: 30 °C ou mais.

Os cálculos são realizados no backend, e os resultados são armazenados no banco de dados.

## 6. Rotas da API (CRUD)

| Método | Rota | Função |
|---|---|---|
| GET | `/medicoes` | Listar todas as medições |
| GET | `/medicoes/:id` | Buscar medição por ID |
| POST | `/medicoes` | Cadastrar uma medição |
| PUT | `/medicoes/:id` | Atualizar uma medição |
| DELETE | `/medicoes/:id` | Excluir uma medição |

### 6.1 POST - Cadastrar Medição

Método: `POST`

URL: `http://localhost:3000/medicoes`

Body (JSON):

```json
{
  "descricao": "Temperatura da sala",
  "tipo": "Ambiente",
  "temperatura": 25,
  "unidade": "C"
}
```

Resposta esperada (201 Created):

```json
{
  "id": 1,
  "descricao": "Temperatura da sala",
  "tipo": "Ambiente",
  "valor_original": 25,
  "unidade_original": "C",
  "valor_convertido": 77,
  "unidade_convertida": "F",
  "classificacao": "Ameno"
}
```

### 6.2 GET - Listar Medições

Método: `GET`

URL: `http://localhost:3000/medicoes`

Retorna todas as medições cadastradas no banco de dados.

### 6.3 GET - Buscar Medição por ID

Método: `GET`

URL: `http://localhost:3000/medicoes/1`

Retorna os dados de uma medição específica.

Se o registro não existir, retorna o status `404 Not Found`.

### 6.4 PUT - Atualizar Medição

Método: `PUT`

URL: `http://localhost:3000/medicoes/1`

Body (JSON):

```json
{
  "descricao": "Temperatura do quarto",
  "tipo": "Ambiente",
  "temperatura": 35,
  "unidade": "C"
}
```

Resposta esperada:

```json
{
  "mensagem": "Medição atualizada com sucesso"
}
```

A API atualiza os dados e realiza novamente a conversão e a classificação da temperatura.

### 6.5 DELETE - Excluir Medição

Método: `DELETE`

URL: `http://localhost:3000/medicoes/1`

Exclui uma medição específica pelo seu ID.

Resposta esperada:

```json
{
  "mensagem": "Medição apagada com sucesso"
}
```

## 7. Códigos de Status HTTP

| Código | Significado | Utilização |
|---|---|---|
| 200 | OK | Operação realizada com sucesso |
| 201 | Created | Medição cadastrada |
| 400 | Bad Request | Dados inválidos ou incompletos |
| 404 | Not Found | Medição não encontrada |
| 500 | Internal Server Error | Erro interno do servidor |

## 8. Considerações Finais

O projeto permite trabalhar com operações CRUD, integração com banco de dados MySQL, criação de rotas utilizando Express e conversão de unidades de temperatura.

O objetivo é desenvolver uma API organizada, capaz de armazenar e gerenciar medições de temperatura de maneira simples e eficiente.

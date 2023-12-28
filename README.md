
# Express API with JWT Authentication

Projeto criado para registrar, alterar, remover e autenticar usuarios utilizando Express, JWT( passport ) e banco de dados MySQL com cobertura de testes ( jest ).

O projeto foi construído do zero sem ajuda de boilerplates ou códigos prontos pelo principal motivo de estudo e fundamentos de todas as aplicações envolvidas, usei bibliotecas como passport para o jwt e Joi para a validação dos campos, acredito que o tempo de construção do projeto foi de 6 horas.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Docker
- Docker Compose
- Node.js
- Banco de Dados MySQL


Para clonar o projeto:

```git clone git@github.com:jeffersonoliveira-dev/api-express-jwt.git```

Siga os comandos abaixo dentro da pasta do projeto seguindo o sistema operacional que está utilizando no momento.

## Configuração do Ambiente

1. Faça uma cópia do arquivo `.example.env` para `.env` e preencha as variáveis de ambiente necessárias. ( no momento o projeto está funcionando sem a necessidade, apenas customização)

2. Execute o comando Docker Compose para configurar o ambiente de banco de dados de acordo com o arquivo docker-compose.yml:

```docker-compose up -d```
ou ```docker compose up```

3. Utilize qualquer gerenciador de pacote do node para a instalação dos modulos registrados no `package.json`:

```npm install```

4. Para prosseguir com o desenvolvimento:

```npm run start:dev```

5. Para buildar:

```npm run build```

6. Para rodar os testes:

```npm run test``` ou ```npm run test:watch```


#### Estrutura das pastas:

- `src/`
  - `__test__/`
  - `controllers/`
  - `db/`
  - `helpers/`
  - `middlewares/`
  - `models/`
  - `routes/`
  - `services/`
  - `validators/`


Coisas legais para se implementar no futuro:

- [ ]  maior cobertura de teste com integração e e2e
- [ ]  pesquisa e paginação
- [ ]  melhor log de erros
- [ ]  melhor validação de campos

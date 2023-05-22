# API

Time capsule application API

## Memories  
### Requisitos Funcionais  
- [x] Deve ser possível cadastrar uma memória;  
- [x] Deve ser possível consultar uma memória;  
- [x] Deve ser possível consultar todas as memórias;  
- [x] Deve ser possível atualizar uma memória;  
- [x] Deve ser possível deletar uma memória.  

## User  
### Requisitos Funcionais  
- [x] Deve ser possível cadastrar um usuário;  
- [x] Deve ser possível autenticar um usuário. 

---

Documentação: https://documenter.getpostman.com/view/20700565/2s93m34j4C

---

### 💻 Para rodar em sua máquina, siga os passos abaixo:  

<br/>

📄 Clone o projeto em sua máquina;  

🔐 Tendo feito isso, entre na pasta do projeto e crie o arquivo .env;  

📄 Uma vez criado, ele deverá conter:  

```
# Database
DATABASE_URL="postgresql://docker:docker@localhost:5432/nlwspacetime?schema=public"

# Environment
NODE_ENV="dev"

#Server
PORT=3333

# Github
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Github web
GITHUB_WEB_CLIENT_ID="123456789"
GITHUB_WEB_CLIENT_SECRET="123456789"

# Github mobile
GITHUB_MOBILE_CLIENT_ID="123456789"
GITHUB_MOBILE_CLIENT_SECRET="123456789"

# Secret
JWT_SECRET="secret"

# Request
REQUEST_PROTOCOL="http"
REQUEST_HOSTNAME="localhost"

# AWS
AWS_REGION=""
AWS_BUCKET=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""

# Storage
STORAGE_PROVIDER="s3"
```
💡 Lembre-se de atualizar as variáveis com base em suas configurações.  

📂 Em seguinda, abra o terminal na pasta do projeto e rode o seguinte comando:  

```shell
docker compose up
 ```

⌨ Após, será necessário instalar as dependências, então execute em seu terminal:  

```shell
npm install
```

🌎 Em seguida, rode as migrations usando:  

```shell
npx prisma migrate deploy
```

📡 Com tudo pronto, será possível acessar a aplicação usando:  

```text
http://localhost:3333
```

🧪 Caso queira executar os testes unitários, use:  

```shell
npm run test
```

🧪 Caso queira executar os testes E2E, use:  

```shell
npm run test:e2e
```

---

## Stack

- TypeScript
- Node.js
- PostgreSQL
- Fastify
- Prisma ORM
- Zod
- Vitest
- Supertest
- Axios
- AWS S3
- AWS EC2
- Nginx
- PM2

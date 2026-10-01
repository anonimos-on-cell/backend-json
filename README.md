###

## API de usuários

Inicie o servidor com `npm start`. A API fica disponível em `http://localhost:3000`.

Para listar todos os usuários, faça `GET /users`.

Para cadastrar um usuário, faça `POST /users` com `Content-Type: application/json` e envie:

```json
{
  "nome": "Maria",
  "email": "maria@example.com",
  "telefone": "(11) 99999-9999"
}
```

O cadastro retorna o usuário criado, incluindo `id` e `criadoEm`. Os dados ficam em `data/users.json`.

Pra criar o package.json

PS C:\Users\Aluno.CEPFSsktop\projeto\backend-json>npm init -y
Wrote to C:\Users\Aluno.CEPFSII047699\Desktop\projeto\backend-json\package.json:

{
"name": "backend-json",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "",
"license": "ISC",
"type": "commonjs"
}

###

baixar o express cors

PS C:\Users\Aluno.CEPFSII047699\Desktop\projeto\backend-json> npm install express cors

added 70 packages, and audited 71 packages in 3s

29 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities

###

PS C:\Users\Aluno.CEPFSII047699\Desktop\projeto\backend-json> mkdir data

    Diretório: C:\Users\Aluno.CEPFSII047699\Desktop\projeto\backend-json

Mode LastWriteTime Length Name

---

d----- 28/09/2026 19:56 data

###

crie um arquivo: users.json na pasta data

###

se de serto
try{}

###

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Define o caminho absoluto para a pasta 'data' e o ficheiro 'users.json'
const DATA_FILE = path.resolve('data', 'users.json');

// Garante que a pasta 'data' existe antes de o servidor começar a trabalhar
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
fs.mkdirSync(dataDir, { recursive: true });
}

// Middlewares
app.use(cors());
app.use(express.json());

// Função para ler os utilizadores do ficheiro
async function readUsers() {
try {
const data = await fs.promises.readFile(DATA_FILE, 'utf-8');
return JSON.parse(data || '[]');
} catch (error) {
// Se o ficheiro não existir, cria um novo com um array vazio
await fs.promises.writeFile(DATA_FILE, JSON.stringify([], null, 2));
return [];
}
}

// Função para escrever os utilizadores no ficheiro
async function writeUsers(users) {
await fs.promises.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

// ROTA 1: Listar utilizadores (GET)
app.get('/users', async (req, res) => {
try {
const users = await readUsers();
res.json(users);
} catch (error) {
res.status(500).json({ error: 'Erro ao carregar dados' });
}
});

// ROTA 2: Criar utilizador (POST) -> Adicionada para usar a função writeUsers
app.post('/users', async (req, res) => {
try {
const newUser = req.body; // Recebe o utilizador enviado pelo frontend
const users = await readUsers(); // Lê a lista atual

        users.push(newUser); // Adiciona o novo utilizador ao array
        await writeUsers(users); // Guarda a lista atualizada no ficheiro

        res.status(201).json({ message: 'Utilizador criado com sucesso!', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao guardar dados' });
    }

});

// Inicia o servidor na porta 3000
app.listen(PORT, () => {
console.log(`Servidor a correr em http://localhost:${PORT}`);
});

###

PS C:\Users\Aluno.CEPFSII047699\Desktop\projeto\backend-json> npm run test
Debugger attached.

> backend-json@1.0.0 test
> echo "Error: no test specified" && exit 1

"Error: no test specified"
Waiting for the debugger to disconnect...
PS

###

C:\Users\Aluno.CEPFSII047699\Desktop\projeto\backend-json> npm install
Debugger attached.

up to date, audited 71 packages in 2s

29 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
Waiting for the debugger to disconnect...

###

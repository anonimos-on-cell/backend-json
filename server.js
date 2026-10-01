import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const app = express();
const PORT = 3000;
const DATA_FILE = path.resolve('data', 'users.json');4

app.use(cors());
app.use(express.json());


// Primeiro, você precisa importar o módulo fs do Node.js para ler e escrever arquivos. Em seguida, você pode criar funções assíncronas para ler e escrever os dados dos usuários no arquivo JSON. Aqui está um exemplo de como essas funções podem ser implementadas:
async function readUsers() {
    try{
        const data = await fs.promises.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
        return [];
    }
};


// segundo, você pode criar uma função assíncrona para escrever os dados dos usuários no arquivo JSON. Aqui está um exemplo de como essa função pode ser implementada:
async function writeUsers(users) {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
};


// quarto, você pode criar rotas para lidar com as requisições HTTP. Aqui está um exemplo de como as rotas podem ser implementadas:
app.get('/users', async (req, res) => {
    try{
        const users = await readUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao Carregar dados' });
    }
});

app.get('/users/:id', async (req, res) => {
    const {id} = req.params;
    const users = await readUsers();
    const user = users.find(u => u.id === id);
    try {
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } 
        res.json(user);
    } 
    catch (error) {
        res.status(500).json({ error: 'Erro ao consultar usuário' });
    }
});


app.post('/users', async (req, res) => {
    try{
        const { nome, email, telefone } = req.body;

        if (!nome || !email || !telefone) {
            return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios' });
        }

        const users = await readUsers();
        const novoUsuario = {
            id: crypto.randomUUID(),
            nome,
            email,
            telefone,
            criadoEm: new Date().toISOString(),
        };

        users.push(novoUsuario);
        await writeUsers(users);

        res.status(201).json(novoUsuario);
    }catch (err) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// process.env.PORT || PORT;

// app.use(bodyParser.json());
// app.use(cors());
// dotenv.config();


// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import routes from './routes/index.js';
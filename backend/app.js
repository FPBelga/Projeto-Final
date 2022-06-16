require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const porta = process.env.PORTA;
const app = express();

app.use(cors());
app.use(express.json())
app.use(routes);
app.get('/', (req, res) => {
    res.send("Api de controle de listagem de professores está em funcionamento!");
});

console.log('Rodar o backend com o comando -> "nodemon app.js"');
app.listen(porta, () => console.log(`Api rodando na porta ${porta}`));
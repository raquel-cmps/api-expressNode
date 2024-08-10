const express = require('express');
const axio = require('axios');

const app = express();
const port = 3000;

const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/rota', (req, res) => {
    res.send('rota teste');
});

app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep;

    try {
        let valid = cepRegex.test(cep);
        if (!valid) {
            return res.status(400).send('CEP inválido');
        }
        const response = await axio.get(`https://viacep.com.br/ws/${cep}/json/`);
        res.json(response.data);
    }
    catch (error) {
        console.error("Erro ao consultar CEP: ", error);
        res.status(500).send('Erro ao consultar CEP');
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
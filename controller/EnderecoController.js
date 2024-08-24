const { Endereco } = require('../models');

exports.createEndereco = async (req, res) => {
    try {
        const { Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE } = req.body;

        const novoEndereco = await Endereco.create({
            Cep,
            Logradouro,
            Numero,
            Complemento,
            Bairro,
            Cidade,
            Estado,
            MunicipioIBGE
        });

        res.status(201).json(novoEndereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar endereço', details: error.message });
    }
};

exports.getAllEnderecos = async (req, res) => {
    try {
        const enderecos = await Endereco.findAll();

        res.status(200).json(enderecos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar endereços', details: error.message });
    }
}

exports.getEnderecoById = async (req, res) => {
    try {
        const { Id } = req.params;

        const endereco = await Endereco.findByPk(Id);

        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado' });
        }

        res.status(200).json(endereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar endereço', details: error.message });
    }
};

exports.updateEndereco = async (req, res) => {
    try {
        const { Id } = req.params;
        const { Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE } = req.body;

        const endereco = await Endereco.findByPk(Id);

        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado' });
        }

        endereco.Cep = Cep;
        endereco.Logradouro = Logradouro;
        endereco.Numero = Numero;
        endereco.Complemento = Complemento;
        endereco.Bairro = Bairro;
        endereco.Cidade = Cidade;
        endereco.Estado = Estado;
        endereco.MunicipioIBGE = MunicipioIBGE;

        await endereco.save();

        res.status(200).json(endereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar endereço', details: error.message });
    }
};

exports.deleteEndereco = async (req, res) => {
    try {
        const { Id } = req.params;

        const endereco = await Endereco.findByPk(Id);

        if (!endereco) {
            res.status(404).json({ error: 'Endereço não encontrado' });
        }

        await endereco.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar endereço', details: error.message });
    }
};

exports.recebeCep = async (req, res) => {
    try {
        const { cep } = req.params; // Obtém o CEP da URL

        // Chama a função de consulta do CEP
        const endereco = await consultaCep(cep);

        // Desestrutura as informações do endereço
        const {
            cep: Cep,
            logradouro: Logradouro,
            complemento: Complemento,
            bairro: Bairro,
            localidade: Cidade,
            uf: Estado,
            ibge: MunicipioIBGE
        } = endereco;

        // Cria um novo endereço no banco de dados
        const novoEndereco = await Endereco.create({
            Cep,
            Logradouro,
            Numero: 130,  // Certifique-se de que o número está sendo enviado no corpo da requisição
            Complemento,
            Bairro,
            Cidade,
            Estado,
            MunicipioIBGE
        });

        // Retorna o novo endereço criado
        res.status(201).json(novoEndereco);
    } catch (error) {
        // Loga o erro no console
        console.error('Erro ao criar o endereço', error);

        // Retorna uma resposta de erro ao cliente
        res.status(500).json({ error: 'Erro ao criar o endereço', details: error.message });
    }
};


exports.buscarCep = async (req, res) => {
    const cep = req.params.cep;

    try {
        const data = await consultaCep(cep); // Chama a função consultaCep
        res.status(200).json(data);
    } catch (error) {
        console.error('Error making the request', error);
        res.status(500).send(error.message);
    }
};

// Função para validar e consultar o CEP
const axios = require('axios');
async function consultaCep(cep) {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/; // Regex para validar o CEP

    let valid = cepRegex.test(cep);
    if (!valid) {
        throw new Error('Invalid CEP');
    }

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
}
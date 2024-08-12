const { Model, DataTypes } = require("sequelize");

class Endereco extends Model { }

Endereco.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]{5}-?[0-9]{3}$/
        }
    },
    logradouro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ibge: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
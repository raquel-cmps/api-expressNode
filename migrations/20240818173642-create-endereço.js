'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('enderecos', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Cep: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Logradouro: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Complemento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Bairro: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Cidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Estado: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('enderecos');
  }
};
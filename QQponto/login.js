
const Sequelize = require('sequelize');
const database = require('./db');

const Colaboradores = database.define('colaboradore', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  matricula: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gestor: {
    type: Sequelize.BOOLEAN
  },
  status: {
    type: Sequelize.BOOLEAN
  },

})


//Colaboradores.sync({ force: true });
module.exports = Colaboradores;

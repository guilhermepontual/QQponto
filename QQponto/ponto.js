const Sequelize = require('sequelize');
const database = require('./db');
const Colaboradores = require('./login');

const Ponto = database.define('ponto', {
  dataPonto: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  ponto_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tipo_ponto: {
    type: Sequelize.STRING,
    allowNull: false
  },
  observacao: {
    type: Sequelize.STRING(1000),
    allowNull: false
  }
})

Ponto.belongsTo(Colaboradores)
//Ponto.sync({ force: true });

module.exports = Ponto;
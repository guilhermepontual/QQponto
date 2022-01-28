const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://geli:q53LmHzg@qqtech-1.crqc50gxdjpu.sa-east-1.rds.amazonaws.com:5432/geli', {

  dialect: 'postgres',
  timezone: '-03:00'
})


module.exports = sequelize;
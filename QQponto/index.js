//index.js
(async () => {

  const database = require('./db');
  const Colaboradores = require('./login');
  await database.sync();

  const resultadoCreate = await Colaboradores.create({
    matricula: '980090',
    nome: 'Guilherme Pontual',
    senha: 'gui123',
    gestor: false,
    status: true,
  })
  console.log(resultadoCreate)

  /* const resultadoCreate = await Colaboradores.create({
     matricula: '980000',
     nome: 'Marcos Silva',
     senha: 'adm123',
     gestor: true,
     status: true,
   })
   console.log(resultadoCreate)*/

  try {
    const resultado = await sequelize.sync();
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
})();




//adm
/*
(async () => {
  const database = require('../../db');
  const Ponto = require('./ponto');
  await database.sync();
  const resultadoCreate = await Ponto.create({
    dataPonto: ,
    tipo_ponto: '980000',
    matriculaColaborador: 'Marcos',
  })
  console.log(resultadoCreate);
})();
*/
// Carregando módulos
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { QueryTypes } = require('sequelize');
const Ponto = require('./ponto')


// const {sequelize} = require('./db')
const Sequelize = require('sequelize');
const sequelize = require('./db')
const app = express()

// body parser - Auth Login
const session = require('express-session');
const { response } = require('express')
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));



//Dados do login

//bodyParses middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));



//Rotas do tipo GET inicio

app.get('/', (request, response) => {
  response.sendFile(__dirname + "/public/login.html");
});

app.get('/registrarPonto', (request, response) => {
  response.sendFile(__dirname + "/public/ponto.html");
});

app.get('/pontoEntrada', (request, response) => {
  response.sendFile(__dirname + "/public/pontoEntrada.html");
});

app.get('/pontoSaida', (request, response) => {
  response.sendFile(__dirname + "/public/pontoSaida.html");
});

app.get('/botaoAtivar', (request, response) => {
  response.sendFile(__dirname + "/public/ativarMatricula.html")
});

app.get('/botaoDesativar', (request, response) => {
  response.sendFile(__dirname + "/public/desativarMatricula.html")
});

app.get('/editarPonto', (request, response) => {
  response.sendFile(__dirname + "/public/editarPonto.html")
});


//Apagar ponto
app.get('/delPonto/:ponto_id', function (req, res) {
  Ponto.destroy({
    where: { 'ponto_id': req.params.ponto_id }
  }).then(function () {
    res.redirect('/historico')
    //res.send("Ponto apagado com sucesso!")
  }).catch((erro) => {
    res.send("Ponto não apagado com sucesso :/");
  })
});

app.get("/updatePonto/:ponto_id", (req, res) => {
  Ponto.findOne({ _ponto_id: req.body.ponto_id }).then((Ponto) => {
    res.render("editarPonto.html", { Ponto: Ponto });
  }).catch((err) => {
    res.send("Este ponto não existe")
    res.redirect("/historico")
  })
})



/*app.get('/dashboard', (req, res) => {
  res.render('public/dashboard');
})*/

//Rotas para o tipo POST
app.post('/', (req, res) => {
  res.redirect('/dashboard');
})

app.post('/registrarPonto', (req, res) => {
  res.redirect('/pontoEntrada');
})

app.post("/editPonto", (req, res) => {
  Ponto.findOne({ _ponto_id: req.body.ponto_id }).then((Ponto) => {

    Ponto.tipo_ponto = req.body.tipo_ponto
    Ponto.observacao = req.body.observacao

    categoria.save().then(() => {
      //res.send("Ponto editado com sucesso!")
      res.redirect("/historico")
    }).catch((err) => {
      res.send("erro ao editar ponto!")
      res.redirect('/historico')
    })

  }).catch((err) => {
    res.send("Houve um erro ao editar o ponto")
    res.redirect('/historico')
  })
})


// Rota do tipo post para o resumo historico
app.post('/historicoTabela', async (req, res) => {
  const historico = await sequelize.query(`select extract ('day' from "dataPonto") as dia, 
  extract ('month' from "dataPonto") as mes, extract ('year' from "dataPonto") as ano, 
  extract ('hours' from "dataPonto") as horas, extract('minutes' from "dataPonto")
  as minutos, observacao, tipo_ponto, ponto_id from public.pontos WHERE "colaboradoreMatricula" = '${matricula}' AND extract 
  ('month' from "dataPonto") = extract ('month' from current_timestamp) AND extract ('year' from "dataPonto") = extract ('year' from current_timestamp) order by "dataPonto"`);
  res.json(historico[0])
  console.log(historico[0])
})


app.post('/horasTotais', async function (req, res) {
  const horas = await sequelize.query(`select (select sum (extract (epoch from "dataPonto")) from public.pontos where tipo_ponto = 'Saída' and "colaboradoreMatricula" = '${matricula}' and extract('month' from "dataPonto") = extract(month from current_timestamp) and  extract('year' from "dataPonto") = extract('year' from current_timestamp))
   - (select sum (extract (epoch from "dataPonto")) 
   from public.pontos where tipo_ponto = 'Entrada' and "colaboradoreMatricula" = '${matricula}' and extract('month' from "dataPonto") = extract(month from current_timestamp) and  extract('year' from "dataPonto") = extract('year' from current_timestamp)) as seconds`)
  res.json(horas[0][0])
  console.log(horas[0][0])
})


//Outros
const port = 3000

app.listen(port, () => {
  console.log(`Servidor pegando! http://localhost:${port}`)
})




// sistema colaborador

app.get('/dashboard', (req, res) => {
  if (req.session.loggedin) {
    if (results[0].gestor) {
      res.sendFile(__dirname + '/public/dashboard-admin.html')
    } else {
      res.sendFile(__dirname + '/public/dashboard.html');
    }
    console.log(`Sua matricula: ${matricula}`);
  } else {
    res.redirect('/')
  }
})

app.get('/historico', (req, res) => {
  if (req.session.loggedin) {
    if (results[0].adm) {
      res.sendFile(__dirname + '/public/adm/dashboard-admin.html')
    } else {
      res.sendFile(__dirname + '/public/historico.html')
    }
  } else {
    res.redirect('/')
  }
})

app.get('/relatorio', (req, res) => {
  if (req.session.loggedin) {
    if (results[0].adm) {
      res.sendFile(__dirname + '/public/adm/dashboard-admin.html')
    } else {
      res.sendFile(__dirname + '/public/relatorio.html')
    }
  } else {
    res.redirect('/')
  }
})

app.get('/registrarPonto', (req, res) => {
  if (req.session.loggedin) {
    if (results[0].adm) {
      res.sendFile(__dirname + '/public/adm/dashboard-admin.html')
    } else {
      res.sendFile(__dirname + '/public/ponto.html')
    }
  } else {
    res.redirect('/')
  }
})


// logout 
app.get('/logout', (req, res) => {
  console.log('logout efetuado!')
  req.session.loggedin = false
  res.redirect('/')
})


// registrar ponto entrada / saída 
var matricula = ''
app.post('/pontoEntrada', (req, res) => {
  console.log(matricula, 'está é a matricula')
  Ponto.create({
    colaboradoreMatricula: matricula,
    dataPonto: req.body.pontoEntrada,
    tipo_ponto: 'Entrada',
    observacao: '',

  })
  res.redirect('/pontoEntrada')
  console.log('Bater ponto ENTRADA: Acionado!')
})


app.post('/pontoSaida', (req, res) => {
  Ponto.create({
    colaboradoreMatricula: matricula,
    dataPonto: req.body.pontoSaida,
    tipo_ponto: 'Saída',
    observacao: '',

  })
  res.redirect('/pontoSaida')
  console.log('Bater ponto SAÍDA: Acionado!')
})


// ADM
app.post('/botaoDesativar', async (req, res) => {
  await sequelize.query(`UPDATE public.colaboradores SET status = false WHERE matricula = '${req.body.matriculaDesativada}'`)
  console.log('Colaborador: DESATIVADO!')
  res.redirect('/botaoDesativar')
})

app.post('/botaoAtivar', async (req, res) => {
  await sequelize.query(`UPDATE public.colaboradores SET status = true WHERE matricula = '${req.body.matriculaAtivada}'`)
  console.log('Colaborador: ATIVADO!')
  res.redirect('/botaoAtivar')
})


// AUTHENTICATION

var results = []
app.post('/auth', async (req, res) => {
  matricula = req.body.matricula;
  const senha = req.body.senha;
  if (matricula && senha) {
    results = await sequelize.query(`SELECT * FROM public.colaboradores WHERE matricula = '${matricula}' AND senha ='${senha}' AND status = 'true'`, { type: QueryTypes.SELECT })
    console.log('resultados: ', results)
    if (results.length > 0) {
      req.session.loggedin = true;
      req.session.matricula = matricula;
      res.redirect('/dashboard');
      console.log(matricula, 'esta é a matricula')
    } else {
      res.redirect('/falhalogin');
    }
    res.end();
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

app.get('/falhalogin', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(__dirname + '/public/falhalogin.html')
  }
})

app.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(__dirname + '/public/login.html')
  }
})


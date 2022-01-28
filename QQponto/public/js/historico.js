async function reload() {

  totalHoras();

  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'month': 'month'
    })
  }

  const response = await fetch('/historicoTabela', request)

  const date = await response.json()
  console.log('teste', date)

  var historicoTabela = document.getElementById('table-historico')
  console.log(historicoTabela)
  historicoTabela.innerHTML = `    <thead>
  <tr>
    <th>
      <h1>Ponto</h1>
    </th>
    <th>
      <h1>Data</h1>
    </th>
    <th>
      <h1>Observação</h1>
    </th>
    <th>
      <h1>Id</h1>
    </th>
  </tr>
</thead>`
  date.forEach(value => {
    historicoTabela.innerHTML += `<tbody><tr><td style="background-color: #089b58;">${value.tipo_ponto}<a href="/delPonto/${value.ponto_id}"><i class="fas fa-trash">&nbsp;</i></a>
    </td><td>${value.dia}/${value.mes}/${value.ano}
      ${value.horas}:${value.minutos}</td><td>${value.observacao}</td><td>${value.ponto_id}</tr></tr></tbody>`
  });

}

async function totalHoras() {

  const request = {
    method: 'POST',
  }

  const response = await fetch('/horasTotais', request)

  const date = await response.json()
  console.log('teste', date.seconds)

  let hours = Math.floor(date.seconds / 3600); // get hours
  let minutes = Math.floor((date.seconds - (hours * 3600)) / 60); // get minutes
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }

  var horasTotais = document.getElementById("horasTotais")
  horasTotais.innerHTML = `Horas totais: ${hours} horas e ${minutes} minutos`
}


async function edit() {

  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'month': 'month'
    })
  }

  const response = await fetch('/editPonto', request)

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
  <div class="modal-bg">
    <div class="modal">
      <h2>Editar ponto</h2>
      <label for="ponto">Tipo de ponto:</label>
      <input type="text" id="ponto" name="ponto" value="">
      <label for="obs">Observação:</label>
      <input type="text" id="obs" name="observacao" value="">
      <button>Editar</button>
      <span class="modal-close">X</span>
    </div>
  </div>
</thead>`
  date.forEach(value => {
    historicoTabela.innerHTML += `<tbody><tr><td style="background-color: #089b58;">${value.tipo_ponto}<a href="/delPonto/${value.ponto_id}"><i class="fas fa-trash">&nbsp;</i></a>
    <a href="/updatePonto/${value.ponto_id}"><i class="fas fa-edit">&nbsp;</i></a></td><td>${value.dia}/${value.mes}/${value.ano}
      ${value.horas}:${value.minutos}</td><td>${value.observacao}</td><td>${value.ponto_id}</tr></tr></tbody>`
  });

}

var modalBtn = document.querySelector('#modal-btn');
var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');

modalBtn.addEventListener('click', function () {
  modalBg.classList.add('bg-active')
});
modalClose.addEventListener('click', function () {
  modalBg.classList.remove('bg-active');
});


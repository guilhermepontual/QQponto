async function totalHoras() {

  const request = {
    method: 'POST',
  }

  const response = await fetch('/horasTotais', request)

  const date = await response.json()
  console.log('teste', date)

  var horasTotais = document.getElementById("horasTotais")
  horasTotais.innerHTML = date
}


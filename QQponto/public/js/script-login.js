async function logar() {
  var matricula = document.getElementById("registration")
  var senha = document.getElementById("password")

  console.log(matricula.value + senha.value);

  if (matricula.value == "980090" && senha.value == "gui123") {
    localStorage.setItem("acesso", true);
    alert("Usuário autenticado!");
    window.location.href = "dashboard.html";
  }
  else if (matricula.value == "980000" && senha.value == "adm123") {
    localStorage.setItem("acesso", true);
    alert("Administrador autenticado!");
    window.location.href = "dashboard.html";
  }
  else {
    alert("Usuário ou senha inválidos!");
    window.location.href = "index.html";
  }
}

module.exports = logar;
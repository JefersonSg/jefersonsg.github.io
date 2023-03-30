const userAtivo = JSON.parse(localStorage.usuarioAtivo)
console.log(userAtivo.nome)
function arrumarNome() {
  const nomeLogin = document.querySelector('.nome-login');

  nomeLogin.innerText = `Olá, ${userAtivo.nome} ${userAtivo.sobrenome.slice(0, 1)}.`;
}

if (userAtivo) {
  arrumarNome()
}
const userAtivo = localStorage.usuarioAtivo ? JSON.parse(localStorage.usuarioAtivo) : []
if (!localStorage.usuarioAtivo) {
  window.open('index.html', '_top');
}
console.log(userAtivo.nome)
function arrumarNome() {
  const nomeLogin = document.querySelector('.nome-login');

  nomeLogin.innerText = `Olá, ${userAtivo.nome} ${userAtivo.sobrenome.slice(0, 1)}.`;
}

if (userAtivo) {
  arrumarNome()
}
 
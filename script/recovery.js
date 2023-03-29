const usuarios = JSON.parse(localStorage.usuarios)
const listaUser = document.querySelector('.user-recovery')

usuarios.forEach(user => {
  const div = document.createElement('li')
  div.innerText = `Usuario :${user.nomeUsuario}
  Senha : ${user.senha}`
  listaUser.appendChild(div)
});


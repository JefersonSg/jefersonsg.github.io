const botao = document.querySelector('#botaoFormulario')




const usuarios = []


function newUser(e) {
  e.preventDefault();

  const nome = document.querySelector('#nome').value
  const sobrenome = document.querySelector('#sobrenome').value
  const nomeUser = document.querySelector('#nomeUsuario').value
  const senha = document.querySelector('#senha').value


if (nome && sobrenome && nomeUser && senha) {
  const usuario = {
    nome:'',
    sobrenome:'',
    nomeUser:'',
    senha:'',
  }
  
  usuario.nome = nome
  usuario.sobrenome = sobrenome
  usuario.nomeUser = nomeUser
  usuario.senha = senha
  usuarios.push(usuario)
  
  localStorage.setItem('usuarios', JSON.stringify(usuarios))

  window.open("movimentacoes.html", '_top')

}


}
botao.addEventListener('click', newUser)




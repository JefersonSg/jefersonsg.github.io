const btnCriar = document.querySelector('#botaoFormulario');
const btnFormEntrar = document.querySelector('#botaoFormularioEntrar')

if (localStorage.usuarioAtivo) {
  window.open('movimentacoes.html', '_top');
}

let usuarios = localStorage.usuarios ? JSON.parse(localStorage.usuarios) : []
function newUser() {

  const nome = document.querySelector('#nome').value;
  const sobrenome = document.querySelector('#sobrenome').value;
  const nomeUser = document.querySelector('#nomeUsuario').value;
  const senha = document.querySelector('#senha').value;
  const teste = usuarios.find(usuario => usuario.nomeUsuario === nomeUser)
  let number = usuarios ? usuarios.length : 0
  if (!teste) {
    if (nome && sobrenome && nomeUser && senha) {
      let usuario = {
        ID: number,
        nomeUsuario: nomeUser,
        nome: nome,
        sobrenome: sobrenome,
        senha: senha,
      }
      let informacoes = {
      }
      usuarios.push(usuario)
      localStorage.setItem('usuarioAtivo', JSON.stringify(usuario))
      window.open('movimentacoes.html', '_top');
      localStorage.setItem('usuarios', JSON.stringify(usuarios))
      localStorage.setItem(`informacoes_id${number}`, JSON.stringify(informacoes))
    }
  } else { alert('Esse usuario já existe') }
}


btnCriar.addEventListener('click', newUser);
btnFormEntrar.addEventListener('click', () => {
  const nomeUser = document.querySelector('#nomeUsuarioEntrar')
  const senha = document.querySelector('#senhaEntrar')
  const nome = nomeUser.value
  const senhaDigitada = senha.value

  let user = usuarios.find(usuario => usuario.nomeUsuario === nome) 
  console.log(user)

if (user) {
  if (user.nomeUsuario === nome && user.senha === senhaDigitada) {
    localStorage.setItem('usuarioAtivo', JSON.stringify(user))
    window.open('movimentacoes.html', '_top');
  } else if (user.nomeUsuario !== nome || user.senha !== senhaDigitada){
    alert('o usuario ou senha estão errados')
  } else {alert('erro')}
} else {alert('o usuario ou senha estão errados')}
})




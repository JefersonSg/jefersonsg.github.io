const container = document.querySelector('.modal-container');
const btnConta = document.querySelector('.botao-conta');
const btnFechar = document.querySelectorAll('.fechar');
const containerEntrar = document.querySelector('.modal-container-entrar');
const btnEntrar = document.querySelector('.botao-entrar');

function abrirModal(item) {
  item.classList.add('ativo');
}
function fecharModal() {
  container.classList.remove('ativo');
  containerEntrar.classList.remove('ativo');
}
function outsideClick(e) {
  if (e.target === this) {
    fecharModal();
  }
}

if (btnConta && btnFechar) {
  btnConta.addEventListener('click', () => abrirModal(container));
  btnFechar.forEach((i) => {
    i.addEventListener('click', () => fecharModal());
  });
  container.addEventListener('click', outsideClick);
  btnEntrar.addEventListener('click', () => abrirModal(containerEntrar));
  containerEntrar.addEventListener('click', outsideClick);
}

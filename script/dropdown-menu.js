const editarBotoes = document.querySelector('.editarBotoes')
const menu = document.querySelector('.menu')

  menu.addEventListener('click',menuAtivo)

function menuAtivo(e) {
  editarBotoes.classList.toggle('ativo')
  menu.classList.toggle('ativo')
  e.stopPropagation()
  outsideClick()
}
function outsideClick() {
  const html = document.documentElement
html.addEventListener('click', handleOutsideClick)
  function handleOutsideClick(e) {
    if (!editarBotoes.contains(e.target)) {
      html.removeEventListener('click',handleOutsideClick)
      editarBotoes.classList.remove('ativo')
      menu.classList.remove('ativo')
    } else if (editarBotoes.contains(e.target) && e.target.nodeName === 'LI') {
      editarBotoes.classList.remove('ativo')
      menu.classList.remove('ativo')
    }
  }
}




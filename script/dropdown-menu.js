const editarBotoes = document.querySelector('.editarBotoes')
const menu = document.querySelector('.menu')

  menu.addEventListener('click',menuAtivo)

function menuAtivo(e) {
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
      menu.classList.remove('ativo')
    } else if (editarBotoes.contains(e.target) && e.target.nodeName === 'LI') {
      menu.classList.remove('ativo')
    }
  }
}




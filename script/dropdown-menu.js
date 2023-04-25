function initDropDownMenu(){

}

const dropDownMenu = document.querySelector('.dropDownEdit')
const editarBotoes = document.querySelector('.editarBotoes')
const menu = document.querySelector('.menu')
menu.addEventListener('click',menuAtivo)
dropDownMenu.addEventListener('click', handleClick)
dropDownMenu.addEventListener('touchstart', handleClick)

function menuAtivo(e) {
  editarBotoes.classList.toggle('ativo')
  e.stopPropagation()
  outsideClick()
}
function handleClick() {
  editarBotoes.classList.add('ativo')
  outsideClick()
}

function outsideClick(e) {
  const html = document.documentElement
html.addEventListener('click', handleOutsideClick)
  function handleOutsideClick(e) {
    if (!editarBotoes.contains(e.target)) {
      html.removeEventListener('click',handleOutsideClick)
      editarBotoes.classList.remove('ativo')
    }
  }
}


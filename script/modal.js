const btnConta = document.querySelector('.botao-conta')
const btnFechar = document.querySelector('[data-modal="fechar"]')
const container = document.querySelector('.modal-container')


if (btnConta && btnFechar && container) {
  
    function abrirModal() {
      container.classList.add('ativo')
    }

    function fecharModal() {
      container.classList.remove('ativo')
    }

    function outsideClick(e) {
      if (e.target === this) {
            fecharModal()
      }
    }

    btnConta.addEventListener('click', abrirModal)
    btnFechar.addEventListener('click',fecharModal)
    container.addEventListener('click', outsideClick)
}

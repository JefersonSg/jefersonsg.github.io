const editCategorias = document.querySelector('.editarCategorias')
const editCategoriasBg = document.querySelector('.editarCategoriasBg')
const fechar = document.querySelector('.fecharBg')


editCategorias.addEventListener('click', ()=>{
  editCategoriasBg.classList.add('ativo')
})

fechar.addEventListener('click', ()=>{
  editCategoriasBg.classList.remove('ativo')
})
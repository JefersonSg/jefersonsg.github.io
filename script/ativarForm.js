const btnForm = document.querySelectorAll('.btnForm')
const formularios = document.querySelectorAll('.transacao');


function addAtivo(item) {
  btnForm.forEach((i)=>{ if (i !== item) { i.classList.remove('ativo') } })
  item.classList.toggle('ativo')

  formularios.forEach((i)=>{  
    if (i.getAttribute('value') == item.value) {
      i.classList.toggle('ativo')
    } else {
      i.classList.remove('ativo')
    }
  })
}

btnForm.forEach((item)=>{
  item.addEventListener('click', ()=> {
    addAtivo(item)
  })
})

// remover ativo 

formularios.forEach((i,n)=>{
  const formTransacao = document.querySelectorAll('.transacao')
  const financas = formTransacao[n].querySelector('.financas')
  formTransacao[n].addEventListener('click', (event)=>  {
    const itemClicado = event.target
    if (!financas.contains(event.target)) {
      itemClicado.classList.remove('ativo')
    }
  })
})
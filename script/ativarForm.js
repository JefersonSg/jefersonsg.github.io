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
  item.addEventListener('click', ()=>{addAtivo(item)})
})
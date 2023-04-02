const perfil = document.querySelector('.sair')


perfil.addEventListener('click',()=>{
  localStorage.removeItem('usuarioAtivo')
  window.open('index.html', '_top');
})
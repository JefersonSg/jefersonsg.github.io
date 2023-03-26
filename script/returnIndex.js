const perfil = document.querySelector('.perfil-ul')


perfil.addEventListener('click',()=>{
  localStorage.removeItem('usuarioAtivo')
  window.open('index.html', '_top');
})
const resumoReceita = document.querySelector('.valorResumoReceitas')
const receitasLabel = document.querySelectorAll('#vendaLabel')
const graficoResumo = document.querySelector('.grafico-resumo-bg')

const usuarioAtiv = JSON.parse(localStorage.usuarioAtivo)
const infos = JSON.parse(localStorage.getItem(`informacoes_id${usuarioAtiv.ID}`))


const arrayResumoReceitas = infos[7]? infos[7] : []
const valoresTotais = []

// função para adicionar valor a valoresTotais

receitasLabel.forEach((receita)=>{
  const valor = receita.querySelector('#valor').innerText.replace('+R$ ','')
  valoresTotais.push(+valor)
})

arrayResumoReceitas.forEach((i)=>{
  const valores = []
  receitasLabel.forEach((receita)=>{
    const comparador = receita.querySelector('#categoria').innerText
    const valor = receita.querySelector('#valor').innerText.replace('+R$ ','')
    if (comparador === i) {
      valores.push(+valor)
    }
  })
  let valoresTotaisSomados = valoresTotais.reduce((acomulador, valorAtual) => +acomulador + valorAtual , 0,)
  if (valores.length !== 0) {

    const valorFinal = valores.reduce((acomulador, valorAtual) => +acomulador + valorAtual , 0,)




    resumoReceita.innerText = `R$ ${valoresTotaisSomados.toLocaleString('pt-BR')}`
    const porcentagem = ((valorFinal / valoresTotaisSomados) * 100).toFixed(0)
    const divCategoria = document.createElement('div')
    divCategoria.classList.add('informacoesDaCategoria')

    divCategoria.innerHTML = `
    <h4 class="nomeDaCategoria">
      ${i}
    </h4>
    <span class="graficoPorcentagem"></span>
    <span class="porcentagemNumero">${porcentagem}%</span>
    <span class="valorTotalDaCategoria">R$ ${valorFinal.toLocaleString('pt-BR')}</span>
    `
    const barraVerde = divCategoria.querySelector('.graficoPorcentagem')
    barraVerde.style.width = `${porcentagem}%`

    const id = setInterval(() => {
      valoresTotaisSomados -= 200;
      if (valorFinal > valoresTotaisSomados) {
        graficoResumo.appendChild(divCategoria)

        clearInterval(id);
      }
      if (valoresTotaisSomados < 0) {
        clearInterval(id);
      }
    }, 1);

  }
})


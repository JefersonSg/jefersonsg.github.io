const resumoReceita = document.querySelector('.valorResumoReceitas')
const receitasLabel = document.querySelectorAll('#vendaLabel')
const graficoResumo = document.querySelector('.grafico-resumo-bg')


const usuarioAtiv = JSON.parse(localStorage.usuarioAtivo)
const infos = JSON.parse(localStorage.getItem(`informacoes_id${usuarioAtiv.ID}`))


const arrayResumoReceitas = infos[7] ? infos[7] : []
const categorias = arrayResumoReceitas.map(categoria => {
  return {
    categoria,
    valores: '',
  };
})
const valoresTotais = []

// função para adicionar valor a valoresTotais

receitasLabel.forEach((receita) => {
  const Data = new Date()
  Data.setDate(Data.getDate() - 30)
  const trintaDiasAtraz = Data.toISOString().slice(0, 10)
  const dataDaReceita = receita.querySelector('#data').innerText

  if (dataDaReceita > trintaDiasAtraz) {
    const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')

    valoresTotais.push(+valor)
  }
})

// ao Click mudar as informacoes na tela por dias
function atualizaH3(dias) {
  const valoresTotais = []

  receitasLabel.forEach((receita) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const noventaDiasAtraz = Data.toISOString().slice(0, 10)
    const dataDaReceita = receita.querySelector('#data').innerText

    if (dataDaReceita > noventaDiasAtraz) {
      const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')
      valoresTotais.push(+valor)


      let valoresTotaisSomados = valoresTotais.reduce((acomulador, valorAtual) => +acomulador + valorAtual, 0,)

      resumoReceita.innerText = `R$ ${valoresTotaisSomados.toLocaleString('pt-BR')}`
    }
  })
}

function criarDivResumos(dias) {

  const divis = graficoResumo.querySelectorAll(".informacoesDaCategoria")
  console.log(divis)
  if (divis.length) {
    divis.forEach((i) => {
      i.style.display = 'none'
      i.remove()
    })
  }
  const valoresTotais = []

  const Data = new Date()
  Data.setDate(Data.getDate() - dias)
  const diasInseridos = Data.toISOString().slice(0, 10)


  // insere o valor de valoresTotais 
  receitasLabel.forEach((receita) => {
    const dataDaReceita = receita.querySelector('#data').innerText



    // separa os valores por dias
    if (dataDaReceita > diasInseridos) {
      const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')
      valoresTotais.push(+valor)
    }
  })

  receitasLabel.forEach((receita) => {
    const dataDaReceita = receita.querySelector('#data').innerText



    // separa os valores por dias
    if (dataDaReceita > diasInseridos) {
      const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')
      const comparador = receita.querySelector('#categoria').innerText
      let valoresTotaisSomados = valoresTotais.reduce((acomulador, valorAtual) => +acomulador + valorAtual, 0,)

      const itemAtual = categorias.find(categoria => categoria.categoria === comparador)

      itemAtual.valores = +valor

      const porcentagem = ((+valor / valoresTotaisSomados) * 100).toFixed(0)
      const divCategoria = document.createElement('div')
      divCategoria.classList.add('informacoesDaCategoria')

      divCategoria.innerHTML = `
      <h4 class="nomeDaCategoria">
        ${comparador}
      </h4>
      <span class="graficoPorcentagem"></span>
      <span class="porcentagemNumero">${porcentagem}%</span>
      <span class="valorTotalDaCategoria">R$ ${+valor.toLocaleString('pt-BR')}</span>
      `
      const barraVerde = divCategoria.querySelector('.graficoPorcentagem')
      barraVerde.style.width = `${porcentagem}%`


      // organizar 
      const id = setInterval(() => {
        valoresTotaisSomados -= 150;
        if (+valor > valoresTotaisSomados) {
          graficoResumo.appendChild(divCategoria)
          clearInterval(id);
        }
        if (valoresTotaisSomados < 0) {
          clearInterval(id);
        }
      }, 1);
      graficoResumo.appendChild(divCategoria)
    }
  })
  console.log(divis)
}

criarDivResumos(30)


graficoResumo.addEventListener('click', function (e) {
  const botoes = graficoResumo.querySelectorAll('.botoes-filtro')
  const botaoClicado = e.target
  //  adiciona e remove class ativo
  if (botaoClicado.classList[0] === 'botoes-filtro') {
    botaoClicado.classList.add('ativo')
    botoes.forEach((botao) => {
      if (!botao.contains(botaoClicado)) {
        botao.classList.remove('ativo')
      }
    })
  }

  // atualiza o valor do h3 
  if (botaoClicado.innerText === '7 dias') {
    atualizaH3(7)
  }
  else if (botaoClicado.innerText === '30 dias') {
    atualizaH3(30)
  } else if (botaoClicado.innerText === '90 dias') {
    atualizaH3(90)
  }

  if (botaoClicado.innerText === '7 dias') {
    criarDivResumos(7)
  }
  else if (botaoClicado.innerText === '30 dias') {
    criarDivResumos(30)
  } else if (botaoClicado.innerText === '90 dias') {
    criarDivResumos(90)
  }

  // cria as divs de resumo de receitas

})



const nomes = ['João', 'Maria', 'Pedro'];

const objetos = nomes.map(nome => {
  return {
    nome: nome,
    idade: 0,
    cidade: ''
  };
});

atualizaH3(30)

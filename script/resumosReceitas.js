const receitasLabel = document.querySelectorAll('#vendaLabel')
const graficoResumoReceita = document.getElementById('graficoReceita')
const resumoReceita = graficoResumoReceita.querySelector('.valorResumido')
const divResumos = graficoResumoReceita.querySelector('.resumosDivs')
const divs = divResumos.querySelectorAll('.informacoesDaCategoria')
const usuarioAtiv = JSON.parse(localStorage.usuarioAtivo)
const infos = JSON.parse(localStorage.getItem(`informacoes_id${usuarioAtiv.ID}`))


const arrayResumoReceitas = infos[7] ? infos[7] : []

let valoresTotais = []


// função para adicionar valor a valoresTotais
let arrayValoresColetados = []
function coletarValores(dias) {
  receitasLabel.forEach((receita) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)
    const dataDaReceita = receita.querySelector('#data').innerText

    if (dataDaReceita >= diasInseridos) {
      const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')

      valoresTotais.push(+valor)
    }
  })
}

function ValoresFiltradosPorDias(dias) {
  arrayResumoReceitas.forEach((categoria) => {
    const valores = []
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)

    receitasLabel.forEach((receita) => {
      const valor = +receita.querySelector('#valor').innerText.replace('+R$ ', '')
      const comparador = receita.querySelector('#categoria').innerText
      const dataDaReceita = receita.querySelector('#data').innerText

      if (comparador === categoria && dataDaReceita >= diasInseridos) {
        valores.push(valor)
      }
    })
    let valoresSomados = valores.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)
    arrayValoresColetados.push(valoresSomados)
  })
}

// setar os valores
function setarValores() {
  arrayValoresColetados.sort((a, b) => b - a)
  arrayValoresColetados.length = 4
  divs.forEach((div, n) => {

    const valorDiv = div.querySelector('.valorTotalDaCategoria')
    const graficoVerde = div.querySelector('.graficoPorcentagem')
    const porcentagemNumerica = div.querySelector('.porcentagemNumero')

    let valoresSomados = valoresTotais.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)
    const porcentagem = ((arrayValoresColetados[n] / valoresSomados) * 100).toFixed(0)
    valorDiv.innerText = arrayValoresColetados[n]
    graficoVerde.style.width = `${porcentagem}%`
    porcentagemNumerica.innerText = `${porcentagem}%`
  })
  arrayValoresColetados = []
  valoresTotais = []
  escondeDivZerada()

}

// inserir o nome da categoria na div]


function inserirCategoriaNaDiv(dias) {
  let valores = []
  let numero = 0

  arrayResumoReceitas.forEach((categoria) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)
    receitasLabel.forEach((receita) => {
      const dataDaReceita = receita.querySelector('#data').innerText
      const comparador = receita.querySelector('#categoria').innerText
      const valor = +receita.querySelector('#valor').innerText.replace('+R$ ', '')


      if (comparador === categoria && dataDaReceita > diasInseridos) {
        valores.push(valor)
      }
    })

    let valoresTotais = valores.reduce((acomulador, valoresTotais) => +acomulador + valoresTotais, 0,)

    if (valoresTotais !== 0) {

      const nomePraAlterar = graficoResumoReceita.querySelectorAll('.nomeDaCategoria')

      if (nomePraAlterar[numero]) {
        nomePraAlterar[numero].innerText = categoria
        numero++
      }
    }

    valores = []
  })
  // if (categorias.length) {
  //   let categoriasLimpa = [...new Set(categorias)];
  //   categoriasLimpa.forEach((categoria, n) => {
  //     const nome = graficoResumoReceita.querySelectorAll('.nomeDaCategoria')
  //     if (nome[n]) {
  //       nome[n].innerText = categoria
  //     }
  //   })
  // }
}

// esconde div zerada

function escondeDivZerada() {
  const valores = graficoResumoReceita.querySelectorAll('.valorTotalDaCategoria')

  valores.forEach((valor) => {
    if (+valor.innerText === 0) {
      valor.parentElement.classList.add('ocultar')
    } else {
      valor.parentElement.classList.remove('ocultar')
    }
  })
}


coletarValores(30)
ValoresFiltradosPorDias(30)
setarValores()
inserirCategoriaNaDiv(30)

// ao Click mudar as informacoes na tela por dias
function atualizaH3(dias) {
  const valoresTotais = []

  receitasLabel.forEach((receita) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)

    const dataDaReceita = receita.querySelector('#data').innerText

    if (dataDaReceita >= diasInseridos) {
      const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')
      valoresTotais.push(+valor)


      let valoresTotaisAnteriores = valoresTotais.reduce((acomulador, valorAtual) => +acomulador + valorAtual, 0,)

      resumoReceita.innerText = `R$ ${valoresTotaisAnteriores.toLocaleString('pt-BR')}`
    }
  })
}
atualizaH3(30)

graficoResumoReceita.addEventListener('click', function (e) {
  const botoes = graficoResumoReceita.querySelectorAll('.botoes-filtro')
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
    coletarValores(7)
    ValoresFiltradosPorDias(7)
    setarValores()
    inserirCategoriaNaDiv(7)

  } else if (botaoClicado.innerText === '30 dias') {
    atualizaH3(30)
    coletarValores(30)
    ValoresFiltradosPorDias(30)
    setarValores()
    inserirCategoriaNaDiv(30)


  } else if (botaoClicado.innerText === '90 dias') {
    atualizaH3(90)
    coletarValores(90)
    ValoresFiltradosPorDias(90)
    setarValores()
    inserirCategoriaNaDiv(90)

  }
})




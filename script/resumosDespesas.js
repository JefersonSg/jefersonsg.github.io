const despesasLabel = document.querySelectorAll('#compraLabel')
const graficoResumoDespesa = document.getElementById('graficoDespesa')
const resumoDespesa = graficoResumoDespesa.querySelector('.valorResumido')
const divResumo = graficoResumoDespesa.querySelector('.resumosDivs')
const dives = divResumo.querySelectorAll('.informacoesDaCategoria')


const arrayResumoDespesa = infos[6] ? infos[6] : []


let valoresTotaisGastos = []

// função para adicionar valor a valoresTotais
let arrayValoresColetadosGastos = []

function coletarValoresGasto(dias) {
  despesasLabel.forEach((despesa) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)
    const dataDadespesa = despesa.querySelector('#data').innerText

    if (dataDadespesa >= diasInseridos) {
      const valor = despesa.querySelector('#valor').innerText.replace('-R$ ', '')

      valoresTotaisGastos.push(+valor)
    }
  })
}

function ValoresFiltradosPorDiasGasto(dias) {
  arrayResumoDespesa.forEach((categoria) => {
    const valores = []
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)

    despesasLabel.forEach((despesa) => {
      const valor = +despesa.querySelector('#valor').innerText.replace('-R$ ', '')
      const comparador = despesa.querySelector('#categoria').innerText
      const dataDadespesa = despesa.querySelector('#data').innerText

      if (comparador === categoria && dataDadespesa >= diasInseridos) {
        valores.push(valor)
      }
    })
    let valoresSomados = valores.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)
    arrayValoresColetadosGastos.push(valoresSomados)
    console.log(valores)
  })
}

// setar os valores
function setarValoresGasto() {
  arrayValoresColetadosGastos.sort((a, b) => b - a)
  arrayValoresColetadosGastos.length = 4
  dives.forEach((div, n) => {

    const valorDiv = div.querySelector('.valorTotalDaCategoria')
    const graficoVerde = div.querySelector('.graficoPorcentagem')
    const porcentagemNumerica = div.querySelector('.porcentagemNumero')

    let valoresSomados = valoresTotaisGastos.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)
    const porcentagem = ((arrayValoresColetadosGastos[n] / valoresSomados) * 100).toFixed(0)
    valorDiv.innerText = arrayValoresColetadosGastos[n]
    graficoVerde.style.width = `${porcentagem}%`
    porcentagemNumerica.innerText = `${porcentagem}%`
  })
  arrayValoresColetadosGastos = []
  valoresTotaisGastos = []
  escondeDivZeradaGasto()
}

// inserir o nome da categoria na div
function inserirCategoriaNaDivGasto(dias) {
  let valores = []
  let numero = 0

  arrayResumoDespesa.forEach((categoria) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)
    despesasLabel.forEach((despesa) => {
      const dataDadespesa = despesa.querySelector('#data').innerText
      const comparador = despesa.querySelector('#categoria').innerText
      const valor = +despesa.querySelector('#valor').innerText.replace('+R$ ', '')


      if (comparador === categoria && dataDadespesa > diasInseridos) {
        valores.push(valor)
      }
    })

    let valoresTotais = valores.reduce((acomulador, valoresTotais) => +acomulador + valoresTotais, 0,)

    if (valoresTotais !== 0) {

      const nomePraAlterar = graficoResumoDespesa.querySelectorAll('.nomeDaCategoria')

      if (nomePraAlterar[numero]) {
        nomePraAlterar[numero].innerText = categoria
        numero++
      }
    }
    valores = []
  })
}

// esconde div zerada

function escondeDivZeradaGasto() {
  const valores = graficoResumoDespesa.querySelectorAll('.valorTotalDaCategoria')

  valores.forEach((valor) => {
    if (+valor.innerText === 0) {
      valor.parentElement.classList.add('ocultar')
    } else {
      valor.parentElement.classList.remove('ocultar')
    }
  })
}

coletarValoresGasto(30)
ValoresFiltradosPorDiasGasto(30)
setarValoresGasto()
inserirCategoriaNaDivGasto(30)

// ao Click mudar as informacoes na tela por dias
function atualizaH3Gastos(dias) {
  const valoresTotais = []

  despesasLabel.forEach((Despesa) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)
    const dataDaDespesa = Despesa.querySelector('#data').innerText

    if (dataDaDespesa >= diasInseridos) {
      const valor = Despesa.querySelector('#valor').innerText.replace('-R$ ', '')
      valoresTotais.push(+valor)

      let valoresTotaisAnvaloresAnteriores = valoresTotais.reduce((acomulador, valorAtual) => +acomulador + valorAtual, 0,)

      resumoDespesa.innerText = `R$ ${valoresTotaisAnvaloresAnteriores.toLocaleString('pt-BR')}`
    }
  })
}
atualizaH3Gastos(30)

// insere os valores coletados em suas respectivas categorias

function inserirValoresNaDivGastos(dias) {
  const resumosCategorias = graficoResumoDespesa.querySelectorAll('.informacoesDaCategoria')

  resumosCategorias.forEach((categoria) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)

    const valores = []
    const valorTotal = []


    // coletar os valores

    despesasLabel.forEach((despesa) => {
      const data = despesa.querySelector('#data').innerText
      const valor = despesa.querySelector('#valor').innerText.replace('-R$ ', '')

      if (data >= diasInseridos) {
        valorTotal.push(+valor)
      }
    })

    despesasLabel.forEach((despesa) => {
      const nomeDaCategoria = categoria.querySelector('.nomeDaCategoria').innerText
      const comparador = despesa.querySelector('#categoria').innerText
      const data = despesa.querySelector('#data').innerText
      const valor = despesa.querySelector('#valor').innerText.replace('-R$ ', '')

      if (comparador === nomeDaCategoria && data >= diasInseridos) {
        valores.push(+valor)
      }
    })


    // insere os valores

    const valorTotalDaCategoria = categoria.querySelector('.valorTotalDaCategoria')
    const graficoVermelho = categoria.querySelector('.graficoPorcentagem')
    const textoPorcentagem = categoria.querySelector('.porcentagemNumero')


    let valoresAnteriores = valores.reduce((acomulador, valoresAnteriores) => +acomulador + valoresAnteriores, 0,)
    let valorTotalSomado = valorTotal.reduce((acomulador, valorTotalSomado) => +acomulador + valorTotalSomado, 0,)
    const porcentagem = ((valoresAnteriores / valorTotalSomado) * 100).toFixed(0)
    graficoVermelho.style.width = `${porcentagem}%`


    valorTotalDaCategoria.innerText = valoresAnteriores.toLocaleString('pt-BR')
    textoPorcentagem.innerText = `${porcentagem}%`
  })
}




// atualiza os valores dos spans de comparação

// function valoresComparadosGastos(dias) {
//   const valoresTotais = []

//   despesasLabel.forEach((despesa) => {
//     const Data = new Date()
//     Data.setDate(Data.getDate() - dias)
//     const diasInseridos = Data.toISOString().slice(0, 10)

//     const dataDadespesa = despesa.querySelector('#data').innerText

//     if (dataDadespesa >= diasInseridos) {
//       const valor = despesa.querySelector('#valor').innerText.replace('-R$ ', '')
//       valoresTotais.push(+valor)
//     }
//   })

//   let valoresAtuais = valoresTotais.reduce((acomulador, valoresAtuais) => +acomulador + valoresAtuais, 0,)
//   const diasComparados = dias * 2

//   const Data = new Date()
//   const DataComparativa = new Date()
//   Data.setDate(Data.getDate() - dias)
//   DataComparativa.setDate(DataComparativa.getDate() - diasComparados)
//   const diasInseridos = Data.toISOString().slice(0, 10)
//   const dataComparativaLimpa = DataComparativa.toISOString().slice(0, 10)

//   // coletar os valores 
//   const valores = []

//   despesasLabel.forEach((despesa) => {
//     const data = despesa.querySelector('#data').innerText
//     const valor = despesa.querySelector('#valor').innerText.replace('-R$ ', '')

//     if (data <= diasInseridos && data >= dataComparativaLimpa) {
//       valores.push(+valor)
//     }
//   })

//   // inserir os valores

//   let valoresAnteriores = valores.reduce((acomulador, valoresAnteriores) => +acomulador + valoresAnteriores, 0,)


//   const porcentagemComparada = graficoResumoDespesa.querySelector('.porcentagemComparada')
//   const diasSpan = graficoResumoDespesa.querySelector('.diasComparados')
//   const diferencaComparada = graficoResumoDespesa.querySelector('.diferencaComparada')

//   if (valoresAnteriores < valoresAtuais) {
//     const porcentagem = +((valoresAtuais / valoresAnteriores) * 100).toFixed(0)

//     const diferenca = valoresAtuais - valoresAnteriores

//     porcentagemComparada.innerText = porcentagem !== Infinity ? `${porcentagem}% a mais nos últimos` : porcentagemComparada.innerText = `100% a mais nos últimos`

//     diasSpan.innerText = `${dias} dias`
//     diferencaComparada.innerText = `(R$ ${diferenca.toLocaleString('pt-BR')})`

//   } else if (valoresAnteriores > valoresAtuais) {
//     const porcentagem = +(valoresAnteriores / valoresAtuais * 100).toFixed(0)

//     const diferenca = valoresAtuais - valoresAnteriores

//     porcentagemComparada.innerText = porcentagem !== Infinity ? `${porcentagem}% a menos nos últimos` : porcentagemComparada.innerText = `100% a menos nos últimos`

//     diasSpan.innerText = `${dias} dias`
//     diferencaComparada.innerText = `(-R$ ${diferenca.toLocaleString('pt-BR').replace('-','')})`
//   } else if (valoresAnteriores === valoresAtuais) {
//     const diferenca = valoresAtuais - valoresAnteriores

//     porcentagemComparada.innerText = `0%  nos últimos`
//     diasSpan.innerText = `${dias} dias`
//     diferencaComparada.innerText = `(R$ ${diferenca.toLocaleString('pt-BR')})`
//   }

// }

inserirValoresNaDivGastos(30)
// valoresComparadosGastos(30)


graficoResumoDespesa.addEventListener('click', function (e) {
  const botoes = graficoResumoDespesa.querySelectorAll('.botoes-filtro')
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
    atualizaH3Gastos(7)
    coletarValoresGasto(7)
    ValoresFiltradosPorDiasGasto(7)
    setarValoresGasto()
    inserirCategoriaNaDivGasto(7)

  } else if (botaoClicado.innerText === '30 dias') {
    atualizaH3Gastos(30)
    coletarValoresGasto(30)
    ValoresFiltradosPorDiasGasto(30)
    setarValoresGasto()
    inserirCategoriaNaDivGasto(30)

  } else if (botaoClicado.innerText === '90 dias') {
    atualizaH3Gastos(90)
    coletarValoresGasto(90)
    ValoresFiltradosPorDiasGasto(90)
    setarValoresGasto()
    inserirCategoriaNaDivGasto(90)

  }

  if (botaoClicado.innerText === '7 dias') {
    inserirValoresNaDivGastos(7)
  }
  else if (botaoClicado.innerText === '30 dias') {
    inserirValoresNaDivGastos(30)
  } else if (botaoClicado.innerText === '90 dias') {
    inserirValoresNaDivGastos(90)
  }

  // cria as divs de resumo de despesas

})
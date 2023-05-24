const despesasLabel = document.querySelectorAll('#compraLabel')
const graficoResumoDespesa = document.getElementById('graficoDespesa')
const resumoDespesa = graficoResumoDespesa.querySelector('.valorResumido')
const divResumo = graficoResumoDespesa.querySelector('.resumosDivs')
const dives = divResumo.querySelectorAll('.informacoesDaCategoria')
const usuarioAti = JSON.parse(localStorage.usuarioAtivo)
const info = JSON.parse(localStorage.getItem(`informacoes_id${usuarioAti.ID}`))



const arrayResumoDespesa = info[6] ? info[6] : []

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
    }
    let valoresTotaisAnvaloresAnteriores = valoresTotais.reduce((acomulador, valorAtual) => +acomulador + valorAtual, 0,)

    resumoDespesa.innerText = `R$ ${valoresTotaisAnvaloresAnteriores.toLocaleString('pt-BR')}`
  })
}

// atualiza o spam das porcentagens de gastos comparados
function valoresComparadosGasto(dias) {
  const valoresAtuais = []
  despesasLabel.forEach((receita) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)

    const dataDaReceita = receita.querySelector('#data').innerText

    if (dataDaReceita >= diasInseridos) {
      const valor = receita.querySelector('#valor').innerText.replace('-R$ ', '')
      valoresAtuais.push(+valor)
    }
  })
  let valoresAtuaisSomados = valoresAtuais.reduce((acomulador, valoresAtuaisSomados) => +acomulador + valoresAtuaisSomados, 0,)

  const diasComparados = dias * 2

  const Data = new Date()
  const DataComparativa = new Date()
  Data.setDate(Data.getDate() - dias)
  DataComparativa.setDate(DataComparativa.getDate() - diasComparados)
  const diasInseridos = Data.toISOString().slice(0, 10)
  const dataComparativaLimpa = DataComparativa.toISOString().slice(0, 10)

  // coletar os valores 
  const valores = []
  despesasLabel.forEach((receita) => {
    const data = receita.querySelector('#data').innerText
    const valor = receita.querySelector('#valor').innerText.replace('-R$ ', '')

    if (data <= diasInseridos && data >= dataComparativaLimpa) {
      valores.push(+valor)
    } else {
      valores.push(0)
    }
  })


  // inserir os valores

  let valoresAnterioresSomados = valores.reduce((acomulador, valoresAnterioresSomados) => +acomulador + valoresAnterioresSomados, 0,)

  const porcentagemComparada = graficoResumoDespesa.querySelector('.porcentagemComparada')
  const diasSpan = graficoResumoDespesa.querySelector('.diasComparados')
  const diferencaComparada = graficoResumoDespesa.querySelector('.diferencaComparada')
  const porcentagem = +((valoresAtuaisSomados / valoresAnterioresSomados) * 100).toFixed(0)

  if (valoresAnterioresSomados < valoresAtuaisSomados) {
    const diferenca = valoresAtuaisSomados - valoresAnterioresSomados

    if (porcentagem !== Infinity) {
      porcentagemComparada.innerText = `${porcentagem}% a mais nos últimos`
    } else if (porcentagem === Infinity) {
      porcentagemComparada.innerText = `100% a mais nos últimos`
    } else {
      porcentagemComparada.innerText = `deu erro mais foi no maior`
    }

    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = `(R$ ${diferenca.toLocaleString('pt-BR')})`

  } else if (valoresAnterioresSomados > valoresAtuaisSomados) {
    const porcentagem = +((valoresAnterioresSomados / valoresAtuaisSomados) * 100).toFixed(0)

    const diferenca = valoresAtuaisSomados - valoresAnterioresSomados

    if (porcentagem !== Infinity) {
      porcentagemComparada.innerText = `${porcentagem}% a menos nos últimos`
    } else if (porcentagem === Infinity) {
      porcentagemComparada.innerText = `100% a menos nos últimos`
    } else {
      porcentagemComparada.innerText = `deu erro mais foi no menor`
    }

    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = `(-R$ ${diferenca.toLocaleString('pt-BR').replace('-', '')})`
  } else if (valoresAnterioresSomados === valoresAtuaisSomados) {
    porcentagemComparada.innerText = `0% nos últimos`
    diasSpan.innerText = `${dias} dias`
  } else {
    porcentagemComparada.innerText = `deu erro mais foi no igual`
  }
}

let valoresTotaisGastos = []
let valoresTotaisGastosResumoTotal = []

// função para adicionar valor a valoresTotais
let arrayValoresColetadosGastos = []
let arrayValoresColetadosGastosResumoTotal = []

function coletarValoresGasto(dias) {
  despesasLabel.forEach((despesa) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)
    const dataDadespesa = despesa.querySelector('#data').innerText

    if (dataDadespesa >= diasInseridos) {
      const valor = +despesa.querySelector('#valor').innerText.replace('-R$ ', '')

      valoresTotaisGastos.push(valor)
      valoresTotaisGastosResumoTotal.push(valor)
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
    arrayValoresColetadosGastos.push([valoresSomados, categoria])
    arrayValoresColetadosGastosResumoTotal.push([valoresSomados, categoria])

  })
}
// setar os valores
function setarValoresGasto() {
  arrayValoresColetadosGastos.sort((a, b) => b[0] - a[0])
  const novoArrayValoresTop4 = arrayValoresColetadosGastos.map(item => item)
  novoArrayValoresTop4.length = 4

  dives.forEach((div, n) => {

    const valorDiv = div.querySelector('.valorTotalDaCategoria')
    const graficoVerde = div.querySelector('.graficoPorcentagem')
    const porcentagemNumerica = div.querySelector('.porcentagemNumero')
    const nomeDaCategoria = div.querySelector('.nomeDaCategoria')

    let valoresSomados = valoresTotaisGastos.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)
    const porcentagem = ((novoArrayValoresTop4[n][0] / valoresSomados) * 100).toFixed(0)
    nomeDaCategoria.innerText = novoArrayValoresTop4[n][1]
    valorDiv.innerText = (novoArrayValoresTop4[n][0]).toLocaleString('pt-BR')
    graficoVerde.style.width = `${porcentagem}%`
    porcentagemNumerica.innerText = `${porcentagem}%`


    // deixar divs zeradas ocultas

    valorDiv.parentElement.classList.remove('ocultar')
    if (valorDiv.innerText == 0) {
      valorDiv.parentElement.classList.add('ocultar')
    }
  })
  arrayValoresColetadosGastos = []
  valoresTotaisGastos = []

}

// cria as divs
function criaAsDivsGastos() {
  const novoArrayValores =  arrayResumoDespesa.map(item => item)
  novoArrayValores.forEach(()=>{
  const divPaiGasto = document.querySelector('#todasAsAtividadesDespesa')

    const div = document.createElement('div')
    div.classList.add('informacoesDaCategoria')
  
    div.innerHTML = `<h4 class="nomeDaCategoria"></h4>
    <span class="graficoPorcentagem"></span>
    <span class="porcentagemNumero"></span>
    <span class="valorTotalDaCategoria"></span>`
    divPaiGasto.appendChild(div)
  })
}
criaAsDivsGastos()

// adiciona ativo e abre o bg
const divPaiGasto = document.querySelector('#todasAsAtividadesDespesa')

function addAtivoGastos() {
  divPaiGasto.parentElement.classList.add('ativo')
  adicionaValoresATodasAsAtividadesGastos()
  document.body.style.overflow = 'hidden'

}

// fechar o bg

  atividadesBg[1].addEventListener('click', function (event) {

    const itemIgnorado = atividadesBg[1].querySelector('.todasAsAtividades')
    const fechar = atividadesBg[1].querySelector('.fechar')

      if (!itemIgnorado.contains(event.target) || fechar.contains(event.target)) {
        document.body.style.overflow = 'auto'
        atividadesBg[1].classList.remove('ativo')
      }
  });

// adiciona os valores nas suas divs
function adicionaValoresATodasAsAtividadesGastos() {
  arrayValoresColetadosGastosResumoTotal.sort((a, b) => b[0] - a[0])
  
  const novoArrayValores =  arrayValoresColetadosGastosResumoTotal.map(item => item)
  let valoresSomados = valoresTotaisGastosResumoTotal.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)

  // setar valores
  novoArrayValores.forEach((valor,n)=>{
    const divs = divPaiGasto.querySelectorAll('.informacoesDaCategoria')
    const nomeCategoria = divs[n].querySelector('.nomeDaCategoria')
    const valorCategoria = divs[n].querySelector('.valorTotalDaCategoria')
    const graficoPorcentagem = divs[n].querySelector('.graficoPorcentagem')
    const porcentagemNumero = divs[n].querySelector('.porcentagemNumero')
    

  const porcentagem = +((valor[0] / valoresSomados) * 100).toFixed(0)

    nomeCategoria.innerText = valor[1]
    graficoPorcentagem.style.width = `${porcentagem}%`
    porcentagemNumero.innerText = `${porcentagem}%`
    valorCategoria.innerText = valor[0].toLocaleString('pt-BR')

    // esconder divs zeradas
    if (valor[0] === 0) {
      divs[n].classList.add('ocultar')
    } else {
      divs[n].classList.remove('ocultar')
    }
  })
 }

atualizaH3Gastos(30)
valoresComparadosGasto(30)
coletarValoresGasto(30)
ValoresFiltradosPorDiasGasto(30)
setarValoresGasto()


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
    arrayValoresColetadosGastosResumoTotal = []
    valoresTotaisGastosResumoTotal = []
    atualizaH3Gastos(7)
    valoresComparadosGasto(7)
    coletarValoresGasto(7)
    ValoresFiltradosPorDiasGasto(7)
    setarValoresGasto()

  } else if (botaoClicado.innerText === '30 dias') {
    arrayValoresColetadosGastosResumoTotal = []
    valoresTotaisGastosResumoTotal = []
    atualizaH3Gastos(30)
    valoresComparadosGasto(30)
    coletarValoresGasto(30)
    ValoresFiltradosPorDiasGasto(30)
    setarValoresGasto()


  } else if (botaoClicado.innerText === '90 dias') {
    arrayValoresColetadosGastosResumoTotal = []
    valoresTotaisGastosResumoTotal = []
    atualizaH3Gastos(90)
    valoresComparadosGasto(90)
    coletarValoresGasto(90)
    ValoresFiltradosPorDiasGasto(90)
    setarValoresGasto()


  }

  // cria as divs de resumo de despesas

})
graficoResumoDespesa.addEventListener('click', function (event) {
  const botoesFiltros = graficoResumoDespesa.querySelectorAll('.botoes-filtro')
  const botaoClicado = [...botoesFiltros].filter(botao => botao === event.target)
  if (!botaoClicado.length) {
    addAtivoGastos()
  } 
})
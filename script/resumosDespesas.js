const despesasLabel = document.querySelectorAll('#compraLabel')
const graficoResumoDespesa = document.getElementById('graficoDespesa')
const resumoDespesa = graficoResumoDespesa.querySelector('.valorResumido')
const divResumo = graficoResumoDespesa.querySelector('.resumosDivs')

const arrayResumoDespesa = infos[6] ? infos[6] : []


const valoresTotaisGastos = []

// função para adicionar valor a valoresTotais

// DESPESA
despesasLabel.forEach((gasto) => {
  const Data = new Date()
  Data.setDate(Data.getDate() - 30)
  const trintaDiasAtraz = Data.toISOString().slice(0, 10)
  const dataDoGasto = gasto.querySelector('#data').innerText

  if (dataDoGasto > trintaDiasAtraz) {
    const valor = gasto.querySelector('#valor').innerText.replace('+R$ ', '')

    valoresTotaisGastos.push(+valor)
  }
})

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

// criar divis de resumos
arrayResumoDespesa.forEach((categoria) => {
  const divCategoria = document.createElement('div')
  divCategoria.classList.add('informacoesDaCategoria')
  divCategoria.classList.add('ocultar')

  divCategoria.innerHTML = `
      <h4 class="nomeDaCategoria">
        ${categoria}
      </h4>
      <span class="graficoPorcentagem"></span>
      <span class="porcentagemNumero">%</span>
      <span class="valorTotalDaCategoria"></span>
      `
  divResumo.appendChild(divCategoria)
})

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
  organizaDivsValorCrescenteGastos()
}


function AddOcultoGasto(){
  const categorias = graficoResumoDespesa.querySelectorAll('.informacoesDaCategoria')
  categorias.forEach((categoria)=>{
    if (!categoria.classList.contains('ocultar')) {
      categoria.classList.add('ocultar')
    }
  })
}

function organizaDivsValorCrescenteGastos() {
  // Seleciona todas as divs com a classe "valor"
  const divs = graficoResumoDespesa.querySelector('.resumosDivs')
  const valores = divs.querySelectorAll('.valorTotalDaCategoria');
  
  
  // Converte os valores em números e ordena em ordem decrescente
  const valoresOrdenados = Array.from(valores)
    .map(valor => parseInt(valor.textContent.replace('.','')))
    .sort((a, b) => b - a);

    // Cria um novo array com as divs reordenadas
  const apenasOs4Primeiros = valoresOrdenados.slice(0,4)

  apenasOs4Primeiros.forEach((numero, n)=>{
    const valores = graficoResumoDespesa.querySelectorAll('.valorTotalDaCategoria')
    const topItens = Array.from(valores).find(valor => +valor.innerText.replace('.','') === numero)
    if (numero > 0) {
      topItens.parentElement.style.gridRow = n + 1
      topItens.parentElement.classList.remove('ocultar')
    }

    })
}

// atualiza os valores dos spans de comparação

function valoresComparadosGastos(dias) {
  const valoresTotais = []

  despesasLabel.forEach((receita) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)

    const dataDaReceita = receita.querySelector('#data').innerText

    if (dataDaReceita >= diasInseridos) {
      const valor = receita.querySelector('#valor').innerText.replace('-R$ ', '')
      valoresTotais.push(+valor)
    }
  })

  let valoresAtuais = valoresTotais.reduce((acomulador, valoresAtuais) => +acomulador + valoresAtuais, 0,)
  const diasComparados = dias * 2

  const Data = new Date()
  const DataComparativa = new Date()
  Data.setDate(Data.getDate() - dias)
  DataComparativa.setDate(DataComparativa.getDate() - diasComparados)
  const diasInseridos = Data.toISOString().slice(0, 10)
  const dataComparativaLimpa = DataComparativa.toISOString().slice(0, 10)

  // coletar os valores 
  const valores = []

  despesasLabel.forEach((despesa) => {
    const data = despesa.querySelector('#data').innerText
    const valor = despesa.querySelector('#valor').innerText.replace('-R$ ', '')

    if (data <= diasInseridos && data >= dataComparativaLimpa) {
      valores.push(+valor)
    }
  })

  // inserir os valores

  let valoresAnteriores = valores.reduce((acomulador, valoresAnteriores) => +acomulador + valoresAnteriores, 0,)


  const porcentagemComparada = graficoResumoDespesa.querySelector('.porcentagemComparada')
  const diasSpan = graficoResumoDespesa.querySelector('.diasComparados')
  const diferencaComparada = graficoResumoDespesa.querySelector('.diferencaComparada')

  if (valoresAnteriores < valoresAtuais) {
    const porcentagem = +((valoresAtuais / valoresAnteriores) * 100).toFixed(0)

    const diferenca = valoresAtuais - valoresAnteriores

    porcentagemComparada.innerText = porcentagem !== Infinity ? `${porcentagem}% a mais nos últimos` : porcentagemComparada.innerText = `100% a mais nos últimos`

    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = `(R$ ${diferenca.toLocaleString('pt-BR')})`

  } else if (valoresAnteriores > valoresAtuais) {
    const porcentagem = +(valoresAnteriores / valoresAtuais * 100).toFixed(0)

    const diferenca = valoresAtuais - valoresAnteriores

    porcentagemComparada.innerText = porcentagem !== Infinity ? `${porcentagem}% a menos nos últimos` : porcentagemComparada.innerText = `100% a menos nos últimos`

    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = `(-R$ ${diferenca.toLocaleString('pt-BR').replace('-','')})`
  } else if (valoresAnteriores === valoresAtuais) {
    const diferenca = valoresAtuais - valoresAnteriores

    porcentagemComparada.innerText = `0%  nos últimos`
    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = `(R$ ${diferenca.toLocaleString('pt-BR')})`
  }

}

inserirValoresNaDivGastos(30)
organizaDivsValorCrescenteGastos()
valoresComparadosGastos(30)


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
    valoresComparadosGastos(7)

  } else if (botaoClicado.innerText === '30 dias') {
    atualizaH3Gastos(30)
    valoresComparadosGastos(30)

  } else if (botaoClicado.innerText === '90 dias') {
    atualizaH3Gastos(90)
    valoresComparadosGastos(90)

  }

  if (botaoClicado.innerText === '7 dias') {
    inserirValoresNaDivGastos(7)
  }
  else if (botaoClicado.innerText === '30 dias') {
    inserirValoresNaDivGastos(30)
  } else if (botaoClicado.innerText === '90 dias') {
    inserirValoresNaDivGastos(90)
  }

  // cria as divs de resumo de receitas

})
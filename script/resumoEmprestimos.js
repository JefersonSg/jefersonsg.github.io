const emprestimosLabels = document.querySelectorAll('#emprestimoLabel')
const graficoResumoEmprestimos = document.getElementById('graficoEmprestimo')
const resumoEmprestimos = graficoResumoEmprestimos.querySelector('.valorResumido')
const divResumoEmprestimo = graficoResumoEmprestimos.querySelector('.resumosDivs')
const divsEmprestimo = divResumoEmprestimo.querySelectorAll('.informacoesDaCategoria')

// ao Click mudar as informacoes na tela por dias
function atualizaH3Emprestimos(dias) {
  const valoresTotais = []
  emprestimosLabels.forEach((Emprestimo) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)
    const dataDoEmprestimo = Emprestimo.querySelector('#data').innerText
    if (dataDoEmprestimo >= diasInseridos) {
      const valor = Emprestimo.querySelector('#valor').innerText.replace('-R$ ', '')
      valoresTotais.push(+valor)
    }
    let valoresTotaisAnvaloresAnteriores = valoresTotais.reduce((acomulador, valorAtual) => +acomulador + valorAtual, 0,)
    resumoEmprestimos.innerText = `R$ ${(valoresTotaisAnvaloresAnteriores).toLocaleString('pt-BR')}`
  })
}
let valoresTotaisEmprestimos = []

// função para adicionar valor a valoresTotais
let arrayValoresColetadosEmprestimos = []

function coletarValoresEmprestimos(dias) {
  emprestimosLabels.forEach((Emprestimo) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)
    const dataDaEmprestimo = Emprestimo.querySelector('#data').innerText

    if (dataDaEmprestimo >= diasInseridos) {
      const valor = +Emprestimo.querySelector('#valor').innerText.replace('-R$ ', '')
      valoresTotaisEmprestimos.push(valor)
    }
  })
}

// atualiza o span de lucros

function atualizaLucros() {

}

function ValoresFiltradosPorDiasEmprestimos(dias) {
  emprestimosLabels.forEach((emprestimo) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)


    const nomeDoEmprestimo = emprestimo.querySelector('#nomeMov').innerText.replace('Emprestou para ', '')
    const valor = +emprestimo.querySelector('#valor').innerText.replace('-R$ ', '')
    const dataDoEmprestimo = emprestimo.querySelector('#data').innerText
    const lucro = emprestimo.querySelector('.diferenca').innerText.replace('R$ ', '')

    if (dataDoEmprestimo >= diasInseridos) {
      arrayValoresColetadosEmprestimos.push([valor, nomeDoEmprestimo, lucro])
    }
  })
}

// setar os valores
function setarValoresEmprestimos(dias) {
  const lucrosDiv = document.querySelector('.lucrosSomados')
  const lucros = arrayValoresColetadosEmprestimos.map(valor => valor[valor.length - 1])
  const lucrosTotais = lucros.reduce((acomulador, lucrosTotais) => +acomulador + +lucrosTotais, 0,)

  if (lucrosTotais) {
    lucrosDiv.innerText = `Lucrou R$ ${lucrosTotais.toLocaleString('pt-BR')}  nos últimos ${dias} dias`
  } else {
    lucrosDiv.innerText = `Lucrou R$ 0,00  nos últimos ${dias} dias`
  }

  arrayValoresColetadosEmprestimos.sort((a, b) => b[0] - a[0])
  arrayValoresColetadosEmprestimos.length = 4



  divsEmprestimo.forEach((div, n) => {
    const valorDiv = div.querySelector('.valorTotalDaCategoria')
    const graficoRocho = div.querySelector('.graficoPorcentagem')
    const porcentagemNumerica = div.querySelector('.porcentagemNumero')
    const nomeDaCategoria = div.querySelector('.nomeDaCategoria')

    let valoresSomados = valoresTotaisEmprestimos.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)


    if (arrayValoresColetadosEmprestimos[n] !== undefined) {
      const porcentagem = ((arrayValoresColetadosEmprestimos[n][0] / valoresSomados) * 100).toFixed(0)
      porcentagemNumerica.innerText = `${porcentagem}%`
      graficoRocho.style.width = `${porcentagem}%`
      valorDiv.innerText = arrayValoresColetadosEmprestimos[n][0]
      nomeDaCategoria.innerText = arrayValoresColetadosEmprestimos[n][1]

    } else if (!arrayValoresColetadosEmprestimos[n] !== undefined) {
      porcentagemNumerica.innerText = '0%'
      graficoRocho.style.width = `0%`
      valorDiv.innerText = 0
      nomeDaCategoria.innerText = ''
    }

    // deixar divs zeradas ocultas

    valorDiv.parentElement.classList.remove('ocultar')
    if (valorDiv.innerText == 0) {
      valorDiv.parentElement.classList.add('ocultar')
    }
  })

  arrayValoresColetadosEmprestimos = []
  valoresTotaisEmprestimos = []
}


atualizaH3Emprestimos(30)
coletarValoresEmprestimos(30)
ValoresFiltradosPorDiasEmprestimos(30)
setarValoresEmprestimos(30)
atualizaLucros()

graficoResumoEmprestimos.addEventListener('click', function (e) {
  const botoes = graficoResumoEmprestimos.querySelectorAll('.botoes-filtro')
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
    atualizaH3Emprestimos(7)
    coletarValoresEmprestimos(7)
    ValoresFiltradosPorDiasEmprestimos(7)
    setarValoresEmprestimos(7)
    atualizaLucros()
  } else if (botaoClicado.innerText === '30 dias') {
    atualizaH3Emprestimos(30)
    coletarValoresEmprestimos(30)
    ValoresFiltradosPorDiasEmprestimos(30)
    setarValoresEmprestimos(30)
    atualizaLucros()
  } else if (botaoClicado.innerText === '90 dias') {
    atualizaH3Emprestimos(90)
    coletarValoresEmprestimos(90)
    ValoresFiltradosPorDiasEmprestimos(90)
    setarValoresEmprestimos(90)
    atualizaLucros()
  }
})
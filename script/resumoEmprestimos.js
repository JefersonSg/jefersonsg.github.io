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
let valoresTotaisEmprestimosResumoTotal = []

// função para adicionar valor a valoresTotais
let arrayValoresColetadosEmprestimos = []
let arrayValoresColetadosEmprestimoResumoTotal =[]

function coletarValoresEmprestimos(dias) {
  emprestimosLabels.forEach((Emprestimo) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)
    const dataDaEmprestimo = Emprestimo.querySelector('#data').innerText

    if (dataDaEmprestimo >= diasInseridos) {
      const valor = +Emprestimo.querySelector('#valor').innerText.replace('-R$ ', '')
      valoresTotaisEmprestimos.push(valor)
      valoresTotaisEmprestimosResumoTotal.push(valor)
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
      arrayValoresColetadosEmprestimoResumoTotal.push([valor, nomeDoEmprestimo, lucro])
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
  const novoArrayValoresTop4 = arrayValoresColetadosEmprestimos.map(item => item)
  novoArrayValoresTop4.length = 4

  divsEmprestimo.forEach((div, n) => {
    const valorDiv = div.querySelector('.valorTotalDaCategoria')
    const graficoRocho = div.querySelector('.graficoPorcentagem')
    const porcentagemNumerica = div.querySelector('.porcentagemNumero')
    const nomeDaCategoria = div.querySelector('.nomeDaCategoria')

    let valoresSomados = valoresTotaisEmprestimos.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)


    if (novoArrayValoresTop4[n] !== undefined) {
      const porcentagem = ((novoArrayValoresTop4[n][0] / valoresSomados) * 100).toFixed(0)
      porcentagemNumerica.innerText = `${porcentagem}%`
      graficoRocho.style.width = `${porcentagem}%`
      valorDiv.innerText = novoArrayValoresTop4[n][0]
      nomeDaCategoria.innerText = novoArrayValoresTop4[n][1]

    } else if (!novoArrayValoresTop4[n] !== undefined) {
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

// cria as divs
function criaAsDivsEmprestimo() {
  const divPaiEmprestimo = document.querySelector('#todasAsAtividadesEmprestimo')
  valoresTotaisEmprestimosResumoTotal.forEach(()=>{
    const div = document.createElement('div')
    div.classList.add('informacoesDaCategoria')
  
    div.innerHTML = `<h4 class="nomeDaCategoria"></h4>
    <span class="graficoPorcentagem"></span>
    <span class="porcentagemNumero"></span>
    <span class="valorTotalDaCategoria"></span>`
    divPaiEmprestimo.appendChild(div)
  })
}

// adiciona ativo e abre o bg
const divPaiEmprestimo = document.querySelector('#todasAsAtividadesEmprestimo')

function addAtivoEmprestimo() {
  divPaiEmprestimo.parentElement.classList.add('ativo')
  criaAsDivsEmprestimo()
  adicionaValoresATodasAsAtividadesEmprestimo()
}

  // fechar o bg

atividadesBg[2].addEventListener('click', function (event) {

  const itemIgnorado = atividadesBg[2].querySelector('.todasAsAtividades')
  const fechar = atividadesBg[2].querySelector('.fechar')
  const divs = divPaiEmprestimo.querySelectorAll('.informacoesDaCategoria')


    if (!itemIgnorado.contains(event.target) || fechar.contains(event.target)) {
      atividadesBg[2].classList.remove('ativo')
      divs.forEach((div)=>{
        div.remove()
      })
    }
});

// adiciona os valores nas suas divs
function adicionaValoresATodasAsAtividadesEmprestimo() {
  arrayValoresColetadosEmprestimoResumoTotal.sort((a, b) => b[0] - a[0])
  const novoArrayValores =  arrayValoresColetadosEmprestimoResumoTotal.map(item => item)
  let valoresSomados = valoresTotaisEmprestimosResumoTotal.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)

  // setar valores
  novoArrayValores.forEach((valor,n)=>{
    const divs = divPaiEmprestimo.querySelectorAll('.informacoesDaCategoria')
    const nomeCategoria = divs[n].querySelector('.nomeDaCategoria')
    const valorCategoria = divs[n].querySelector('.valorTotalDaCategoria')
    const graficoPorcentagem = divs[n].querySelector('.graficoPorcentagem')
    const porcentagemNumero = divs[n].querySelector('.porcentagemNumero')
    

  const porcentagem = +((valor[0] / valoresSomados) * 100).toFixed(0)

    nomeCategoria.innerText = valor[1]
    graficoPorcentagem.style.width = `${porcentagem}%`
    porcentagemNumero.innerText = `${porcentagem}%`
    valorCategoria.innerText = valor[0]

    // esconder divs zeradas
    if (valor[0] === 0) {
      divs[n].classList.add('ocultar')
    } else {
      divs[n].classList.remove('ocultar')
    }
  })
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
    valoresTotaisEmprestimosResumoTotal = []
    arrayValoresColetadosEmprestimoResumoTotal = []
    atualizaH3Emprestimos(7)
    coletarValoresEmprestimos(7)
    ValoresFiltradosPorDiasEmprestimos(7)
    setarValoresEmprestimos(7)
    atualizaLucros()
  } else if (botaoClicado.innerText === '30 dias') {
    valoresTotaisEmprestimosResumoTotal = []
    arrayValoresColetadosEmprestimoResumoTotal = []
    atualizaH3Emprestimos(30)
    coletarValoresEmprestimos(30)
    ValoresFiltradosPorDiasEmprestimos(30)
    setarValoresEmprestimos(30)
    atualizaLucros()
  } else if (botaoClicado.innerText === '90 dias') {
    valoresTotaisEmprestimosResumoTotal = []
    arrayValoresColetadosEmprestimoResumoTotal = []
    atualizaH3Emprestimos(90)
    coletarValoresEmprestimos(90)
    ValoresFiltradosPorDiasEmprestimos(90)
    setarValoresEmprestimos(90)
    atualizaLucros()
  }
})

graficoResumoEmprestimos.addEventListener('click', function (event) {
  const botoesFiltros = graficoResumoEmprestimos.querySelectorAll('.botoes-filtro')
  const botaoClicado = [...botoesFiltros].filter(botao => botao === event.target)
  if (!botaoClicado.length) {
    addAtivoEmprestimo()
  } 
})

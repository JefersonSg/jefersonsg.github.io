const receitasLabel = document.querySelectorAll('#vendaLabel')
const graficoResumoReceita = document.getElementById('graficoReceita')
const resumoReceita = graficoResumoReceita.querySelector('.valorResumido')
const divResumos = graficoResumoReceita.querySelector('.resumosDivs')
const divs = divResumos.querySelectorAll('.informacoesDaCategoria')
const usuarioAtiv = JSON.parse(localStorage.usuarioAtivo)
const infos = JSON.parse(localStorage.getItem(`informacoes_id${usuarioAtiv.ID}`))

const arrayResumoReceitas = infos[7] ? infos[7] : []

let valoresTotais = []
let valoresTotaisResumoTotal = []


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
    }
    let valoresTotaisAnteriores = valoresTotais.reduce((acomulador, valorAtual) => +acomulador + valorAtual, 0,)

    resumoReceita.innerText = `R$ ${valoresTotaisAnteriores.toLocaleString('pt-BR')}`
  })
}

// atualiza o spam das porcentagens de gastos comparados

function valoresComparados(dias) {
  const valoresAtuais = []
  receitasLabel.forEach((receita) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)

    const dataDaReceita = receita.querySelector('#data').innerText

    if (dataDaReceita >= diasInseridos) {
      const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')
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
  receitasLabel.forEach((receita) => {
    const data = receita.querySelector('#data').innerText
    const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')

    if (data <= diasInseridos && data >= dataComparativaLimpa) {
      valores.push(+valor)
    } else {
      valores.push(0)
    }
  })


  // inserir os valores

  let valoresAnterioresSomados = valores.reduce((acomulador, valoresAnterioresSomados) => +acomulador + valoresAnterioresSomados, 0,)

  const porcentagemComparada = graficoResumoReceita.querySelector('.porcentagemComparada')
  const diasSpan = graficoResumoReceita.querySelector('.diasComparados')
  const diferencaComparada = graficoResumoReceita.querySelector('.diferencaComparada')
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
    const diferenca = valoresAtuaisSomados - valoresAnterioresSomados

    if (porcentagem !== Infinity) {
      porcentagemComparada.innerText = `${porcentagem}% a menos nos últimos`
    } else if (porcentagem === Infinity) {
      porcentagemComparada.innerText = `100% a mais nos últimos`
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

// função para adicionar valor a valoresTotais
let arrayValoresColetados = []
let arrayValoresColetadosResumoTotal = []

function coletarValores(dias) {
  receitasLabel.forEach((receita) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)
    const dataDaReceita = receita.querySelector('#data').innerText

    if (dataDaReceita >= diasInseridos) {
      const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')
      valoresTotais.push(+valor)
      valoresTotaisResumoTotal.push(+valor)
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
    arrayValoresColetados.push([valoresSomados, categoria])
    arrayValoresColetadosResumoTotal.push([valoresSomados, categoria])
  })
}

// setar os valores
function setarValores() {
  arrayValoresColetados.sort((a, b) => b[0] - a[0])
 const novoArrayValoresTop4 = arrayValoresColetados.map(item => item)
 novoArrayValoresTop4.length = 4

  divs.forEach((div, n) => {
    const valorDiv = div.querySelector('.valorTotalDaCategoria')
    const graficoVerde = div.querySelector('.graficoPorcentagem')
    const porcentagemNumerica = div.querySelector('.porcentagemNumero')
    const nomeDaCategoria = div.querySelector('.nomeDaCategoria')

    let valoresSomados = valoresTotais.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)
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

  arrayValoresColetados = []
  valoresTotais = []

}

// cria as divs
function criaAsDivs() {
  const novoArrayValores =  arrayResumoReceitas.map(item => item)
  novoArrayValores.forEach(()=>{
  const divPai = document.querySelector('#todasAsAtividadesReceita')

    const div = document.createElement('div')
    div.classList.add('informacoesDaCategoria')
  
    div.innerHTML = `<h4 class="nomeDaCategoria"></h4>
    <span class="graficoPorcentagem"></span>
    <span class="porcentagemNumero"></span>
    <span class="valorTotalDaCategoria"></span>`
    divPai.appendChild(div)

  })
}
criaAsDivs()

// adiciona ativo e abre o bg
const divPai = document.querySelector('#todasAsAtividadesReceita')

function addAtivoReceita() {
  divPai.parentElement.classList.add('ativo')
  adicionaValores()
  document.body.style.overflow = 'hidden'
}



// fechar o bg
const atividadesBg = document.querySelectorAll('.todasAsAtividadesBg')
  atividadesBg[0].addEventListener('click', function (event) {

    const itemIgnorado = atividadesBg[0].querySelector('.todasAsAtividades')
    const fechar = atividadesBg[0].querySelector('.fechar')

      if (!itemIgnorado.contains(event.target) || fechar.contains(event.target)) {
        document.body.style.overflow = 'auto'
        atividadesBg[0].classList.remove('ativo')
      }
  });


// adiciona os valores nas suas divs
function adicionaValores() {
  arrayValoresColetadosResumoTotal.sort((a, b) => b[0] - a[0])
  
  const novoArrayValores =  arrayValoresColetadosResumoTotal.map(item => item)
  let valoresSomados = valoresTotaisResumoTotal.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)

  // setar valores
  novoArrayValores.forEach((valor,n)=>{
    const divs = divPai.querySelectorAll('.informacoesDaCategoria')
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
 
 atualizaH3(30)
 coletarValores(30)
 ValoresFiltradosPorDias(30)
 setarValores()
 valoresComparados(30)

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
    arrayValoresColetadosResumoTotal = []
    valoresTotaisResumoTotal = []
    atualizaH3(7)
    valoresComparados(7)
    coletarValores(7)
    ValoresFiltradosPorDias(7)
    setarValores()

  } else if (botaoClicado.innerText === '30 dias') {
    arrayValoresColetadosResumoTotal = []
    valoresTotaisResumoTotal = []
    atualizaH3(30)
    valoresComparados(30)
    coletarValores(30)
    ValoresFiltradosPorDias(30)
    setarValores()


  } else if (botaoClicado.innerText === '90 dias') {
    arrayValoresColetadosResumoTotal = []
    valoresTotaisResumoTotal = []
    atualizaH3(90)
    valoresComparados(90)
    coletarValores(90)
    ValoresFiltradosPorDias(90)
    setarValores()
  }
})
graficoResumoReceita.addEventListener('click', function (event) {
  const botoesFiltros = graficoResumoReceita.querySelectorAll('.botoes-filtro')
  const botaoClicado = [...botoesFiltros].filter(botao => botao === event.target)
  if (!botaoClicado.length) {
    addAtivoReceita()
  } 
})




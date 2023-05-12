const receitasLabel = document.querySelectorAll('#vendaLabel')
const graficoResumoReceita = document.getElementById('graficoReceita')
const resumoReceita = graficoResumoReceita.querySelector('.valorResumido')
const divResumos = graficoResumoReceita.querySelector('.resumosDivs')
const usuarioAtiv = JSON.parse(localStorage.usuarioAtivo)
const infos = JSON.parse(localStorage.getItem(`informacoes_id${usuarioAtiv.ID}`))


const arrayResumoReceitas = infos[7] ? infos[7] : []

const valoresTotais = []


// função para adicionar valor a valoresTotais

// RECEITA
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



// criar divis de resumos
arrayResumoReceitas.forEach((categoria) => {
  const divCategoria = document.createElement('div')
  divCategoria.classList.add('informacoesDaCategoria')
  divCategoria.classList.add('ocultar')
  divCategoria.innerHTML = `
      <h4 class="nomeDaCategoria">
        ${categoria}
      </h4>
      <span class="graficoPorcentagem"></span>
      <span class="porcentagemNumero">%</span>
      <span id='${categoria}' class="valorTotalDaCategoria"></span>
      `
  divResumos.appendChild(divCategoria)
})


// insere os valores coletados em suas respectivas categorias

function inserirValoresNaDiv(dias) {
  const resumosCategorias = graficoResumoReceita.querySelectorAll('.informacoesDaCategoria')

  resumosCategorias.forEach((categoria) => {
    const Data = new Date()
    Data.setDate(Data.getDate() - dias)
    const diasInseridos = Data.toISOString().slice(0, 10)

    const valores = []
    const valorTotal = []


    // coletar os valores

    receitasLabel.forEach((receita) => {
      const data = receita.querySelector('#data').innerText
      const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')

      if (data >= diasInseridos) {
        valorTotal.push(+valor)
      }
    })

    receitasLabel.forEach((receita) => {
      const nomeDaCategoria = categoria.querySelector('.nomeDaCategoria').innerText
      const comparador = receita.querySelector('#categoria').innerText
      const data = receita.querySelector('#data').innerText
      const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')

      if (comparador === nomeDaCategoria && data >= diasInseridos) {
        valores.push(+valor)
      }
    })

    // insere os valores

    const valorTotalDaCategoria = categoria.querySelector('.valorTotalDaCategoria')
    const graficoVerde = categoria.querySelector('.graficoPorcentagem')
    const textoPorcentagem = categoria.querySelector('.porcentagemNumero')

    let valoresAnteriores = valores.reduce((acomulador, valoresAnteriores) => +acomulador + valoresAnteriores, 0,)
    let valorTotalSomado = valorTotal.reduce((acomulador, valorTotalSomado) => +acomulador + valorTotalSomado, 0,)
    const porcentagem = ((valoresAnteriores / valorTotalSomado) * 100).toFixed(0)
    graficoVerde.style.width = `${porcentagem}%`
    valorTotalDaCategoria.innerText = valoresAnteriores
    textoPorcentagem.innerText = `${porcentagem}%`
  })
  AddOculto()
  organizaDivsValorCrescente()
}

// organiza do maior para o menor

function AddOculto(){
  const categorias = graficoResumoReceita.querySelectorAll('.informacoesDaCategoria')
  categorias.forEach((categoria)=>{
    if (!categoria.classList.contains('ocultar')) {
      categoria.classList.add('ocultar')
    }
  })
}

function organizaDivsValorCrescente() {
  // Seleciona todas as divs com a classe "valor"
  const divs = graficoResumoReceita.querySelector('.resumosDivs')
  const valores = divs.querySelectorAll('.valorTotalDaCategoria');
  
  
  // Converte os valores em números e ordena em ordem decrescente
  const valoresOrdenados = Array.from(valores)
    .map(valor => parseInt(valor.textContent.replace('.','')))
    .sort((a, b) => b - a);

  // Cria um novo array com as divs reordenadas
  const apenasOs4Primeiros = valoresOrdenados.slice(0,4)

  apenasOs4Primeiros.forEach((numero, n)=>{
    const valores = graficoResumoReceita.querySelectorAll('.valorTotalDaCategoria')
    const topItens = Array.from(valores).find(valor => +valor.innerText === numero)

    if (numero > 0) {
      topItens.parentElement.style.gridRow = n + 1
      topItens.parentElement.classList.remove('ocultar')
    }
    })
}

function valoresComparados(dias) {
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

  let valoresAnteriores = valores.reduce((acomulador, valoresAnteriores) => +acomulador + valoresAnteriores, 0,)

  const porcentagemComparada = graficoResumoReceita.querySelector('.porcentagemComparada')
  const diasSpan = graficoResumoReceita.querySelector('.diasComparados')
  const diferencaComparada = graficoResumoReceita.querySelector('.diferencaComparada')

  if (valoresAnteriores < valoresAtuais) {
    const porcentagem = +((valoresAtuais / valoresAnteriores) * 100).toFixed(0)
    const diferenca = valoresAtuais - valoresAnteriores
    console.log(porcentagem)

    porcentagemComparada.innerText = porcentagem !== Infinity ? `${porcentagem}% a mais nos últimos` : porcentagemComparada.innerText = `100% a mais nos últimos`

    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = `(R$ ${diferenca.toLocaleString('pt-BR')})`

  } else if (valoresAnteriores > valoresAtuais) {
    
    const porcentagem = +(valoresAnteriores / valoresAtuais * 100).toFixed(0)
    const diferenca = valoresAtuais - valoresAnteriores
    porcentagemComparada.innerText = porcentagem !== Infinity ? `${porcentagem}% a menos nos últimos` : porcentagemComparada.innerText = `100% a menos nos últimos`

    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = `(-R$ ${diferenca.toLocaleString('pt-BR').replace('-', '')})`

  } else if (valoresAnteriores === valoresAtuais) {
    const diferenca = valoresAtuais - valoresAnteriores

    porcentagemComparada.innerText = `0%  nos últimos`
    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = `(R$ ${diferenca.toLocaleString('pt-BR')})`

  }
}

inserirValoresNaDiv(30)
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
    atualizaH3(7)
    valoresComparados(7)
    inserirValoresNaDiv(7)

  } else if (botaoClicado.innerText === '30 dias') {
    atualizaH3(30)
    valoresComparados(30)
    inserirValoresNaDiv(30)

  } else if (botaoClicado.innerText === '90 dias') {
    atualizaH3(90)
    valoresComparados(90)
    inserirValoresNaDiv(90)

  }
})




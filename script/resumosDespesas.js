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

      let valoresTotaisSomados = valoresTotais.reduce((acomulador, valorAtual) => +acomulador + valorAtual, 0,)

      resumoDespesa.innerText = `R$ ${valoresTotaisSomados.toLocaleString('pt-BR')}`
    }
  })
}
atualizaH3Gastos(30)

// criar divis de resumos
arrayResumoDespesa.forEach((categoria) => {
  const divCategoria = document.createElement('div')
  divCategoria.classList.add('informacoesDaCategoria')

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


    let valoresSomados = valores.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)
    let valorTotalSomado = valorTotal.reduce((acomulador, valorTotalSomado) => +acomulador + valorTotalSomado, 0,)
    const porcentagem = ((valoresSomados / valorTotalSomado) * 100).toFixed(0)
    graficoVermelho.style.width = `${porcentagem}%`


    valorTotalDaCategoria.innerText = valoresSomados.toLocaleString('pt-BR')
    textoPorcentagem.innerText = `${porcentagem}%`
  })
  esconderDivsZeradasGastos()
  organizaDivsValorCrescenteGastos()
  ocultaroQuartoItemGastos()
}

// esconde as divs que tem valor 0

function esconderDivsZeradasGastos() {
  const divs = graficoResumoDespesa.querySelectorAll('.informacoesDaCategoria')
  divs.forEach((div) => {
    const valor = div.querySelector('.valorTotalDaCategoria').innerText
    if (valor === '0') {
      div.classList.add('zero')
    } else if (valor !== '0') {
      div.classList.remove('zero')
    }
  })
}

// organiza do maior para o menor

function organizaDivsValorCrescenteGastos() {
  // Seleciona todas as divs com a classe "valor"
  const divs = graficoResumoDespesa.querySelector('.resumosDivs')
  const valores = divs.querySelectorAll('.valorTotalDaCategoria');
  const categorias = divs.querySelectorAll('.informacoesDaCategoria')
  // Converte os valores em números e ordena em ordem decrescente
  const valoresOrdenados = Array.from(valores)
    .map(valor => parseInt(valor.textContent))
    .sort((a, b) => b - a);

  // Cria um novo array com as divs reordenadas
  const divsOrdenadas = valoresOrdenados.map(valo => {
    return Array.from(valores).find(valor => parseInt(valor.textContent) === valo);
  });


  divsOrdenadas.forEach((div, n) => {
    categorias.forEach((categoria) => {
      if (categoria.contains(div)) {
        categoria.style.gridRow = n + 1
      }
    })
  });
}

// deixa a amostra apenas os 4 maiores valores gerais das categorias

function ocultaroQuartoItemGastos() {
  const divs = graficoResumoDespesa.querySelector('.resumosDivs')
  const categorias = divs.querySelectorAll('.informacoesDaCategoria')

  categorias.forEach((categoria) => {
    const atributo = categoria.getAttribute('style')
    if (atributo) {

      const numeroDaColuna = atributo.match(/\d+/g)
      if (numeroDaColuna > 4) {
        categoria.classList.add('ocultar')
      } else {
        categoria.classList.remove('ocultar')
      }
    }
  })
}

// atualiza os valores dos spans de comparação

function valoresComparadosGastos(dias) {
  const valoresAtuais = +graficoResumoDespesa.querySelector('.valorResumido').innerText.replace('R$ ', '').replace('.', '')
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
    } else {
      valores.push(0)
    }
  })

  // inserir os valores

  let valoresSomados = valores.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)


  const porcentagemComparada = graficoResumoDespesa.querySelector('.porcentagemComparada')
  const diasSpan = graficoResumoDespesa.querySelector('.diasComparados')
  const diferencaComparada = graficoResumoDespesa.querySelector('.diferencaComparada')

  if (valoresSomados < valoresAtuais) {
    const porcentagem = +((valoresAtuais / valoresSomados) * 100).toFixed(0)

    const diferenca = valoresAtuais - valoresSomados

    if (porcentagem !== Infinity) {
      porcentagemComparada.innerText = `${porcentagem}% a mais nos últimos`
    } else if (porcentagem === Infinity) {
      porcentagemComparada.innerText = `100% a mais nos últimos`
    }

    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = diferenca.toLocaleString('pt-BR')

  } else if (valoresSomados > valoresAtuais) {
    const porcentagem = +(valoresSomados / valoresAtuais * 100).toFixed(0)

    const diferenca = valoresAtuais - valoresSomados

    if (porcentagem !== Infinity) {
      porcentagemComparada.innerText = `${porcentagem}% a menos nos últimos`
    } else if (porcentagem === Infinity) {
      porcentagemComparada.innerText = `100% a mais nos últimos`
    }

    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = diferenca.toLocaleString('pt-BR')
  } else if (valoresSomados === valoresAtuais) {
    porcentagemComparada.innerText = `0%  nos últimos`
    diasSpan.innerText = `${dias} dias`
  }



}

inserirValoresNaDivGastos(30)
organizaDivsValorCrescenteGastos()
ocultaroQuartoItemGastos()
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
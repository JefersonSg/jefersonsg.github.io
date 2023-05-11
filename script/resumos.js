const resumoReceita = document.querySelector('.valorResumoReceitas')
const receitasLabel = document.querySelectorAll('#vendaLabel')
const graficoResumo = document.querySelector('.grafico-resumo-bg')
const divResumos = document.querySelector('.resumosDivs')

const usuarioAtiv = JSON.parse(localStorage.usuarioAtivo)
const infos = JSON.parse(localStorage.getItem(`informacoes_id${usuarioAtiv.ID}`))


const arrayResumoReceitas = infos[7] ? infos[7] : []

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
    const diasInseridos = Data.toISOString().slice(0, 10)

    const dataDaReceita = receita.querySelector('#data').innerText

    if (dataDaReceita >= diasInseridos) {
      const valor = receita.querySelector('#valor').innerText.replace('+R$ ', '')
      valoresTotais.push(+valor)


      let valoresTotaisSomados = valoresTotais.reduce((acomulador, valorAtual) => +acomulador + valorAtual, 0,)

      resumoReceita.innerText = `R$ ${valoresTotaisSomados.toLocaleString('pt-BR')}`
    }
  })
}
atualizaH3(30)



// criar divis de resumos
arrayResumoReceitas.forEach((categoria) => {
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



  divResumos.appendChild(divCategoria)
})




function inserirValoresNaDiv(dias) {
  const resumosCategorias = document.querySelectorAll('.informacoesDaCategoria')

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


    let valoresSomados = valores.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)
    let valorTotalSomado = valorTotal.reduce((acomulador, valorTotalSomado) => +acomulador + valorTotalSomado, 0,)
    const porcentagem = ((valoresSomados / valorTotalSomado) * 100).toFixed(0)

    graficoVerde.style.width = `${porcentagem}%`


    valorTotalDaCategoria.innerText = valoresSomados
    textoPorcentagem.innerText = `${porcentagem}%`
  })
  esconderDivsZeradas()
  organizaDivsValorCrescente()
  ocultaroQuartoItem()
}


function esconderDivsZeradas() {
  const divs = document.querySelectorAll('.informacoesDaCategoria')
  divs.forEach((div) => {
    const valor = div.querySelector('.valorTotalDaCategoria').innerText
    if (valor === '0') {
      div.classList.add('zero')
    } else if (valor !== '0') {
      div.classList.remove('zero')
    }
  })
}

function organizaDivsValorCrescente() {
  // Seleciona todas as divs com a classe "valor"
  const divs = document.querySelector('.resumosDivs')
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

function ocultaroQuartoItem() {
  const divs = document.querySelector('.resumosDivs')
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

function valoresComparados(dias) {
  const valoresAtuais = +document.querySelector('.valorResumoReceitas').innerText.replace('R$ ', '').replace('.', '')
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

  let valoresSomados = valores.reduce((acomulador, valoresSomados) => +acomulador + valoresSomados, 0,)
  if (valoresSomados < valoresAtuais) {
    const porcentagem = +((valoresAtuais / valoresSomados) * 100).toFixed(0)

    console.log(porcentagem)

    const porcentagemComparada = document.querySelector('.porcentagemComparada')
    const diasSpan = document.querySelector('.diasComparados')
    const diferencaComparada = document.querySelector('.diferencaComparada')


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

    console.log(porcentagem)


    const porcentagemComparada = document.querySelector('.porcentagemComparada')
    const diasSpan = document.querySelector('.diasComparados')
    const diferencaComparada = document.querySelector('.diferencaComparada')


    const diferenca = valoresAtuais - valoresSomados

    if (porcentagem !== Infinity) {
      porcentagemComparada.innerText = `${porcentagem}% a menos nos últimos`
    } else if (porcentagem === Infinity) {
      porcentagemComparada.innerText = `100% a mais nos últimos`
    }

    diasSpan.innerText = `${dias} dias`
    diferencaComparada.innerText = diferenca.toLocaleString('pt-BR')
  }



}

inserirValoresNaDiv(30)
organizaDivsValorCrescente()
ocultaroQuartoItem()
valoresComparados(30)



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
    valoresComparados(7)

  } else if (botaoClicado.innerText === '30 dias') {
    atualizaH3(30)
    valoresComparados(30)

  } else if (botaoClicado.innerText === '90 dias') {
    atualizaH3(90)
    valoresComparados(90)

  }

  if (botaoClicado.innerText === '7 dias') {
    inserirValoresNaDiv(7)
  }
  else if (botaoClicado.innerText === '30 dias') {
    inserirValoresNaDiv(30)
  } else if (botaoClicado.innerText === '90 dias') {
    inserirValoresNaDiv(90)
  }

  // cria as divs de resumo de receitas

})




const ctx = document.getElementById('myChart');
const botoesBg = document.querySelector('.botoes-filtro-bg')
const botoesDias = document.querySelectorAll('.botoes-filtro')
const ganhoSpan = document.querySelector('.ganho-span')
const gastoSpan = document.querySelector('.gasto-span')
const emprestimoSpan = document.querySelector('.emprestimo-span')
const compraLabel = document.querySelectorAll('#compraLabel')
const vendaLabel = document.querySelectorAll('#vendaLabel')
const transferenciaLabel = document.querySelectorAll('#transferenciaLabel')
const emprestimosLabel = document.querySelectorAll('#emprestimoLabel')
const resumoEmprestimo = document.querySelector('.resumo-emprestimos')

const Data = new Date()
Data.setDate(Data.getDate() - 30)
const trintaDiasAtraz = Data.toISOString().slice(0, 10)

let ganhos = []
let gastos = []
let emprestimos = []

// valor dos emprestimos
emprestimosLabel.forEach((i) => {
  const dataDoEmprestimo = i.querySelector('.data').innerText
  if (dataDoEmprestimo >= trintaDiasAtraz) {
    const ValorEmprestimo = i.querySelector('.valorInit').innerText.replace('-R$ ', '')
    emprestimos.push(+ValorEmprestimo)
  } else {
    emprestimos.push(0)
  }
})

// valor dos gastos
compraLabel.forEach((i) => {
  const dataDoGasto = i.querySelector('#data').innerText
  if (dataDoGasto >= trintaDiasAtraz) {
    const ValorGasto = i.querySelector('#valor').innerText.replace('-R$ ', '')
    gastos.push(+ValorGasto)
  } else {
    gastos.push(0)
  }
})

// valor dos Ganhos
vendaLabel.forEach((i) => {
  const dataDaReceita = i.querySelector('#data').innerText
  if (dataDaReceita >= trintaDiasAtraz) {
    const ValorRecebido = i.querySelector('#valor').innerText.replace('+R$ ', '')
    ganhos.push(+ValorRecebido)
  } else {
    ganhos.push(0)
  }
})

// valor das transferencias
transferenciaLabel.forEach((i) => {
  const dataDaTransferencia = i.querySelector('#data').innerText
  if (dataDaTransferencia >= trintaDiasAtraz) {
    const ValorTransferido = i.querySelector('#valor').innerText
    if (ValorTransferido.slice(0, 1) === '+') {
      ganhos.push(+ValorTransferido.replace('+R$ ', ''))
    } else if (ValorTransferido.slice(0, 1) === '-')
      gastos.push(+ValorTransferido.replace('-R$ ', ''))
  } else {
    gastos.push(0)
    ganhos.push(0)
  }
})

// valor dos ganhos
let ganhosTotais = ganhos.reduce((acumulador, ganhosTotais) => acumulador + ganhosTotais, 0,);
ganhoSpan.innerText = `R$ ${ganhosTotais.toFixed(2)}`

// valor dos gastos
let gastosTotais = gastos.reduce((acumulador, gastosTotais) => acumulador + gastosTotais, 0,);
gastoSpan.innerText = `R$ ${(gastosTotais.toFixed(2) + '').replace('-', '')}`

// valor dos emprestimos 
let emprestimoTotal = emprestimos.reduce((acumulador, emprestimoTotal) => acumulador + emprestimoTotal, 0,);
emprestimoSpan.innerText = `R$ ${(emprestimoTotal.toFixed(2) + '').replace('-', '')}`

if (emprestimoTotal <= 0) {
  resumoEmprestimo.style.display = 'none'
} else {
  resumoEmprestimo.style.display = 'flex'
}
const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      label: 'R$',
      data: [gastosTotais, ganhosTotais, emprestimoTotal],
      backgroundColor: [
        '#F92828',
        '#00CF15',
        '#6D29D3',
      ],
      borderWidth: 1
    }]
  },
  options: {

  }
});

function trocarDatas(dias) {
  const Data = new Date()

  Data.setDate(Data.getDate() - dias)
  const seteDiasAtraz = Data.toISOString().slice(0, 10)

  let gastosDiasInseridos = []
  let ganhosDiasInseridos = []
  let emprestimosDiasInseridos = []


  // valor dos emprestimos
  emprestimosLabel.forEach((i) => {
    const dataDoEmprestimo = i.querySelector('.data').innerText
    if (dataDoEmprestimo >= seteDiasAtraz) {
      const ValorEmprestimo = i.querySelector('.valorInit').innerText.replace('-R$ ', '')
      emprestimosDiasInseridos.push(+ValorEmprestimo)
    } else {
      emprestimosDiasInseridos.push(0)
    }
  })

  // valor dos gastos
  compraLabel.forEach((i) => {
    const dataDoGasto = i.querySelector('#data').innerText
    if (dataDoGasto >= seteDiasAtraz) {
      const ValorGasto = i.querySelector('#valor').innerText.replace('-R$ ', '')
      gastosDiasInseridos.push(+ValorGasto)
      console.log(ValorGasto)
    } else {
      gastosDiasInseridos.push(0)
    }
  })

  // valor dos Ganhos
  vendaLabel.forEach((i) => {
    const dataDaReceita = i.querySelector('#data').innerText
    if (dataDaReceita >= seteDiasAtraz) {
      const ValorRecebido = i.querySelector('#valor').innerText.replace('+R$ ', '')
      ganhosDiasInseridos.push(+ValorRecebido)
      console.log(ValorRecebido)
    } else {
      ganhosDiasInseridos.push(0)
    }
  })

  transferenciaLabel.forEach((i) => {
    const dataDaTransferencia = i.querySelector('#data').innerText
    if (dataDaTransferencia >= seteDiasAtraz) {
      const ValorTransferido = i.querySelector('#valor').innerText
      if (ValorTransferido.slice(0, 1) === '+') {
        ganhosDiasInseridos.push(+ValorTransferido.replace('+R$ ', ''))
      } else if (ValorTransferido.slice(0, 1) === '-')
        gastosDiasInseridos.push(+ValorTransferido.replace('-R$ ', ''))
    } else {
      gastosDiasInseridos.push(0)
      ganhosDiasInseridos.push(0)
    }
  })

  let ganhosTotais = ganhosDiasInseridos.reduce((acumulador, ganhosTotais) => acumulador + ganhosTotais, 0,);
  chart.data.datasets[0].data[1] = ganhosTotais
  ganhoSpan.innerText = `R$ ${ganhosTotais.toFixed(2)}`


  let gastosTotais = gastosDiasInseridos.reduce((acumulador, gastosTotais) => acumulador + gastosTotais, 0,);
  chart.data.datasets[0].data[0] = gastosTotais
  gastoSpan.innerText = `R$ ${gastosTotais.toFixed(2)}`

  let emprestimoTotal = emprestimosDiasInseridos.reduce((acumulador, emprestimoTotal) => acumulador + emprestimoTotal, 0,);

  chart.data.datasets[0].data[2] = emprestimoTotal
  emprestimoSpan.innerText = `R$ ${emprestimoTotal.toFixed(2)}`
  chart.update()

  if (emprestimoTotal <= 0) {
    resumoEmprestimo.style.display = 'none'
  } else {
    resumoEmprestimo.style.display = 'flex'
  }
}
// botoes de 7/30 e 90 dias atualizando o grafico
botoesBg.addEventListener('click', (e) => {
  const botoes = botoesBg.querySelectorAll('.botoes-filtro')
  const botaoClicado = e.target
  // novo Grafico
  if (!botaoClicado.classList.contains('ativo')) {

    if (botaoClicado.innerText === '7 dias') {
      trocarDatas(7)
    } else if (botaoClicado.innerText === '30 dias') {
      trocarDatas(30)
    } else if (botaoClicado.innerText === '90 dias') {
      trocarDatas(90)
    }

  }
  // adiciona ativo nos dias acima do grafico

  if (botaoClicado.classList[0] === 'botoes-filtro') {
    botaoClicado.classList.add('ativo')
    botoes.forEach((botao) => {
      if (!botao.contains(botaoClicado)) {
        botao.classList.remove('ativo')
      }
    })
  }


})





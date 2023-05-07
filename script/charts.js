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
// botoes de 7/30 e 90 dias atualizando o grafico
botoesBg.addEventListener('click', (e) => {
  const botoes = botoesBg.querySelectorAll('.botoes-filtro')
  const botaoClicado = e.target
  // novo Grafico
  if (!botaoClicado.classList.contains('ativo')) {

    if (botaoClicado.innerText === '7 dias') {
      const Data = new Date()

      Data.setDate(Data.getDate() - 7)
      const seteDiasAtraz = Data.toISOString().slice(0, 10)

      let gastos7dias = []
      let ganhos7dias = []
      let emprestimos7dias = []


      // valor dos emprestimos
      emprestimosLabel.forEach((i) => {
        const dataDoEmprestimo = i.querySelector('.data').innerText
        if (dataDoEmprestimo >= seteDiasAtraz) {
          const ValorEmprestimo = i.querySelector('.valorInit').innerText.replace('-R$ ', '')
          emprestimos7dias.push(+ValorEmprestimo)
        } else {
          emprestimos7dias.push(0)
        }
      })

      // valor dos gastos
      compraLabel.forEach((i) => {
        const dataDoGasto = i.querySelector('#data').innerText
        if (dataDoGasto >= seteDiasAtraz) {
          const ValorGasto = i.querySelector('#valor').innerText.replace('-R$ ', '')
          gastos7dias.push(+ValorGasto)
          console.log(ValorGasto)
        } else {
          gastos7dias.push(0)
        }
      })

      // valor dos Ganhos
      vendaLabel.forEach((i) => {
        const dataDaReceita = i.querySelector('#data').innerText
        if (dataDaReceita >= seteDiasAtraz) {
          const ValorRecebido = i.querySelector('#valor').innerText.replace('+R$ ', '')
          ganhos7dias.push(+ValorRecebido)
          console.log(ValorRecebido)
        } else {
          ganhos7dias.push(0)
        }
      })

      transferenciaLabel.forEach((i) => {
        const dataDaTransferencia = i.querySelector('#data').innerText
        if (dataDaTransferencia >= seteDiasAtraz) {
          const ValorTransferido = i.querySelector('#valor').innerText
          if (ValorTransferido.slice(0, 1) === '+') {
            ganhos7dias.push(+ValorTransferido.replace('+R$ ', ''))
          } else if (ValorTransferido.slice(0, 1) === '-')
            gastos7dias.push(+ValorTransferido.replace('-R$ ', ''))
        } else {
          gastos7dias.push(0)
          ganhos7dias.push(0)
        }
      })

      let ganhosTotais = ganhos7dias.reduce((acumulador, ganhosTotais) => acumulador + ganhosTotais, 0,);
      chart.data.datasets[0].data[1] = ganhosTotais
      ganhoSpan.innerText = `R$ ${ganhosTotais.toFixed(2)}`


      let gastosTotais = gastos7dias.reduce((acumulador, gastosTotais) => acumulador + gastosTotais, 0,);
      chart.data.datasets[0].data[0] = gastosTotais
      gastoSpan.innerText = `R$ ${gastosTotais.toFixed(2)}`

      let emprestimoTotal = emprestimos7dias.reduce((acumulador, emprestimoTotal) => acumulador + emprestimoTotal, 0,);

      chart.data.datasets[0].data[2] = emprestimoTotal
      emprestimoSpan.innerText = `R$ ${emprestimoTotal.toFixed(2)}`
      chart.update()

      if (emprestimoTotal <= 0) {
        resumoEmprestimo.style.display = 'none'
      } else {
        resumoEmprestimo.style.display = 'flex'
      }


    } else if (botaoClicado.innerText === '30 dias') {

      const Data = new Date()
      Data.setDate(Data.getDate() - 30)
      const trintaDiasAtraz = Data.toISOString().slice(0, 10)

      let gastos30dias = []
      let ganhos30dias = []
      let emprestimos30dias = []


      // valor dos emprestimos
      emprestimosLabel.forEach((i) => {
        const dataDoEmprestimo = i.querySelector('.data').innerText
        if (dataDoEmprestimo >= trintaDiasAtraz) {
          const ValorEmprestimo = i.querySelector('.valorInit').innerText.replace('-R$ ', '')
          emprestimos30dias.push(+ValorEmprestimo)
        } else {
          emprestimos30dias.push(0)
        }
      })

      // valor dos gastos
      compraLabel.forEach((i) => {
        const dataDoGasto = i.querySelector('#data').innerText
        if (dataDoGasto >= trintaDiasAtraz) {
          const ValorGasto = i.querySelector('#valor').innerText.replace('-R$ ', '')
          gastos30dias.push(+ValorGasto)
        } else {
          gastos30dias.push(0)
        }
      })

      // valor dos Ganhos
      vendaLabel.forEach((i) => {
        const dataDaReceita = i.querySelector('#data').innerText
        if (dataDaReceita >= trintaDiasAtraz) {
          const ValorRecebido = i.querySelector('#valor').innerText.replace('+R$ ', '')
          ganhos30dias.push(+ValorRecebido)
        } else {
          ganhos30dias.push(0)
        }
      })

      // valor das transferencias
      transferenciaLabel.forEach((i) => {
        const dataDaTransferencia = i.querySelector('#data').innerText
        if (dataDaTransferencia >= trintaDiasAtraz) {
          const ValorTransferido = i.querySelector('#valor').innerText
          if (ValorTransferido.slice(0, 1) === '+') {
            ganhos30dias.push(+ValorTransferido.replace('+R$ ', ''))
          } else if (ValorTransferido.slice(0, 1) === '-')
            gastos30dias.push(+ValorTransferido.replace('-R$ ', ''))
        } else {
          gastos30dias.push(0)
          ganhos30dias.push(0)
        }
      })

      let ganhosTotais = ganhos30dias.reduce((acumulador, ganhosTotais) => acumulador + ganhosTotais, 0,);
      chart.data.datasets[0].data[1] = ganhosTotais
      ganhoSpan.innerText = `R$ ${ganhosTotais.toFixed(2)}`


      let gastosTotais = gastos30dias.reduce((acumulador, gastosTotais) => acumulador + gastosTotais, 0,);
      chart.data.datasets[0].data[0] = gastosTotais
      gastoSpan.innerText = `R$ ${gastosTotais.toFixed(2)}`

      let emprestimoTotal = emprestimos30dias.reduce((acumulador, emprestimoTotal) => acumulador + emprestimoTotal, 0,);

      if (emprestimoTotal <= 0) {
        resumoEmprestimo.style.display = 'none'
      } else {
        resumoEmprestimo.style.display = 'flex'
      }

      chart.data.datasets[0].data[2] = emprestimoTotal
      emprestimoSpan.innerText = `R$ ${emprestimoTotal.toFixed(2)}`
      chart.update()
      gastos30dias = []
      ganhos30dias = []
      emprestimos30dias = []
    } else if (botaoClicado.innerText === '90 dias') {
      const Data = new Date()
      Data.setDate(Data.getDate() - 90)
      const noventaDiasAtraz = Data.toISOString().slice(0, 10)

      let gastos90dias = []
      let ganhos90dias = []
      let emprestimos90dias = []


      // valor dos emprestimos
      emprestimosLabel.forEach((i) => {
        const dataDoEmprestimo = i.querySelector('.data').innerText
        if (dataDoEmprestimo >= noventaDiasAtraz) {
          const ValorEmprestimo = i.querySelector('.valorInit').innerText.replace('-R$ ', '')
          emprestimos90dias.push(+ValorEmprestimo)
        } else {
          emprestimos90dias.push(0)
        }
      })

      // valor dos gastos
      compraLabel.forEach((i) => {
        const dataDoGasto = i.querySelector('#data').innerText
        if (dataDoGasto >= noventaDiasAtraz) {
          const ValorGasto = i.querySelector('#valor').innerText.replace('-R$ ', '')
          gastos90dias.push(+ValorGasto)
        } else {
          gastos90dias.push(0)
        }
      })

      // valor dos Ganhos
      vendaLabel.forEach((i) => {
        const dataDaReceita = i.querySelector('#data').innerText
        if (dataDaReceita >= noventaDiasAtraz) {
          const ValorRecebido = i.querySelector('#valor').innerText.replace('+R$ ', '')
          ganhos90dias.push(+ValorRecebido)
        } else {
          ganhos90dias.push(0)
        }
      })

      // valor das transferencias
      transferenciaLabel.forEach((i) => {
        const dataDaTransferencia = i.querySelector('#data').innerText
        if (dataDaTransferencia >= noventaDiasAtraz) {
          const ValorTransferido = i.querySelector('#valor').innerText
          if (ValorTransferido.slice(0, 1) === '+') {
            ganhos90dias.push(+ValorTransferido.replace('+R$ ', ''))
          } else if (ValorTransferido.slice(0, 1) === '-')
            gastos90dias.push(+ValorTransferido.replace('-R$ ', ''))
        } else {
          gastos90dias.push(0)
          ganhos90dias.push(0)
        }
      })

      let ganhosTotais = ganhos90dias.reduce((acumulador, ganhosTotais) => acumulador + ganhosTotais, 0,);
      chart.data.datasets[0].data[1] = ganhosTotais
      ganhoSpan.innerText = `R$ ${ganhosTotais.toFixed(2)}`


      let gastosTotais = gastos90dias.reduce((acumulador, gastosTotais) => acumulador + gastosTotais, 0,);
      chart.data.datasets[0].data[0] = gastosTotais
      gastoSpan.innerText = `R$ ${gastosTotais.toFixed(2)}`

      let emprestimoTotal = emprestimos90dias.reduce((acumulador, emprestimoTotal) => acumulador + emprestimoTotal, 0,);

      if (emprestimoTotal <= 0) {
        resumoEmprestimo.style.display = 'none'
      } else {
        resumoEmprestimo.style.display = 'flex'
      }

      chart.data.datasets[0].data[2] = emprestimoTotal
      emprestimoSpan.innerText = `R$ ${emprestimoTotal.toFixed(2)}`
      chart.update()
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





const ctx = document.getElementById('myChart');
const botoesBg = document.querySelector('.botoes-filtro-bg')
const botoesDias = document.querySelectorAll('.botoes-filtro')
// import { Colors } from "chart.js";
const gastoSpan = document.querySelector('.gasto-span')
const ganhoSpan = document.querySelector('.ganho-span')

const usuarioAtiv = JSON.parse(localStorage.usuarioAtivo)
const infos = JSON.parse(localStorage.getItem(`informacoes_id${usuarioAtiv.ID}`))

let info = [...infos[0]]

let ganhos = []
let gastos = []


info.forEach((i)=>{
  if (i > 0) {
    ganhos.push(i)
  } else if ( i < 0) {
    gastos.push(i)
  } else {alert('erro')}
})


  let ganhosTotais = ganhos.reduce((acumulador, ganhosTotais) => acumulador + ganhosTotais, 0,);
  let gastosTotais = gastos.reduce((acumulador, gastosTotais) => acumulador + gastosTotais, 0,);
gastoSpan.innerText = `R$ ${(gastosTotais.toFixed(2) + '').replace('-','')}`
  ganhoSpan.innerText = `R$ ${ganhosTotais.toFixed(2)}`
  

  const chart =   new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        label: 'R$',
        data: [gastosTotais,ganhosTotais],
        backgroundColor: [
          '#F92828',
          '#00CF15',
        ],
        borderWidth: 1
      }]
    },
    options: {
  
    }
  });


botoesBg.addEventListener('click',(e)=>{
  const botoes =  botoesBg.querySelectorAll('.botoes-filtro')
  const  botaoClicado = e.target
// novo Grafico
  if (!botaoClicado.classList.contains('ativo')) {
    if (botaoClicado.innerText === '7 dias'){
      chart.destroy()
      console.log(chart.id)
      const chart7dias =   new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            label: 'R$',
            data: [gastosTotais,ganhosTotais],
            backgroundColor: [
              '#F92828',
              '#00CF15',
            ],
            borderWidth: 1
          }]
        },
        options: {
      
        }
      });
      console.log(chart7dias.id)
    }
  } else  if (botaoClicado.innerText === '30 dias'){
      chart7dias.destroy()
      const chart30dias =   new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            label: 'R$',
            data: [gastosTotais,ganhosTotais],
            backgroundColor: [
              '#F92828',
              '#00CF15',
            ],
            borderWidth: 1
          }]
        },
        options: {
      
        }
      })}
  // adiciona ativo nos dias acima do grafico

  if (botaoClicado.classList[0] === 'botoes-filtro') {
    botaoClicado.classList.add('ativo')
    botoes.forEach((botao)=>{
      if (!botao.contains(botaoClicado)) {
        botao.classList.remove('ativo')
      }
    })
  }


})





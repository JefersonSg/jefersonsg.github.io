const ctx = document.getElementById('myChart');
// import { Colors } from "chart.js";
const gastoSpan = document.querySelector('.gasto-span')
const ganhoSpan = document.querySelector('.ganho-span')

const usuarioAtivo = JSON.parse(localStorage.usuarioAtivo)
const infos = JSON.parse(localStorage.getItem(`informacoes_id${usuarioAtivo.ID}`))


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
console.log(gastosTotais.toFixed(2))
gastoSpan.innerText = `R$ ${(gastosTotais.toFixed(2) + '').replace('-','')}`
  ganhoSpan.innerText = `R$ ${ganhosTotais.toFixed(2)}`
  
new Chart(ctx, {
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

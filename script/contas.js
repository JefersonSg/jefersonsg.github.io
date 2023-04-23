const parcelasInit = document.querySelectorAll('#parcelas');
const InputValorInit = document.querySelectorAll('#valorInput');
const valorInit = document.querySelectorAll('#total');
const jurosCompInit = document.getElementById('juros-compostos');
const jurosInit = document.getElementById('emprestimo-juros');
const totalPagoInit = document.getElementById('totalPago');

InputValorInit.forEach((i)=>{
  i.addEventListener('keydown',(event) => {
    console.log(event.key)
    if (!/[\d\s.,]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete") {
      event.preventDefault()
    }
  })
})


//  COMPRA
function contaCompra() {
  let valorReplaced = +(+(InputValorInit[0].value).replace(',','.')).toFixed(2)

  let valorAtual = `${(parcelasInit[0].value)}x de R$ ${(valorReplaced / parcelasInit[0].value
  ).toFixed(2)}`
    valorInit[0].value = valorAtual;
}

InputValorInit[0].addEventListener('change', ()=>{
  InputValorInit[0].value =  (+InputValorInit[0].value.replace(',','.')).toFixed(2)

});
InputValorInit[0].addEventListener('keyup', contaCompra);
parcelasInit[0].addEventListener('change', contaCompra);
InputValorInit[0].addEventListener('keyup', contaCompra);
parcelasInit[0].addEventListener('change', contaCompra);


// VENDAS
InputValorInit[1].addEventListener('change', ()=>{
  InputValorInit[1].value =  (+InputValorInit[1].value.replace(',','.')).toFixed(2)
});
function contaVenda() {
  let valorReplaced = +(+(InputValorInit[1].value).replace(',','.')).toFixed(2)

  let valorAtual = `${parcelasInit[1].value}x de R$ ${(valorReplaced / parcelasInit[1].value
  ).toFixed(2)}`
  valorInit[1].value = valorAtual
}
InputValorInit[1].addEventListener('keyup',contaVenda);
parcelasInit[1].addEventListener(
  'change', contaVenda);

// PIX
InputValorInit[2].addEventListener('change', ()=>{
  InputValorInit[2].value =  (+InputValorInit[2].value.replace(',','.')).toFixed(2)
});
InputValorInit[2].addEventListener('keyup', () => {
  let valorReplaced = +(InputValorInit[2].value).replace(',','.')

    let valorAtual = `R$ ${valorReplaced.toFixed(2)}`
    valorInit[2].value = valorAtual
   },
);

  // Emprestimo

  function contaEmp() {

    const jurosTotal =
    (jurosCompInit.selectedIndex * parcelasInit[2].selectedIndex +
      jurosInit.selectedIndex) /
    100;

  const valorFim = +(InputValorInit[3].value.replace(',','.')) * jurosTotal + +(InputValorInit[3].value.replace(',','.'))

  valorInit[3].value = `${parcelasInit[2].selectedIndex}x de R$ ${(
    valorFim / parcelasInit[2].selectedIndex
  ).toFixed(2)}`;


  totalPagoInit.value = `Total ${valorFim.toFixed(2)}`;
}
InputValorInit[3].addEventListener('change', ()=>{
  InputValorInit[3].value =  (+InputValorInit[3].value.replace(',','.')).toFixed(2)
});
InputValorInit[3].addEventListener('keyup', contaEmp);
parcelasInit[2].addEventListener('change', contaEmp);
jurosInit.addEventListener('change', contaEmp);
jurosCompInit.addEventListener('change', contaEmp);

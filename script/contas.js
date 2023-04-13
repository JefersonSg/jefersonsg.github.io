const parcelasInit = document.querySelectorAll('#parcelas');
const InputValorInit = document.querySelectorAll('#valorInput');
const valorInit = document.querySelectorAll('#total');
const jurosCompInit = document.getElementById('juros-compostos');
const jurosInit = document.getElementById('emprestimo-juros');
const totalPagoInit = document.getElementById('totalPago');

function contaEmp() {
  let valorReplaced = +(+(InputValorInit[3].value).replace(',','.')).toFixed(2)

    const jurosTotal =
    (jurosCompInit.selectedIndex * parcelasInit[2].selectedIndex +
      jurosInit.selectedIndex) /
    100;
  const valorFim = valorReplaced * jurosTotal + valorReplaced;

  valorInit[3].value = `${parcelasInit[2].selectedIndex}x de R$ ${(
    valorFim / parcelasInit[2].selectedIndex
  ).toFixed(2)}`;

  totalPagoInit.value = `Total ${valorFim.toFixed(2)}`;
}
InputValorInit[3].addEventListener('keyup', contaEmp);
parcelasInit[2].addEventListener('change', contaEmp);
jurosInit.addEventListener('change', contaEmp);
jurosCompInit.addEventListener('change', contaEmp);

//  COMPRA
function contaCompra() {
  let valorReplaced = +(+(InputValorInit[0].value).replace(',','.')).toFixed(2)

  let valorAtual = `${(parcelasInit[0].value)}x de R$ ${(valorReplaced / parcelasInit[0].value
  ).toFixed(2)}`
    valorInit[0].value = valorAtual;
}
InputValorInit[0].addEventListener('keyup', contaCompra);
parcelasInit[0].addEventListener('change', contaCompra);

InputValorInit[0].addEventListener('keyup', contaCompra);
parcelasInit[0].addEventListener('change', contaCompra);

// PIX
InputValorInit[2].addEventListener('keyup', () => {
  let valorReplaced = +(+(InputValorInit[2].value).replace(',','.')).toFixed(2)

    let valorAtual = `R$ ${valorReplaced}`
    valorInit[2].value = valorAtual
   },
);

// VENDAS
function contaVenda() {
  let valorReplaced = +(+(InputValorInit[1].value).replace(',','.')).toFixed(2)

  let valorAtual = `${parcelasInit[1].value}x de R$ ${(valorReplaced / parcelasInit[1].value
  ).toFixed(2)}`
  valorInit[1].value = valorAtual
}
InputValorInit[1].addEventListener('keyup',contaVenda);
parcelasInit[1].addEventListener(
  'change', contaVenda);

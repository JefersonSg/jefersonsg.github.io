const parcelasInit = document.querySelectorAll('#parcelas');
const InputValorInit = document.querySelectorAll('#valorInput');
const valorInit = document.querySelectorAll('#total');
const jurosCompInit = document.getElementById('juros-compostos');
const jurosInit = document.getElementById('emprestimo-juros');
const totalPagoInit = document.getElementById('totalPago');

function contaEmp() {
  const jurosTotal =
    (jurosCompInit.selectedIndex * parcelasInit[2].selectedIndex +
      jurosInit.selectedIndex) /
    100;
  const valorFim = InputValorInit[3].value * jurosTotal + +InputValorInit[3].value;

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
    valorInit[0].value = `${parcelasInit[0].value}x de R$ ${(
      InputValorInit[0].value / parcelasInit[0].value
    ).toFixed(2)}`;
}
InputValorInit[0].addEventListener('keyup', contaCompra);
parcelasInit[0].addEventListener('change', contaCompra);

InputValorInit[0].addEventListener('keyup', contaCompra);
parcelasInit[0].addEventListener('change', contaCompra);

// PIX
InputValorInit[2].addEventListener(
   'change',
  () => (valorInit[2].value = `R$ ${(InputValorInit[2].value * 1).toFixed(2)}`),
);

// VENDAS
function contaVenda() {
  valorInit[1].value = `${parcelasInit[1].value}x de R$ ${(
    InputValorInit[1].value / parcelasInit[1].value
  ).toFixed(2)}`
}
InputValorInit[1].addEventListener('change',contaVenda);
parcelasInit[1].addEventListener(
  'change', contaVenda);

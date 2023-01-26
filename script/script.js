var select = document.getElementById("select");
const inpt = document.getElementById("coisa");
const valor = document.getElementById("valor");
const total = document.getElementById("total");
const botao = document.getElementById("botao-add");

function mostrar() {
  console.log(botao);
}

botao.addEventListener("click", mostrar);

select.addEventListener("change", () => {
  const index = select.selectedIndex + 1;
  const parcelas = document.getElementById("parcelas");
  total.value = `total de ${index * valor.value}`;
  inpt.textContent = `selectedIndex: ${index}`;
  parcelas.value = `em ${index} vezes`;
});

const $ = document.querySelectorAll.bind(document);
const parcelas = $("#parcelas");
const valores = $("#valor");
const totais = $("#total");
const receita = $("#receita");
const vencimentos = $("#vencimento");
const adicionar = $("#botao-add");
const jurosComp = document.getElementById("juros-compostos");
const juros = document.getElementById("emprestimo-juros");
const nomeMov = $("#movimentacao");
const aReceber = document.getElementById("aReceber");
const valorMensal = document.getElementById("valorMensal");
const vencimentoTotal = document.getElementById("vencimentoTotal");
const totalFinal = document.getElementById("totalFinal");
const div = document.querySelector(".selecao-conteudo");
const receberOuPagar = $(".selecao-conteudo input");
const lucro = document.getElementById('totalPago')


// COMPRAS
valores[0].addEventListener("change", () => {
  totais[0].value = `R$ ${valores[0].value * parcelas[0].value}`;
});

parcelas[0].addEventListener("click", () => {
  totais[0].value = `R$ ${(valores[0].value / parcelas[0].value).toFixed(2)}`;
});


// Emprestimo 



valores[3].addEventListener("keyup", () => {

  const jurosMes = +( (valores[3].value) * (jurosComp.selectedIndex / 100));
  const jurosTotal =
    valores[3].value / parcelas[2].selectedIndex * (juros.selectedIndex / 100);
    const valorTotal = valores[3].value / parcelas[2].selectedIndex + jurosTotal + jurosMes;

    totais[3].value = `${parcelas[2].selectedIndex}x de R$ ${(valorTotal).toFixed(2)}`;

    lucro.value = `Total ${(valorTotal * parcelas[2].selectedIndex).toFixed(2)}`

});

parcelas[2].addEventListener("click", () => {
  const jurosMes = +((valores[3].value) * (jurosComp.selectedIndex /100));
  const jurosTotal = valores[3].value / parcelas[2].selectedIndex * (juros.selectedIndex / 100);
    const valorTotal = valores[3].value / parcelas[2].selectedIndex + jurosTotal + jurosMes;

    totais[3].value = `${parcelas[2].selectedIndex}x de R$ ${(valorTotal).toFixed(2)}`;
    lucro.value = `Total ${(valorTotal * parcelas[2].selectedIndex).toFixed(2)}`
  
});

juros.addEventListener("change", () => {
  const jurosMes = +((valores[3].value) * (jurosComp.selectedIndex /100));
  const jurosTotal =
  valores[3].value / parcelas[2].selectedIndex * (juros.selectedIndex / 100);
    const valorTotal = valores[3].value / parcelas[2].selectedIndex + jurosTotal + jurosMes;

  if (juros.selectedIndex >= 0) {
    totais[3].value = `${parcelas[2].selectedIndex}x de R$ ${(valorTotal).toFixed(2)}`;
    lucro.value = `Total ${(valorTotal * parcelas[2].selectedIndex).toFixed(2)}`
  }
});

jurosComp.addEventListener("change", () => {

  const jurosMes = +((valores[3].value) * (jurosComp.selectedIndex /100));
  const jurosTotal = valores[3].value / parcelas[2].selectedIndex * (juros.selectedIndex / 100);
    const valorTotal = valores[3].value / parcelas[2].selectedIndex + jurosTotal + jurosMes;

  if (jurosComp.selectedIndex >= 0) {
    totais[3].value = `${parcelas[2].selectedIndex}x de R$ ${(valorTotal).toFixed(2)}`
    lucro.value = `Total ${(valorTotal * parcelas[2].selectedIndex).toFixed(2)}`
  }
});

// PIX

valores[2].addEventListener("change", () => {
  const troca = valores[2].value;

  totais[2].value = `R$ ${troca * 1}`;
});

// VENDAS

valores[1].addEventListener("change", () => {
  totais[1].value = `R$ ${valores[1].value * parcelas[1].selectedIndex}`;
});


parcelas[1].addEventListener("click", () => {
  totais[1].value = `R$ ${(valores[1].value / parcelas[1].selectedIndex).toFixed(2)}`;
});


// Movimentaçoes


// Compra
adicionar[0].addEventListener("click", function () {
  if ((totais[0].value !== "R$0") & (nomeMov[0].value !== "")) {
    const table = document.getElementById("tabela");
    const row = table.insertRow(0);

    row.insertCell(0).innerHTML = `
        <img src="./img/Movimentacoes/compra2.svg" width="32" height="29" alt="saquinho de dinheiro"> <input disabled id="nomeMov" class="testando" style="background: #F92828; color: #000;" value="${nomeMov[0].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
    `;
    row.insertCell(1).innerHTML = `
        <input disabled id="aReceber" style="background: #F92828; color: #000;" value="${adicionar[0].value}" type="text" name="data" placeholder="A receber">
       `;
    row.insertCell(2).innerHTML = `
        <input disabled id="valorMensal" style="background: #F92828; color: #000;" value="R$${
        valores[0].value * 1
        }"  type="text" name="Valor" placeholder="Valor Mensal">
    `;
    row.insertCell(3).innerHTML = `
        <input disabled id="vencimentoTotal" style="background: #F92828; color: #000;" value="Comprou no dia ${
        vencimentos[0].value * 1
        }" type="text" name="data" placeholder="Comprou no dia X">`;
    row.insertCell(4).innerHTML = `
       <input disabled id="parcelasTotal" style="background: #F92828; color: #000;" type="text" name="parcelas" 
        value="pagou em ${parcelas[0].value}x"
        placeholder="em 10x" >
        `;
    row.insertCell(5).innerHTML = `
        <p id="igual">=</p> <input disabled id="totalFinal" style="background: #F92828; color: #000;" type="text" name="valorTotal" 
        value=" -${totais[0].value}"  placeholder="Valor Total" >
    `;
    nomeMov[0].value = "";
    receita[0].selectedIndex = "";
    vencimentos[0].value = "";
    valores[0].value = "";
    parcelas[0].selectedIndex = "1";
    totais[0].value = "";
  } else {
    alert("Preencha todos os campos");
  }
});

// Venda

adicionar[1].addEventListener("click", function () {
  if (
    valores[1].value &&
    nomeMov[1].value &&
    vencimentos[1].value != 0 &&
    totais[1].value != "R$0"
  ) {
    const table = document.getElementById("tabela");
    const row = table.insertRow(0);

    row.insertCell(0).innerHTML = `
        <img src="./img/Movimentacoes/venda3.svg" width="32" height="29" alt="valor"><input disabled id="nomeMov" value="${nomeMov[1].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
    `;
    row.insertCell(1).innerHTML = `
        <input disabled id="aReceber" value="${adicionar[1].value}" type="text" name="data" placeholder="A receber">
    `;
    row.insertCell(2).innerHTML = `
       <input disabled value="R$${
      valores[1].value * 1
       }" id="valorMensal" type="text" name="razao[]" placeholder="Valor Mensal">
    `;
    row.insertCell(3).innerHTML = `
       <input disabled id="vencimentoTotal" value="Vendeu no dia ${
       vencimentos[1].value * 1
       }" type="text" name="data" placeholder="Comprou no dia X">
    `;
    row.insertCell(4).innerHTML = `
        <input disabled id="parcelasTotal" type="text" name="razao[]"
        value="Faltam ${parcelas[1].value}x"
        placeholder="em 10x" >
    `;
    row.insertCell(5).innerHTML = `
        <p id="igual">=</p> <input disabled id="totalFinal"  class="totalFinal" type="text" name="valorTotal" 
        value="+${totais[1].value}"  placeholder="Valor Total" >
    `;

    valores[1].value = "";
    totais[1].value = "";
    vencimentos[1].value = "";
    nomeMov[1].value = "";
  } else {
    alert("Preencha todos os campos");
  }
});

// Pix

adicionar[2].addEventListener("click", function () {
  if (
    valores[2].value &&
    nomeMov[2].value &&
    vencimentos[2].value != 0 &&
    receita[1].value == "+" &&
    totais[2].value != "R$0"
  ) {
    const table = document.getElementById("tabela");
    const row = table.insertRow(0);

    row.insertCell(0).innerHTML = `
        <img src="./img/Movimentacoes/pix.svg" style="margin-left: -2px; padding-right: 4px; width="31 " height="29" alt="Pix"><input disabled id="nomeMov" back value="${nomeMov[2].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
    `;
    row.insertCell(1).innerHTML = `<input disabled id="vencimentoTotal" value=" ${
      "no dia " + vencimentos[2].value
    } " type="text" name="data" placeholder="Comprou no dia X">`;
    row.insertCell(2).innerHTML = `
        <input disabled value="R$${valores[2].value}" id="valorMensal" type="text" name="razao[]" placeholder="Valor Mensal">
    `;

    row.insertCell(3).innerHTML = `
        <p id="igual">=</p> <input disabled id="totalFinal"  type="text" name="valorTotal" 
        value=" +${totais[2].value}"  placeholder="Valor Total" >
    `;
    valores[2].value = "";
    totais[2].value = "";
    vencimentos[2].value = "";
    nomeMov[2].value = "";
    receita[1].value = "";
  } else if (
    valores[2].value &&
    nomeMov[2].value &&
    vencimentos[2].value != 0 &&
    receita[1].value == "-" &&
    totais[2].value != "R$0"
  ) {
    const table = document.getElementById("tabela");
    const row = table.insertRow(0);

    row.insertCell(0).innerHTML = `
       <img src="./img/Movimentacoes/pix.svg"  style="margin-left: -2px; padding-right: 4px; width="31 " height="29" alt="Pix"><input disabled id="nomeMov" style="background: #F92828; color: #000;"  value="${nomeMov[2].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
    `;
    row.insertCell(1).innerHTML = `
        <input disabled id="vencimentoTotal" style="background: #F92828; color: #000;"  value=" ${
        "No dia " + vencimentos[2].value * 1
        } " type="text" name="data" placeholder="Comprou no dia X">
    `;
    row.insertCell(2).innerHTML = `
        <input disabled style="background: #F92828; color: #000;"  value="R$${
        valores[2].value * 1
        }" id="valorMensal" type="text" name="razao[]" placeholder="Valor Mensal">
        `;
    row.insertCell(3).innerHTML = `
        <p id="igual">=</p> <input disabled style="background: #F92828; color: #000;"  id="totalFinal"  type="text" name="valorTotal" 
        value=" -${totais[2].value}"  placeholder="Valor Total" >
        `;
    valores[2].value = "";
    totais[2].value = "";
    vencimentos[2].value = "";
    nomeMov[2].value = "";
    receita[1].value = "";
  } else {
    alert("preencha todos os campos");
  }
});

// Emprestimo

adicionar[3].addEventListener("click", function () {
  if (
    valores[3].value &&
    nomeMov[3].value &&
    vencimentos[3].value &&
    totais[3].value !== 0 &&
    receita[2].value == "-"
  ) {
    const table = document.getElementById("tabela");
    const row = table.insertRow(0);

    row.insertCell(0).innerHTML = `
        <img src="./img/Movimentacoes/emprestimo1.svg" style="margin-left: -2.1px; padding-right: 4px; width="32" height="29" alt="banco"> <div class = "organizaMov">
        <span>Pegou de</span>
        <input disabled style="background: #F92828; color: #000;" id="nomeMov" value="${nomeMov[3].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
        </div>
        `;
    row.insertCell(1).innerHTML = `
      <div class = "organizaMov">
        <span>No dia</span>
       <input disabled style="background: #F92828; color: #000;" id="vencimentoTotal" value="No dia ${
        vencimentos[3].value * 1
        }" type="text" name="data" placeholder="No dia X">
      </div>
        `;
    row.insertCell(2).innerHTML = `
      <div class = "organizaMov">
      <span>Valor de</span>
      <input disabled style="background: #F92828; color: #000;" id="valorMensal"  value="R$${
      valores[3].value * 1
      }"  type="text" name="Valor" placeholder="Valor Mensal">

    </div>
        `;
    row.insertCell(3).innerHTML = `
      <div class = "organizaMov">
      <span>Em</span>
     <input disabled style="background: #F92828; color: #000;" id="parcelasTotal" type="text" name="parcelas" 
        value="${totais[3].value}"
        placeholder="em 10x" >
    </div>
        `;
    row.insertCell(4).innerHTML = `
    <div class = "organizaMov">
    <span>Defcit de</span>
    
    <input disabled style="background: #F92828; color: #000;" id="valorMensal" value="-R$ ${((lucro.value).replace('Total ',"") - valores[3].value).toFixed(2)}"  type="text" name="Valor" placeholder="Valor Mensal">
    </div>
        `;
    row.insertCell(5).innerHTML = `
    <div class = "organizaMov">
    <span>Total a pagar</span>
    
    <input disabled style="background: #F92828; color: #000;" id="valorMensal" value="${receita[2].value} R$ ${+(lucro.value).replace('Total ',"")}"  type="text" name="Valor" placeholder="Valor Mensal">
    </div>
        `;
    nomeMov[3].value = "";
    receita[2].value = "";
    vencimentos[3].value = "";
    valores[3].value = "";
    parcelas[2].selectedIndex = "1";
    totais[3].value = "";
    jurosComp.selectedIndex = "";
    juros.selectedIndex = "";
    lucro.value = "";
  } else if (
    valores[3].value &&
    nomeMov[3].value &&
    vencimentos[3].value &&
    totais[3].value !== 0 &&
    receita[2].value == "+"
  ) {
    const table = document.getElementById("tabela");
    const row = table.insertRow(0);

    row.insertCell(0).innerHTML = `
        <img src="./img/Movimentacoes/emprestimo1.svg" -2.1px; padding-right: 4px; width="32" height="29" alt="banco"> <div class = "organizaMov"><span>Emprestou para</span> <input disabled id="nomeMov" value="${nomeMov[3].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov"></div> 
        `;
    row.insertCell(1).innerHTML = `
        <div class = "organizaMov"><span>No dia</span><input disabled id="vencimentoTotal" value="${
        vencimentos[3].value * 1
       }" type="text" name="data""></div>
       `;
    row.insertCell(2).innerHTML = `
        <div class = "organizaMov"><span>Valor de</span> <input disabled id="valorMensal" value="R$ ${
        valores[3].value * 1
        }"  type="text" name="Valor"></div>
        `;
    row.insertCell(3).innerHTML = `
        <div class = "organizaMov">
        <span>Em</span>
        <input disabled id="parcelasTotal" type="text" name="parcelas" 
        value="${totais[3].value}"
        placeholder="numero de parcelas" >
      </div>
      `;
    row.insertCell(4).innerHTML = `<div class = "organizaMov">
      <span>Lucro</span>
      <input disabled id="valorMensal" type="text" name="Montante final" 
      value="+R$ ${((lucro.value).replace('Total ',"") - valores[3].value).toFixed(2)} "  placeholder="Valor Total" >
    </div>
   `;
    row.insertCell(5).innerHTML = `<div class = "organizaMov">
      <span>Total</span>
      <input disabled id="valorMensal" type="text" name="Montante Total" 
      value="+R$ ${+(lucro.value).replace('Total ',"")} " >
      </div>
    `;
    row.insertCell(6).innerHTML = ``;
    nomeMov[3].value = "";
    receita[2].value = "";
    vencimentos[3].value = "";
    valores[3].value = "";
    parcelas[2].selectedIndex = "1";
    totais[3].value = "";
    jurosComp.selectedIndex = "";
    juros.selectedIndex = "";
    lucro.value = "";
  } else {
    alert("Preencha todos os campos");
  }
});
const totalizar = document.getElementsByClassName("totalFinal");

let coud = 0;

adicionar[1].addEventListener("click", () => {
  const totalArray = Array.from(totalizar);

  totalArray.forEach((item) => {
    const totalLimpo = +item.value.replace(/[^0-9]/g, "");
    coud = coud + totalLimpo;
    adicionar.value = coud;
  });
});

function onlynumber(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  //var regex = /^[0-9.,]+$/;
  var regex = /^[0-9.]+$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

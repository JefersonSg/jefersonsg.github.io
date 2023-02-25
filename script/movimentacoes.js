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
const totalPago = document.getElementById('totalPago')


// COMPRAS
valores[0].addEventListener("keyup", () => {
  totais[0].value = `${parcelas[0].value}x de R$ ${(valores[0].value / parcelas[0].value).toFixed(2)}`;
});

parcelas[0].addEventListener("change", () => {
  totais[0].value = `${parcelas[0].value}x de R$ ${(valores[0].value / parcelas[0].value).toFixed(2)}`;
});


// Emprestimo 


valores[3].addEventListener("keyup", () => {

  const jurosMes = +( (valores[3].value) * (jurosComp.selectedIndex / 100));
  const jurosTotal =
    valores[3].value / parcelas[2].selectedIndex * (juros.selectedIndex / 100);
    const valorTotal = valores[3].value / parcelas[2].selectedIndex + jurosTotal + jurosMes;

    totais[3].value = `${parcelas[2].selectedIndex}x de R$ ${(valorTotal).toFixed(2)}`;

    totalPago.value = `Total ${(valorTotal * parcelas[2].selectedIndex).toFixed(2)}`

});

parcelas[2].addEventListener("change", () => {
  const jurosMes = +((valores[3].value) * (jurosComp.selectedIndex /100));
  const jurosTotal = valores[3].value / parcelas[2].selectedIndex * (juros.selectedIndex / 100);
    const valorTotal = valores[3].value / parcelas[2].selectedIndex + jurosTotal + jurosMes;

    totais[3].value = `${parcelas[2].selectedIndex}x de R$ ${(valorTotal).toFixed(2)}`;
    totalPago.value = `Total ${(valorTotal * parcelas[2].selectedIndex).toFixed(2)}`
  
});

juros.addEventListener("change", () => {
  const jurosMes = +((valores[3].value) * (jurosComp.selectedIndex /100));
  const jurosTotal =
  valores[3].value / parcelas[2].selectedIndex * (juros.selectedIndex / 100);
    const valorTotal = valores[3].value / parcelas[2].selectedIndex + jurosTotal + jurosMes;

  if (juros.selectedIndex >= 0) {
    totais[3].value = `${parcelas[2].selectedIndex}x de R$ ${(valorTotal).toFixed(2)}`;
    totalPago.value = `Total ${(valorTotal * parcelas[2].selectedIndex).toFixed(2)}`
  }
});

jurosComp.addEventListener("change", () => {

  const jurosMes = +((valores[3].value) * (jurosComp.selectedIndex /100));
  const jurosTotal = valores[3].value / parcelas[2].selectedIndex * (juros.selectedIndex / 100);
    const valorTotal = valores[3].value / parcelas[2].selectedIndex + jurosTotal + jurosMes;

  if (jurosComp.selectedIndex >= 0) {
    totais[3].value = `${parcelas[2].selectedIndex}x de R$ ${(valorTotal).toFixed(2)}`
    totalPago.value = `Total ${(valorTotal * parcelas[2].selectedIndex).toFixed(2)}`
  }
});

// PIX

valores[2].addEventListener("change", () => {
  const troca = valores[2].value;

  totais[2].value = `R$ ${(troca * 1).toFixed(2)}`;
});

// VENDAS

valores[1].addEventListener("change", () => {
  totais[1].value = `${parcelas[1].value}x de R$ ${(valores[1].value / parcelas[1].value).toFixed(2)}`;
});


parcelas[1].addEventListener("change", () => {
  totais[1].value = `${parcelas[1].value}x de R$ ${(valores[1].value / parcelas[1].value).toFixed(2)}`;
});


// Movimentaçoes


// Compra
adicionar[0].addEventListener("click", function () {
  
  if ((totais[0].value !== "R$0") & (nomeMov[0].value !== "")) {
    const table = document.getElementById("tabela");
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="movimentacoesLista" id="compraLabel" value="compra">
      <img src="./img/Movimentacoes/compra2.svg" width="32" height="29" alt="saquinho de dinheiro"> 

      <div class = "organizaMov nomeMov">
        <span>Comprou de</span>
        <input readonly  id="nomeMov" class="testando" style="background: #F92828; color: #000;" value="${nomeMov[0].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
      </div>

      <div class = "organizaMov aReceber">
        <span>Categoria</span>
        <input readonly id="aReceber" style="background: #F92828; color: #000;" value="${receita[0].value}" type="text" name="data" placeholder="A receber">
      </div>

      <div class = "organizaMov vencimentoTotal">
        <span>No dia</span>
        <input readonly id="vencimentoTotal" style="background: #F92828; color: #000;" value="${
        vencimentos[0].value * 1
        }" type="text" name="data" placeholder="Comprou no dia X">
      </div>

      <div class = "organizaMov parcelasTotal">
        <span>Pagou em</span>
        <input readonly id="parcelasTotal" style="background: #F92828; color: #000;" type="text" name="parcelas" 
          value="${parcelas[0].value}x de R$ ${(valores[0].value / parcelas[0].value).toFixed(2)} "
          placeholder="em 10x" >
      </div>

      <div class = "organizaMov valorMensal">
        <span>Valor</span>
        <input readonly id="valorFinal" style="background: #F92828; color: #000;" value="R$${
        (valores[0].value * 1).toFixed(2)
        }"  type="text" name="Valor" placeholder="Valor Mensal">
      </div>
    </div>
    `
    table.appendChild(div)
    nomeMov[0].value = "";
    receita[0].selectedIndex = "";
    vencimentos[0].value = "";
    valores[0].value = "";
    parcelas[0].selectedIndex = "1";
    totais[0].value = "";

    storage()
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
    const div = document.createElement('div')

    div.innerHTML = `
      <div class="movimentacoesLista" id='vendaLabel' value='venda'>
        <img src="./img/Movimentacoes/venda3.svg" width="32" height="29" alt="valor">

        <div class = "organizaMov nomeMov">
          <span>Vendeu Para</span>
          <input readonly id="nomeMov" value="${nomeMov[1].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
        </div>

        <div class = "organizaMov vencimentoTotal">
          <span>No dia</span>
          <input readonly id="vencimentoTotal" value="${
          vencimentos[1].value * 1
          }" type="text" name="data" placeholder="Venda feira no dia X">
        </div>
        
        <div class = "organizaMov parcelasTotal">
          <span>Parcelou em</span>
          <input readonly id="parcelasTotal" type="text" name="razao[]"
          value="${totais[1].value}"
          placeholder="em 10x" >
        </div>

        <div class = "organizaMov valorFinal">
          <span>Valor</span>
         <input readonly value="R$${
          (valores[1].value * 1).toFixed(2)
         }" id="valorFinal" type="text" name="razao[]" placeholder="Valor Mensal">
        </div>

      </div>
    `;
      table.appendChild(div)

      storage()

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
    const table = document.getElementById("tabela");
    const div = document.createElement('div');
  if (
    valores[2].value &&
    nomeMov[2].value &&
    vencimentos[2].value != 0 &&
    receita[1].value == "+" &&
    totais[2].value != "R$0"
  ) {
    

    div.innerHTML = `
      <div class="movimentacoesLista" id='pixLabel' value="pixRecebido">
        <img src="./img/Movimentacoes/pix.svg" style="margin-left: -2px; padding-right: 4px; width="31 " height="29" alt="Pix">
        <div class = "organizaMov nomeMov">
          <span>Recebeu de</span>
        
          <input readonly id="nomeMov" back value="${nomeMov[2].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">

        </div>
        <div class = "organizaMov vencimentoTotal">
          <span>No dia</span>
          <input readonly id="vencimentoTotal" value=" ${vencimentos[2].value
          } " type="text" name="data" placeholder="Comprou no dia X">
        </div>
    
        <div class = "organizaMov valorFinal">
          <span>Valor</span>
          <input readonly value="R$${(+valores[2].value).toFixed(2)}" id="valorFinal" type="text" name="razao[]" placeholder="Valor Mensal">    
        </div>
      </div>
    `;
    
    table.appendChild(div)

    storage()

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

    div.innerHTML = `
    <div class="movimentacoesLista" id='pixLabel' value='pixEnviado'>
       <img src="./img/Movimentacoes/pix.svg"  style="margin-left: -2px;    padding-right: 4px; width="31 " height="29" alt="Pix">
       <div class = "organizaMov nomeMov">
        <span>Enviou Para</span>
        <input readonly id="nomeMov" style="background: #F92828; color: #000;"  value="${nomeMov[2].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
       </div>

      <div class = "organizaMov vencimentoTotal">
        <span>No dia</span>
        <input readonly id="vencimentoTotal" style="background: #F92828; color: #000;" value=" ${vencimentos[2].value * 1} " type="text" name="data" placeholder="Comprou no dia X">
      </div>


      <div class = "organizaMov valorFinal">
        <span>Valor</span>
        <input readonly style="background: #F92828; color: #000;"  value="${
        valores[2].value * 1
        }" id="valorFinal" type="text" name="razao[]" placeholder="Valor Mensal">
      </div>
    </div>
        
        `;
        table.appendChild(div)

        storage()

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
  const table = document.getElementById("tabela");

  if (
    valores[3].value &&
    nomeMov[3].value &&
    vencimentos[3].value &&
    totais[3].value !== 0 &&
    receita[2].value == "-"
  ) {
    const div = document.createElement('div')

    div.innerHTML = `
        <div class="movimentacoesLista" id="empPegoLabel" value='emprestado'>
          <img src="./img/Movimentacoes/emprestimo1.svg" style="margin-left: -2.1px; padding-right: 4px; width="32" height="29" alt="banco"> <div class = "organizaMov nomeMov">
            <span>Pegou de</span>
           <input readonly style="background: #F92828; color: #000;" id="nomeMov" value="${nomeMov[3].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
          </div>

          <div class = "organizaMov vencimentoTotal">
            <span>No dia</span>
           <input readonly style="background: #F92828; color: #000;" id="vencimentoTotal" value="${
            vencimentos[3].value * 1
            }" type="text" name="data" placeholder="No dia X">
          </div>

          <div class = "organizaMov valorInicial">
            <span>Valor</span>
            <input readonly style="background: #F92828; color: #000;" id="valorInicial"  value="${
          (valores[3].value * 1).toFixed(2)
          }"  type="text" name="Valor" placeholder="Valor Mensal">

         </div>
          <div class = "organizaMov parcelasTotal">
          <span>Em</span>
          <input readonly style="background: #F92828; color: #000;" id="parcelasTotal" type="text" name="parcelas" 
            value="${
              totais[3].value
            }"
            placeholder="em 10x" >
          </div>

          <div class = "organizaMov deficit">
            <span>Deficit</span>       
            <input readonly style="background: #F92828; color: #000;" id="deficit" value="${((totalPago.value).replace('Total ',"") - valores[3].value).toFixed(2)}"  type="text" name="Valor" placeholder="Deficit">
         </div>

          <div class = "organizaMov valorFinal">
            <span>Valor final</span>
          
            <input readonly style="background: #F92828; color: #000;" id="valorFinal" value="${(+(totalPago.value).replace('Total ',"")).toFixed(2)}"  type="text" name="Valor" placeholder="Valor Mensal">
          </div>

        
      </div>
        `;
        table.appendChild(div)
        storage()

    nomeMov[3].value = "";
    receita[2].value = "";
    vencimentos[3].value = "";
    valores[3].value = "";
    parcelas[2].selectedIndex = "1";
    totais[3].value = "";
    jurosComp.selectedIndex = "";
    juros.selectedIndex = "";
    totalPago.value = "";
  } else if (
    valores[3].value &&
    nomeMov[3].value &&
    vencimentos[3].value &&
    totais[3].value !== 0 &&
    receita[2].value == "+"
  ) {
  const div = document.createElement('div')

    div.innerHTML = `
      <div class="movimentacoesLista" id="empLabel" value='emprestei'>
        <img src="./img/Movimentacoes/emprestimo1.svg" -2.1px; padding-right: 4px; width="32" height="29" alt="banco"> 
        <div class = "organizaMov nomeMov">
          <span>Emprestou para</span> 
          <input readonly id="nomeMov" 
          class = "nomeMov" value="${nomeMov[3].value}" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
        </div> 

        <div class = "organizaMov vencimentoTotal">
            <span>No dia</span>
            <input readonly   class = "vencimentoTotal" id="vencimentoTotal" value="${
            vencimentos[3].value * 1
          }" type="text" name="data"">
        </div>

        <div class = "organizaMov valorInicial">
          <span>Valor</span> 
          <input readonly id="valorInicial" class = "valorInicial"  value="R$ ${
          (valores[3].value * 1).toFixed(2)
          }"  type="text" name="Valor">
        </div>
        <div class = "organizaMov parcelasTotal">
          <span>Em</span>
          <input readonly class = "parcelasTotal" id="parcelasTotal" type="text" name="parcelas" 
          value="${totais[3].value}"
          placeholder="numero de parcelas" >
        </div>
        <div class = "organizaMov lucro">
          <span>Lucro</span>
          <input readonly class = "lucro" id="lucro" type="text" name="Montante final" 
          value="+R$ ${((totalPago.value).replace('Total ',"") - valores[3].value).toFixed(2)} "  placeholder="Valor Total" >
        </div>
        <div class = "organizaMov valorFinal">
          <span>Valor final</span>
          <input readonly class = "valorFinal" id="valorFinal" type="text" name="Montante Total" 
          value="R$ ${(+(totalPago.value).replace('Total ',"")).toFixed(2)} " >
        </div>
      </div>
    `;
          table.appendChild(div)

          storage()
    nomeMov[3].value = "";
    receita[2].value = "";
    vencimentos[3].value = "";
    valores[3].value = "";
    parcelas[2].selectedIndex = "1";
    totais[3].value = "";
    jurosComp.selectedIndex = "";
    juros.selectedIndex = "";
    totalPago.value = "";
  } else {
    alert("Preencha todos os campos");
  }
  
});


// onlyNumber

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

// Storage
function arrumarNome() {
  const nomeLogin = document.querySelector('.nome-login')
  const nomeUser = JSON.parse(localStorage.usuarios)
  nomeLogin.innerText = `${nomeUser[0].nome} ${nomeUser[0].sobrenome}`
  
}
function arrumarValores() {
  const ls = JSON.parse(localStorage.transacoes)


  if (!!localStorage.compras) {
    const compra = JSON.parse(localStorage.compras)
    const compraLabel = document.querySelectorAll('#compraLabel')


    compraLabel.forEach((i, n)=>{
      const nome = i.querySelector('#nomeMov')
      const categoria = i.querySelector('#aReceber')
      const data = i.querySelector('#vencimentoTotal')
      const parcelas = i.querySelector('#parcelasTotal')
      const valor = i.querySelector('#valorFinal')
  
      nome.value = compra[n].nome
      categoria.value = compra[n].categoria
      data.value = compra[n].data
      parcelas.value = compra[n].parcelas
      valor.value = compra[n].valor
    })
  }
  if (!!localStorage.vendas) {
    const venda = JSON.parse(localStorage.vendas)
    const vendaLabel = document.querySelectorAll('#vendaLabel')


    vendaLabel.forEach((i, n)=>{
      const nome = i.querySelector('#nomeMov')
      const data = i.querySelector('#vencimentoTotal')
      const parcelas = i.querySelector('#parcelasTotal')
      const valor = i.querySelector('#valorFinal')

      nome.value = venda[n].nome
      data.value = venda[n].data
      parcelas.value = venda[n].parcelas
      valor.value = venda[n].valor
    })
  }
  if (!!localStorage.pix) {
    const pix = JSON.parse(localStorage.pix)
    const pixLabel = document.querySelectorAll('#pixLabel')

    
    pixLabel.forEach((i, n)=>{
      const nome = i.querySelector('#nomeMov')
      const data = i.querySelector('#vencimentoTotal')
      const valor = i.querySelector('#valorFinal')

      nome.value = pix[n].nome
      data.value = pix[n].data
      valor.value = pix[n].valor
    })
  }
  if (!!localStorage.empDevido) {
  const empPego = JSON.parse(localStorage.empDevido)
  const empPegoLabel = document.querySelectorAll('#empPegoLabel')

  empPegoLabel.forEach((i, n)=>{
    const nome = i.querySelector('#nomeMov')
    const data = i.querySelector('#vencimentoTotal')
    const valorInit = i.querySelector('#valorInicial')
    const deficit = i.querySelector('#deficit')
    const parcelas = i.querySelector('#parcelasTotal')
    const valor = i.querySelector('#valorFinal')

    nome.value = empPego[n].nome
    data.value = empPego[n].data
    valorInit.value = empPego[n].valorInicial
    parcelas.value = empPego[n].parcelas
    deficit.value = empPego[n].deficit
    valor.value = empPego[n].valorFinal
  })
    
  }
  if (!!localStorage.empEnviado) {
    const empEnviado = JSON.parse(localStorage.empEnviado)
    const empLabel = document.querySelectorAll('#empLabel')
      

    empLabel.forEach((i, n)=>{
      const nome = i.querySelector('#nomeMov')
      const data = i.querySelector('#vencimentoTotal')
      const valorInit = i.querySelector('#valorInicial')
      const lucro = i.querySelector('#lucro')
      const parcelas = i.querySelector('#parcelasTotal')
      const valor = i.querySelector('#valorFinal')

      nome.value = empEnviado[n].nome
      data.value = empEnviado[n].data
      valorInit.value = empEnviado[n].valorInicial
      parcelas.value = empEnviado[n].parcelas
      lucro.value = empEnviado[n].lucro
      valor.value = empEnviado[n].valorFinal
    })
  }

}

function criarPaineis() {
  const ls = JSON.parse(localStorage.transacoes)

     ls.forEach((v,i)=>{
      const table = document.getElementById("tabela");
      const div = document.createElement('div')

      if (v === 'compra') {
        div.innerHTML = `
      <div class="movimentacoesLista" id="compraLabel" value="${v}">
        <img src="./img/Movimentacoes/compra2.svg" width="32" height="29" alt="saquinho de dinheiro"> 
  
        <div class = "organizaMov nomeMov">
          <span>Comprou de</span>
          <input readonly  id="nomeMov" class="testando" style="background: #F92828; color: #000;" value="" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
        </div>
  
        <div class = "organizaMov aReceber">
          <span>Categoria</span>
          <input readonly id="aReceber" style="background: #F92828; color: #000;" value="" type="text" name="data" placeholder="A receber">
        </div>
  
        <div class = "organizaMov vencimentoTotal">
          <span>No dia</span>
          <input readonly id="vencimentoTotal" style="background: #F92828; color: #000;" value="" type="text" name="data" placeholder="Comprou no dia X">
        </div>
  
        <div class = "organizaMov parcelasTotal">
          <span>Pagou em</span>
          <input readonly id="parcelasTotal" style="background: #F92828; color: #000;" type="text" name="parcelas" 
            value=" "
            placeholder="em 10x" >
        </div>
  
        <div class = "organizaMov valorFinal">
          <span>Valor</span>
          <input readonly id="valorFinal" style="background: #F92828; color: #000;" value=""  type="text" name="Valor" placeholder="Valor Mensal">
        </div>
  
      </div>
      `
      } else if(v === 'venda') {
        div.innerHTML = `
        <div class="movimentacoesLista" id="vendaLabel" value='venda'>
          <img src="./img/Movimentacoes/venda3.svg" width="32" height="29" alt="valor">
  
          <div class = "organizaMov nomeMov">
            <span>Vendeu Para</span>
            <input readonly id="nomeMov" value="" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
          </div>
  
          <div class = "organizaMov vencimentoTotal">
            <span>No dia</span>
            <input readonly id="vencimentoTotal" value="" type="text" name="data" placeholder="Venda feira no dia X">
          </div>
          
          <div class = "organizaMov parcelasTotal">
            <span>Parcelou em</span>
            <input readonly id="parcelasTotal" type="text" name="razao[]"
            value=""
            placeholder="em 10x" >
          </div>
  
          <div class = "organizaMov valorFinal">
            <span>Valor</span>
           <input readonly value="" id="valorFinal" type="text" name="razao[]" placeholder="Valor Mensal">
          </div>
  
        </div>
      `;
      } else if(v === 'pixEnviado') {
        div.innerHTML = `
        <div class="movimentacoesLista" id='pixLabel' value='pixEnviado'>
           <img src="./img/Movimentacoes/pix.svg"  style="margin-left: -2px;    padding-right: 4px; width="31 " height="29" alt="Pix">
           <div class = "organizaMov nomeMov">
            <span>Enviou Para</span>
            <input readonly id="nomeMov" style="background: #F92828; color: #000;"  value="" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
           </div>
    
          <div class = "organizaMov vencimentoTotal">
            <span>No dia</span>
            <input readonly id="vencimentoTotal" style="background: #F92828; color: #000;" value="" type="text" name="data" placeholder="Comprou no dia X">
          </div>
    
    
          <div class = "organizaMov valorFinal">
            <span>Valor</span>
            <input readonly style="background: #F92828; color: #000;"  value="" id="valorFinal" type="text" name="razao[]" placeholder="Valor Mensal">
          </div>
        </div>
            
            `;
      } else if(v === 'pixRecebido') {
        div.innerHTML = `
        <div class="movimentacoesLista" id='pixLabel' value="pixRecebido">
          <img src="./img/Movimentacoes/pix.svg" style="margin-left: -2px; padding-right: 4px; width="31 " height="29" alt="Pix">
          <div class = "organizaMov nomeMov">
            <span>Recebeu de</span>
          
            <input readonly id="nomeMov" back value="" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
  
          </div>
          <div class = "organizaMov vencimentoTotal">
            <span>No dia</span>
            <input readonly id="vencimentoTotal" value="" type="text" name="data" placeholder="Comprou no dia X">
          </div>
      
          <div class = "organizaMov valorFinal">
            <span>Valor</span>
            <input readonly value="" id="valorFinal" type="text" name="razao[]" placeholder="Valor Mensal">    
          </div>
        </div>
      `;
      } else if(v === 'emprestei') {
        div.innerHTML = `
        <div class="movimentacoesLista" id="empLabel" value='emprestei'>
          <img src="./img/Movimentacoes/emprestimo1.svg" -2.1px; padding-right: 4px; width="32" height="29" alt="banco"> 
          <div class = "organizaMov nomeMov">
            <span>Emprestou para</span> 
            <input readonly id="nomeMov" 
            class = "nomeMov" value="" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
          </div> 
  
          <div class = "organizaMov vencimentoTotal">
              <span>No dia</span>
              <input readonly   class = "vencimentoTotal" id="vencimentoTotal" value="" type="text" name="data"">
          </div>
  
          <div class = "organizaMov valorInicial">
            <span>Valor</span> 
            <input readonly id="valorInicial" class = "valorInicial"  value="R$"  type="text" name="Valor">
          </div>
          <div class = "organizaMov parcelasTotal">
            <span>Em</span>
            <input readonly class = "parcelasTotal" id="parcelasTotal" type="text" name="parcelas" 
            value=""
            placeholder="numero de parcelas" >
          </div>
          <div class = "organizaMov lucro">
            <span>Lucro</span>
            <input readonly class = "lucro" id="lucro" type="text" name="Montante final" 
            value=""  placeholder="Valor Total" >
          </div>
          <div class = "organizaMov valorFinal">
            <span>Valor final</span>
            <input readonly class = "valorFinal" id="valorFinal" type="text" name="Montante Total" 
            value="" >
          </div>
        </div>
      `;
      } else if(v === 'emprestado') {
        div.innerHTML = `
        <div class="movimentacoesLista" id="empPegoLabel" value='emprestado'>
          <img src="./img/Movimentacoes/emprestimo1.svg" style="margin-left: -2.1px; padding-right: 4px; width="32" height="29" alt="banco"> <div class = "organizaMov nomeMov">
            <span>Pegou de</span>
           <input readonly style="background: #F92828; color: #000;" id="nomeMov" value="" type="text" name="nome da movimentacao" placeholder="Nome da Mov">
          </div>

          <div class = "organizaMov vencimentoTotal">
            <span>No dia</span>
           <input readonly style="background: #F92828; color: #000;" id="vencimentoTotal" value="" type="text" name="data" placeholder="No dia X">
          </div>

          <div class = "organizaMov valorInicial">
            <span>Valor</span>
            <input readonly style="background: #F92828; color: #000;" id="valorInicial"  value=""  type="text" name="Valor" placeholder="Valor Mensal">

         </div>
          <div class = "organizaMov parcelasTotal">
          <span>Em</span>
          <input readonly style="background: #F92828; color: #000;" id="parcelasTotal" type="text" name="parcelas" 
            value=""
            placeholder="em 10x" >
          </div>

          <div class = "organizaMov deficit">
            <span>Deficit</span>       
            <input readonly style="background: #F92828; color: #000;" id="deficit" value=""  type="text" name="Valor" placeholder="Deficit">
         </div>

          <div class = "organizaMov valorFinal">
            <span>Valor final</span>
          
            <input readonly style="background: #F92828; color: #000;" id="valorFinal" value="R$ "  type="text" name="Valor" placeholder="Valor Mensal">
          </div>
      </div>
        `;
      }

      table.appendChild(div)
    })

  }

function storage() {

  const transacao = document.querySelectorAll('.movimentacoesLista')
  const compraLabel = document.querySelectorAll('#compraLabel')
  const vendaLabel = document.querySelectorAll('#vendaLabel')
  const pixLabel = document.querySelectorAll('#pixLabel')
  const empLabel = document.querySelectorAll('#empLabel')
  const empPegoLabel = document.querySelectorAll('#empPegoLabel')


  const compraArray = []
  const vendaArray = []
  const pixArray = []
  const EmprestimoEnviado = []
  const emprestimoDevido = []
  

  compraLabel.forEach((i)=>{
    const nome = i.querySelector('#nomeMov')
    const categoria = i.querySelector('#aReceber')
    const data = i.querySelector('#vencimentoTotal')
    const parcelas = i.querySelector('#parcelasTotal')
    const valor = i.querySelector('#valorFinal')


    const compra = {
      nome : "",
      categoria : '',
      data : '',
      parcelas : '',
      valor : '',
    }
    compra['nome'] = [nome.value]
    compra['categoria'] = [categoria.value]
    compra['data'] = [data.value]
    compra['parcelas'] = [parcelas.value]
    compra['valor'] = [valor.value]
    compraArray.push(compra)
  })
  vendaLabel.forEach((i)=>{
    const nome = i.querySelector('#nomeMov')
    const data = i.querySelector('#vencimentoTotal')
    const parcelas = i.querySelector('#parcelasTotal')
    const valor = i.querySelector('#valorFinal')

    const venda = {
      nome : "",
      data : '',
      parcelas : '',
      valor : '',
    }

    venda['nome'] = [nome.value]
    venda['data'] = [data.value]
    venda['parcelas'] = [parcelas.value]
    venda['valor'] = [valor.value]
    vendaArray.push(venda)
  })

  pixLabel.forEach((i)=>{
    const nome = i.querySelector('#nomeMov')
    const data = i.querySelector('#vencimentoTotal')
    const valor = i.querySelector('#valorFinal')

    const pix = {
      nome : "",
      data : '',
      valor : '',
    }

    pix['nome'] = [nome.value]
    pix['data'] = [data.value]
    pix['valor'] = [valor.value]
    pixArray.push(pix)


  })

  empPegoLabel.forEach((i)=>{
    const nome = i.querySelector('#nomeMov')
    const data = i.querySelector('#vencimentoTotal')
    const valorInit = i.querySelector('#valorInicial')
    const deficit = i.querySelector('#deficit')
    const parcelas = i.querySelector('#parcelasTotal')
    const valor = i.querySelector('#valorFinal')

    const emprestimo = {
      nome : "",
      data : '',
      valorInicial : '',
      parcelas : '',
      deficit : '',
      valorFinal : '',
    }

    emprestimo['nome'] = [nome.value]
    emprestimo['data'] = [data.value]
    emprestimo['parcelas'] = [parcelas.value]
    emprestimo['valorInicial'] = [valorInit.value]
    emprestimo['deficit'] = [deficit.value]
    emprestimo['valorFinal'] = [valor.value]
    emprestimoDevido.push(emprestimo)
  })

  empLabel.forEach((i)=>{
    const nome = i.querySelector('#nomeMov')
    const data = i.querySelector('#vencimentoTotal')
    const valorInit = i.querySelector('#valorInicial')
    const lucro = i.querySelector('#lucro')
    const parcelas = i.querySelector('#parcelasTotal')
    const valor = i.querySelector('#valorFinal')
    const juros = document.querySelector('#emprestimo-juros')
    const jurosMes = document.querySelector('#juros-compostos')

    const emprestimo = {
      nome : "",
      data : '',
      valorInicial : '',
      parcelas : '',
      lucro : '',
      valorFinal : '',
      juros: '',
      jurosMes:'',
    }

    emprestimo['nome'] = [nome.value]
    emprestimo['data'] = [data.value]
    emprestimo['parcelas'] = [parcelas.value]
    emprestimo['valorInicial'] = [valorInit.value]
    emprestimo['lucro'] = [lucro.value]
    emprestimo['valorFinal'] = [valor.value]
    emprestimo['juros'] = [juros.value]
    emprestimo['jurosMes'] = [jurosMes.value]
    EmprestimoEnviado.push(emprestimo)
  })
  
  const transacoes = []

  transacao.forEach(t => transacoes.push(t.getAttribute('value')))
  localStorage.setItem('compras', JSON.stringify(compraArray))
  localStorage.setItem('vendas', JSON.stringify(vendaArray))
  localStorage.setItem('pix', JSON.stringify(pixArray))
  localStorage.setItem('empEnviado', JSON.stringify(EmprestimoEnviado))
  localStorage.setItem('empDevido', JSON.stringify(emprestimoDevido))
  localStorage.setItem('transacoes', JSON.stringify(transacoes))
}

if (!!localStorage.transacoes) {
  criarPaineis()
}

if (!!localStorage.transacoes) {
  arrumarValores()
}

if (localStorage.usuarios) {
  arrumarNome()

  const logo = document.querySelector('.logo')
  
  logo.addEventListener('click',(e)=>{
      e.preventDefault()
  })
} else {
  window.open('index.html', '_top')

}

const empLabel = document.querySelectorAll('#empLabel')
const compraLabel = document.querySelectorAll('#compraLabel')
const vendaLabel = document.querySelectorAll('#vendaLabel')
const pixLabel = document.querySelectorAll('#pixLabel')
const empPegoLabel = document.querySelectorAll('#empPegoLabel')
const btnEditar = document.querySelector('#editar')
const btnDeletar = document.querySelector('#deletar')


empLabel.forEach((i)=>{
    i.addEventListener('click',()=>{
      const editValueBg = document.querySelector('.editValueBg')
      const exit = document.querySelector('#fecharEdit')
      editValueBg.classList.add('ativo')

      function removeAtivoBg() {
        editValueBg.classList.remove('ativo')
      }

      function deletLabel() {
        const confirm = document.querySelector('.confirmar')
        const editValueBg = document.querySelector('.editValueBg')
        const sim = confirm.querySelector('#sim')
        const nao = confirm.querySelector('#nao')
        confirm.classList.add('ativo')

        function removeAtivo() {
          confirm.classList.remove('ativo')
        }
        function removeAll() {
          editValueBg.classList.remove('ativo')
          i.remove()
          storage()
        }
      
        sim.addEventListener('click', removeAll)
        nao.addEventListener('click', removeAtivo)
      }
        const nomeEdit = document.querySelector('#nomeEdit')
        const dataEdit = document.querySelector('#dataEdit')
        const valorEdit = document.querySelector('#valorEdit')
        const parcelasEdit = document.querySelector('#parcelasEdit')
        const deficitEdit = document.querySelector('#defictEdit')
        const valorFinalEdit = document.querySelector('#valorFinEdit')
        
        const nome = i.querySelector('#nomeMov')
        const data = i.querySelector('#vencimentoTotal')
        const valorInit = i.querySelector('#valorInicial')
        const lucro = i.querySelector('#lucro')
        const parcelas = i.querySelector('#parcelasTotal')
        const valor = i.querySelector('#valorFinal')



      function changeValue() {
        nomeEdit.value = nome.value 
        dataEdit.value = data.value
        valorEdit.value = valorInit.value
        parcelasEdit.value = parcelas.value
        deficitEdit.value= lucro.value
        valorFinalEdit.value = valor.value
      }
      
      function EditValue() {
        if (!btnEditar.classList.contains('ativo')) {
          nome.value = nomeEdit.value
          data.value = dataEdit.value
          valorInit.value = valorEdit.value
          parcelas.value = parcelasEdit.value
          lucro.value = deficitEdit.value
          valor.value = valorFinalEdit.value
          storage()
        }
      }
          
          
          
      btnEditar.addEventListener('click', readOnly)
      exit.addEventListener('click', removeAtivoBg)
      btnDeletar.addEventListener('click',deletLabel)
      btnEditar.addEventListener('click', EditValue)
      changeValue()
    
})})
compraLabel.forEach((i, index)=>{
    i.addEventListener('click',()=>{
      const editValueBg = document.querySelector('.editValueBg')
      const exit = document.querySelector('#fecharEdit')
      editValueBg.classList.add('ativo')

      function removeAtivoBg() {
        editValueBg.classList.remove('ativo')
      }

      function deletLabel() {
        const confirm = document.querySelector('.confirmar')
        const editValueBg = document.querySelector('.editValueBg')
        const sim = confirm.querySelector('#sim')
        const nao = confirm.querySelector('#nao')
        confirm.classList.add('ativo')

        function removeAtivo() {
          confirm.classList.remove('ativo')
        }
        function removeAll() {
          editValueBg.classList.remove('ativo')
          i.remove()
          storage()
        }
      
        sim.addEventListener('click', removeAll)
        nao.addEventListener('click', removeAtivo)
      }
        const nomeEdit = document.querySelector('#nomeEdit')
        const dataEdit = document.querySelector('#dataEdit')
        const valorEdit = document.querySelector('#valorEdit')
        const parcelasEdit = document.querySelector('#parcelasEdit')
        const deficitEdit = document.querySelector('#defictEdit')
        const valorFinalEdit = document.querySelector('#valorFinEdit')
        
        const nome = i.querySelector('#nomeMov')
        const data = i.querySelector('#vencimentoTotal')
        const valorInit = i.querySelector('#valorInicial')
        const lucro = i.querySelector('#lucro')
        const parcelas = i.querySelector('#parcelasTotal')
        const valor = i.querySelector('#valorFinal')



      function changeValue() {
        nomeEdit.value = nome.value 
        dataEdit.value = data.value
        valorEdit.value = valorInit.value
        parcelasEdit.value = parcelas.value
        deficitEdit.value= lucro.value
        valorFinalEdit.value = valor.value
      }
      
      function EditValue() {
        if (!btnEditar.classList.contains('ativo')) {
          nome.value = nomeEdit.value
          data.value = dataEdit.value
          valorInit.value = valorEdit.value
          parcelas.value = parcelasEdit.value
          lucro.value = deficitEdit.value
          valor.value = valorFinalEdit.value
          storage()
        }
      }
          
          
          
      btnEditar.addEventListener('click', readOnly)
      exit.addEventListener('click', removeAtivoBg)
      btnDeletar.addEventListener('click',deletLabel)
      btnEditar.addEventListener('click', EditValue)
      changeValue()
    
})})


  function readOnly() {
      const nome = document.querySelector('#nomeEdit')
      const data = document.querySelector('#dataEdit')
      const valor = document.querySelector('#valorEdit')
      const parcelas = document.querySelector('#parcelasEdit')
      const deficit = document.querySelector('#defictEdit')
      const valorFinal = document.querySelector('#valorFinEdit')

      nome.toggleAttribute('readonly')
      data.toggleAttribute('readonly')
      valor.toggleAttribute('readonly')
      parcelas.toggleAttribute('readonly')
      deficit.toggleAttribute('readonly')
      valorFinal.toggleAttribute('readonly')

      btnEditar.classList.toggle('ativo')

  }



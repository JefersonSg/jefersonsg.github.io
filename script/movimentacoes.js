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
const totalPago = document.getElementById('totalPago')
const btnCompra = document.querySelector('#compra-button')
const btnVenda = document.querySelector('#venda-button')
const btnPix = document.querySelector('#pix-button')
const btnEmp = document.querySelector('#emprestimo-button')
const formCompra = document.querySelector('#compra-conteudo')
const formVenda = document.querySelector('#venda-conteudo')
const formPix = document.querySelector('#pix-conteudo')
const formEmp = document.querySelector('#emprestimo-conteudo')

function removeAtivo(a,b,c,d,e,f,g,h){

  a.classList.toggle('ativo')
  e.classList.remove('ativo')
  c.classList.remove('ativo')
  d.classList.remove('ativo')

  b.classList.toggle('ativo')
  f.classList.remove('ativo')
  g.classList.remove('ativo')
  h.classList.remove('ativo')
}

btnCompra.addEventListener('click', ()=> removeAtivo(btnCompra,formCompra,btnVenda,btnPix,btnEmp,formVenda,formPix,formEmp))
btnVenda.addEventListener('click', ()=> removeAtivo(btnVenda,formVenda,btnCompra,btnPix,btnEmp,formCompra,formPix,formEmp))
btnPix.addEventListener('click', ()=> removeAtivo(btnPix,formPix,btnCompra,btnVenda,btnEmp,formCompra,formVenda,formEmp))
btnEmp.addEventListener('click', ()=> removeAtivo(btnEmp,formEmp,btnCompra,btnVenda,btnPix,formCompra,formVenda,formPix))


// COMPRAS
valores[0].addEventListener("keyup", () => {
  totais[0].value = `${parcelas[0].value}x de R$ ${(valores[0].value / parcelas[0].value).toFixed(2)}`;
});

parcelas[0].addEventListener("change", () => {
  totais[0].value = `${parcelas[0].value}x de R$ ${(valores[0].value / parcelas[0].value).toFixed(2)}`;
});

// Emprestimo 

function contaEmp() {

  const jurosTotal = (jurosComp.selectedIndex * parcelas[2].selectedIndex + juros.selectedIndex) / 100;
  const valorFim = (valores[3].value * jurosTotal) + +valores[3].value

    totais[3].value = `${parcelas[2].selectedIndex}x de R$ ${(valorFim / parcelas[2].selectedIndex).toFixed(2)}`;

    totalPago.value = `Total ${(valorFim).toFixed(2)}`

}
valores[3].addEventListener("keyup", contaEmp);

parcelas[2].addEventListener("change", contaEmp);

juros.addEventListener("change", contaEmp);

jurosComp.addEventListener("change", contaEmp);

// PIX
valores[2].addEventListener("change", () => totais[2].value = `R$ ${(valores[2].value * 1).toFixed(2)}`);

// VENDAS
valores[1].addEventListener("change", () => totais[1].value = `${parcelas[1].value}x de R$ ${(valores[1].value /parcelas[1].value).toFixed(2)}`);

parcelas[1].addEventListener("change", () => totais[1].value = `${parcelas[1].value}x de R$ ${(valores[1].value / parcelas[1].value).toFixed(2)}`);


// Movimentaçoes


// Compra
adicionar[0].addEventListener("click", function () {
  
  if ((totais[0].value !== "R$0") & (nomeMov[0].value !== "")) {
    const edit = document.createElement('div')
    const table = document.getElementById("tabela");
    const div = document.createElement('div')
    edit.id = 'compraEdit'
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
 
    edit.innerHTML = `
      <div class="editValueBg">
        <div class="editValue">
          <span id="fecharEdit">X</span>
          <label for="nome">Nome</label>
          <input readonly type="nome" id="nomeEdit">
          <select disabled id="categoriaEdit" name="receita ou despesa" >
          <option selected value=""  style="display: none">
            categoria da compra
          </option>
          <option value="produto eletronico">Produto Eletronico</option>
          <option value="roupa">Roupa</option>
          <option value="remedio">Remedio</option>
          <option value="comida">Comida</option>
          <option value="cosmetico">Cosmeticos</option>
        </select>
          <label for="data">Data</label>
          <input readonly type="data" id="dataEdit">
          <select disabled readonly name="parcelas" id="parcelasEdit">
              <option  style="display:none ;" value="0">parcelas 0x</option>
              <option value="1">Parcelas 1x</option>
              <option value="2">Parcelas 2x</option>
              <option value="3">Parcelas 3x</option>
              <option value="4">Parcelas 4x</option>
              <option value="5">Parcelas 5x</option>
              <option value="6">Parcelas 6x</option>
              <option value="7">Parcelas 7x</option>
              <option value="8">Parcelas 8x</option>
              <option value="9">Parcelas 9x</option>
              <option value="10">Parcelas 10x</option>
              <option value="11">Parcelas 11x</option>
              <option value="12">Parcelas 12x</option>
            </select>
          <label for="valor">Valor</label>
          <input readonly type="valor" id="valorEdit">
          <button type="button" id="editar"></button>
          <button type="button" id="deletar">Deletar</button>
        </div>
        <div class="confirmar">
          <span>Deseja mesmo deletar?</span>
          <button type="button" id="sim">Sim</button>
          <button type="button" id="nao">Não</button>
        </div>
      </div>
  `;
    table.appendChild(div)
    document.body.appendChild(edit)

    div.addEventListener('click',()=> {
      const editValueBg =  edit.querySelector('.editValueBg')
      editValueBg.classList.add('ativo')
      const exit = editValueBg.querySelector('#fecharEdit')
      const btnEditar = editValueBg.querySelector('#editar')
      const btnDeletar = editValueBg.querySelector('#deletar')
      const nomeEdit = editValueBg.querySelector('#nomeEdit')
      const dataEdit = editValueBg.querySelector('#dataEdit')
      const valorEdit = editValueBg.querySelector('#valorEdit')
      const parcelasEdit = editValueBg.querySelector('#parcelasEdit')
      const categoriaEdit = editValueBg.querySelector('#categoriaEdit')
      const compraEditModal= document.querySelectorAll('#compraEdit')
    
      const nome = div.querySelector('#nomeMov')
      const data = div.querySelector('#vencimentoTotal')
      const parcelas = div.querySelector('#parcelasTotal')
      const valor = div.querySelector('#valorFinal')
      const categoria = div.querySelector('#aReceber')
    
      function deletLabel() {
        const confirm = editValueBg.querySelector('.confirmar')
        const sim = confirm.querySelector('#sim')
        const nao = confirm.querySelector('#nao')
        confirm.classList.add('ativo')
    
        function removeAtivo() {
          confirm.classList.remove('ativo')
        }
        function removeAll() {
          editValueBg.classList.remove('ativo')
          div.remove()
          edit.remove()
          storage()
        }
      
        sim.addEventListener('click', removeAll)
        nao.addEventListener('click', removeAtivo)
      }
    
      function changeValue() {
        nomeEdit.value = nome.value
        dataEdit.value = data.value
        valorEdit.value = valor.value.replace('R$', '')
        parcelasEdit.value = parcelas.value.slice(0,1)
        categoriaEdit.value = categoria.value
      }
      changeValue()
      
      function EditValue() {
          nome.value = nomeEdit.value
          data.value = dataEdit.value
          parcelas.value = `${parcelasEdit.value}x de R$${(valorEdit.value / +parcelasEdit.value).toFixed(2)}`
          valor.value = valorEdit.value
    
          storage()
      }

      function removeAtivoBg() {
        const confirm = editValueBg.querySelector('.confirmar')
        editValueBg.classList.remove('ativo')
        confirm.classList.remove('ativo')
    
        if (btnEditar.classList.contains('ativo')) {
        btnEditar.classList.remove('ativo')
        readOnly()
        }
    
      }
      function readOnly() {
          nomeEdit.toggleAttribute('readonly')
          dataEdit.toggleAttribute('readonly')
          valorEdit.toggleAttribute('readonly')
          parcelasEdit.toggleAttribute('disabled')
          categoriaEdit.toggleAttribute('disabled')
      }
      btnEditar.addEventListener('click', ()=> btnEditar.classList.toggle('ativo'))
      btnEditar.addEventListener('click', readOnly)
      exit.addEventListener('click', removeAtivoBg)
      btnDeletar.addEventListener('click',deletLabel)
      if (!btnEditar.classList.contains('ativo')) {
        btnEditar.addEventListener('click', EditValue)
          }
        });

        

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
    const edit = document.createElement('div')
    edit.id = 'vendaEdit'

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
    edit.innerHTML = `
    <div class="editValueBg">
      <div class="editValue">
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">
        <label for="data">Data</label>
        <input readonly type="data" id="dataEdit">
        <select disabled readonly name="parcelas" id="parcelasEdit">
            <option  style="display:none ;" value="0">parcelas 0x</option>
            <option value="1">Parcelas 1x</option>
            <option value="2">Parcelas 2x</option>
            <option value="3">Parcelas 3x</option>
            <option value="4">Parcelas 4x</option>
            <option value="5">Parcelas 5x</option>
            <option value="6">Parcelas 6x</option>
            <option value="7">Parcelas 7x</option>
            <option value="8">Parcelas 8x</option>
            <option value="9">Parcelas 9x</option>
            <option value="10">Parcelas 10x</option>
            <option value="11">Parcelas 11x</option>
            <option value="12">Parcelas 12x</option>
          </select>
        <label for="valor">Valor</label>
        <input readonly type="valor" id="valorEdit">
        <button type="button" id="editar"></button>
        <button type="button" id="deletar">Deletar</button>
      </div>
      <div class="confirmar">
        <span>Deseja mesmo deletar?</span>
        <button type="button" id="sim">Sim</button>
        <button type="button" id="nao">Não</button>
      </div>
    </div>
`;
      table.appendChild(div)
      document.body.appendChild(edit)

      div.addEventListener('click',()=> {
        const editValueBg =  edit.querySelector('.editValueBg')
        editValueBg.classList.add('ativo')
        const exit = editValueBg.querySelector('#fecharEdit')
        const btnEditar = editValueBg.querySelector('#editar')
        const btnDeletar = editValueBg.querySelector('#deletar')
        const nomeEdit = editValueBg.querySelector('#nomeEdit')
        const dataEdit = editValueBg.querySelector('#dataEdit')
        const valorEdit = editValueBg.querySelector('#valorEdit')
        const parcelasEdit = editValueBg.querySelector('#parcelasEdit')
      
        const nome = div.querySelector('#nomeMov')
        const data = div.querySelector('#vencimentoTotal')
        const parcelas = div.querySelector('#parcelasTotal')
        const valor = div.querySelector('#valorFinal')
      
        function deletLabel() {
          const confirm = editValueBg.querySelector('.confirmar')
          const sim = confirm.querySelector('#sim')
          const nao = confirm.querySelector('#nao')
          confirm.classList.add('ativo')
      
          function removeAtivo() {
            confirm.classList.remove('ativo')
          }
          function removeAll() {
            editValueBg.classList.remove('ativo')
            div.remove()
            edit.remove()
            storage()
          }
        
          sim.addEventListener('click', removeAll)
          nao.addEventListener('click', removeAtivo)
        }
      
        function changeValue() {
          nomeEdit.value = nome.value
          dataEdit.value = data.value
          valorEdit.value = valor.value.replace('R$', '')
          parcelasEdit.value = parcelas.value.slice(0,1)
        }
        changeValue()
        
        function EditValue() {
            nome.value = nomeEdit.value
            data.value = dataEdit.value
            parcelas.value = `${parcelasEdit.value}x de R$${(valorEdit.value / +parcelasEdit.value).toFixed(2)}`
            valor.value = valorEdit.value
      
            storage()
        }
  
        function removeAtivoBg() {
          const confirm = editValueBg.querySelector('.confirmar')
          editValueBg.classList.remove('ativo')
          confirm.classList.remove('ativo')
      
          if (btnEditar.classList.contains('ativo')) {
          btnEditar.classList.remove('ativo')
          readOnly()
          }
      
        }
        function readOnly() {
            nomeEdit.toggleAttribute('readonly')
            dataEdit.toggleAttribute('readonly')
            valorEdit.toggleAttribute('readonly')
            parcelasEdit.toggleAttribute('disabled')
        }
        btnEditar.addEventListener('click', ()=> btnEditar.classList.toggle('ativo'))
        btnEditar.addEventListener('click', readOnly)
        exit.addEventListener('click', removeAtivoBg)
        btnDeletar.addEventListener('click',deletLabel)
        if (!btnEditar.classList.contains('ativo')) {
          btnEditar.addEventListener('click', EditValue)
            }
          });
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
    const edit = document.createElement('div')
    const table = document.getElementById("tabela");
    const div = document.createElement('div');
    edit.id = 'PixEdit'

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

    edit.innerHTML = `
    <div class="editValueBg">
      <div class="editValue">
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">
        <label for="data">Data</label>
        <input readonly type="data" id="dataEdit">
        <label for="valor">Valor</label>
        <input readonly type="valor" id="valorEdit">
        <button type="button" id="editar"></button>
        <button type="button" id="deletar">Deletar</button>
      </div>
      <div class="confirmar">
        <span>Deseja mesmo deletar?</span>
        <button type="button" id="sim">Sim</button>
        <button type="button" id="nao">Não</button>
      </div>
    </div>
        `;
      table.appendChild(div)
      document.body.appendChild(edit)

      div.addEventListener('click',()=> {
        const editValueBg =  edit.querySelector('.editValueBg')
        editValueBg.classList.add('ativo')
        const exit = editValueBg.querySelector('#fecharEdit')
        const btnEditar = editValueBg.querySelector('#editar')
        const btnDeletar = editValueBg.querySelector('#deletar')
        const nomeEdit = editValueBg.querySelector('#nomeEdit')
        const dataEdit = editValueBg.querySelector('#dataEdit')
        const valorEdit = editValueBg.querySelector('#valorEdit')
      
        const nome = div.querySelector('#nomeMov')
        const data = div.querySelector('#vencimentoTotal')
        const valor = div.querySelector('#valorFinal')
      
        function deletLabel() {
          const confirm = editValueBg.querySelector('.confirmar')
          const sim = confirm.querySelector('#sim')
          const nao = confirm.querySelector('#nao')
          confirm.classList.add('ativo')
      
          function removeAtivo() {
            confirm.classList.remove('ativo')
          }
          function removeAll() {
            editValueBg.classList.remove('ativo')
            div.remove()
            edit.remove()
            storage()
          }
        
          sim.addEventListener('click', removeAll)
          nao.addEventListener('click', removeAtivo)
        }
      
        function changeValue() {
          nomeEdit.value = nome.value
          dataEdit.value = data.value
          valorEdit.value = valor.value.replace('R$', '')
        }
        changeValue()
        
        function EditValue() {
            nome.value = nomeEdit.value
            data.value = dataEdit.value
            valor.value = valorEdit.value
      
            storage()
        }
  
        function removeAtivoBg() {
          const confirm = editValueBg.querySelector('.confirmar')
          editValueBg.classList.remove('ativo')
          confirm.classList.remove('ativo')
      
          if (btnEditar.classList.contains('ativo')) {
          btnEditar.classList.remove('ativo')
          readOnly()
          }
      
        }
        function readOnly() {
            nomeEdit.toggleAttribute('readonly')
            dataEdit.toggleAttribute('readonly')
            valorEdit.toggleAttribute('readonly')
        }
        btnEditar.addEventListener('click', ()=> btnEditar.classList.toggle('ativo'))
        btnEditar.addEventListener('click', readOnly)
        exit.addEventListener('click', removeAtivoBg)
        btnDeletar.addEventListener('click',deletLabel)
        if (!btnEditar.classList.contains('ativo')) {
          btnEditar.addEventListener('click', EditValue)
            }
          });
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
    edit.innerHTML = `
    <div class="editValueBg">
      <div class="editValue">
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">
        <label for="data">Data</label>
        <input readonly type="data" id="dataEdit">
        <label for="valor">Valor</label>
        <input readonly type="valor" id="valorEdit">
        <button type="button" id="editar"></button>
        <button type="button" id="deletar">Deletar</button>
      </div>
      <div class="confirmar">
        <span>Deseja mesmo deletar?</span>
        <button type="button" id="sim">Sim</button>
        <button type="button" id="nao">Não</button>
      </div>
    </div>
        `;
        table.appendChild(div)
        document.body.appendChild(edit)
        div.addEventListener('click',()=> {
          const editValueBg =  edit.querySelector('.editValueBg')
          editValueBg.classList.add('ativo')
          const exit = editValueBg.querySelector('#fecharEdit')
          const btnEditar = editValueBg.querySelector('#editar')
          const btnDeletar = editValueBg.querySelector('#deletar')
          const nomeEdit = editValueBg.querySelector('#nomeEdit')
          const dataEdit = editValueBg.querySelector('#dataEdit')
          const valorEdit = editValueBg.querySelector('#valorEdit')
        
          const nome = div.querySelector('#nomeMov')
          const data = div.querySelector('#vencimentoTotal')
          const valor = div.querySelector('#valorFinal')
        
          function deletLabel() {
            const confirm = editValueBg.querySelector('.confirmar')
            const sim = confirm.querySelector('#sim')
            const nao = confirm.querySelector('#nao')
            confirm.classList.add('ativo')
        
            function removeAtivo() {
              confirm.classList.remove('ativo')
            }
            function removeAll() {
              editValueBg.classList.remove('ativo')
              div.remove()
              edit.remove()
              storage()
            }
          
            sim.addEventListener('click', removeAll)
            nao.addEventListener('click', removeAtivo)
          }
        
          function changeValue() {
            nomeEdit.value = nome.value
            dataEdit.value = data.value
            valorEdit.value = valor.value.replace('R$', '')
          }
          changeValue()
          
          function EditValue() {
              nome.value = nomeEdit.value
              data.value = dataEdit.value
              valor.value = valorEdit.value
        
              storage()
          }
    
          function removeAtivoBg() {
            const confirm = editValueBg.querySelector('.confirmar')
            editValueBg.classList.remove('ativo')
            confirm.classList.remove('ativo')
        
            if (btnEditar.classList.contains('ativo')) {
            btnEditar.classList.remove('ativo')
            readOnly()
            }
        
          }
          function readOnly() {
              nomeEdit.toggleAttribute('readonly')
              dataEdit.toggleAttribute('readonly')
              valorEdit.toggleAttribute('readonly')
          }
          btnEditar.addEventListener('click', ()=> btnEditar.classList.toggle('ativo'))
          btnEditar.addEventListener('click', readOnly)
          exit.addEventListener('click', removeAtivoBg)
          btnDeletar.addEventListener('click',deletLabel)
          if (!btnEditar.classList.contains('ativo')) {
            btnEditar.addEventListener('click', EditValue)
              }
            });
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
    const edit = document.createElement('div')


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
  const edit = document.createElement('div')

        div.classList.add('movimentacoesLista')
        div.id = 'empLabel'
        div.setAttribute('value', 'emprestei')

    div.innerHTML = `

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

        <div class = "organizaMov jurosLs">
          <span>Juros</span>
          <input readonly  id='jurosLs' type="text" name="Montante Total" 
          value="${juros.value}" >
        </div>
        <div class = "organizaMov jurosLs">
          <span>Juros ao Mes</span>
          <input readonly id="jurosMesLs" type="text" name="Montante Total" 
          value="${jurosComp.value}" >
        </div>
        `;
    edit.innerHTML = `
        <div class="editValueBg">
          <div class="editValue">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="nome" id="nomeEdit">
            <label for="data">Data</label>
            <input readonly type="data" id="dataEdit">
            <label for="valor">Valor</label>
            <input readonly type="valor" id="valorEdit">
          <select disabled readonly name="parcelas" id="parcelasEdit">
            <option  style="display:none ;" value="0">parcelas 0x</option>
            <option value="1">Parcelas 1x</option>
            <option value="2">Parcelas 2x</option>
            <option value="3">Parcelas 3x</option>
            <option value="4">Parcelas 4x</option>
            <option value="5">Parcelas 5x</option>
            <option value="6">Parcelas 6x</option>
            <option value="7">Parcelas 7x</option>
            <option value="8">Parcelas 8x</option>
            <option value="9">Parcelas 9x</option>
            <option value="10">Parcelas 10x</option>
            <option value="11">Parcelas 11x</option>
            <option value="12">Parcelas 12x</option>
          </select>
          <select disabled name="juros" id="jurosEdit">
            <option value="0">0% de juros</option>
            <option value="1">1% de juros</option>
            <option value="2">2% de juros</option>
            <option value="3">3% de juros</option>
            <option value="4">4% de juros</option>
            <option value="5">5% de juros</option>
            <option value="6">6% de juros</option>
            <option value="7">7% de juros</option>
            <option value="8">8% de juros</option>
            <option value="9">9% de juros</option>
            <option value="10">10% de juros</option>
            <option value="11">11% de juros</option>
            <option value="12">12% de juros</option>
            <option value="13">13% de juros</option>
            <option value="14">14% de juros</option>
            <option value="15">15% de juros</option>
            <option value="16">16% de juros</option>
            <option value="17">17% de juros</option>
            <option value="18">18% de juros</option>
            <option value="19">19% de juros</option>
            <option value="20">20% de juros</option>
            <option value="21">21% de juros</option>
            <option value="22">22% de juros</option>
            <option value="23">23% de juros</option>
            <option value="24">24% de juros</option>
            <option value="25">25% de juros</option>
            <option value="26">26% de juros</option>
            <option value="27">27% de juros</option>
            <option value="28">28% de juros</option>
            <option value="29">29% de juros</option>
            <option value="30">30% de juros</option>
          </select>
          <select disabled name="juros-compostos" id="jurosCompEdit">
            <option value="0">0% ao mes</option>
            <option value="1">1% ao Mês</option>
            <option value="2">2% ao Mês</option>
            <option value="3">3% ao Mês</option>
            <option value="4">4% ao Mês</option>
            <option value="5">5% ao Mês</option>
            <option value="6">6% ao Mês</option>
            <option value="7">7% ao Mês</option>
            <option value="8">8% ao Mês</option>
            <option value="9">9% ao Mês</option>
            <option value="10">10% ao Mês</option>
            <option value="11">11% ao Mês</option>
            <option value="12">12% ao Mês</option>
          </select>
            <label for="lucro">Lucro</label>
            <input readonly type="lucro" id="lucroEdit">
            <label for="valor-final">Valor Final</label>
            <input readonly type="valor-final" id="valorFinEdit">
            <button type="button" id="editar"></button>
            <button type="button" id="deletar">Deletar</button>
          </div>
          <div class="confirmar">
            <span>Deseja mesmo deletar?</span>
            <button type="button" id="sim">Sim</button>
            <button type="button" id="nao">Não</button>
          </div>
        </div>
      `;
      table.appendChild(div)
      document.body.appendChild(edit)
      
        const editValueBg =  edit.querySelector('.editValueBg')
        const exit = editValueBg.querySelector('#fecharEdit')
        const btnDeletar = editValueBg.querySelector('#deletar')
        const nomeEdit = editValueBg.querySelector('#nomeEdit')
        const dataEdit = editValueBg.querySelector('#dataEdit')
        const valorEdit = editValueBg.querySelector('#valorEdit')
        const parcelasEdit = editValueBg.querySelector('#parcelasEdit')
        const jurosEdit = editValueBg.querySelector('#jurosEdit')
        const jurosMesEdit = editValueBg.querySelector('#jurosCompEdit')
        const lucroEdit = editValueBg.querySelector('#lucroEdit')
        const valorFinalEdit = editValueBg.querySelector('#valorFinEdit')
      
        const nome = div.querySelector('#nomeMov')
        const data = div.querySelector('#vencimentoTotal')
        const valorInit = div.querySelector('#valorInicial')
        const lucro = div.querySelector('#lucro')
        const parcelas = div.querySelector('#parcelasTotal')
        const valor = div.querySelector('#valorFinal')
        const juros = div.querySelector("#jurosLs")
        const jurosMes = div.querySelector("#jurosMesLs")
      
        function deletLabel() {
          const confirm = editValueBg.querySelector('.confirmar')
          const sim = confirm.querySelector('#sim')
          const nao = confirm.querySelector('#nao')
          confirm.classList.add('ativo')
      
          function removeAtivo() {
            confirm.classList.remove('ativo')
          }
          function removeAll() {
            editValueBg.classList.remove('ativo')
            div.remove()
            edit.remove()
            storage()
          }
        
          sim.addEventListener('click', removeAll)
          nao.addEventListener('click', removeAtivo)
        }
      
        function changeValue() {
          nomeEdit.value = nome.value
          dataEdit.value = data.value
          valorEdit.value = valorInit.value.replace('R$ ', '')
          parcelasEdit.value = parcelas.value.slice(0,1)
          jurosEdit.value = juros.value
          jurosMesEdit.value = jurosMes.value
          lucroEdit.value= lucro.value.replace('+R$ ', '')
          valorFinalEdit.value = valor.value.replace('R$ ','')
        }
        changeValue()
        
        function EditValue() {
          nome.value = nomeEdit.value
          data.value = dataEdit.value
          valorInit.value = `${valorEdit.value}`
          parcelas.value = `${parcelasEdit.value}x de R$${(valorFinalEdit.value / +parcelasEdit.value).toFixed(2)}`
          lucro.value = lucroEdit.value
          valor.value = valorFinalEdit.value
            storage()
        }
        function conta (){
          const jurosTotal = (+jurosEdit.value + jurosMesEdit.value * parcelasEdit.value) / 100
          const lucro = valorEdit.value * jurosTotal
          const valorFim = lucro + +valorEdit.value
          valorFinalEdit.value = valorFim.toFixed(2)
          lucroEdit.value = lucro.toFixed(2)
        }
  
        function removeAtivoBg() {
          const confirm = editValueBg.querySelector('.confirmar')
          editValueBg.classList.remove('ativo')
          confirm.classList.remove('ativo')
      
          if (btnEditar.classList.contains('ativo')) {
          btnEditar.classList.remove('ativo')
          readOnly()
          }
      
        }
        function readOnly() {
          nomeEdit.toggleAttribute('readonly')
          dataEdit.toggleAttribute('readonly')
          valorEdit.toggleAttribute('readonly')
          parcelasEdit.toggleAttribute('disabled')
          jurosEdit.toggleAttribute('disabled')
          jurosMesEdit.toggleAttribute('disabled')
        }
        valorEdit.addEventListener('keyup', conta)
        parcelasEdit.addEventListener('click', conta)
        jurosEdit.addEventListener('click', conta)
        jurosMesEdit.addEventListener('click', conta)

        btnEditar.addEventListener('click', readOnly)
        exit.addEventListener('click', removeAtivoBg)
        btnDeletar.addEventListener('click',deletLabel)
        if (!btnEditar.classList.contains('ativo')) {
          btnEditar.addEventListener('click', EditValue)
            }
        const btnEditar = edit.querySelector('#editar')
        btnEditar.addEventListener('click', ()=> btnEditar.classList.toggle('ativo'))    

        div.addEventListener('click',()=> {
            editValueBg.classList.add('ativo')
              });
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
  nomeLogin.innerText = `Olá, ${nomeUser[0].nome} ${(nomeUser[0].sobrenome).slice(0,1)}.`
  
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
      const juros = i.querySelector('#jurosLs')
      const jurosMes = i.querySelector('#jurosMesLs')

      nome.value = empEnviado[n].nome
      data.value = empEnviado[n].data
      valorInit.value = empEnviado[n].valorInicial
      parcelas.value = empEnviado[n].parcelas
      lucro.value = empEnviado[n].lucro
      valor.value = empEnviado[n].valorFinal
      juros.value = empEnviado[n].juros
      jurosMes.value = empEnviado[n].jurosMes
    })
  }

}

function criarPaineis() {
  const ls = JSON.parse(localStorage.transacoes)

     ls.forEach((v,i)=>{
      const table = document.getElementById("tabela");
      const div = document.createElement('div')
      const edit = document.createElement('div')
      div.classList.add('movimentacoesLista')


      if (v === 'compra') {
        edit.id = v+'Edit'
        div.id = 'compraLabel'
        div.setAttribute('value', v)
        div.innerHTML = `
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
      `
      edit.innerHTML = `
      <div class="editValueBg">
        <div class="editValue">
          <span id="fecharEdit">X</span>
          <label for="nome">Nome</label>
          <input readonly type="nome" id="nomeEdit">
          <select disabled id="categoriaEdit" name="receita ou despesa" >
          <option selected value=""  style="display: none">
            categoria da compra
          </option>
          <option value="produto eletronico">Produto Eletronico</option>
          <option value="roupa">Roupa</option>
          <option value="remedio">Remedio</option>
          <option value="comida">Comida</option>
          <option value="cosmetico">Cosmeticos</option>
        </select>
          <label for="data">Data</label>
          <input readonly type="data" id="dataEdit">
          <select disabled readonly name="parcelas" id="parcelasEdit">
              <option  style="display:none ;" value="0">parcelas 0x</option>
              <option value="1">Parcelas 1x</option>
              <option value="2">Parcelas 2x</option>
              <option value="3">Parcelas 3x</option>
              <option value="4">Parcelas 4x</option>
              <option value="5">Parcelas 5x</option>
              <option value="6">Parcelas 6x</option>
              <option value="7">Parcelas 7x</option>
              <option value="8">Parcelas 8x</option>
              <option value="9">Parcelas 9x</option>
              <option value="10">Parcelas 10x</option>
              <option value="11">Parcelas 11x</option>
              <option value="12">Parcelas 12x</option>
            </select>
          <label for="valor">Valor</label>
          <input readonly type="valor" id="valorEdit">
          <button type="button" id="editar"></button>
          <button type="button" id="deletar">Deletar</button>
        </div>
        <div class="confirmar">
          <span>Deseja mesmo deletar?</span>
          <button type="button" id="sim">Sim</button>
          <button type="button" id="nao">Não</button>
        </div>
      </div>
  `;
      } else if(v === 'venda') {
        edit.id = v+'Edit'
        div.id = 'vendaLabel'
        div.setAttribute('value', v)
        div.innerHTML = `
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
      `;
      edit.innerHTML = `
      <div class="editValueBg">
        <div class="editValue">
          <span id="fecharEdit">X</span>
          <label for="nome">Nome</label>
          <input readonly type="nome" id="nomeEdit">

          <label for="data">Data</label>
          <input readonly type="data" id="dataEdit">
          <select disabled readonly name="parcelas" id="parcelasEdit">
            <option  style="display:none ;" value="0">parcelas 0x</option>
            <option value="1">Parcelas 1x</option>
            <option value="2">Parcelas 2x</option>
            <option value="3">Parcelas 3x</option>
            <option value="4">Parcelas 4x</option>
            <option value="5">Parcelas 5x</option>
            <option value="6">Parcelas 6x</option>
            <option value="7">Parcelas 7x</option>
            <option value="8">Parcelas 8x</option>
            <option value="9">Parcelas 9x</option>
            <option value="10">Parcelas 10x</option>
            <option value="11">Parcelas 11x</option>
            <option value="12">Parcelas 12x</option>
          </select>
          <label for="valor">Valor</label>
          <input readonly type="valor" id="valorEdit">
          <button type="button" id="editar"></button>
          <button type="button" id="deletar">Deletar</button>
        </div>
        <div class="confirmar">
          <span>Deseja mesmo deletar?</span>
          <button type="button" id="sim">Sim</button>
          <button type="button" id="nao">Não</button>
        </div>
    </div>
  `;
      } else if(v === 'pixEnviado') {
        edit.id = 'pixEdit'
        div.id = 'pixLabel'
        div.setAttribute('value', v)
        div.innerHTML = `

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
            `;
        edit.innerHTML = `
        <div class="editValueBg">
          <div class="editValue">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="nome" id="nomeEdit">
            <label for="data">Data</label>
            <input readonly type="data" id="dataEdit">
            <label for="valor">Valor</label>
            <input readonly type="valor" id="valorEdit">
            <button type="button" id="editar"></button>
            <button type="button" id="deletar">Deletar</button>
          </div>
          <div class="confirmar">
            <span>Deseja mesmo deletar?</span>
            <button type="button" id="sim">Sim</button>
            <button type="button" id="nao">Não</button>
          </div>
        </div>
            `;
      } else if(v === 'pixRecebido') {
        edit.id = 'pixEdit'
        div.id = 'pixLabel'
        div.setAttribute('value', v)
        div.innerHTML = `

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
            `;
        edit.innerHTML = `
        <div class="editValueBg">
          <div class="editValue">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="nome" id="nomeEdit">
            <label for="data">Data</label>
            <input readonly type="data" id="dataEdit">
            <label for="valor">Valor</label>
            <input readonly type="valor" id="valorEdit">
            <button type="button" id="editar"></button>
            <button type="button" id="deletar">Deletar</button>
          </div>
          <div class="confirmar">
            <span>Deseja mesmo deletar?</span>
            <button type="button" id="sim">Sim</button>
            <button type="button" id="nao">Não</button>
          </div>
        </div>
            `;
      } else if(v === 'emprestei') {
        edit.id =  v+'Edit'
        div.id = 'empLabel'
        div.setAttribute('value', v)
        div.innerHTML = `

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
          <div class = "organizaMov jurosLs">
          <span>Juros</span>
          <input readonly id='jurosLs' type="text" name="Montante Total" 
          value="" >
        </div>
        <div class = "organizaMov jurosLs" >
          <span>Juros ao Mes</span>
          <input readonly id='jurosMesLs' type="text" name="Montante Total" 
          value="" >
        </div>
        </div>
        `;
        edit.innerHTML = `
        <div class="editValueBg">
          <div class="editValue">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="nome" id="nomeEdit">
            <label for="data">Data</label>
            <input readonly type="data" id="dataEdit">
            <label for="valor">Valor</label>
            <input readonly type="valor" id="valorEdit">
          <select disabled readonly name="parcelas" id="parcelasEdit">
            <option  style="display:none ;" value="0">parcelas 0x</option>
            <option value="1">Parcelas 1x</option>
            <option value="2">Parcelas 2x</option>
            <option value="3">Parcelas 3x</option>
            <option value="4">Parcelas 4x</option>
            <option value="5">Parcelas 5x</option>
            <option value="6">Parcelas 6x</option>
            <option value="7">Parcelas 7x</option>
            <option value="8">Parcelas 8x</option>
            <option value="9">Parcelas 9x</option>
            <option value="10">Parcelas 10x</option>
            <option value="11">Parcelas 11x</option>
            <option value="12">Parcelas 12x</option>
          </select>
          <select disabled name="juros" id="jurosEdit">
            <option value="0">0% de juros</option>
            <option value="1">1% de juros</option>
            <option value="2">2% de juros</option>
            <option value="3">3% de juros</option>
            <option value="4">4% de juros</option>
            <option value="5">5% de juros</option>
            <option value="6">6% de juros</option>
            <option value="7">7% de juros</option>
            <option value="8">8% de juros</option>
            <option value="9">9% de juros</option>
            <option value="10">10% de juros</option>
            <option value="11">11% de juros</option>
            <option value="12">12% de juros</option>
            <option value="13">13% de juros</option>
            <option value="14">14% de juros</option>
            <option value="15">15% de juros</option>
            <option value="16">16% de juros</option>
            <option value="17">17% de juros</option>
            <option value="18">18% de juros</option>
            <option value="19">19% de juros</option>
            <option value="20">20% de juros</option>
            <option value="21">21% de juros</option>
            <option value="22">22% de juros</option>
            <option value="23">23% de juros</option>
            <option value="24">24% de juros</option>
            <option value="25">25% de juros</option>
            <option value="26">26% de juros</option>
            <option value="27">27% de juros</option>
            <option value="28">28% de juros</option>
            <option value="29">29% de juros</option>
            <option value="30">30% de juros</option>
          </select>
          <select disabled name="juros-compostos" id="jurosCompEdit">
            <option value="0">0% ao mes</option>
            <option value="1">1% ao Mês</option>
            <option value="2">2% ao Mês</option>
            <option value="3">3% ao Mês</option>
            <option value="4">4% ao Mês</option>
            <option value="5">5% ao Mês</option>
            <option value="6">6% ao Mês</option>
            <option value="7">7% ao Mês</option>
            <option value="8">8% ao Mês</option>
            <option value="9">9% ao Mês</option>
            <option value="10">10% ao Mês</option>
            <option value="11">11% ao Mês</option>
            <option value="12">12% ao Mês</option>
          </select>
            <label for="lucro">Lucro</label>
            <input readonly type="lucro" id="lucroEdit">
            <label for="valor-final">Valor Final</label>
            <input readonly type="valor-final" id="valorFinEdit">
            <button type="button" id="editar"></button>
            <button type="button" id="deletar">Deletar</button>
          </div>
          <div class="confirmar">
            <span>Deseja mesmo deletar?</span>
            <button type="button" id="sim">Sim</button>
            <button type="button" id="nao">Não</button>
          </div>
        </div>
      `;
      } else if(v === 'emprestado') {
        div.id = 'empPegoLabel'
        div.setAttribute('value', v)
        div.innerHTML = `

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
        `;
      }

      table.appendChild(div)
      document.body.appendChild(edit)
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
    const juros = i.querySelector('#emprestimo-juros')
    const jurosMes = i.querySelector('#juros-compostos')

    const emprestimo = {
      nome : "",
      data : '',
      valorInicial : '',
      parcelas : '',
      deficit : '',
      valorFinal : '',
      juros: '',
      jurosMes:'',
    }

    emprestimo['nome'] = [nome.value]
    emprestimo['data'] = [data.value]
    emprestimo['parcelas'] = [parcelas.value]
    emprestimo['valorInicial'] = [valorInit.value]
    emprestimo['deficit'] = [deficit.value]
    emprestimo['valorFinal'] = [valor.value]
    emprestimo['juros'] = [juros.value]
    emprestimo['jurosMes'] = [jurosMes.value]
    emprestimoDevido.push(emprestimo)
  })

  empLabel.forEach((i)=>{
    const nome = i.querySelector('#nomeMov')
    const data = i.querySelector('#vencimentoTotal')
    const valorInit = i.querySelector('#valorInicial')
    const lucro = i.querySelector('#lucro')
    const parcelas = i.querySelector('#parcelasTotal')
    const valor = i.querySelector('#valorFinal')
    const juros = i.querySelector('#jurosLs')
    const jurosMes = i.querySelector('#jurosMesLs')

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



  empLabel.forEach((i, n)=>{
  const empLabelEdit = document.querySelectorAll('#empresteiEdit')
  const editValueBg = empLabelEdit[n].querySelector('.editValueBg')
  const exit = editValueBg.querySelector('#fecharEdit')
  const btnEditar = editValueBg.querySelector('#editar')
  const btnDeletar = editValueBg.querySelector('#deletar')
  const nomeEdit = editValueBg.querySelector('#nomeEdit')
  const dataEdit = editValueBg.querySelector('#dataEdit')
  const valorEdit = editValueBg.querySelector('#valorEdit')
  const parcelasEdit = editValueBg.querySelector('#parcelasEdit')
  const jurosEdit = editValueBg.querySelector('#jurosEdit')
  const jurosMesEdit = editValueBg.querySelector('#jurosCompEdit')
  const lucroEdit = editValueBg.querySelector('#lucroEdit')
  const valorFinalEdit = editValueBg.querySelector('#valorFinEdit')
  const empEditModal= document.querySelectorAll('#empresteiEdit')

  const nome = i.querySelector('#nomeMov')
  const data = i.querySelector('#vencimentoTotal')
  const valorInit = i.querySelector('#valorInicial')
  const lucro = i.querySelector('#lucro')
  const parcelas = i.querySelector('#parcelasTotal')
  const valor = i.querySelector('#valorFinal')
  const juros = i.querySelector("#jurosLs")
  const jurosMes = i.querySelector("#jurosMesLs")

  function deletLabel() {
    const confirm = editValueBg.querySelector('.confirmar')
    const sim = confirm.querySelector('#sim')
    const nao = confirm.querySelector('#nao')
    confirm.classList.add('ativo')

    function removeAtivo() {
      confirm.classList.remove('ativo')
    }
    function removeAll() {
      editValueBg.classList.remove('ativo')
      empEditModal[n].remove()
      i.remove()
      storage()
    }
  
    sim.addEventListener('click', removeAll)
    nao.addEventListener('click', removeAtivo)
  }

  function changeValue() {
    nomeEdit.value = nome.value
    dataEdit.value = data.value
    valorEdit.value = valorInit.value.replace('R$ ', '')
    parcelasEdit.value = parcelas.value.slice(0,1)
    jurosEdit.value = juros.value
    jurosMesEdit.value = jurosMes.value
    lucroEdit.value= lucro.value.replace('+R$ ', '')
    valorFinalEdit.value = valor.value.replace('R$ ','')
  }
  changeValue()
  
  function EditValue() {
      nome.value = nomeEdit.value
      data.value = dataEdit.value
      valorInit.value = `${valorEdit.value}`
      parcelas.value = `${parcelasEdit.value}x de R$${(valorFinalEdit.value / +parcelasEdit.value).toFixed(2)}`
      lucro.value = lucroEdit.value
      valor.value = valorFinalEdit.value
      storage()
  }
  function conta (){
    const jurosTotal = (+jurosEdit.value + jurosMesEdit.value * parcelasEdit.value) / 100
    const lucro = valorEdit.value * jurosTotal
    const valorFim = lucro + +valorEdit.value
    valorFinalEdit.value = valorFim.toFixed(2)
    lucroEdit.value = lucro.toFixed(2)
  }
  function removeAtivoBg() {
    const confirm = editValueBg.querySelector('.confirmar')
    editValueBg.classList.remove('ativo')
    confirm.classList.remove('ativo')

    if (btnEditar.classList.contains('ativo')) {
    btnEditar.classList.remove('ativo')
    readOnly()
      
    }

  }
  function readOnly() {
      nomeEdit.toggleAttribute('readonly')
      dataEdit.toggleAttribute('readonly')
      valorEdit.toggleAttribute('readonly')
      parcelasEdit.toggleAttribute('disabled')
      jurosEdit.toggleAttribute('disabled')
      jurosMesEdit.toggleAttribute('disabled')
  }

  valorEdit.addEventListener('keyup', conta)
  parcelasEdit.addEventListener('click', conta)
  jurosEdit.addEventListener('click', conta)
  jurosMesEdit.addEventListener('click', conta)    
  btnEditar.addEventListener('click', ()=> btnEditar.classList.toggle('ativo'))
  btnEditar.addEventListener('click', readOnly)
  exit.addEventListener('click', removeAtivoBg)
  btnDeletar.addEventListener('click',deletLabel)
  if (!btnEditar.classList.contains('ativo')) {
    btnEditar.addEventListener('click', EditValue)
  }
  
    i.addEventListener('click',()=> editValueBg.classList.add('ativo'))
        })

  compraLabel.forEach((i, n)=>{
      const compraEdit = document.querySelectorAll('#compraEdit')
      const editValueBg = compraEdit[n].querySelector('.editValueBg')
      const exit = editValueBg.querySelector('#fecharEdit')
      const btnEditar = editValueBg.querySelector('#editar')
      const btnDeletar = editValueBg.querySelector('#deletar')
      const nomeEdit = editValueBg.querySelector('#nomeEdit')
      const dataEdit = editValueBg.querySelector('#dataEdit')
      const valorEdit = editValueBg.querySelector('#valorEdit')
      const parcelasEdit = editValueBg.querySelector('#parcelasEdit')
      const categoriaEdit = editValueBg.querySelector('#categoriaEdit')
      const compraEditModal= document.querySelectorAll('#compraEdit')
    
      const nome = i.querySelector('#nomeMov')
      const data = i.querySelector('#vencimentoTotal')
      const parcelas = i.querySelector('#parcelasTotal')
      const valor = i.querySelector('#valorFinal')
      const categoria = i.querySelector('#aReceber')
    
      function deletLabel() {
        const confirm = editValueBg.querySelector('.confirmar')
        const sim = confirm.querySelector('#sim')
        const nao = confirm.querySelector('#nao')
        confirm.classList.add('ativo')
    
        function removeAtivo() {
          confirm.classList.remove('ativo')
        }
        function removeAll() {
          editValueBg.classList.remove('ativo')
          i.remove()
          compraEditModal[n].remove()
          storage()
        }
      
        sim.addEventListener('click', removeAll)
        nao.addEventListener('click', removeAtivo)
      }
    
      function changeValue() {
        nomeEdit.value = nome.value
        dataEdit.value = data.value
        valorEdit.value = valor.value.replace('R$', '')
        parcelasEdit.value = parcelas.value.slice(0,1)
        categoriaEdit.value = categoria.value
      }
      changeValue()
      
      function EditValue() {
          nome.value = nomeEdit.value
          data.value = dataEdit.value
          parcelas.value = `${parcelasEdit.value}x de R$${(valorEdit.value / +parcelasEdit.value).toFixed(2)}`
          valor.value = valorEdit.value
    
          storage()
      }

      function removeAtivoBg() {
        const confirm = editValueBg.querySelector('.confirmar')
        editValueBg.classList.remove('ativo')
        confirm.classList.remove('ativo')
    
        if (btnEditar.classList.contains('ativo')) {
        btnEditar.classList.remove('ativo')
        readOnly()
        }
    
      }
      function readOnly() {
          nomeEdit.toggleAttribute('readonly')
          dataEdit.toggleAttribute('readonly')
          valorEdit.toggleAttribute('readonly')
          parcelasEdit.toggleAttribute('disabled')
          categoriaEdit.toggleAttribute('disabled')
      }
      btnEditar.addEventListener('click', ()=> btnEditar.classList.toggle('ativo'))
      btnEditar.addEventListener('click', readOnly)
      exit.addEventListener('click', removeAtivoBg)
      btnDeletar.addEventListener('click',deletLabel)
      if (!btnEditar.classList.contains('ativo')) {
        btnEditar.addEventListener('click', EditValue)
      }
      
        i.addEventListener('click',()=> editValueBg.classList.add('ativo'))
        })

  vendaLabel.forEach((i, n)=>{
          const vendaEdit = document.querySelectorAll('#vendaEdit')
          const editValueBg = vendaEdit[n].querySelector('.editValueBg')
          const exit = editValueBg.querySelector('#fecharEdit')
          const btnEditar = editValueBg.querySelector('#editar')
          const btnDeletar = editValueBg.querySelector('#deletar')
          const nomeEdit = editValueBg.querySelector('#nomeEdit')
          const dataEdit = editValueBg.querySelector('#dataEdit')
          const valorEdit = editValueBg.querySelector('#valorEdit')
          const parcelasEdit = editValueBg.querySelector('#parcelasEdit')          
        
          const nome = i.querySelector('#nomeMov')
          const data = i.querySelector('#vencimentoTotal')
          const parcelas = i.querySelector('#parcelasTotal')
          const valor = i.querySelector('#valorFinal')
        
          function deletLabel() {
            const confirm = editValueBg.querySelector('.confirmar')
            const sim = confirm.querySelector('#sim')
            const nao = confirm.querySelector('#nao')
            confirm.classList.add('ativo')
        
            function removeAtivo() {
              confirm.classList.remove('ativo')
            }
            function removeAll() {
              editValueBg.classList.remove('ativo')
              vendaEditModal[n].remove()
              i.remove()
              storage()
            }
          
            sim.addEventListener('click', removeAll)
            nao.addEventListener('click', removeAtivo)
          }
        
          function changeValue() {
            nomeEdit.value = nome.value
            dataEdit.value = data.value
            valorEdit.value = valor.value.replace('R$', '')
            parcelasEdit.value = parcelas.value.slice(0,1)
          }
          changeValue()
          
          function EditValue() {
              nome.value = nomeEdit.value
              data.value = dataEdit.value
              parcelas.value = `${parcelasEdit.value}x de R$${(valorEdit.value / +parcelasEdit.value).toFixed(2)}`
              valor.value = valorEdit.value
        
              storage()
          }
          function conta (){
            valorFinalEdit.value = +valorEdit.value.toFixed(2)
          }
          function removeAtivoBg() {
            const confirm = editValueBg.querySelector('.confirmar')
            editValueBg.classList.remove('ativo')
            confirm.classList.remove('ativo')
        
            if (btnEditar.classList.contains('ativo')) {
            btnEditar.classList.remove('ativo')
            readOnly()
            }
        
          }
          function readOnly() {
              nomeEdit.toggleAttribute('readonly')
              dataEdit.toggleAttribute('readonly')
              valorEdit.toggleAttribute('readonly')
              parcelasEdit.toggleAttribute('disabled')
          }
          valorEdit.addEventListener('keyup', conta)   
          btnEditar.addEventListener('click', ()=> btnEditar.classList.toggle('ativo'))
          btnEditar.addEventListener('click', readOnly)
          exit.addEventListener('click', removeAtivoBg)
          btnDeletar.addEventListener('click',deletLabel)
          if (!btnEditar.classList.contains('ativo')) {
            btnEditar.addEventListener('click', EditValue)
          }
          
            i.addEventListener('click',()=> editValueBg.classList.add('ativo'))
        })

  pixLabel.forEach((i, n)=>{
    const pixEdit = document.querySelectorAll('#pixEdit')
    const editValueBg = pixEdit[n].querySelector('.editValueBg')
    const exit = editValueBg.querySelector('#fecharEdit')
    const btnEditar = editValueBg.querySelector('#editar')
    const btnDeletar = editValueBg.querySelector('#deletar')
    const nomeEdit = editValueBg.querySelector('#nomeEdit')
    const dataEdit = editValueBg.querySelector('#dataEdit')
    const valorEdit = editValueBg.querySelector('#valorEdit')
    const pixEditModal= document.querySelectorAll('#pixEdit')

  
    const nome = i.querySelector('#nomeMov')
    const data = i.querySelector('#vencimentoTotal')
    const valor = i.querySelector('#valorFinal')
  
    function deletLabel() {
      const confirm = editValueBg.querySelector('.confirmar')
      const sim = confirm.querySelector('#sim')
      const nao = confirm.querySelector('#nao')
      confirm.classList.add('ativo')
  
      function removeAtivo() {
        confirm.classList.remove('ativo')
      }
      function removeAll() {
        editValueBg.classList.remove('ativo')
        pixEditModal[n].remove()
        i.remove()
        storage()
      }
    
      sim.addEventListener('click', removeAll)
      nao.addEventListener('click', removeAtivo)
    }
  
    function changeValue() {
      nomeEdit.value = nome.value
      dataEdit.value = data.value
      valorEdit.value = valor.value.replace('R$', '')
    }
    changeValue()
    
    function EditValue() {
        nome.value = nomeEdit.value
        data.value = dataEdit.value
        valor.value = valorEdit.value
  
        storage()
    }
    function conta (){
      +valorEdit.value.toFixed(2)
    }
    function removeAtivoBg() {
      const confirm = editValueBg.querySelector('.confirmar')
      editValueBg.classList.remove('ativo')
      confirm.classList.remove('ativo')
  
      if (btnEditar.classList.contains('ativo')) {
      btnEditar.classList.remove('ativo')
      readOnly()
      }
  
    }
    function readOnly() {
        nomeEdit.toggleAttribute('readonly')
        dataEdit.toggleAttribute('readonly')
        valorEdit.toggleAttribute('readonly')
    }
    valorEdit.addEventListener('keyup', conta)   
    btnEditar.addEventListener('click', ()=> btnEditar.classList.toggle('ativo'))
    btnEditar.addEventListener('click', readOnly)
    exit.addEventListener('click', removeAtivoBg)
    btnDeletar.addEventListener('click',deletLabel)
    if (!btnEditar.classList.contains('ativo')) {
      btnEditar.addEventListener('click', EditValue)
    }
    
      i.addEventListener('click',()=> editValueBg.classList.add('ativo'))
  })


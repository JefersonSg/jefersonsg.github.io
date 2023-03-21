const parcelas = document.querySelectorAll('#parcelas');
const InputValor = document.querySelectorAll('#valor');
const valor = document.querySelectorAll('#total');
const categoria = document.querySelectorAll('#receita');
const adicionar = document.querySelectorAll('#botao-add');
const jurosComp = document.getElementById('juros-compostos');
const juros = document.getElementById('emprestimo-juros');
const nomeMov = document.querySelectorAll('#movimentacao');
const dataInfo = document.querySelectorAll('#dataInfo');
const totalPago = document.getElementById('totalPago');
const btnForm = document.querySelectorAll('.btnForm')
const formularios = document.querySelectorAll('.transacao');
const formVenda = document.querySelector('#venda-conteudo');
const formPix = document.querySelector('#pix-conteudo');
const formEmp = document.querySelector('#emprestimo-conteudo');




function addAtivo(item) {
  btnForm.forEach((i)=>{ if (i !== item) { i.classList.remove('ativo') } })
  item.classList.toggle('ativo')

  formularios.forEach((i)=>{  
    if (i.getAttribute('value') == item.value) {
      i.classList.toggle('ativo')
    } else {
      i.classList.remove('ativo')
    }
  })
}

btnForm.forEach((item)=>{
  item.addEventListener('click', ()=>{addAtivo(item)})
})




// Emprestimo

function contaEmp() {
  const jurosTotal =
    (jurosComp.selectedIndex * parcelas[2].selectedIndex +
      juros.selectedIndex) /
    100;
  const valorFim = InputValor[3].value * jurosTotal + +InputValor[3].value;

  valor[3].value = `${parcelas[2].selectedIndex}x de R$ ${(
    valorFim / parcelas[2].selectedIndex
  ).toFixed(2)}`;

  totalPago.value = `Total ${valorFim.toFixed(2)}`;
}
InputValor[3].addEventListener('keyup', contaEmp);
parcelas[2].addEventListener('change', contaEmp);
juros.addEventListener('change', contaEmp);
jurosComp.addEventListener('change', contaEmp);

// PIX
InputValor[2].addEventListener(
  'change',
  () => (valor[2].value = `R$ ${(InputValor[2].value * 1).toFixed(2)}`),
);

// VENDAS
InputValor[1].addEventListener(
  'change',
  () =>
  (valor[1].value = `${parcelas[1].value}x de R$ ${(
    InputValor[1].value / parcelas[1].value
  ).toFixed(2)}`),
);

parcelas[1].addEventListener(
  'change',
  () =>
  (valor[1].value = `${parcelas[1].value}x de R$ ${(
    InputValor[1].value / parcelas[1].value
  ).toFixed(2)}`),
);

// Movimentaçoes

// Compra

function novaDiv(type) {
  type = this.value
  let div = document.createElement('div')
  div.classList.add('movimentacoesLista');
  const table = document.getElementById('tabela');
  if (type == 'compra') {
    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/compra icon.svg">
    </div>

    <p id="nomeMov"></p>
    <p id="valorFinal"></p>
    <p id="categoria"></p>
    <p id="data"></p>
    <p id="parcelasTotal"></p>
`}
  table.insertBefore(div, table.firstChild);
}

adicionar.forEach((i)=>{
  i.addEventListener('click', novaDiv)
})

// Venda
adicionar[1].addEventListener('click', function () {
  if (
    InputValor[1].value &&
    nomeMov[1].value &&
    dataInfo[1].value != 0 &&
    valor[1].value != 'R$0'
  ) {
    const table = document.getElementById('tabela');
    const div = document.createElement('div');
    div.classList.add('movimentacoesLista');
    div.id = 'vendaLabel';
    div.setAttribute('value', 'venda');

    const edit = document.createElement('div');
    edit.id = 'vendaEdit';

    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/venda icon.svg">
    </div>

    <p id="nomeMov">${nomeMov[1].value}</p>
    <p id="valorFinal">R$ ${(InputValor[1].value * 1).toFixed(2)}</p>
    <p class='parcelas-venda' id="parcelasTotal">${valor[1].value}</p>

    <p id="data">${dataInfo[1].value * 1}</p>
    `;

    edit.innerHTML = `
    <div class="editValueBg">
      <div class="editValue">
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">

        <label for="data">Data</label>
        <input readonly type="date" ;" id="dataInfo" name="data" />

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
        <div class='botoesEdit'>
          <button type="button" id="editar"></button>
          <button type="button" id="deletar">Deletar</button>
        </div>

      </div>
      <div class="confirmar">
        <span>Deseja mesmo deletar?</span>
        <button type="button" id="sim">Sim</button>
        <button type="button" id="nao">Não</button>
      </div>
    </div>
    `;
    let firstChild = table.firstChild;
    table.insertBefore(div, firstChild);
    document.body.appendChild(edit);
    formVenda.classList.remove('ativo');
    div.addEventListener('click', () => {
      const editValueBg = edit.querySelector('.editValueBg');
      editValueBg.classList.add('ativo');
      const exit = editValueBg.querySelector('#fecharEdit');
      const btnEditar = editValueBg.querySelector('#editar');
      const btnDeletar = editValueBg.querySelector('#deletar');
      const nomeEdit = editValueBg.querySelector('#nomeEdit');
      const dataEdit = editValueBg.querySelector('#dataInfo');
      const valorEdit = editValueBg.querySelector('#valorEdit');
      const parcelasEdit = editValueBg.querySelector('#parcelasEdit');

      const nome = div.querySelector('#nomeMov');
      const data = div.querySelector('#data');
      const parcelas = div.querySelector('#parcelasTotal');
      const valor = div.querySelector('#valorFinal');

      function deletLabel() {
        const confirm = editValueBg.querySelector('.confirmar');
        const sim = confirm.querySelector('#sim');
        const nao = confirm.querySelector('#nao');
        confirm.classList.add('ativo');

        function removeAtivo() {
          confirm.classList.remove('ativo');
        }
        function removeAll() {
          editValueBg.classList.remove('ativo');
          div.remove();
          edit.remove();
          storage();
        }

        sim.addEventListener('click', removeAll);
        nao.addEventListener('click', removeAtivo);
      }

      function changeValue() {
        nomeEdit.value = nome.innerText;
        dataEdit.value = data.innerText;
        valorEdit.value = (+valor.innerText.replace('R$', '')).toFixed(2);
        parcelasEdit.value = parcelas.innerText.slice(0, 1);
      }
      changeValue();

      function EditValue() {
        nome.innerText = nomeEdit.value;
        data.innerText = dataEdit.value;
        parcelas.innerText = `${parcelasEdit.value}x de R$${(
          valorEdit.value / +parcelasEdit.value
        ).toFixed(2)}`;
        valor.innerText = (+valorEdit.value).toFixed(2);

        storage();
      }

      function removeAtivoBg() {
        const confirm = editValueBg.querySelector('.confirmar');
        editValueBg.classList.remove('ativo');
        confirm.classList.remove('ativo');

        if (btnEditar.classList.contains('ativo')) {
          btnEditar.classList.remove('ativo');
          readOnly();
        }
      }
      function readOnly() {
        nomeEdit.toggleAttribute('readonly');
        dataEdit.toggleAttribute('readonly');
        valorEdit.toggleAttribute('readonly');
        parcelasEdit.toggleAttribute('disabled');
      }
      btnEditar.addEventListener('click', () =>
        btnEditar.classList.toggle('ativo'),
      );
      btnEditar.addEventListener('click', readOnly);
      exit.addEventListener('click', removeAtivoBg);
      btnDeletar.addEventListener('click', deletLabel);
      if (!btnEditar.classList.contains('ativo')) {
        btnEditar.addEventListener('click', EditValue);
      }
    });
    storage();

    InputValor[1].value = '';
    valor[1].value = '';
    dataInfo[1].value = '';
    nomeMov[1].value = '';
  } else {
    alert('Preencha todos os campos');
  }
});

// Pix
adicionar[2].addEventListener('click', function () {
  const edit = document.createElement('div');
  const table = document.getElementById('tabela');
  const div = document.createElement('div');
  div.classList.add('movimentacoesLista');
  div.id = 'pixLabel';
  edit.id = 'pixEdit';

  if (
    InputValor[2].value &&
    nomeMov[2].value &&
    dataInfo[2].value != 0 &&
    categoria[1].value == '+' &&
    valor[2].value != 'R$0'
  ) {
    div.setAttribute('value', 'pixRecebido');
    div.innerHTML = `
    <div class='icon icon-transacao'>
      <img class='icon-transacao' src="./img/Movimentacoes/pix icon.svg">
    </div>

    <p>Transferencia recebida</p>
    <p id="valorFinal">+R$ ${(+InputValor[2].value).toFixed(2)}</p>
    <p class='pix' id="nomeMov">${nomeMov[2].value}</p>
    <p id="data">${dataInfo[2].value}</p>
    `;

    edit.innerHTML = `
    <div class="editValueBg">
      <div class="editValue">
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">

        <label for="data">Data</label>
        <input readonly type="date" ;" id="dataInfo" name="data" />

        <label for="valor">Valor</label>
        <input readonly type="valor" id="valorEdit">
        <div class='botoesEdit'>
          <button type="button" id="editar"></button>
          <button type="button" id="deletar">Deletar</button>
        </div>
      </div>
      <div class="confirmar">
        <span>Deseja mesmo deletar?</span>
        <button type="button" id="sim">Sim</button>
        <button type="button" id="nao">Não</button>
      </div>
    </div>
        `;
    let firstChild = table.firstChild;
    table.insertBefore(div, firstChild);
    document.body.appendChild(edit);
    formPix.classList.remove('ativo');

    div.addEventListener('click', () => {
      const editValueBg = edit.querySelector('.editValueBg');
      editValueBg.classList.add('ativo');
      const exit = editValueBg.querySelector('#fecharEdit');
      const btnEditar = editValueBg.querySelector('#editar');
      const btnDeletar = editValueBg.querySelector('#deletar');
      const nomeEdit = editValueBg.querySelector('#nomeEdit');
      const dataEdit = editValueBg.querySelector('#dataInfo');
      const valorEdit = editValueBg.querySelector('#valorEdit');

      const nome = div.querySelector('#nomeMov');
      const data = div.querySelector('#data');
      const valor = div.querySelector('#valorFinal');

      function deletLabel() {
        const confirm = editValueBg.querySelector('.confirmar');
        const sim = confirm.querySelector('#sim');
        const nao = confirm.querySelector('#nao');
        confirm.classList.add('ativo');

        function removeAtivo() {
          confirm.classList.remove('ativo');
        }
        function removeAll() {
          editValueBg.classList.remove('ativo');
          div.remove();
          edit.remove();
          storage();
        }

        sim.addEventListener('click', removeAll);
        nao.addEventListener('click', removeAtivo);
      }

      function changeValue() {
        nomeEdit.value = nome.innerText;
        dataEdit.value = data.innerText;
        valorEdit.value = (+valor.innerText.replace('+R$', '')).toFixed(2);
      }
      changeValue();

      function EditValue() {
        nome.innerText = nomeEdit.value;
        data.innerText = dataEdit.value;
        valor.innerText = `+R$ ${valorEdit.value}`;

        storage();
      }

      function removeAtivoBg() {
        const confirm = editValueBg.querySelector('.confirmar');
        editValueBg.classList.remove('ativo');
        confirm.classList.remove('ativo');

        if (btnEditar.classList.contains('ativo')) {
          btnEditar.classList.remove('ativo');
          readOnly();
        }
      }
      function readOnly() {
        nomeEdit.toggleAttribute('readonly');
        dataEdit.toggleAttribute('readonly');
        valorEdit.toggleAttribute('readonly');
      }

      btnEditar.addEventListener('click', readOnly);
      exit.addEventListener('click', removeAtivoBg);
      btnDeletar.addEventListener('click', deletLabel);
      if (!btnEditar.classList.contains('ativo')) {
        btnEditar.addEventListener('click', EditValue);
      }
    });
    const editValueBg = edit.querySelector('.editValueBg');
    const btnEditar = editValueBg.querySelector('#editar');
    btnEditar.addEventListener('click', () =>
      btnEditar.classList.toggle('ativo'),
    );
    storage();
    InputValor[2].value = '';
    valor[2].value = '';
    dataInfo[2].value = '';
    nomeMov[2].value = '';
    categoria[1].value = '';
  } else if (
    InputValor[2].value &&
    nomeMov[2].value &&
    dataInfo[2].value != 0 &&
    categoria[1].value == '-' &&
    valor[2].value != 'R$0'
  ) {
    div.setAttribute('value', 'pixEnviado');
    div.innerHTML = `
    <div class='icon icon-transacao'>
      <img class='icon-transacao' src="./img/Movimentacoes/pix icon.svg">
    </div>
    <p>Transferencia enviada</p>
    <p id="valorFinal">-R$ ${(+InputValor[2].value).toFixed(2)}</p>
    <p class='pix' id="nomeMov">${nomeMov[2].value}</p>
    <p id="data">${dataInfo[2].value}</p>
        `;
    edit.innerHTML = `
    <div class="editValueBg">
      <div class="editValue">
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">
        <label for="data">Data</label>
        <input readonly type="date" ;" id="dataInfo" name="data" />

        <label for="valor">Valor</label>
        <input readonly type="valor" id="valorEdit">
        <div class='botaoEdit'>
          <button type="button" id="editar"></button>
          <button type="button" id="deletar">Deletar</button>
      </div>
      </div>
      <div class="confirmar">
        <span>Deseja mesmo deletar?</span>
        <button type="button" id="sim">Sim</button>
        <button type="button" id="nao">Não</button>
      </div>
    </div>
        `;
    let firstChild = table.firstChild;
    table.insertBefore(div, firstChild);
    document.body.appendChild(edit);
    formPix.classList.remove('ativo');

    div.addEventListener('click', () => {
      const editValueBg = edit.querySelector('.editValueBg');
      editValueBg.classList.add('ativo');
      const exit = editValueBg.querySelector('#fecharEdit');
      const btnEditar = editValueBg.querySelector('#editar');
      const btnDeletar = editValueBg.querySelector('#deletar');
      const nomeEdit = editValueBg.querySelector('#nomeEdit');
      const dataEdit = editValueBg.querySelector('#dataInfo');
      const valorEdit = editValueBg.querySelector('#valorEdit');

      const nome = div.querySelector('#nomeMov');
      const data = div.querySelector('#data');
      const valor = div.querySelector('#valorFinal');

      function deletLabel() {
        const confirm = editValueBg.querySelector('.confirmar');
        const sim = confirm.querySelector('#sim');
        const nao = confirm.querySelector('#nao');
        confirm.classList.add('ativo');

        function removeAtivo() {
          confirm.classList.remove('ativo');
        }
        function removeAll() {
          editValueBg.classList.remove('ativo');
          div.remove();
          edit.remove();
          storage();
        }

        sim.addEventListener('click', removeAll);
        nao.addEventListener('click', removeAtivo);
      }

      function changeValue() {
        nomeEdit.value = nome.innerText;
        dataEdit.value = data.innerText;
        valorEdit.value = (+valor.innerText.replace('-R$', '')).toFixed(2);
      }
      changeValue();

      function EditValue() {
        nome.innerText = nomeEdit.value;
        data.innerText = dataEdit.value;
        valor.innerText = `-R$ ${(+valorEdit.value).toFixed(2)}`;

        storage();
      }

      function removeAtivoBg() {
        const confirm = editValueBg.querySelector('.confirmar');
        editValueBg.classList.remove('ativo');
        confirm.classList.remove('ativo');

        if (btnEditar.classList.contains('ativo')) {
          btnEditar.classList.remove('ativo');
          readOnly();
        }
      }
      function readOnly() {
        nomeEdit.toggleAttribute('readonly');
        dataEdit.toggleAttribute('readonly');
        valorEdit.toggleAttribute('readonly');
      }
      btnEditar.addEventListener('click', () =>
        btnEditar.classList.toggle('ativo'),
      );
      btnEditar.addEventListener('click', readOnly);
      exit.addEventListener('click', removeAtivoBg);
      btnDeletar.addEventListener('click', deletLabel);
      if (!btnEditar.classList.contains('ativo')) {
        btnEditar.addEventListener('click', EditValue);
      }
    });
    storage();

    InputValor[2].value = '';
    valor[2].value = '';
    dataInfo[2].value = '';
    nomeMov[2].value = '';
    categoria[1].value = '';
  } else {
    alert('preencha todos os campos');
  }
});

// Emprestimo
adicionar[3].addEventListener('click', function () {
  const table = document.getElementById('tabela');

  if (
    InputValor[3].value &&
    nomeMov[3].value &&
    dataInfo[3].value &&
    valor[3].value !== 0 &&
    categoria[2].value == '-'
  ) {
    const div = document.createElement('div');
    const edit = document.createElement('div');
    div.classList.add('movimentacoesLista');
    div.id = 'empPegoLabel';
    div.setAttribute('value', 'emprestado');

    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/EmprestimoIcon 1.svg"alt="banco"> 
    </div>

    <p id="nomeMov" class = "nomeMov">${nomeMov[3].value}</p>
    <p class="parcelasTotal" id="parcelasTotal">${valor[3].value}</p>
    <p class = "deficit" id="deficit">-R$ ${(
        totalPago.value.replace('Total ', '') - InputValor[3].value
      ).toFixed(2)}</p>
    <p id="valorInicial" class = "valorInicial">+R$ ${(
        InputValor[3].value * 1
      ).toFixed(2)}</p>
    <p class = "valorFinal" id="valorFinal">${(+totalPago.value.replace(
        'Total ',
        '',
      )).toFixed(2)}</p>
    <p class = "data"id="data">${dataInfo[3].value}</p>
    <p id='jurosLs'>${juros.value}</p>
    <p id='jurosMesLs'>${jurosComp.value}</p>
        `;
    edit.innerHTML = `
        <div class="editValueBg">
          <div class="editValue">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="nome" id="nomeEdit">

            <label for="data">Data</label>
            <input readonly type="date" ;" id="dataInfo" name="data" />

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
            <label for="deficit">Deficit</label>
            <input readonly type="deficit" id="deficitEdit">
            <label for="valor-final">Valor Final</label>
            <input readonly type="valor-final" id="valorFinEdit">

          <div class='botaoEdit'>
            <button type="button" id="editar"></button>
            <button type="button" id="deletar">Deletar</button>
          </div>
            
          </div>
          <div class="confirmar">
            <span>Deseja mesmo deletar?</span>
            <button type="button" id="sim">Sim</button>
            <button type="button" id="nao">Não</button>
          </div>
        </div>
      `;
    let firstChild = table.firstChild;

    table.insertBefore(div, firstChild);
    document.body.appendChild(edit);
    formEmp.classList.remove('ativo');

    const editValueBg = edit.querySelector('.editValueBg');
    const exit = editValueBg.querySelector('#fecharEdit');
    const btnDeletar = editValueBg.querySelector('#deletar');
    const nomeEdit = editValueBg.querySelector('#nomeEdit');
    const dataEdit = editValueBg.querySelector('#dataInfo');
    const valorEdit = editValueBg.querySelector('#valorEdit');
    const parcelasEdit = editValueBg.querySelector('#parcelasEdit');
    const jurosEdit = editValueBg.querySelector('#jurosEdit');
    const jurosMesEdit = editValueBg.querySelector('#jurosCompEdit');
    const deficitEdit = editValueBg.querySelector('#deficitEdit');
    const valorFinalEdit = editValueBg.querySelector('#valorFinEdit');
    const btnEditar = edit.querySelector('#editar');

    const nome = div.querySelector('#nomeMov');
    const data = div.querySelector('#data');
    const valorInit = div.querySelector('#valorInicial');
    const deficitInit = div.querySelector('#deficit');
    const parcelasInit = div.querySelector('#parcelasTotal');
    const valor = div.querySelector('#valorFinal');
    const jurosInit = div.querySelector('#jurosLs');
    const jurosMesInit = div.querySelector('#jurosMesLs');

    function deletLabel() {
      const confirm = editValueBg.querySelector('.confirmar');
      const sim = confirm.querySelector('#sim');
      const nao = confirm.querySelector('#nao');
      confirm.classList.add('ativo');

      function removeAtivo() {
        confirm.classList.remove('ativo');
      }
      function removeAll() {
        editValueBg.classList.remove('ativo');
        div.remove();
        edit.remove();
        storage();
      }

      sim.addEventListener('click', removeAll);
      nao.addEventListener('click', removeAtivo);
    }

    function changeValue() {
      nomeEdit.value = nome.innerText;
      dataEdit.value = data.innerText;
      valorEdit.value = valorInit.innerText.replace('+R$ ', '');
      parcelasEdit.value = parcelasInit.innerText.slice(0, 1);
      jurosEdit.value = jurosInit.innerText;
      jurosMesEdit.value = jurosMesInit.innerText;
      deficitEdit.value = deficitInit.innerText.replace('-R$ ', '');
      valorFinalEdit.value = valor.innerText.replace('R$ ', '');
    }
    changeValue();

    function EditValue() {
      nome.innerText = nomeEdit.value;
      data.innerText = dataEdit.value;
      valorInit.innerText = `+R$ ${valorEdit.value}`;
      parcelasInit.innerText = `${parcelasEdit.value}x de R$${(
        valorFinalEdit.value / +parcelasEdit.innerText
      ).toFixed(2)}`;
      jurosInit.innerText = jurosEdit.value;
      jurosMesInit.innerText = jurosMesEdit.value;
      deficitInit.innerText = deficitEdit.value;
      valor.innerText = `R$ ${valorFinalEdit.value}`;
      storage();
    }
    function conta() {
      const jurosTotal =
        (+jurosEdit.value + jurosMesEdit.value * parcelasEdit.value) / 100;
      const deficitInit = valorEdit.value * jurosTotal;
      const valorFim = deficitInit + +valorEdit.value;
      valorFinalEdit.value = valorFim.toFixed(2);
      deficitEdit.value = deficitInit.toFixed(2);
    }

    function removeAtivoBg() {
      const confirm = editValueBg.querySelector('.confirmar');
      editValueBg.classList.remove('ativo');
      confirm.classList.remove('ativo');

      if (btnEditar.classList.contains('ativo')) {
        btnEditar.classList.remove('ativo');
        readOnly();
      }
    }
    function readOnly() {
      nomeEdit.toggleAttribute('readonly');
      dataEdit.toggleAttribute('readonly');
      valorEdit.toggleAttribute('readonly');
      parcelasEdit.toggleAttribute('disabled');
      jurosEdit.toggleAttribute('disabled');
      jurosMesEdit.toggleAttribute('disabled');
    }
    valorEdit.addEventListener('keyup', conta);
    parcelasEdit.addEventListener('click', conta);
    jurosEdit.addEventListener('click', conta);
    jurosMesEdit.addEventListener('click', conta);

    btnEditar.addEventListener('click', readOnly);
    exit.addEventListener('click', removeAtivoBg);
    btnDeletar.addEventListener('click', deletLabel);
    if (!btnEditar.classList.contains('ativo')) {
      btnEditar.addEventListener('click', EditValue);
    }
    btnEditar.addEventListener('click', () =>
      btnEditar.classList.toggle('ativo'),
    );

    div.addEventListener('click', () => {
      editValueBg.classList.add('ativo');
    });

    storage();

    nomeMov[3].value = '';
    categoria[2].value = '';
    dataInfo[3].value = '';
    InputValor[3].value = '';
    parcelas[2].selectedIndex = '1';
    valor[3].value = '';
    jurosComp.selectedIndex = '';
    juros.selectedIndex = '';
    totalPago.value = '';
  } else if (
    InputValor[3].value &&
    nomeMov[3].value &&
    dataInfo[3].value &&
    valor[3].value !== 0 &&
    categoria[2].value == '+'
  ) {
    const div = document.createElement('div');
    const edit = document.createElement('div');

    div.classList.add('movimentacoesLista');
    div.id = 'empLabel';
    div.setAttribute('value', 'emprestei');
    formEmp.classList.remove('ativo');

    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/EmprestimoIcon 1.svg"alt="banco"> 
    </div>

    <p id="nomeMov" class = "nomeMov">${nomeMov[3].value}</p>
    <p class="parcelasTotal" id="parcelasTotal">${valor[3].value}</p>
    <p class = "lucro" id="lucro">+R$ ${(
        totalPago.value.replace('Total ', '') - InputValor[3].value
      ).toFixed(2)}</p>
    <p id="valorInicial" class = "valorInicial">-R$ ${(
        InputValor[3].value * 1
      ).toFixed(2)}</p>
    <p class = "valorFinal" id="valorFinal">R$ ${(+totalPago.value.replace(
        'Total ',
        '',
      )).toFixed(2)}</p>
    <p class = "data"id="data">${dataInfo[3].value}</p>
    <p id='jurosLs'>${juros.value}</p>
    <p id='jurosMesLs'>${jurosComp.value}</p>
      `;
    edit.innerHTML = `
        <div class="editValueBg">
          <div class="editValue">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="nome" id="nomeEdit">

            <label for="data">Data</label>
            <input readonly type="date" ;" id="dataInfo" name="data" />

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
            
            <div class='botaoEdit'>
              <button type="button" id="editar"></button>
              <button type="button" id="deletar">Deletar</button>
            </div>

          </div>
          <div class="confirmar">
            <span>Deseja mesmo deletar?</span>
            <button type="button" id="sim">Sim</button>
            <button type="button" id="nao">Não</button>
          </div>
        </div>
      `;
    let firstChild = table.firstChild;
    table.insertBefore(div, firstChild);
    document.body.appendChild(edit);

    const editValueBg = edit.querySelector('.editValueBg');
    const exit = editValueBg.querySelector('#fecharEdit');
    const btnDeletar = editValueBg.querySelector('#deletar');
    const nomeEdit = editValueBg.querySelector('#nomeEdit');
    const dataEdit = editValueBg.querySelector('#dataInfo');
    const valorEdit = editValueBg.querySelector('#valorEdit');
    const parcelasEdit = editValueBg.querySelector('#parcelasEdit');
    const jurosEdit = editValueBg.querySelector('#jurosEdit');
    const jurosMesEdit = editValueBg.querySelector('#jurosCompEdit');
    const lucroEdit = editValueBg.querySelector('#lucroEdit');
    const valorFinalEdit = editValueBg.querySelector('#valorFinEdit');
    const btnEditar = edit.querySelector('#editar');

    const nome = div.querySelector('#nomeMov');
    const data = div.querySelector('#data');
    const valorInit = div.querySelector('#valorInicial');
    const lucro = div.querySelector('#lucro');
    const parcelasInit = div.querySelector('#parcelasTotal');
    const valor = div.querySelector('#valorFinal');
    const jurosInit = div.querySelector('#jurosLs');
    const jurosMesInit = div.querySelector('#jurosMesLs');

    function deletLabel() {
      const confirm = editValueBg.querySelector('.confirmar');
      const sim = confirm.querySelector('#sim');
      const nao = confirm.querySelector('#nao');
      confirm.classList.add('ativo');

      function removeAtivo() {
        confirm.classList.remove('ativo');
      }
      function removeAll() {
        editValueBg.classList.remove('ativo');
        div.remove();
        edit.remove();
        storage();
      }

      sim.addEventListener('click', removeAll);
      nao.addEventListener('click', removeAtivo);
    }

    function changeValue() {
      nomeEdit.value = nome.innerText;
      dataEdit.value = data.innerText;
      valorEdit.value = valorInit.innerText;
      parcelasEdit.value = parcelasInit.innerText;
      jurosEdit.value = jurosInit.innerText;
      jurosMesEdit.value = jurosMesInit.innerText;
      lucroEdit.value = lucro.innerText;
      valorFinalEdit.value = valor.innerText.replace('R$ ', '');
    }
    changeValue();

    function EditValue() {
      nome.innerText = nomeEdit.value;
      data.innerText = dataEdit.value;
      valorInit.innerText = `${valorEdit.value}`;
      parcelas.innerText = `${parcelasEdit.value}x de R$${(
        valorFinalEdit.value / +parcelasEdit.innerText
      ).toFixed(2)}`;
      lucro.innerText = lucroEdit.value;
      valor.innerText = valorFinalEdit.value;
      storage();
    }
    function conta() {
      const jurosTotal =
        (+jurosEdit.value + jurosMesEdit.value * parcelasEdit.value) / 100;
      const lucro = valorEdit.value * jurosTotal;
      const valorFim = lucro + +valorEdit.value;
      valorFinalEdit.value = valorFim.toFixed(2);
      lucroEdit.value = lucro.toFixed(2);
    }

    function removeAtivoBg() {
      const confirm = editValueBg.querySelector('.confirmar');
      editValueBg.classList.remove('ativo');
      confirm.classList.remove('ativo');

      if (btnEditar.classList.contains('ativo')) {
        btnEditar.classList.remove('ativo');
        readOnly();
      }
    }
    function readOnly() {
      nomeEdit.toggleAttribute('readonly');
      dataEdit.toggleAttribute('readonly');
      valorEdit.toggleAttribute('readonly');
      parcelasEdit.toggleAttribute('disabled');
      jurosEdit.toggleAttribute('disabled');
      jurosMesEdit.toggleAttribute('disabled');
    }
    valorEdit.addEventListener('keyup', conta);
    parcelasEdit.addEventListener('click', conta);
    jurosEdit.addEventListener('click', conta);
    jurosMesEdit.addEventListener('click', conta);

    btnEditar.addEventListener('click', readOnly);
    exit.addEventListener('click', removeAtivoBg);
    btnDeletar.addEventListener('click', deletLabel);
    if (!btnEditar.classList.contains('ativo')) {
      btnEditar.addEventListener('click', EditValue);
    }
    btnEditar.addEventListener('click', () =>
      btnEditar.classList.toggle('ativo'),
    );

    div.addEventListener('click', () => {
      editValueBg.classList.add('ativo');
    });
    storage();
    nomeMov[3].value = '';
    categoria[2].value = '';
    dataInfo[3].value = '';
    InputValor[3].value = '';
    parcelas[2].selectedIndex = '0';
    valor[3].value = '';
    jurosComp.selectedIndex = '';
    juros.selectedIndex = '';
    totalPago.value = '';
  } else {
    alert('Preencha todos os campos');
  }
});

// Storage
function arrumarNome() {
  const nomeLogin = document.querySelector('.nome-login');
  const nomeUser = JSON.parse(localStorage.usuarios);
  nomeLogin.innerText = `Olá, ${nomeUser[0].nome} ${nomeUser[0].sobrenome.slice(
    0,
    1,
  )}.`;
}
function arrumarInputValor() {
  if (localStorage.compras) {
    const compra = JSON.parse(localStorage.compras);
    const compraLabel = document.querySelectorAll('#compraLabel');

    compraLabel.forEach((i, n) => {
      const nome = i.querySelector('#nomeMov');
      const categoria = i.querySelector('#categoria');
      const data = i.querySelector('#data');
      const parcelas = i.querySelector('#parcelasTotal');
      const valor = i.querySelector('#valorFinal');

      nome.innerText = `${compra[n].nome}`;
      categoria.innerText = compra[n].categoria;
      data.innerText = `${compra[n].data}`;
      parcelas.innerText = compra[n].parcelas;
      valor.innerText = compra[n].valor;
    });
  }
  if (localStorage.vendas) {
    const venda = JSON.parse(localStorage.vendas);
    const vendaLabel = document.querySelectorAll('#vendaLabel');

    vendaLabel.forEach((i, n) => {
      const nome = i.querySelector('#nomeMov');
      const data = i.querySelector('#data');
      const parcelas = i.querySelector('#parcelasTotal');
      const valor = i.querySelector('#valorFinal');

      nome.innerText = `${venda[n].nome}`;
      data.innerText = venda[n].data;
      parcelas.innerText = venda[n].parcelas;
      valor.innerText = venda[n].valor;
    });
  }
  if (localStorage.pixEnviado) {
    const pix = JSON.parse(localStorage.pixEnviado);
    const pixLabel = document.querySelectorAll('[value="pixEnviado"]');

    pixLabel.forEach((i, n) => {
      const nome = i.querySelector('#nomeMov');
      const data = i.querySelector('#data');
      const valor = i.querySelector('#valorFinal');

      nome.innerText = pix[n].nome;
      data.innerText = pix[n].data;
      valor.innerText = pix[n].valor;
    });
  }
  if (localStorage.pixRecebido) {
    const pix = JSON.parse(localStorage.pixRecebido);
    const pixLabel = document.querySelectorAll('[value="pixRecebido"]');

    pixLabel.forEach((i, n) => {
      const nome = i.querySelector('#nomeMov');
      const data = i.querySelector('#data');
      const valor = i.querySelector('#valorFinal');

      nome.innerText = pix[n].nome;
      data.innerText = pix[n].data;
      valor.innerText = pix[n].valor;
    });
  }
  if (localStorage.empDevido) {
    const empPego = JSON.parse(localStorage.empDevido);
    const empPegoLabel = document.querySelectorAll('#empPegoLabel');

    empPegoLabel.forEach((i, n) => {
      const nome = i.querySelector('#nomeMov');
      const data = i.querySelector('#data');
      const valorInit = i.querySelector('#valorInicial');
      const deficit = i.querySelector('#deficit');
      const parcelas = i.querySelector('#parcelasTotal');
      const valor = i.querySelector('#valorFinal');
      const juros = i.querySelector('#jurosLs');
      const jurosMes = i.querySelector('#jurosMesLs');

      nome.innerText = empPego[n].nome;
      data.innerText = empPego[n].data;
      valorInit.innerText = empPego[n].valorInicial;
      parcelas.innerText = empPego[n].parcelas;
      deficit.innerText = empPego[n].deficit;
      valor.innerText = empPego[n].valorFinal;
      juros.innerText = empPego[n].juros;
      jurosMes.innerText = empPego[n].jurosMes;
    });
  }
  if (localStorage.empEnviado) {
    const empEnviado = JSON.parse(localStorage.empEnviado);
    const empLabel = document.querySelectorAll('#empLabel');

    empLabel.forEach((i, n) => {
      const nome = i.querySelector('#nomeMov');
      const data = i.querySelector('#data');
      const valorInit = i.querySelector('#valorInicial');
      const lucro = i.querySelector('#lucro');
      const parcelas = i.querySelector('#parcelasTotal');
      const valor = i.querySelector('#valorFinal');
      const juros = i.querySelector('#jurosLs');
      const jurosMes = i.querySelector('#jurosMesLs');

      nome.innerText = empEnviado[n].nome;
      data.innerText = empEnviado[n].data;
      valorInit.innerText = empEnviado[n].valorInicial;
      parcelas.innerText = empEnviado[n].parcelas;
      lucro.innerText = empEnviado[n].lucro;
      valor.innerText = empEnviado[n].valorFinal;
      juros.innerText = empEnviado[n].juros;
      jurosMes.innerText = empEnviado[n].jurosMes;
    });
  }
}

function criarPaineis() {
  const ls = JSON.parse(localStorage.transacoes);

  ls.forEach((v) => {
    const table = document.getElementById('tabela');
    const div = document.createElement('div');
    const edit = document.createElement('div');
    div.classList.add('movimentacoesLista');

    if (v === 'compra') {
      edit.id = v + 'Edit';
      div.id = 'compraLabel';
      div.setAttribute('value', v);
      div.innerHTML = `
            <div class='icon icon-transacao'>
            <img class='icon-transacao' src="./img/Movimentacoes/compra icon.svg">
            </div>
            <p id="nomeMov"></p>
            <p id="valorFinal"></p>
            <p id="categoria"></p>
            <p id="data"></p>
            <p id="parcelasTotal"></p>
      `;
      edit.innerHTML = `
      <div class="editValueBg">
        <div class="editValue">
          <span id="fecharEdit">X</span>
          <label for="nome">Nome</label>
          <input readonly type="text" name='nome' id="nomeEdit">

          <label for="categoria">Categoria</label>
          <select disabled id="categoriaEdit" name="categoria" >
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
        <input readonly type="date" ;" id="dataInfo" name="data" />

          <label for="parcelas">Parcelas</label>

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

          <div class='botaoEdit'>
           <button type="button" id="editar"></button>
            <button type="button" id="deletar">Deletar</button>
          </div>

        </div>
        <div class="confirmar">
          <span>Deseja mesmo deletar?</span>
          <button type="button" id="sim">Sim</button>
          <button type="button" id="nao">Não</button>
        </div>
      </div>
  `;
    } else if (v === 'venda') {
      edit.id = v + 'Edit';
      div.id = 'vendaLabel';
      div.setAttribute('value', v);
      div.innerHTML = `
          <div class='icon icon-transacao'>
            <img class='icon-transacao' src="./img/Movimentacoes/venda icon.svg">
          </div> 

            <p id="nomeMov"></p>
            <p id="valorFinal"></p>
            <p class='parcelas-venda' id="parcelasTotal"></p>
            <p id="data"></p>

      `;
      edit.innerHTML = `
      <div class="editValueBg">
        <div class="editValue">
          <span id="fecharEdit">X</span>
          <label for="nome">Nome</label>
          <input readonly type="nome" id="nomeEdit">

          <label for="data">Data</label>
          <input readonly type="date" ;" id="dataInfo" name="data" />

          <label for="parcelas">Parcelas</label>
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
          <div class='botaoEdit'>
            <button type="button" id="editar"></button>
            <button type="button" id="deletar">Deletar</button>
          </div>
        </div>
        <div class="confirmar">
          <span>Deseja mesmo deletar?</span>
          <button type="button" id="sim">Sim</button>
          <button type="button" id="nao">Não</button>
        </div>
    </div>
  `;
    } else if (v === 'pixEnviado') {
      edit.id = 'pixEnvEdit';
      div.id = 'pixLabel';
      div.setAttribute('value', v);
      div.innerHTML = `
        <div class='icon icon-transacao'>
        <img class='icon-transacao' src="./img/Movimentacoes/pix icon.svg">
        </div>

        <p>Transferencia enviada</p>
        <p id="valorFinal"></p>
        <p class='pix' id="nomeMov"></p>
        <p id="data"></p>
            `;
      edit.innerHTML = `        
        <div class="editValueBg">
          <div class="editValue">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="nome" id="nomeEdit">

            <label for="data">Data</label>
            <input readonly type="date" ;" id="dataInfo" name="data" />

            <label for="valor">Valor</label>
            <input readonly type="valor" id="valorEdit">
            <div class="botaoEdit">
              <button type="button" id="editar"></button>
              <button type="button" id="deletar">Deletar</button>
            </div>
          </div>
          <div class="confirmar">
            <span>Deseja mesmo deletar?</span>
            <button type="button" id="sim">Sim</button>
            <button type="button" id="nao">Não</button>
          </div>
        </div>
            `;
    } else if (v === 'pixRecebido') {
      edit.id = 'pixEdit';
      div.id = 'pixLabel';
      div.setAttribute('value', v);
      div.innerHTML = `

        <div class='icon icon-transacao'>
        <img class='icon-transacao' src="./img/Movimentacoes/pix icon.svg">
        </div>

        <p>Transferencia recebida</p>
        <p id="valorFinal"></p>
        <p class='pix' id="nomeMov"></p>
        <p id="data"></p>
            `;
      edit.innerHTML = `
            <div class="editValueBg">
              <div class="editValue">
                <span id="fecharEdit">X</span>
                <label for="nome">Nome</label>
                <input readonly type="nome" id="nomeEdit">
                
                <label for="data">Data</label>
                <input readonly type="date" ;" id="dataInfo" name="data" />

                <label for="valor">Valor</label>
                <input readonly type="valor" id="valorEdit">
                <div class="botaoEdit">
                  <button type="button" id="editar"></button>
                  <button type="button" id="deletar">Deletar</button>
                </div>
              </div>
              <div class="confirmar">
                <span>Deseja mesmo deletar?</span>
                <button type="button" id="sim">Sim</button>
                <button type="button" id="nao">Não</button>
              </div>
            </div>
                `;
    } else if (v === 'emprestei') {
      edit.id = v + 'Edit';
      div.id = 'empLabel';
      div.setAttribute('value', v);
      div.innerHTML = `
        
        <div class='icon icon-transacao'>
        <img class='icon-transacao' src="./img/Movimentacoes/EmprestimoIcon 1.svg"alt="banco"> 
        </div>

        <p id="nomeMov" class = "nomeMov"></p>
        <p class="parcelasTotal" id="parcelasTotal"></p>
        <p class = "lucro" id="lucro"></p>
        <p id="valorInicial" class = "valorInicial"></p>
        <p class = "valorFinal" id="valorFinal"></p>
        <p class = "data"id="data"></p>
        <p id='jurosLs'></p>
        <p id='jurosMesLs'></p>

        `;
      edit.innerHTML = `
        <div class="editValueBg">
          <div class="editValue">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="nome" id="nomeEdit">

            <label for="data">Data</label>
            <input readonly type="date" ;" id="dataInfo" name="data" />

            <label for="valor">Valor</label>
            <input readonly type="valor" id="valorEdit">

          <label for="parcelas">Parcelas</label>
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

          <label for="juros">Juros</label>
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

          <label for="juros-compostos">Juros ao mês</label>
          <select disabled name="juros-compostos" id="jurosCompEdit">
            <option value="0">0% ao mês</option>
            <option value="1">1% ao mês</option>
            <option value="2">2% ao mês</option>
            <option value="3">3% ao mês</option>
            <option value="4">4% ao mês</option>
            <option value="5">5% ao mês</option>
            <option value="6">6% ao mês</option>
            <option value="7">7% ao mês</option>
            <option value="8">8% ao mês</option>
            <option value="9">9% ao mês</option>
            <option value="10">10% ao mês</option>
            <option value="11">11% ao mês</option>
            <option value="12">12% ao mês</option>
          </select>
            <label for="lucro">Lucro</label>
            <input readonly type="lucro" id="lucroEdit">
            <label for="valor-final">Valor Final</label>
            <input readonly type="valor-final" id="valorFinEdit">
          <div class='botaoEdit'>
            <button type="button" id="editar"></button>
            <button type="button" id="deletar">Deletar</button>
          </div>

          </div>
          <div class="confirmar">
            <span>Deseja mesmo deletar?</span>
            <button type="button" id="sim">Sim</button>
            <button type="button" id="nao">Não</button>
          </div>
        </div>
      `;
    } else if (v === 'emprestado') {
      edit.id = v + 'Edit';
      div.id = 'empPegoLabel';
      div.setAttribute('value', v);
      div.innerHTML = `
        
        <div class='icon icon-transacao'>
        <img class='icon-transacao' src="./img/Movimentacoes/EmprestimoIcon 1.svg"alt="banco"> 
        </div>

        <p id="nomeMov" class = "nomeMov"></p>
        <p class="parcelasTotal" id="parcelasTotal"></p>
        <p class = "deficit" id="deficit"></p>
        <p id="valorInicial" class = "valorInicial"></p>
        <p class = "valorFinal" id="valorFinal"></p>
        <p class = "data"id="data"></p>
        <p id='jurosLs'></p>
        <p id='jurosMesLs'></p>
    `;
      edit.innerHTML = `
        <div class="editValueBg">
          <div class="editValue">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="nome" id="nomeEdit">

            <label for="data">Data</label>
            <input readonly type="date" ;" id="dataInfo" name="data" />

            <label for="valor">Valor</label>
            <input readonly type="valor" id="valorEdit">

            <label for="parcelas">Parcelas</label>
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

          <label for="juros">Juros</label>
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

          <label for="juros-compostos">Juros ao mês</label>
          <select disabled name="juros-compostos" id="jurosCompEdit">
            <option value="0">0% ao mês</option>
            <option value="1">1% ao mês</option>
            <option value="2">2% ao mês</option>
            <option value="3">3% ao mês</option>
            <option value="4">4% ao mês</option>
            <option value="5">5% ao mês</option>
            <option value="6">6% ao mês</option>
            <option value="7">7% ao mês</option>
            <option value="8">8% ao mês</option>
            <option value="9">9% ao mês</option>
            <option value="10">10% ao mês</option>
            <option value="11">11% ao mês</option>
            <option value="12">12% ao mês</option>
          </select>
            <label for="deficit">Deficit</label>
            <input readonly type="deficit" id="deficitEdit">
            <label for="valor-final">Valor Final</label>
            <input readonly type="valor-final" id="valorFinEdit">
          <div class='botaoEdit'>
            <button type="button" id="editar"></button>
            <button type="button" id="deletar">Deletar</button>
          </div>

          </div>
          <div class="confirmar">
            <span>Deseja mesmo deletar?</span>
            <button type="button" id="sim">Sim</button>
            <button type="button" id="nao">Não</button>
          </div>
        </div>
        `;
    } else {
      console.log('erro');
    }

    table.appendChild(div);
    document.body.appendChild(edit);
  });
}

function storage() {
  const transacao = document.querySelectorAll('.movimentacoesLista');
  const compraLabel = document.querySelectorAll('#compraLabel');
  const vendaLabel = document.querySelectorAll('#vendaLabel');
  const pixLabel = document.querySelectorAll('[value="pixRecebido"]');
  const pixPegoLabel = document.querySelectorAll('[value="pixEnviado"]');
  const empLabel = document.querySelectorAll('#empLabel');
  const empPegoLabel = document.querySelectorAll('#empPegoLabel');
  const valorStatus = document.querySelector('.valor');

  const compraArray = [];
  const vendaArray = [];
  const pixArray = [];
  const pixEnviadoArray = [];
  const EmprestimoEnviado = [];
  const emprestimoDevido = [];
  const InputValor = [];

  compraLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const categoria = i.querySelector('#categoria');
    const data = i.querySelector('#data');
    const parcelas = i.querySelector('#parcelasTotal');
    const valor = i.querySelector('#valorFinal');

    const compra = {
      nome: '',
      categoria: '',
      data: '',
      parcelas: '',
      valor: '',
    };
    compra['nome'] = [nome.innerText];
    compra['categoria'] = [categoria.innerText];
    compra['data'] = [data.innerText];
    compra['parcelas'] = [parcelas.innerText];
    compra['valor'] = [valor.innerText];
    compraArray.push(compra);
    InputValor.push(+valor.innerText.replace('-R$', '') * -1);
  });
  vendaLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const parcelas = i.querySelector('#parcelasTotal');
    const valor = i.querySelector('#valorFinal');

    const venda = {
      nome: '',
      data: '',
      parcelas: '',
      valor: '',
    };
    const valorPush = +valor.innerText.replace('R$', '');

    venda['nome'] = [nome.innerText];
    venda['data'] = [data.innerText];
    venda['parcelas'] = [parcelas.innerText];
    venda['valor'] = [valor.innerText];
    vendaArray.push(venda);
    console.log();
    InputValor.push(valorPush);
  });

  pixLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const valor = i.querySelector('#valorFinal');

    const pix = {
      nome: '',
      data: '',
      valor: '',
    };
    const pixEnvPush = +valor.innerText.replace('+R$', '');
    pix['nome'] = [nome.innerText];
    pix['data'] = [data.innerText];
    pix['valor'] = [valor.innerText];
    pixArray.push(pix);
    InputValor.push(pixEnvPush);
  });

  pixPegoLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const valor = i.querySelector('#valorFinal');

    const pix = {
      nome: '',
      data: '',
      valor: '',
    };
    const pixEnvPush = +valor.innerText.replace('-R$', '') * -1;
    pix['nome'] = [nome.innerText];
    pix['data'] = [data.innerText];
    pix['valor'] = [valor.innerText];
    pixEnviadoArray.push(pix);
    InputValor.push(pixEnvPush);
  });

  empPegoLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const valorInit = i.querySelector('#valorInicial');
    const deficit = i.querySelector('#deficit');
    const parcelas = i.querySelector('#parcelasTotal');
    const valor = i.querySelector('#valorFinal');
    const juros = i.querySelector('#jurosLs');
    const jurosMes = i.querySelector('#jurosMesLs');
    const emprestimo = {
      nome: '',
      data: '',
      valorInicial: '',
      parcelas: '',
      deficit: '',
      valorFinal: '',
      juros: '',
      jurosMes: '',
    };
    const empPegoPush = +valorInit.innerText.replace('+R$', '');
    emprestimo['nome'] = [nome.innerText];
    emprestimo['data'] = [data.innerText];
    emprestimo['parcelas'] = [parcelas.innerText];
    emprestimo['valorInicial'] = [valorInit.innerText];
    emprestimo['deficit'] = [deficit.innerText];
    emprestimo['valorFinal'] = [valor.innerText];
    emprestimo['juros'] = [juros.innerText];
    emprestimo['jurosMes'] = [jurosMes.innerText];
    emprestimoDevido.push(emprestimo);
    InputValor.push(empPegoPush);
  });

  empLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const valorInit = i.querySelector('#valorInicial');
    const lucro = i.querySelector('#lucro');
    const parcelas = i.querySelector('#parcelasTotal');
    const valor = i.querySelector('#valorFinal');
    const juros = i.querySelector('#jurosLs');
    const jurosMes = i.querySelector('#jurosMesLs');

    const emprestimo = {
      nome: '',
      data: '',
      valorInicial: '',
      parcelas: '',
      lucro: '',
      valorFinal: '',
      juros: '',
      jurosMes: '',
    };

    const empEnvPush = +valorInit.innerText.replace('-R$', '') * -1;
    emprestimo['nome'] = [nome.innerText];
    emprestimo['data'] = [data.innerText];
    emprestimo['parcelas'] = [parcelas.innerText];
    emprestimo['valorInicial'] = [valorInit.innerText];
    emprestimo['lucro'] = [lucro.innerText];
    emprestimo['valorFinal'] = [valor.innerText];
    emprestimo['juros'] = [juros.innerText];
    emprestimo['jurosMes'] = [jurosMes.innerText];
    EmprestimoEnviado.push(emprestimo);
    InputValor.push(empEnvPush);
  });

  const transacoes = [];
  localStorage.setItem('InputValor', JSON.stringify(InputValor));
  transacao.forEach((t) => transacoes.push(t.getAttribute('value')));
  localStorage.setItem('compras', JSON.stringify(compraArray));
  localStorage.setItem('vendas', JSON.stringify(vendaArray));
  localStorage.setItem('pixRecebido', JSON.stringify(pixArray));
  localStorage.setItem('pixEnviado', JSON.stringify(pixEnviadoArray));
  localStorage.setItem('empEnviado', JSON.stringify(EmprestimoEnviado));
  localStorage.setItem('empDevido', JSON.stringify(emprestimoDevido));
  localStorage.setItem('transacoes', JSON.stringify(transacoes));

  const status = document.querySelector('.status');

  const soma = InputValor.reduce(
    (acumulador, valorAtual) => acumulador + valorAtual,
    0,
  );
  if (soma > 0) {
    status.style.backgroundColor = ' rgb(227, 247, 236)';
    status.innerHTML =
      '<img src="./img/Movimentacoes/positivo.svg" alt=""> Positivo';
  } else if (soma === 0) {
    status.style.backgroundColor = ' rgba(142, 208, 236, 0.80)';
    status.innerHTML =
      '<img src="./img/Movimentacoes/neutro.svg" alt=""> Neutro';
  } else if (soma < 0) {
    status.style.backgroundColor = ' rgba(255, 0, 0, 0.5)';
    status.innerHTML =
      '<img src="./img/Movimentacoes/negativo.svg" alt=""> Negativo';
    status.style.color = '#610000';
  }

  valorStatus.innerText = `R$ ${soma.toFixed(2).replace('.', ',')}`;
}

if (localStorage.transacoes) {
  criarPaineis();
}

if (localStorage.transacoes) {
  arrumarInputValor();
}
if (localStorage.usuarios) {
  arrumarNome();
} else {
  window.open('index.html', '_top');
}
const empLabel = document.querySelectorAll('#empLabel');
const compraLabel = document.querySelectorAll('#compraLabel');
const vendaLabel = document.querySelectorAll('#vendaLabel');
const PixEnviadoLabel = document.querySelectorAll('[value="pixEnviado"]');
const PixRecebidoLabel = document.querySelectorAll('[value="pixRecebido"]');
const empPegoLabel = document.querySelectorAll('#empPegoLabel');

if (localStorage.empDevido) {
  empPegoLabel.forEach((i, n) => {
    const empLabelEdit = document.querySelectorAll('#emprestadoEdit');
    const editValueBg = empLabelEdit[n].querySelector('.editValueBg');
    const exit = editValueBg.querySelector('#fecharEdit');
    const btnEditar = editValueBg.querySelector('#editar');
    const btnDeletar = editValueBg.querySelector('#deletar');
    const nomeEdit = editValueBg.querySelector('#nomeEdit');
    const dataEdit = editValueBg.querySelector('#dataInfo');
    const valorEdit = editValueBg.querySelector('#valorEdit');
    const parcelasEdit = editValueBg.querySelector('#parcelasEdit');
    const jurosEdit = editValueBg.querySelector('#jurosEdit');
    const jurosMesEdit = editValueBg.querySelector('#jurosCompEdit');
    const deficitEdit = editValueBg.querySelector('#deficitEdit');
    const valorFinalEdit = editValueBg.querySelector('#valorFinEdit');

    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const valorInit = i.querySelector('#valorInicial');
    const deficitInit = i.querySelector('#deficit');
    const parcelasInit = i.querySelector('#parcelasTotal');
    const valor = i.querySelector('#valorFinal');
    const jurosInit = i.querySelector('#jurosLs');
    const jurosMesInit = i.querySelector('#jurosMesLs');

    function deletLabel() {
      const confirm = editValueBg.querySelector('.confirmar');
      const sim = confirm.querySelector('#sim');
      const nao = confirm.querySelector('#nao');
      confirm.classList.add('ativo');

      function removeAtivo() {
        confirm.classList.remove('ativo');
      }
      function removeAll() {
        editValueBg.classList.remove('ativo');
        empLabelEdit[n].remove();
        i.remove();
        storage();
      }

      sim.addEventListener('click', removeAll);
      nao.addEventListener('click', removeAtivo);
    }

    function changeValue() {
      nomeEdit.value = nome.innerText;
      dataEdit.value = data.innerText;
      valorEdit.value = valorInit.innerText.replace('+R$ ', '');
      parcelasEdit.value = parcelasInit.innerText.slice(0, 1);
      jurosEdit.value = jurosInit.innerText;
      jurosMesEdit.value = jurosMesInit.innerText;
      deficitEdit.value = deficitInit.innerText.replace('-R$ ', '');
      valorFinalEdit.value = valor.innerText.replace('R$ ', '');
    }
    changeValue();

    function EditValue() {
      nome.innerText = nomeEdit.value;
      data.innerText = dataEdit.value;
      valorInit.innerText = `+R$ ${valorEdit.value}`;
      parcelas.innerText = `${parcelasEdit.value}x de R$${(
        valorFinalEdit.value / +parcelasEdit.value
      ).toFixed(2)}`;
      deficit.innerText = deficitEdit.value;
      valor.innerText = valorFinalEdit.value.replace('R$', '');
      storage();
    }
    function conta() {
      const jurosTotal =
        (+jurosEdit.value + jurosMesEdit.value * parcelasEdit.value) / 100;
      const deficit = valorEdit.value * jurosTotal;
      const valorFim = deficit + +valorEdit.value;
      valorFinalEdit.value = valorFim.toFixed(2);
      deficitEdit.value = deficit.toFixed(2);
    }
    function removeAtivoBg() {
      const confirm = editValueBg.querySelector('.confirmar');
      editValueBg.classList.remove('ativo');
      confirm.classList.remove('ativo');

      if (btnEditar.classList.contains('ativo')) {
        btnEditar.classList.remove('ativo');
        readOnly();
      }
    }
    function readOnly() {
      nomeEdit.toggleAttribute('readonly');
      dataEdit.toggleAttribute('readonly');
      valorEdit.toggleAttribute('readonly');
      parcelasEdit.toggleAttribute('disabled');
      jurosEdit.toggleAttribute('disabled');
      jurosMesEdit.toggleAttribute('disabled');
    }

    valorEdit.addEventListener('keyup', conta);
    parcelasEdit.addEventListener('click', conta);
    jurosEdit.addEventListener('click', conta);
    jurosMesEdit.addEventListener('click', conta);
    btnEditar.addEventListener('click', () =>
      btnEditar.classList.toggle('ativo'),
    );
    btnEditar.addEventListener('click', readOnly);
    exit.addEventListener('click', removeAtivoBg);
    btnDeletar.addEventListener('click', deletLabel);
    if (!btnEditar.classList.contains('ativo')) {
      btnEditar.addEventListener('click', EditValue);
    }

    i.addEventListener('click', () => editValueBg.classList.add('ativo'));
  });
}
if (localStorage.empEnviado) {
  empLabel.forEach((i, n) => {
    const empLabelEdit = document.querySelectorAll('#empresteiEdit');
    const editValueBg = empLabelEdit[n].querySelector('.editValueBg');
    const exit = editValueBg.querySelector('#fecharEdit');
    const btnEditar = editValueBg.querySelector('#editar');
    const btnDeletar = editValueBg.querySelector('#deletar');
    const nomeEdit = editValueBg.querySelector('#nomeEdit');
    const dataEdit = editValueBg.querySelector('#dataInfo');
    const valorEdit = editValueBg.querySelector('#valorEdit');
    const parcelasEdit = editValueBg.querySelector('#parcelasEdit');
    const jurosEdit = editValueBg.querySelector('#jurosEdit');
    const jurosMesEdit = editValueBg.querySelector('#jurosCompEdit');
    const lucroEdit = editValueBg.querySelector('#lucroEdit');
    const valorFinalEdit = editValueBg.querySelector('#valorFinEdit');

    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const valorInit = i.querySelector('#valorInicial');
    const lucro = i.querySelector('#lucro');
    const parcelas = i.querySelector('#parcelasTotal');
    const valor = i.querySelector('#valorFinal');
    const juros = i.querySelector('#jurosLs');
    const jurosMes = i.querySelector('#jurosMesLs');

    function deletLabel() {
      const confirm = editValueBg.querySelector('.confirmar');
      const sim = confirm.querySelector('#sim');
      const nao = confirm.querySelector('#nao');
      confirm.classList.add('ativo');

      function removeAtivo() {
        confirm.classList.remove('ativo');
      }
      function removeAll() {
        editValueBg.classList.remove('ativo');
        empLabelEdit[n].remove();
        i.remove();
        storage();
      }

      sim.addEventListener('click', removeAll);
      nao.addEventListener('click', removeAtivo);
    }

    function changeValue() {
      nomeEdit.value = nome.innerText;
      dataEdit.value = data.innerText;
      valorEdit.value = valorInit.innerText.replace('R$ ', '');
      parcelasEdit.value = parcelas.innerText.slice(0, 1);
      jurosEdit.value = juros.innerText;
      jurosMesEdit.value = jurosMes.innerText;
      lucroEdit.value = lucro.innerText.replace('R$ ', '');
      valorFinalEdit.value = valor.innerText.replace('R$ ', '');
    }
    changeValue();

    function EditValue() {
      nome.innerText = nomeEdit.value;
      data.innerText = dataEdit.value;
      valorInit.innerText = `-R$ ${valorEdit.value}`;
      parcelas.innerText = `${parcelasEdit.value}x de R$${(
        valorFinalEdit.value / +parcelasEdit.value
      ).toFixed(2)}`;
      lucro.innerText = lucroEdit.value;
      valor.innerText = valorFinalEdit.value;
      storage();
    }
    function conta() {
      const jurosTotal =
        (+jurosEdit.value + jurosMesEdit.value * parcelasEdit.value) / 100;
      const lucro = valorEdit.value * jurosTotal;
      const valorFim = lucro + +valorEdit.value;
      valorFinalEdit.value = valorFim.toFixed(2);
      lucroEdit.value = lucro.toFixed(2);
    }
    function removeAtivoBg() {
      const confirm = editValueBg.querySelector('.confirmar');
      editValueBg.classList.remove('ativo');
      confirm.classList.remove('ativo');

      if (btnEditar.classList.contains('ativo')) {
        btnEditar.classList.remove('ativo');
        readOnly();
      }
    }
    function readOnly() {
      nomeEdit.toggleAttribute('readonly');
      dataEdit.toggleAttribute('readonly');
      valorEdit.toggleAttribute('readonly');
      parcelasEdit.toggleAttribute('disabled');
      jurosEdit.toggleAttribute('disabled');
      jurosMesEdit.toggleAttribute('disabled');
    }

    valorEdit.addEventListener('keyup', conta);
    parcelasEdit.addEventListener('click', conta);
    jurosEdit.addEventListener('click', conta);
    jurosMesEdit.addEventListener('click', conta);
    btnEditar.addEventListener('click', () =>
      btnEditar.classList.toggle('ativo'),
    );
    btnEditar.addEventListener('click', readOnly);
    exit.addEventListener('click', removeAtivoBg);
    btnDeletar.addEventListener('click', deletLabel);
    if (!btnEditar.classList.contains('ativo')) {
      btnEditar.addEventListener('click', EditValue);
    }

    i.addEventListener('click', () => editValueBg.classList.add('ativo'));
  });
}
if (localStorage.compras) {
  compraLabel.forEach((i, n) => {
    const compraEdit = document.querySelectorAll('#compraEdit');
    const editValueBg = compraEdit[n].querySelector('.editValueBg');
    const exit = editValueBg.querySelector('#fecharEdit');
    const btnEditar = editValueBg.querySelector('#editar');
    const btnDeletar = editValueBg.querySelector('#deletar');
    const nomeEdit = editValueBg.querySelector('#nomeEdit');
    const dataEdit = editValueBg.querySelector('#dataInfo');
    const valorEdit = editValueBg.querySelector('#valorEdit');
    const parcelasEdit = editValueBg.querySelector('#parcelasEdit');
    const categoriaEdit = editValueBg.querySelector('#categoriaEdit');

    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const parcelas = i.querySelector('#parcelasTotal');
    const valor = i.querySelector('#valorFinal');
    const categoria = i.querySelector('#categoria');
    function deletLabel() {
      const confirm = editValueBg.querySelector('.confirmar');
      const sim = confirm.querySelector('#sim');
      const nao = confirm.querySelector('#nao');
      confirm.classList.add('ativo');

      function removeAtivo() {
        confirm.classList.remove('ativo');
      }
      function removeAll() {
        editValueBg.classList.remove('ativo');
        i.remove();
        compraEdit[n].remove();
        storage();
      }

      sim.addEventListener('click', removeAll);
      nao.addEventListener('click', removeAtivo);
    }

    function changeValue() {
      nomeEdit.value = nome.innerText;
      dataEdit.value = data.innerText;
      valorEdit.value = valor.innerText.replace('-R$', '');
      parcelasEdit.value = parcelas.innerText.slice(0, 1);
      categoriaEdit.value = categoria.innerText;
    }
    changeValue();

    function EditValue() {
      nome.innerText = nomeEdit.value;
      data.innerText = dataEdit.value;
      parcelas.innerText = parcelasEdit.value;
      valor.innerText = `-R$ ${valorEdit.value}`;
      categoria.innerText = categoriaEdit.value;
      storage();
    }

    function removeAtivoBg() {
      const confirm = editValueBg.querySelector('.confirmar');
      editValueBg.classList.remove('ativo');
      confirm.classList.remove('ativo');

      if (btnEditar.classList.contains('ativo')) {
        btnEditar.classList.remove('ativo');
        readOnly();
      }
    }

    function readOnly() {
      nomeEdit.toggleAttribute('readonly');
      dataEdit.toggleAttribute('readonly');
      valorEdit.toggleAttribute('readonly');
      parcelasEdit.toggleAttribute('disabled');
      categoriaEdit.toggleAttribute('disabled');
    }

    btnEditar.addEventListener('click', () =>
      btnEditar.classList.toggle('ativo'),
    );
    btnEditar.addEventListener('click', readOnly);
    exit.addEventListener('click', removeAtivoBg);
    btnDeletar.addEventListener('click', deletLabel);
    if (!btnEditar.classList.contains('ativo')) {
      btnEditar.addEventListener('click', EditValue);
    }
    i.addEventListener('click', () => editValueBg.classList.add('ativo'));
  });
}
if (localStorage.vendas) {
  vendaLabel.forEach((i, n) => {
    const vendaEdit = document.querySelectorAll('#vendaEdit');
    const editValueBg = vendaEdit[n].querySelector('.editValueBg');
    const exit = editValueBg.querySelector('#fecharEdit');
    const btnEditar = editValueBg.querySelector('#editar');
    const btnDeletar = editValueBg.querySelector('#deletar');
    const nomeEdit = editValueBg.querySelector('#nomeEdit');
    const dataEdit = editValueBg.querySelector('#dataInfo');
    const valorEdit = editValueBg.querySelector('#valorEdit');
    const parcelasEdit = editValueBg.querySelector('#parcelasEdit');

    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const parcelas = i.querySelector('#parcelasTotal');
    const valor = i.querySelector('#valorFinal');

    function deletLabel() {
      const confirm = editValueBg.querySelector('.confirmar');
      const sim = confirm.querySelector('#sim');
      const nao = confirm.querySelector('#nao');
      confirm.classList.add('ativo');

      function removeAtivo() {
        confirm.classList.remove('ativo');
      }
      function removeAll() {
        editValueBg.classList.remove('ativo');
        i.remove();
        vendaEdit[n].remove();
        storage();
      }

      sim.addEventListener('click', removeAll);
      nao.addEventListener('click', removeAtivo);
    }

    function changeValue() {
      nomeEdit.value = nome.innerText;
      dataEdit.value = data.innerText;
      valorEdit.value = valor.innerText.replace('R$', '');
      parcelasEdit.value = parcelas.innerText.slice(0, 1);
    }
    changeValue();

    function EditValue() {
      nome.innerText = nomeEdit.value;
      data.innerText = dataEdit.value;
      parcelas.innerText = `${parcelasEdit.value}x de R$${(
        valorEdit.value / +parcelasEdit.value
      ).toFixed(2)}`;
      valor.innerText = `R$ ${valorEdit.value}`;

      storage();
    }

    function removeAtivoBg() {
      const confirm = editValueBg.querySelector('.confirmar');
      editValueBg.classList.remove('ativo');
      confirm.classList.remove('ativo');

      if (btnEditar.classList.contains('ativo')) {
        btnEditar.classList.remove('ativo');
        readOnly();
      }
    }
    function readOnly() {
      nomeEdit.toggleAttribute('readonly');
      dataEdit.toggleAttribute('readonly');
      valorEdit.toggleAttribute('readonly');
      parcelasEdit.toggleAttribute('disabled');
    }
    btnEditar.addEventListener('click', () =>
      btnEditar.classList.toggle('ativo'),
    );
    btnEditar.addEventListener('click', readOnly);
    exit.addEventListener('click', removeAtivoBg);
    btnDeletar.addEventListener('click', deletLabel);
    if (!btnEditar.classList.contains('ativo')) {
      btnEditar.addEventListener('click', EditValue);
    }

    i.addEventListener('click', () => editValueBg.classList.add('ativo'));
  });
}
if (localStorage.pixEnviado) {
  PixEnviadoLabel.forEach((i, n) => {
    const pixEdit = document.querySelectorAll('#pixEnvEdit');
    const editValueBg = pixEdit[n].querySelector('.editValueBg');
    const exit = editValueBg.querySelector('#fecharEdit');
    const btnEditar = editValueBg.querySelector('#editar');
    const btnDeletar = editValueBg.querySelector('#deletar');
    const nomeEdit = editValueBg.querySelector('#nomeEdit');
    const dataEdit = editValueBg.querySelector('#dataInfo');
    const valorEdit = editValueBg.querySelector('#valorEdit');

    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const valor = i.querySelector('#valorFinal');

    function deletLabel() {
      const confirm = editValueBg.querySelector('.confirmar');
      const sim = confirm.querySelector('#sim');
      const nao = confirm.querySelector('#nao');
      confirm.classList.add('ativo');

      function removeAtivo() {
        confirm.classList.remove('ativo');
      }
      function removeAll() {
        editValueBg.classList.remove('ativo');
        pixEdit[n].remove();
        i.remove();
        storage();
      }

      sim.addEventListener('click', removeAll);
      nao.addEventListener('click', removeAtivo);
    }

    function changeValue() {
      nomeEdit.value = nome.innerText;
      dataEdit.value = data.innerText;
      valorEdit.value = (+valor.innerText.replace('-R$', '')).toFixed(2);
    }
    changeValue();

    function EditValue() {
      nome.innerText = nomeEdit.value;
      data.innerText = dataEdit.value;
      valor.innerText = `-R$ ${(+valorEdit.value).toFixed(2)}`;

      storage();
    }

    function removeAtivoBg() {
      const confirm = editValueBg.querySelector('.confirmar');
      editValueBg.classList.remove('ativo');
      confirm.classList.remove('ativo');

      if (btnEditar.classList.contains('ativo')) {
        btnEditar.classList.remove('ativo');
        readOnly();
      }
    }
    function readOnly() {
      nomeEdit.toggleAttribute('readonly');
      dataEdit.toggleAttribute('readonly');
      valorEdit.toggleAttribute('readonly');
    }
    btnEditar.addEventListener('click', () =>
      btnEditar.classList.toggle('ativo'),
    );
    btnEditar.addEventListener('click', readOnly);
    exit.addEventListener('click', removeAtivoBg);
    btnDeletar.addEventListener('click', deletLabel);
    if (!btnEditar.classList.contains('ativo')) {
      btnEditar.addEventListener('click', EditValue);
    }

    i.addEventListener('click', () => editValueBg.classList.add('ativo'));
  });
}
if (localStorage.pixRecebido) {
  PixRecebidoLabel.forEach((i, n) => {
    const pixEdit = document.querySelectorAll('#pixEdit');
    const editValueBg = pixEdit[n].querySelector('.editValueBg');
    const exit = editValueBg.querySelector('#fecharEdit');
    const btnEditar = editValueBg.querySelector('#editar');
    const btnDeletar = editValueBg.querySelector('#deletar');
    const nomeEdit = editValueBg.querySelector('#nomeEdit');
    const dataEdit = editValueBg.querySelector('#dataInfo');
    const valorEdit = editValueBg.querySelector('#valorEdit');

    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const valor = i.querySelector('#valorFinal');

    function deletLabel() {
      const confirm = editValueBg.querySelector('.confirmar');
      const sim = confirm.querySelector('#sim');
      const nao = confirm.querySelector('#nao');
      confirm.classList.add('ativo');

      function removeAtivo() {
        confirm.classList.remove('ativo');
      }
      function removeAll() {
        editValueBg.classList.remove('ativo');
        pixEdit[n].remove();
        i.remove();
        storage();
      }

      sim.addEventListener('click', removeAll);
      nao.addEventListener('click', removeAtivo);
    }

    function changeValue() {
      nomeEdit.value = nome.innerText;
      dataEdit.value = data.innerText;
      valorEdit.value = (+valor.innerText.replace('+R$', '')).toFixed(2);
    }
    changeValue();

    function EditValue() {
      nome.innerText = nomeEdit.value;
      data.innerText = dataEdit.value;
      valor.innerText = `+R$ ${(+valorEdit.value).toFixed(2)}`;

      storage();
    }

    function removeAtivoBg() {
      const confirm = editValueBg.querySelector('.confirmar');
      editValueBg.classList.remove('ativo');
      confirm.classList.remove('ativo');

      if (btnEditar.classList.contains('ativo')) {
        btnEditar.classList.remove('ativo');
        readOnly();
      }
    }
    function readOnly() {
      nomeEdit.toggleAttribute('readonly');
      dataEdit.toggleAttribute('readonly');
      valorEdit.toggleAttribute('readonly');
    }
    btnEditar.addEventListener('click', () =>
      btnEditar.classList.toggle('ativo'),
    );
    btnEditar.addEventListener('click', readOnly);
    exit.addEventListener('click', removeAtivoBg);
    btnDeletar.addEventListener('click', deletLabel);
    if (!btnEditar.classList.contains('ativo')) {
      btnEditar.addEventListener('click', EditValue);
    }

    i.addEventListener('click', () => editValueBg.classList.add('ativo'));
  });
}

storage();

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

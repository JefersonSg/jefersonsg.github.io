const adicionar = document.querySelectorAll('#botao-add');
const InputValor = document.querySelectorAll('#valor');
const valor = document.querySelectorAll('#valor');
const parcelas = document.querySelectorAll('#parcelas');
const formCompra = document.querySelector('#compra-conteudo');
const nomeMov = document.querySelectorAll('#movimentacao');

InputValor[0].addEventListener('keyup', () => {
  valor[0].value = `${parcelas[0].value}x de R$ ${(
    InputValor[0].value / parcelas[0].value
  ).toFixed(2)}`;
});

parcelas[0].addEventListener('change', () => {
  valor[0].value = `${parcelas[0].value}x de R$ ${(
    InputValor[0].value / parcelas[0].value
  ).toFixed(2)}`;
});

adicionar[0].addEventListener('click', () => {
  if ((valor[0].value !== '') && (nomeMov[0].value !== '')) {
    const edit = document.createElement('div');
    const table = document.getElementById('tabela');
    const div = document.createElement('div');
    div.classList.add('movimentacoesLista');
    div.setAttribute('value', 'compra');
    div.id = 'compraLabel';
    edit.id = 'compraEdit';
    div.innerHTML = `
            <div class='icon icon-transacao'>
            <img class='icon-transacao' src="./img/Movimentacoes/compra icon.svg">
            </div>

            <p id="nomeMov">${nomeMov[0].value}</p>
            <p id="valorFinal">-R$ ${(InputValor[0].value * 1).toFixed(2)}</p>
            <p id="categoria">${receita[0].value}</p>
            <p id="data">${dataInfo[0].value}</p>
            <p id="parcelasTotal">${parcelas[0].value}x de R$ ${(
        InputValor[0].value / parcelas[0].value
      ).toFixed(2)}</p>
      `;

    edit.innerHTML = `
      <div class="editValueBg">
        <div class="editValue">
          <span id="fecharEdit">X</span>
          <label for="nome">Nome</label>
          <input readonly type="text" id="nomeEdit">

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
    formCompra.classList.remove('ativo');
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
      const categoriaEdit = editValueBg.querySelector('#categoriaEdit');

      const nome = div.querySelector('#nomeMov');
      const data = div.querySelector('#data');
      const parcelas = div.querySelector('#parcelasTotal');
      const valor = div.querySelector('#valorFinal');
      const categoria = div.querySelector('#categoria');

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
        parcelasEdit.value = parcelas.innerText.slice(0, 1);
        categoriaEdit.value = categoria.innerText;
      }
      changeValue();

      function EditValue() {
        nome.innerText = nomeEdit.value;
        data.innerText = dataEdit.value;
        parcelas.innerText = `${parcelasEdit.value}x de R$${(
          valorEdit.innerText / +parcelasEdit.value
        ).toFixed(2)}`;
        valor.value = (+valorEdit.innerText).toFixed(2);

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
    });

    nomeMov[0].value = '';
    receita[0].selectedIndex = '';
    dataInfo[0].value = '';
    InputValor[0].value = '';
    parcelas[0].selectedIndex = '1';
    valor[0].value = '';

    storage();
  } else {
    alert('Preencha todos os campos');
  }
});
const InputValor = document.querySelectorAll('#valorInput');
const valor = document.querySelectorAll('#total');
const categoria = document.querySelectorAll('#categoriaInit');
const adicionar = document.querySelectorAll('#botao-add');
const jurosComp = document.getElementById('juros-compostos');
const juros = document.getElementById('emprestimo-juros');
const nomeMov = document.querySelectorAll('#movimentacao');
const dataInfo = document.querySelectorAll('#dataInfo');
const totalPago = document.getElementById('totalPago');
const table = document.getElementById('tabela')
const edits = document.getElementById('editores');

// storages
if (!localStorage.usuarioAtivo) {
  window.open('index.html', '_top');
}

const usuarioAtivo = localStorage.usuarioAtivo ? JSON.parse(localStorage.usuarioAtivo) : []

const nomeUsuarioAtivo = JSON.parse(localStorage.usuarios).find(usuario => usuario.nomeUsuario === usuarioAtivo.nomeUsuario)

let Ls = localStorage.getItem(`informacoes_id${usuarioAtivo.ID}`)
let informacoesLs = JSON.parse(Ls)


let ls = nomeUsuarioAtivo ? informacoesLs[5] : false;
let compraLs = informacoesLs[1] ? informacoesLs[1] : false;
let vendaLs = informacoesLs[2] ? informacoesLs[2] : false;
let transferenciaLs = informacoesLs[3] ? informacoesLs[3] : false;
let emprestimoLs = informacoesLs[4] ? informacoesLs[4] : false;
let number = ls ? ls.length : 0

let transacaoAtual = []


function novaDiv(type) {
  type = this.value
  let div = document.createElement('li')
  let edit = document.createElement('div')
  div.classList.add('movimentacoesLista');
  div.setAttribute('label', number)
  div.id = `${type}Label`
  edit.id = `${type}LabelEdit`;
  edit.classList.add('editValueBg')

  if (type === 'compra'
    && nomeMov[0].value !== ''
    && InputValor[0].value !== ''
    && categoria[0].selectedIndex !== 0
    // && dataInfo[0].value !== ''
  ) {

    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/compra icon.svg">
    </div>
    <p id="nomeMov">${nomeMov[0].value}</p>
    <p id="valor">-R$ ${(InputValor[0].value * 1).toFixed(2)}</p>
    <p id="categoria">${categoria[0].value}</p>
    <p id="data">${dataInfo[0].value}</p>
    <p id="parcelasTotal">${valor[0].value}</p>
    `
    edit.innerHTML = `
      <div class="editValue" numero="${number}">
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="text" name='nome' id="nomeEdit">

        <label for="categoria">Categoria</label>
        <select disabled id="categoriaEdit" name="categoria">
        <option selected value=""  style="display: none">
          categoria da compra
        </option>
        <option value="produto eletronico">Produtos Eletronicos</option>
        <option value="roupa">Roupas</option>
        <option value="contas">Contas</option>
        <option value="transporte">Transporte</option>
        <option value="despesas médicas">Despesas médicas</option>
        <option value="cuidados pessoais">Cuidados pessoais</option>
        <option value="entretenimento">Entretenimento</option>
        <option value="remedio">Remedio</option>
        <option value="alimentação">Alimentação</option>
        <option value="cosmetico">Cosmeticos</option>
        <option value="cosmetico">outros</option>
      </select>

      <label for="data">Data</label>
      <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

        <label for="parcelas">Parcelas</label>

        <select disabled readonly name="parcelas" id="parcelasEdit">
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
    `;
    table.insertBefore(div, table.firstChild);
    edits.appendChild(edit)
    transacaoAtual.push(+InputValor[0].value * -1)
    number++
    storage()
    nomeMov[0].value = ''
    InputValor[0].value = ''
    categoria[0].selectedIndex = 0
    dataInfo[0].value = ''
    this.offsetParent.offsetParent.classList.remove('ativo')

  } else if (type === 'venda'
    && nomeMov[1].value !== ''
    && InputValor[1].value !== ''
    // && dataInfo[1].value !== ''
  ) {

    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/venda icon.svg">
    </div>

    <p id="nomeMov">${nomeMov[1].value}</p>
    <p id="valor">+R$ ${(InputValor[1].value * 1).toFixed(2)}</p>
    <p class='parcelas-venda' id="parcelasTotal">${valor[1].value}</p>
    <p id="data">${dataInfo[1].value}</p>
    `
    edit.innerHTML = `
    <div class="editValue"  numero="${number}">
      <span id="fecharEdit">X</span>
      <label for="nome">Nome</label>
      <input readonly type="nome" id="nomeEdit">

      <label for="data">Data</label>
      <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

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
`;
    table.insertBefore(div, table.firstChild);
    edits.appendChild(edit)
    transacaoAtual.push(+InputValor[1].value)
    number++
    storage()

    nomeMov[1].value = ''
    InputValor[1].value = ''
    dataInfo[1].value = ''
    this.offsetParent.offsetParent.classList.remove('ativo')



  } else
    if (type === 'transferencia'
      && nomeMov[2].value !== ''
      && categoria[1].selectedIndex !== 0
      && InputValor[2].value !== ''
      // && dataInfo[2].value !== ''
    ) {

      div.innerHTML = `
    <div class='icon icon-transacao'>
      <img class='icon-transacao' src="./img/Movimentacoes/pix icon.svg">
    </div>
    
    <p id="condicao">${categoria[1].value === '+' ? 'Transferencia recebida' : 'Transferencia enviada'}</p>
    <p id="valor">${categoria[1].value}R$ ${(+InputValor[2].value).toFixed(2)}</p>
    <p class='transferencia' id="nomeMov">${nomeMov[2].value}</p>
    <p id="data">${dataInfo[2].value}</p>
    `
      edit.innerHTML = `
      <div class="editValue" numero="${number}">
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">
        <label for="data">Data</label>
        <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

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
    `;
      table.insertBefore(div, table.firstChild);
      edits.appendChild(edit)
      transacaoAtual.push(categoria[1].value === '+' ? +InputValor[2].value : +InputValor[2].value * -1)
      number++
      storage()

      nomeMov[2].value = ''
      categoria[1].selectedIndex = 0
      InputValor[2].value = ''
      dataInfo[2].value = ''

      this.offsetParent.offsetParent.classList.remove('ativo')


    } else if (type === 'emprestimo'
      && nomeMov[3].value !== ''
      && categoria[2].selectedIndex !== 0
      && InputValor[3].value !== ''
      // && dataInfo[3].value !== ''
    ) {
      div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/EmprestimoIcon 1.svg"alt="banco"> 
    </div>

    <p id="nomeMov" class = "nomeMov">${(categoria[2].value === '-' ? 'Emprestou para ' : 'Pegou de ') + nomeMov[3].value}</p>
    <p class="parcelasTotal" id="parcelasTotal">${valor[3].value}</p>
    <p class = "diferenca" id="diferenca">R$ ${(
          totalPago.value.replace('Total ', '') - InputValor[3].value
        ).toFixed(2)}</p>
    <p id="valor" class='valorInit'>${categoria[2].value}R$ ${(
          InputValor[3].value * 1
        ).toFixed(2)}</p>
    <p class = "valorFinal" id="valorFinal">${(+totalPago.value.replace(
          'Total ',
          '',
        )).toFixed(2)}</p>
    <p class = "data"id="data">${dataInfo[3].value}</p>
    <p id='jurosLs'>${juros.value}</p>
    <p id='jurosMesLs'>${jurosComp.value}</p>
    <p id="condicao">${categoria[2].value}</p>
    `
      edit.innerHTML = `
      <div class="editValue" numero="${number}">
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">

        <label for="data">Data</label>
        <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

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
        <label for="diferenca">diferenca</label>
        <input readonly type="diferenca" id="diferencaEdit">
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
  `;
      table.insertBefore(div, table.firstChild);
      edits.appendChild(edit)
      transacaoAtual.push(categoria[2].value === '+' ? +InputValor[3].value : +InputValor[3].value * -1)
      number++
      storage()

      nomeMov[3].value = ''
      categoria[2].selectedIndex = 0
      InputValor[3].value = ''
      dataInfo[3].value = ''

      this.offsetParent.offsetParent.classList.remove('ativo')
    } else {
      alert('preencha todos os campos')
    }

  const nomeEditInit = edit.querySelector('#nomeEdit');
  const dataEditInit = edit.querySelector('#dataInfo');
  const valorEditInit = edit.querySelector('#valorEdit');
  const categoriaEditInit = edit.querySelector('#categoriaEdit')
  const diferencaeEditInit = edit.querySelector('#diferencaEdit')
  const parcelasEditInit = edit.querySelector('#parcelasEdit');
  const jurosEditInit = edit.querySelector('#jurosEdit');
  const jurosMesEditInit = edit.querySelector('#jurosCompEdit');
  const valorFinalEditInit = edit.querySelector('#valorFinEdit');
  const btnEdit = edit.querySelector('#editar')


  let Editar = {
    nome: div.querySelector('#nomeMov'),
    data: div.querySelector('#data'),
    valor: div.querySelector('#valor'),
    categoria: div.querySelector('#categoria'),
    valorFinal: div.querySelector('#valorFinal'),
    diferencaInit: div.querySelector('#diferenca'),
    parcelasInit: div.querySelector('#parcelasTotal'),
    jurosInit: div.querySelector('#jurosLs'),
    jurosMesInit: div.querySelector('#jurosMesLs'),
    condicao: div.querySelector('#condicao')
  }
  function changeValue() {
    nomeEditInit.value = Editar.nome.innerText
    dataEditInit.value = Editar.data.innerText
    valorEditInit.value = (Editar.valor.innerText.slice(0, 1) === '+' ? Editar.valor.innerText.replace('+R$', '') : Editar.valor.innerText.replace('-R$', ''))
    if (categoriaEditInit && Editar.categoria) {
      categoriaEditInit.value = Editar.categoria.innerText
    }
    if (parcelasEditInit && Editar.parcelas) {
      parcelasEditInit.value = Editar.parcelas.innerText.slice(0, 1)
    }
    if (jurosEditInit && Editar.juros) {
      jurosEditInit.value = Editar.juros.innerText
    }
    if (jurosMesEditInit && Editar.jurosMes) {
      jurosMesEditInit.value = Editar.jurosMes.innerText
    }
    if (diferencaeEditInit && Editar.diferenca) {
      diferencaeEditInit.value = Editar.diferenca.innerText
    }
    if (valorFinalEditInit && Editar.valorFinal) {
      valorFinalEditInit.value = Editar.valorFinal.innerText
    }
  }

  if (btnEdit) {
    btnEdit.addEventListener('click', () => {
      if (btnEdit.classList.contains('ativo')) {
        Editar.nome.innerText = nomeEditInit.value
        Editar.data.innerText = dataEditInit.value


        if (btnEdit.offsetParent.offsetParent.id === 'compraLabelEdit') { Editar.valor.innerText = `-R$ ${(+valorEditInit.value).toFixed(2)}` } else if (btnEdit.offsetParent.offsetParent.id == 'vendaLabel') {
          Editar.valor.innerText = `+R$ ${(+valorEditInit.value).toFixed(2)}`
        } else if (btnEdit.offsetParent.offsetParent.id == 'transferenciaLabel') {
          if (Editar.condicao.innerText === 'Transferencia enviada') {
            Editar.valor.innerText = `-R$ ${(+valorEditInit.value).toFixed(2)}`
          } else if (Editar.condicao.innerText === 'Transferencia recebida') {
            Editar.valor.innerText = `+R$ ${(+valorEditInit.value).toFixed(2)}`
          }
        } else if (btnEdit.offsetParent.offsetParent.id == 'emprestimoLabel') {
          if (Editar.condicao.innerText === '-') {
            Editar.nome.innerText = `Emprestou para ${nomeEditInit.value}`
            Editar.valor.innerText = `-R$ ${(+valorEditInit.value).toFixed(2)}`
          } else if (Editar.condicao.innerText === '+') {
            Editar.nome.innerText = `Pegou de ${nomeEditInit.value}`
            Editar.valor.innerText = `+R$ ${(+valorEditInit.value).toFixed(2)}`
          }
        }

        if (Editar.categoria) {
          Editar.categoria.innerText = categoriaEditInit.value
        }
        if (parcelasEditInit && Editar.parcelasInit) {
          Editar.parcelasInit.innerText = parcelasEditInit.value
        }
        if (jurosEditInit && Editar.jurosInit) {
          jurosEditInit.innerText = jurosEditInit.value
        }
        if (jurosMesEditInit && Editar.jurosMesInit) {
          Editar.jurosMesInit.innerText = jurosMesEditInit.value
        }
        if (diferencaeEditInit && Editar.diferencaInit) {
          Editar.diferencaInit.innerText = diferencaeEditInit.value
        }
        if (valorFinalEditInit && Editar.valorFinal) {
          Editar.valorFinal.innerText = valorFinalEditInit.value
        }
        transacaoAtual.push(valorEditInit.value)
        storage()
      }
    })
  }

  div.addEventListener('click', changeValue)
}

adicionar.forEach((i) => {
  i.addEventListener('click', novaDiv)
})

function arrumarNome() {
  const nomeLogin = document.querySelector('.nome-login');
  nomeLogin.innerText = `Olá, ${nomeUsuarioAtivo.nome} ${nomeUsuarioAtivo.sobrenome.slice(0, 1)}.`;
}

function storage() {
  const transacoes = document.querySelectorAll('.movimentacoesLista');
  const compraLabel = document.querySelectorAll('#compraLabel');
  const vendaLabel = document.querySelectorAll('#vendaLabel');
  const transferenciaLabel = document.querySelectorAll('#transferenciaLabel');
  const emprestimoLabel = document.querySelectorAll('#emprestimoLabel');
  const valorStatus = document.querySelector('.valor');

  const informacoes = []

  const comprasArray = [];
  const vendasArray = [];
  const transferenciasArray = [];
  const EmprestimoArray = [];
  const InputValor = [];
  compraLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const categoria = i.querySelector('#categoria');
    const data = i.querySelector('#data');
    const parcelas = i.querySelector('#parcelasTotal');
    const valor = i.querySelector('#valor');
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
    comprasArray.push(compra);
    InputValor.push(+valor.innerText.replace('-R$', '') * -1);
  });

  vendaLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const parcelas = i.querySelector('#parcelasTotal');
    const valor = i.querySelector('#valor');

    const venda = {
      nome: '',
      data: '',
      parcelas: '',
      valor: '',
    };
    const valorPush = +valor.innerText.replace('+R$', '');

    venda['nome'] = [nome.innerText];
    venda['data'] = [data.innerText];
    venda['parcelas'] = [parcelas.innerText];
    venda['valor'] = [valor.innerText];
    vendasArray.push(venda);
    InputValor.push(valorPush);
  });

  transferenciaLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const valor = i.querySelector('#valor');

    const transf = {
      nome: '',
      data: '',
      valor: '',
    };
    const transferenciaPush = +valor.innerText.replace('R$ ', '')

    transf['nome'] = [nome.innerText];
    transf['data'] = [data.innerText];
    transf['valor'] = [valor.innerText];
    InputValor.push(transferenciaPush);
    transferenciasArray.push(transf);
  });
  emprestimoLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const data = i.querySelector('#data');
    const valor = i.querySelector('#valor');
    const diferenca = i.querySelector('#diferenca');
    const parcelas = i.querySelector('#parcelasTotal');
    const valorFinal = i.querySelector('#valorFinal');
    const juros = i.querySelector('#jurosLs');
    const jurosMes = i.querySelector('#jurosMesLs');
    const condicao = i.querySelector('#condicao')


    const emprestimo = {
      nome: '',
      data: '',
      valorInicial: '',
      parcelas: '',
      diferenca: '',
      valorFinal: '',
      juros: '',
      jurosMes: '',
      condicao: ''
    };


    if (condicao.innerText == '+') {
      let emprestimoPush = +valor.innerText.replace('+R$ ', '')
      InputValor.push(emprestimoPush);

    } else if (condicao.innerText == '-') {
      let emprestimoPush = +valor.innerText.replace('-R$ ', '') * -1
      InputValor.push(emprestimoPush);

    }

    (condicao.innerText == '+' ? +valor.innerText.replace('+R$ ', '') : +valor.innerText.replace('-R$ ', '') * -1)
    emprestimo['nome'] = [nome.innerText.replace('Emprestou para ', '').replace('Pegou de ', '')];
    emprestimo['data'] = [data.innerText];
    emprestimo['parcelas'] = [parcelas.innerText];
    if (condicao.innerText == '+') {
      emprestimo['valor'] = [valor.innerText.replace('+R$ ', '')];
    } else if (condicao.innerText == '-') {
      emprestimo['valor'] = [valor.innerText.replace('-R$ ', '')];
    }
    emprestimo['diferenca'] = [diferenca.innerText];
    emprestimo['valorFinal'] = [valorFinal.innerText];
    emprestimo['juros'] = [juros.innerText];
    emprestimo['jurosMes'] = [jurosMes.innerText];
    emprestimo['condicao'] = [condicao.innerText];
    EmprestimoArray.push(emprestimo);
  });

  const transacao = [];
  informacoes.push(InputValor);
  informacoes.push(comprasArray);
  informacoes.push(vendasArray);
  informacoes.push(transferenciasArray);
  informacoes.push(EmprestimoArray);
  informacoes.push(transacao)

  transacoes.forEach((t) => transacao.push(t.getAttribute('id')));
  localStorage.setItem(`informacoes_id${usuarioAtivo.ID}`, JSON.stringify(informacoes))

  const status = document.querySelector('.status');

  // Valor Ao Vivo
  const valorAtual = InputValor.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0,);
  let numero = 0
  const incremento = Math.floor(valorAtual > 50000 ? valorAtual / 150 : valorAtual / 100)
  let valorAnterior = valorAtual - transacaoAtual.pop() || 0
  let start = valorAnterior

  //Efeitos Numericos
  if (valorAtual > 0) {
    if (valorAtual > start) {
      const timer = setInterval(() => {
        start += incremento
        numero = start
        if (start > valorAtual) {
          numero = valorAtual
          clearInterval(timer)
        }
        valorStatus.innerText = `R$ ${numero.toLocaleString('pt-BR')}`
      }, 15)
    } else if (valorAtual < start) {
      const timer = setInterval(() => {
        start += -incremento
        numero = start

        if (valorAtual > start) {
          numero = valorAtual
          clearInterval(timer)
        }
        valorStatus.innerText = `R$ ${(numero.toLocaleString('pt-BR'))}`
      }, 15)
    }
  } else if (valorAtual < 0) {
    const timer = setInterval(() => {
      start += -incremento * -1
      numero = start
      if (valorAtual > start) {
        numero = valorAtual
        clearInterval(timer)
      }
      valorStatus.innerText = `-R$ ${(numero.toLocaleString('pt-BR')).replace('-', '')}`
    }, 15)
  } else if (valorAtual === 0) {
    valorStatus.innerText = `R$ ${valorAtual.toLocaleString('pt-BR')}`
  } else (alert('erro'))

  // Efeitos Visuais

  if (valorAtual > 0) {
    status.style.backgroundColor = ' rgb(227, 247, 236)';
    status.classList.add('positivo');
    status.classList.remove('negativo');
    status.innerText = 'Positivo'
  } else if (valorAtual === 0) {
    status.classList.remove('negativo');
    status.classList.remove('positivo');
    status.innerText = 'Neutro';
    status.style.backgroundColor = ' rgba(142, 208, 236, 0.80)';

  } else if (valorAtual < 0) {
    status.style.backgroundColor = 'rgba(239, 123, 123, 0.5)';
    status.classList.add('negativo');
    status.classList.remove('positivo');
    status.innerText = 'Negativo';
  }
}

function criarPaineis() {

  ls.forEach((v, n) => {
    const div = document.createElement('li');
    const edit = document.createElement('div');
    div.classList.add('movimentacoesLista');
    div.setAttribute('label', n)
    if (n > 9) {
      div.style.display = 'none'
    }
    edit.id = v + 'Edit';
    edit.classList.add('editValueBg')

    if (v === 'compraLabel') {
      div.id = 'compraLabel';

      div.innerHTML = `
              <div class='icon icon-transacao'>
              <img class='icon-transacao' src="./img/Movimentacoes/compra icon.svg">
              </div>
              <p id="nomeMov"></p>
              <p id="valor"></p>
              <p id="categoria"></p>
              <p id="data"></p>
              <p id="parcelasTotal"></p>
        `;
      edit.innerHTML = `
          <div class="editValue" numero="${n}">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="text" name='nome' id="nomeEdit">
  
            <label for="data">Data</label>
            <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />
  
            <label for="valor">Valor</label>
            <input readonly onkeypress="return onlynumber();" type="valor" id="valorEdit">

            <label for="categoria">Categoria</label>
            <select disabled id="categoriaEdit" name="categoria" >
            <option selected value=""  style="display: none">
              categoria da compra
            </option>
            <option value="produto eletronico">Produtos Eletronicos</option>
            <option value="roupa">Roupas</option>
            <option value="contas">Contas</option>
            <option value="transporte">Transporte</option>
            <option value="despesas médicas">Despesas médicas</option>
            <option value="cuidados pessoais">Cuidados pessoais</option>
            <option value="entretenimento">Entretenimento</option>
            <option value="remedio">Remedio</option>
            <option value="alimentação">Alimentação</option>
            <option value="cosmetico">Cosmeticos</option>
            <option value="cosmetico">outros</option>
            </select>

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
    `;
    } else if (v === 'vendaLabel') {
      div.id = 'vendaLabel';

      div.innerHTML = `
            <div class='icon icon-transacao'>
              <img class='icon-transacao' src="./img/Movimentacoes/venda icon.svg">
            </div> 
  
              <p id="nomeMov"></p>
              <p id="valor"></p>
              <p class='parcelas-venda' id="parcelasTotal"></p>
              <p id="data"></p>
  
        `;
      edit.innerHTML = `
          <div class="editValue"  numero="${n}">
            <span id="fecharEdit">X</span>
            <label for="nome">Nome</label>
            <input readonly type="nome" id="nomeEdit">
  
            <label for="data">Data</label>
            <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />
  
            <label for="valor">Valor</label>
            <input readonly onkeypress="return onlynumber();" type="valor" id="valorEdit">

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
    `;
    } else if (v === 'transferenciaLabel') {
      div.id = 'transferenciaLabel';

      div.innerHTML = `
          <div class='icon icon-transacao'>
          <img class='icon-transacao' src="./img/Movimentacoes/pix icon.svg">
          </div>
  
          <p id='condicao'></p>
          <p id="valor"></p>
          <p class='transferencia' id="nomeMov"></p>
          <p id="data"></p>
              `;
      edit.innerHTML = `        
            <div class="editValue"  numero="${n}">
              <span id="fecharEdit">X</span>
              <label for="nome">Nome</label>
              <input readonly type="nome" id="nomeEdit">
  
              <label for="data">Data</label>
              <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />
  
              <label for="valor">Valor</label>
              <input readonly onkeypress="return onlynumber();" type="valor" id="valorEdit">
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
              `;
    } else if (v === 'emprestimoLabel') {
      div.id = 'emprestimoLabel';

      div.innerHTML = `
          <div class='icon icon-transacao'>
          <img class='icon-transacao' src="./img/Movimentacoes/EmprestimoIcon 1.svg"alt="banco"> 
          </div>
  
          <p id="nomeMov" class = "nomeMov"></p>
          <p class="parcelasTotal" id="parcelasTotal"></p>
          <p id="valor" class='valorInit'></p>
          <p class = "diferenca" id="diferenca"></p>
          <p class = "valorFinal" id="valorFinal"></p>
          <p class = "data"id="data"></p>
          <p id='jurosLs'></p>
          <p id='jurosMesLs'></p>
          <p id="condicao"></p>
  
          `;
      edit.innerHTML = `
            <div class="editValue"  numero="${n}">
              <span id="fecharEdit">X</span>
              <label for="nome">Nome</label>
              <input readonly type="nome" id="nomeEdit">
  
              <label for="data">Data</label>
              <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />
  
              <label for="valor">Valor</label>
              <input readonly onkeypress="return onlynumber();" type="valor" id="valorEdit">
  
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
              <label for="diferenca">Diferença</label>
              <input readonly type="diferenca" id="diferencaEdit">
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
        `;
    } else {
      alert('erro');
    }

    table.appendChild(div);
    edits.appendChild(edit);

  });
}

function arrumarInputValor() {
  if (compraLs) {
    const compraLabel = document.querySelectorAll('#compraLabel');

    compraLabel.forEach((i, n) => {
      const nome = i.querySelector('#nomeMov');
      const categoria = i.querySelector('#categoria');
      const data = i.querySelector('#data');
      const parcelas = i.querySelector('#parcelasTotal');
      const valor = i.querySelector('#valor');

      nome.innerText = `${compraLs[n].nome}`;
      categoria.innerText = compraLs[n].categoria;
      data.innerText = `${compraLs[n].data}`;
      parcelas.innerText = compraLs[n].parcelas;
      valor.innerText = compraLs[n].valor;
    });
  }
  if (vendaLs) {
    const vendaLabel = document.querySelectorAll('#vendaLabel');

    vendaLabel.forEach((i, n) => {
      const nome = i.querySelector('#nomeMov');
      const data = i.querySelector('#data');
      const parcelas = i.querySelector('#parcelasTotal');
      const valor = i.querySelector('#valor');

      nome.innerText = `${vendaLs[n].nome}`;
      data.innerText = vendaLs[n].data;
      parcelas.innerText = vendaLs[n].parcelas;
      valor.innerText = vendaLs[n].valor;
    });
  }

  if (transferenciaLs) {
    const transferenciaLabel = document.querySelectorAll('#transferenciaLabel');

    transferenciaLabel.forEach((i, n) => {
      const condicao = i.querySelector('#condicao')
      const nome = i.querySelector('#nomeMov');
      const data = i.querySelector('#data');
      const valor = i.querySelector('#valor');
      let teste = transferenciaLs[n].valor[0].slice(0, 1)

      condicao.innerText = teste == '-' ? 'Transferencia enviada' : 'Transferencia recebida';
      nome.innerText = transferenciaLs[n].nome;
      data.innerText = transferenciaLs[n].data;
      valor.innerText = transferenciaLs[n].valor;
    });
  }
  if (emprestimoLs) {
    const emprestimoLabel = document.querySelectorAll('#emprestimoLabel');
    emprestimoLabel.forEach((i, n) => {
      const nome = i.querySelector('#nomeMov');
      const data = i.querySelector('#data');
      const valor = i.querySelector('#valor');
      const diferenca = i.querySelector('#diferenca');
      const parcelas = i.querySelector('#parcelasTotal');
      const valorFinal = i.querySelector('#valorFinal');
      const juros = i.querySelector('#jurosLs');
      const jurosMes = i.querySelector('#jurosMesLs');
      const condicao = i.querySelector('#condicao')

      if (emprestimoLs[n].condicao == '-') {
        nome.innerText = `Emprestou para ${emprestimoLs[n].nome}`
      } else if (emprestimoLs[n].condicao == '+') {
        nome.innerText = `Pegou de ${emprestimoLs[n].nome}`
      }
      data.innerText = emprestimoLs[n].data;
      valor.innerText = emprestimoLs[n].valor;
      if (emprestimoLs[n].condicao == '-') {
        valor.innerText = `-R$ ${emprestimoLs[n].valor}`
      } else {
        valor.innerText = `+R$ ${emprestimoLs[n].valor}`
      }
      parcelas.innerText = emprestimoLs[n].parcelas;
      diferenca.innerText = emprestimoLs[n].diferenca;
      valorFinal.innerText = emprestimoLs[n].valorFinal;
      juros.innerText = emprestimoLs[n].juros;
      jurosMes.innerText = emprestimoLs[n].jurosMes;
      condicao.innerText = emprestimoLs[n].condicao
    });
  }

}
if (ls) {
  criarPaineis();
}

if (ls) {
  arrumarInputValor();
}
if (localStorage.usuarioAtivo) {
  arrumarNome();
} else if (!localStorage.usuarioAtivo) {
  window.open('index.html', '_top');
}
const editValue = document.querySelectorAll('.editValue')
const movimentacoesLista = document.querySelectorAll('.movimentacoesLista')

editValue.forEach((item, n) => {
  const nomeEdit = item.querySelector('#nomeEdit');
  const dataEdit = item.querySelector('#dataInfo');
  const valorEdit = item.querySelector('#valorEdit');
  const categoriaEdit = item.querySelector('#categoriaEdit')
  const diferencaeEdit = item.querySelector('#diferencaEdit')
  const parcelasEdit = item.querySelector('#parcelasEdit');
  const jurosEdit = item.querySelector('#jurosEdit');
  const jurosMesEdit = item.querySelector('#jurosCompEdit');
  const valorFinalEdit = item.querySelector('#valorFinEdit');
  const btnEdit = item.querySelector('#editar')
  const i = movimentacoesLista[n]

  let Editar = {
    nome: i.querySelector('#nomeMov'),
    data: i.querySelector('#data'),
    valor: i.querySelector('#valor'),
    categoria: i.querySelector('#categoria'),
    valorFinal: i.querySelector('#valorFinal'),
    diferencaInit: i.querySelector('#diferenca'),
    parcelasInit: i.querySelector('#parcelasTotal'),
    jurosInit: i.querySelector('#jurosLs'),
    jurosMesInit: i.querySelector('#jurosMesLs'),
    condicao: i.querySelector('#condicao')
  }

  function changeValue() {
    nomeEdit.value = Editar.nome.innerText
    dataEdit.value = Editar.data.innerText
    valorEdit.value = (Editar.valor.innerText.slice(0, 1) === '+' ? Editar.valor.innerText.replace('+R$', '') : Editar.valor.innerText.replace('-R$', ''))
    if (categoriaEdit && Editar.categoria) {
      categoriaEdit.value = Editar.categoria.innerText
    }
    if (parcelasEdit && Editar.parcelasInit) {
      parcelasEdit.value = Editar.parcelasInit.innerText.slice(0, 1)
    }
    if (jurosEdit && Editar.jurosInit) {
      jurosEdit.value = Editar.jurosInit.innerText
      jurosMesEdit.value = Editar.jurosMesInit.innerText
      nomeEdit.value = Editar.nome.innerText.replace('Emprestou para ', '').replace('Pegou de ', '')
    }

    if (diferencaeEdit && Editar.diferencaInit) {
      diferencaeEdit.value = Editar.diferencaInit.innerText
    }
    if (valorFinalEdit && Editar.valorFinal) {
      valorFinalEdit.value = Editar.valorFinal.innerText
    }
  }
  changeValue()


  btnEdit.addEventListener('click', () => {
    if (btnEdit.classList.contains('ativo')) {
      Editar.nome.innerText = nomeEdit.value
      Editar.data.innerText = dataEdit.value

      if (i.id == 'vendaLabel') {
        Editar.valor.innerText = `+R$ ${(+valorEdit.value).toFixed(2)}`
      } else if (i.id == 'compraLabel') {
        Editar.valor.innerText = `-R$ ${(+valorEdit.value).toFixed(2)}`
      } else if (i.id == 'transferenciaLabel') {
        if (Editar.condicao.innerText === 'Transferencia enviada') {
          Editar.valor.innerText = `-R$ ${(+valorEdit.value).toFixed(2)}`
        } else if (Editar.condicao.innerText === 'Transferencia recebida') {
          Editar.valor.innerText = `+R$ ${(+valorEdit.value).toFixed(2)}`
        } else { Editar.valor.innerText = `-R$ ${(+valorEdit.value).toFixed(2)}` }
      } else if (i.id == 'emprestimoLabel') {
        if (Editar.condicao.innerText === '-') {
          Editar.nome.innerText = `Emprestou para ${nomeEdit.value}`
          Editar.valor.innerText = `-R$ ${(+valorEdit.value).toFixed(2)}`
        } else if (Editar.condicao.innerText === '+') {
          Editar.nome.innerText = `Pegou de ${nomeEdit.value}`
          Editar.valor.innerText = `+R$ ${(+valorEdit.value).toFixed(2)}`
        }
      }

      if (Editar.categoria) {
        Editar.categoria.innerText = categoriaEdit.value
      }
      if (parcelasEdit && Editar.parcelasInit) {
        Editar.parcelasInit.innerText = parcelasEdit.value
      }
      if (jurosEdit && Editar.jurosInit) {
        jurosEdit.innerText = jurosEdit.value
      }
      if (jurosMesEdit && Editar.jurosMesInit) {
        Editar.jurosMesInit.innerText = jurosMesEdit.value
      }
      if (i.id == 'emprestimoLabel') {
        Editar.diferencaInit.innerText = diferencaeEdit.value
      }
      if (valorFinalEdit && Editar.valorFinal) {
        Editar.valorFinal.innerText = valorFinalEdit.value
      }
      transacaoAtual.push(valorEdit.value)
      storage()
    }
  })

})
edits.addEventListener('click', (event) => {
  let numero = event.target.getAttribute('numero') ? event.target.getAttribute('numero') : event.target.parentNode.getAttribute('numero')
  let numeroDois = event.target.childNodes[1] ? event.target.childNodes[1].getAttribute('numero') : false
  let numeroTres = event.target.offsetParent ? event.target.offsetParent.getAttribute('numero') : false

  const editValue = document.querySelector(`[numero="${numero}"]`)
  const editValueBg = document.querySelectorAll('.editValueBg')

  const itemClicado = event.target



  // fechar aba de edicao
  function removeAtivo(item1) {
    item1.classList.remove('ativo')
  }

  if (numeroDois) {
    {
      removeAtivo(editValueBg[numeroDois])
    }
  }
  if (itemClicado.nodeName === 'SPAN' && itemClicado.id === 'fecharEdit') {
    const editValue = document.querySelector(`[numero="${numero}"]`)
    const editValueBg = editValue.parentNode
    const btn = editValue.querySelector('#editar')
    removeAtivo(editValueBg)
    removeAtivo(btn)
    btn.removeAttribute('class')
  }

  // ativar o botao edit 
  if (event.target.id === 'editar') {
    itemClicado.classList.toggle('ativo')
  }

  // readOnly dos inputs
  if (numeroTres) {
    const editValue = document.querySelector(`[numero="${numeroTres}"]`)
    const btn = editValue.querySelector('#editar')
    const inputs = editValue.querySelectorAll('input')
    const selects = editValue.querySelectorAll('select')

    if (btn.classList.contains('ativo')) {
      inputs.forEach(i => i.removeAttribute('readonly'))
      selects.forEach(i => i.removeAttribute('disabled'))
    } else if (!btn.classList.contains('ativo')) {
      inputs.forEach(i => i.setAttribute('readonly', ''))
      selects.forEach(i => i.setAttribute('disabled', ''))
    }
  }

  // deletar itens

  if (numeroTres) {
    const editValue = document.querySelector(`[numero="${numeroTres}"]`)
    const editValueBg = editValue.parentNode
    const btnDeletar = editValue.querySelector('#deletar')
    const confirm = editValueBg.querySelector('.confirmar')

    if (event.target === btnDeletar) {
      confirm.classList.add('ativo')
    }
  }

  if (event.target.id === 'nao') {
    let confirmar = event.target.offsetParent
    confirmar.classList.remove('ativo')
  }
  if (event.target.id === 'sim') {
    let principal = event.target.offsetParent.offsetParent
    let n = event.target.offsetParent.offsetParent.children[0].getAttribute('numero')
    const movimentacoesLista = document.querySelector(`[label="${n}"]`)

    movimentacoesLista.remove()
    principal.remove()
    storage()
    location.reload()
  }
})

table.addEventListener('click', (event) => {
  const itemClicado = event.target
  const itemPai = event.target.parentElement.nodeName

  let numero = event.target.getAttribute('label') ? event.target.getAttribute('label') : event.target.parentElement.getAttribute('label');

  const li = document.querySelector(`[label="${numero}"]`)
  if (itemClicado == li || itemPai === 'LI') {
    const editor = document.querySelector(`[numero="${numero}"]`)
    let editorBg = editor.parentNode
    editorBg.classList.add('ativo')
  }
})
storage()

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
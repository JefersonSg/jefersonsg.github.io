const InputValor = document.querySelectorAll('#valorInput');
const valor = document.querySelectorAll('#total');
const categoria = document.querySelectorAll('#categoriaInit');
const categoriaSelect = document.querySelectorAll('.valorCategoria')
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
    && categoriaSelect[0].value !== 'Categoria'
    && dataInfo[0].value !== ''
  ) {

    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/compra icon.svg">
    </div>
    <p id="nomeMov">${nomeMov[0].value}</p>
    <p id="valor">-R$ ${(+InputValor[0].value).toFixed(2)}</p>
    <p id="categoria">${categoriaSelect[0].value}</p>
    <p id="data">${dataInfo[0].value}</p>
    <p id="parcelasTotal">${valor[0].value}</p>
    `
    edit.innerHTML = `
      <div class="editValue" numero="${number}">
        <div class="form-img">
          <p>Editar Despesa</p>
        </div>
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="text" name='nome' id="nomeEdit">
      
            <label for="valor">Valor</label>
            <input readonly type="number" id="valorEdit">

        <label for="data">Data</label>
        <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

        <label for="categoria">Categoria</label>
        <select disabled id="categoriaEdit" name="categoria" >
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
    table.insertBefore(div, table.firstChild);
    edits.appendChild(edit)
    const select = edit.querySelector('#categoriaEdit')
    const options = informacoesLs[6]
    options.forEach((i) => {
      const opt = document.createElement('option')
      opt.innerText = i
      select.appendChild(opt)
    })
    transacaoAtual.push(+InputValor[0].value * -1)
    number++

    storage()
    valorAoVivo()

    nomeMov[0].value = ''
    InputValor[0].value = ''
    categoriaSelect.value = 'Categoria'
    dataInfo[0].value = ''
    this.offsetParent.offsetParent.offsetParent.classList.remove('ativo')

    document.body.style.overflow = 'auto'

  } else if (type === 'venda'
    && nomeMov[1].value !== ''
    && InputValor[1].value !== ''
    && categoriaSelect[1].value !== 'Categoria'
    && dataInfo[1].value !== ''
  ) {

    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/venda icon.svg">
    </div>

    <p id="nomeMov">${nomeMov[1].value}</p>
    <p id="valor">+R$ ${(+InputValor[1].value.replace(',', '.')).toFixed(2)}</p>
    <p id="categoria">${categoriaSelect[1].value}</p>
    <p class='parcelas-venda' id="parcelasTotal">${valor[1].value}</p>
    <p id="data">${dataInfo[1].value}</p>
    `
    edit.innerHTML = `
    <div class="editValue"  numero="${number}">
      <div class="form-img">
       <p>Editar Receita</p>
      </div>
      <span id="fecharEdit">X</span>
      <label for="nome">Nome</label>
      <input readonly type="nome" id="nomeEdit">

      <label for="valor">Valor</label>
      <input readonly type="number" id="valorEdit">

      <label for="data">Data</label>
      <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

      <label for="categoria">Categoria</label>
      <select disabled id="categoriaEdit" name="categoria" >

      </select>

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
    const select = edit.querySelector('#categoriaEdit')
    const options = informacoesLs[7]
    options.forEach((i) => {
      const opt = document.createElement('option')
      opt.innerText = i
      select.appendChild(opt)
    })
    transacaoAtual.push(+InputValor[1].value)
    number++
    storage()
    valorAoVivo()

    nomeMov[1].value = ''
    InputValor[1].value = ''
    dataInfo[1].value = ''
    categoria[1].selectedIndex = 0;
    this.offsetParent.offsetParent.offsetParent.classList.remove('ativo')
    document.body.style.overflow = 'auto'

  } else
    if (type === 'transferencia'
      && nomeMov[2].value !== ''
      && categoria[2].selectedIndex !== 0
      && InputValor[2].value !== ''
      && dataInfo[2].value !== ''
    ) {

      div.innerHTML = `
    <div class='icon icon-transacao'>
      <img class='icon-transacao' src="./img/Movimentacoes/pix icon.svg">
    </div>
    
    <p id="condicao">${categoria[2].value === '+' ? 'Transferencia recebida' : 'Transferencia enviada'}</p>
    <p style="color: ${categoria[2].value === '+' ? 'green' : ''}; font-weight: ${categoria[2].value === '+' ? 'bold' : ''}" font id="valor">${categoria[2].value}R$ ${(+InputValor[2].value.replace(',', '.')).toFixed(2)}</p>
    <p class='transferencia' id="nomeMov">${nomeMov[2].value}</p>
    <p id="data">${dataInfo[2].value}</p>
    `
      edit.innerHTML = `
      <div class="editValue" numero="${number}">
        <div class="form-img">
          <p>Editar Transferencia</p>
        </div>
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">

        <label for="valor">Valor</label>
        <input readonly type="number" id="valorEdit">

        <label for="data">Data</label>
        <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

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
      transacaoAtual.push(categoria[2].value === '+' ? +InputValor[2].value : +InputValor[2].value * -1)
      number++
      storage()
      valorAoVivo()

      nomeMov[2].value = ''
      categoria[2].selectedIndex = 0
      InputValor[2].value = ''
      dataInfo[2].value = ''

      this.offsetParent.offsetParent.offsetParent.classList.remove('ativo')

      document.body.style.overflow = 'auto'


    } else if (type === 'emprestimo'
      && nomeMov[3].value !== ''
      && InputValor[3].value !== ''
      && dataInfo[3].value !== ''
    ) {
      div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/EmprestimoIcon 1.svg"alt="banco"> 
    </div>

    <p id="nomeMov" class = "nomeMov">${'Emprestou para ' + nomeMov[3].value}</p>
    <p class="parcelasTotal" id="parcelasTotal">${valor[3].value}</p>
    <p class = "diferenca" id="diferenca">R$ ${(
          totalPago.value.replace('Total ', '') - +InputValor[3].value.replace(',', '.')
        ).toFixed(2)}</p>
    <p id="valor" class='valorInit'>-R$ ${(+InputValor[3].value.replace(',', '.')).toFixed(2)}</p>
    <p class = "valorFinal" id="valorFinal">${(+totalPago.value.replace(
          'Total ',
          '',
        )).toFixed(2)}</p>
    <p class = "data"id="data">${dataInfo[3].value}</p>
    <p id='jurosLs'>${juros.value}</p>
    <p id='jurosMesLs'>${jurosComp.value}</p>
    `
      edit.innerHTML = `
      <div class="editValue" numero="${number}">
        <div class="form-img">
          <p>Editar Emprestimo</p>
        </div>
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">
        
                <label for="valor">Valor</label>
                <input readonly type="number" id="valorEdit">

        <label for="data">Data</label>
        <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

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
        <label for="diferenca">Lucro</label>
        <input readonly type="diferenca" id="diferencaEdit">
        <label for="valor-final">Valor Final</label>
        <input readonly type="number" id="valorFinEdit">

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
      transacaoAtual.push(+InputValor[3].value * -1)
      number++

      storage()
      valorAoVivo()


      nomeMov[3].value = ''
      InputValor[3].value = ''
      dataInfo[3].value = ''
      jurosComp.selectedIndex = 0
      juros.selectedIndex = 0


      this.offsetParent.offsetParent.offsetParent.classList.remove('ativo')

      document.body.style.overflow = 'auto'

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

  valorEditInit.addEventListener('keydown', (event) => {
    if (!/[\d\s.,]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete") {
      event.preventDefault()
    }
  })

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
    let valorLimpo = Editar.valor.innerText.replace('+R$ ', '').replace('-R$ ', '')
    valorEditInit.value = (+valorLimpo).toFixed(2)
    if (categoriaEditInit && Editar.categoria) {
      categoriaEditInit.value = Editar.categoria.innerText
    }
    if (parcelasEditInit && Editar.parcelasInit) {
      parcelasEditInit.value = Editar.parcelasInit.innerText.slice(0, 1)
    }
    if (jurosEditInit && Editar.jurosInit) {
      jurosEditInit.value = Editar.jurosInit.innerText
      jurosMesEditInit.value = Editar.jurosMesInit.innerText
      nomeEditInit.value = Editar.nome.innerText.replace('Emprestou para ', '')
    }

    if (diferencaeEditInit && Editar.diferencaInit) {
      diferencaeEditInit.value = Editar.diferencaInit.innerText
    }
    if (valorFinalEditInit && Editar.valorFinal) {
      valorFinalEditInit.value = Editar.valorFinal.innerText
    }
  }

  if (btnEdit) {
    btnEdit.addEventListener('click', function () {

      if (btnEdit.classList.contains('ativo')) {
        Editar.nome.innerText = nomeEditInit.value
        Editar.data.innerText = dataEditInit.value


        if (btnEdit.offsetParent.offsetParent.id === 'compraLabelEdit') { Editar.valor.innerText = `-R$ ${(+valorEditInit.value.replace(',', '.')).toFixed(2)}` }
        else if (btnEdit.offsetParent.offsetParent.id == 'vendaLabelEdit') {
          Editar.valor.innerText = `+R$ ${(+valorEditInit.value.replace(',', '.')).toFixed(2)}`
        } else if (btnEdit.offsetParent.offsetParent.id == 'transferenciaLabelEdit') {
          if (Editar.condicao.innerText === 'Transferencia enviada') {
            Editar.valor.innerText = `-R$ ${(+valorEditInit.value.replace(',', '.')).toFixed(2)}`
          } else if (Editar.condicao.innerText === 'Transferencia recebida') {
            Editar.valor.innerText = `+R$ ${(+valorEditInit.value.replace(',', '.')).toFixed(2)}`
          }
        } else if (btnEdit.offsetParent.offsetParent.id == 'emprestimoLabelEdit') {
          Editar.nome.innerText = `Emprestou para ${nomeEditInit.value}`
          Editar.valor.innerText = `-R$ ${(+valorEditInit.value.replace(',', '.')).toFixed(2)}`
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
        valorAoVivo()
        this.offsetParent.offsetParent.classList.remove('ativo')
      }
    })
  }
  function alterarValor() {
    const jurosTotal =
      (jurosMesEditInit.selectedIndex * (parcelasEditInit.selectedIndex + 1) +
        jurosEditInit.selectedIndex) /
      100;

    const valorJuros = +(valorEditInit.value * jurosTotal)
    const valorTotal = (+(valorEditInit.value).replace(',', '.') + valorJuros).toFixed(2)
    let diferencaEdit = (valorTotal - +(valorEditInit.value).replace(',', '.')).toFixed(2)

    console.log(jurosMesEditInit.selectedIndex)
    console.log(jurosEditInit.selectedIndex)
    console.log(valorJuros)
    console.log(valorTotal)
    console.log(valorEditInit.value)
    console.log(diferencaEdit)
    diferencaeEditInit.value = diferencaEdit
    valorFinalEditInit.value = valorTotal
  }
  if (edit.id === 'emprestimoLabelEdit') {
    valorEditInit.addEventListener('keyup', alterarValor)
    parcelasEditInit.addEventListener('change', alterarValor)
    jurosEditInit.addEventListener('change', alterarValor)
    jurosMesEditInit.addEventListener('change', alterarValor)

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
function valorAoVivo() {
  const valorStatus = document.querySelector('.valor');
  const status = document.querySelector('.status');
  let Ls = localStorage.getItem(`informacoes_id${usuarioAtivo.ID}`)
  let informacoesLs = JSON.parse(Ls)
  let InputValor = informacoesLs[0]

  let soma = InputValor.reduce((acumulador, valorAtual) => +acumulador + valorAtual, 0,);


  let valorAtual = +(soma.toFixed(2))

  let numero = 0
  const incremento = +(valorAtual / 100).toFixed(2)
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
  }
  if (valorAtual === 0) {
    status.classList.remove('negativo');
    status.classList.remove('positivo');
    status.innerText = 'Neutro';
    status.style.backgroundColor = ' rgba(142, 208, 236, 0.80)';

  }
  if (valorAtual < 0) {
    status.style.backgroundColor = 'rgba(239, 123, 123, 0.5)';
    status.classList.add('negativo');
    status.classList.remove('positivo');
    status.innerText = 'Negativo';
  }
}

function storage() {
  const transacoes = document.querySelectorAll('.movimentacoesLista');
  const compraLabel = document.querySelectorAll('#compraLabel');
  const vendaLabel = document.querySelectorAll('#vendaLabel');
  const transferenciaLabel = document.querySelectorAll('#transferenciaLabel');
  const emprestimoLabel = document.querySelectorAll('#emprestimoLabel');
  const DespesaUl = document.querySelector('.categoriaEscolhaDespesa')
  const categoriasInfosDespesa = DespesaUl.querySelectorAll('.valoresCategoria')
  const ReceitaUl = document.querySelector('.categoriaEscolhaReceita')
  const categoriasInfosReceita = ReceitaUl.querySelectorAll('.valoresCategoria')

  const informacoes = []

  const comprasArray = [];
  const vendasArray = [];
  const transferenciasArray = [];
  const EmprestimoArray = [];
  const InputValor = [];
  const categoriasDespesaAdd = []
  const categoriasReceitaAdd = []

  categoriasInfosDespesa.forEach((categoria) => {
    categoriasDespesaAdd.push(categoria.innerText)
  })
  categoriasInfosReceita.forEach((categoria) => {
    categoriasReceitaAdd.push(categoria.innerText)
  })

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
    InputValor.push(-(+valor.innerText.replace('-R$', '')));
  });

  vendaLabel.forEach((i) => {
    const nome = i.querySelector('#nomeMov');
    const valor = i.querySelector('#valor');
    const data = i.querySelector('#data');
    const categoria = i.querySelector('#categoria');
    const parcelas = i.querySelector('#parcelasTotal');

    const venda = {
      nome: '',
      valor: '',
      data: '',
      categoria: '',
      parcelas: '',
    };
    const valorPush = +valor.innerText.replace('+R$', '');

    venda['nome'] = [nome.innerText];
    venda['valor'] = [valor.innerText];
    venda['data'] = [data.innerText];
    venda['categoria'] = [categoria.innerText];
    venda['parcelas'] = [parcelas.innerText];
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

    const emprestimo = {
      nome: '',
      data: '',
      valorInicial: '',
      parcelas: '',
      diferenca: '',
      valorFinal: '',
      juros: '',
      jurosMes: '',
    };


    let emprestimoPush = -(+valor.innerText.replace('-R$ ', ''))
    InputValor.push(emprestimoPush);
    +valor.innerText.replace('-R$ ', '') * -1
    emprestimo['nome'] = [nome.innerText.replace('Emprestou para ', '').replace('Pegou de ', '')];
    emprestimo['data'] = [data.innerText];
    emprestimo['parcelas'] = [parcelas.innerText];

    emprestimo['valor'] = [valor.innerText.replace('-R$ ', '')];
    emprestimo['diferenca'] = [diferenca.innerText];
    emprestimo['valorFinal'] = [valorFinal.innerText];
    emprestimo['juros'] = [juros.innerText];
    emprestimo['jurosMes'] = [jurosMes.innerText];
    EmprestimoArray.push(emprestimo);
  });

  const transacao = [];
  informacoes.push(InputValor);
  informacoes.push(comprasArray);
  informacoes.push(vendasArray);
  informacoes.push(transferenciasArray);
  informacoes.push(EmprestimoArray);
  informacoes.push(transacao)
  informacoes.push(categoriasDespesaAdd)
  informacoes.push(categoriasReceitaAdd)
  transacoes.forEach((t) => transacao.push(t.getAttribute('id')));
  localStorage.setItem(`informacoes_id${usuarioAtivo.ID}`, JSON.stringify(informacoes))
}

function criarPaineis() {

  ls.forEach((v, n) => {
    const div = document.createElement('li');
    const edit = document.createElement('form');
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
            <div class="form-img">
              <p>Editar Despesa</p>
            </div>
            <span id="fecharEdit">X</span>
            <label for="nomeEdit">Nome</label>
            <input readonly type="text" name='nomeEdit' id="nomeEdit">
            
                      <label for="valorEdit">Valor</label>
                      <input readonly name="valorEdit" type="number" id="valorEdit">
  
            <label for="dataInfo">Data</label>
            <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="dataInfo" />

            <label for="categoriaEdit">Categoria</label>
            <select disabled id="categoriaEdit" name="categoriaEdit" >

            </select>

            <label for="parcelasEdit">Parcelas</label>
            <select disabled readonly name="parcelasEdit" id="parcelasEdit">
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
      const select = edit.querySelector('#categoriaEdit')
      const options = informacoesLs[6]
      options.forEach((i) => {
        const opt = document.createElement('option')
        opt.innerText = i
        select.appendChild(opt)
      })
    } else if (v === 'vendaLabel') {
      div.id = 'vendaLabel';

      div.innerHTML = `
            <div class='icon icon-transacao'>
              <img class='icon-transacao' src="./img/Movimentacoes/venda icon.svg">
            </div> 
  
              <p id="nomeMov"></p>
              <p id="valor"></p>
              <p id="categoria"></p>
              <p class='parcelas-venda' id="parcelasTotal"></p>
              <p id="data"></p>
        `;
      edit.innerHTML = `
          <div class="editValue"  numero="${n}">
            <div class="form-img">
              <p>Editar Receita</p>
            </div>
            <span id="fecharEdit">X</span>
            <label for="nomeEdit">Nome</label>
            <input name="nome" readonly type="nomeEdit" id="nomeEdit">
            
            <label for="valorEdit">Valor</label>
            <input readonly name="valorEdit" type="number" id="valorEdit">
  
            <label for="dataInfo">Data</label>
            <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="dataInfo" />

            <label for="categoriaEdit">Categoria</label>
            <select disabled id="categoriaEdit" name="categoriaEdit" >

            </select>

            <label for="parcelasEdit">Parcelas</label>
            <select disabled readonly name="parcelasEdit" id="parcelasEdit">
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
      const select = edit.querySelector('#categoriaEdit')
      const options = informacoesLs[7]
      options.forEach((i) => {
        const opt = document.createElement('option')
        opt.innerText = i
        select.appendChild(opt)
      })
      const valor = div.querySelector('#valor')
      valor.style.color = 'green'
      valor.style.fontWeight = '600'

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
      setTimeout(function name() {
        const condicao = div.querySelector('#condicao').innerText
        const valor = div.querySelector('#valor')
        valor.style.color = condicao === 'Transferencia recebida' ? 'green' : ''
        valor.style.fontWeight = condicao === 'Transferencia recebida' ? '600' : ''
      })
      edit.innerHTML = `
            <div class="editValue"  numero="${n}">
              <div class="form-img">
                <p>Editar Transferencia</p>
              </div>
              <span id="fecharEdit">X</span>
              <label for="nomeEdit">Nome</label>
              <input readonly name="nomeEdit" type="nome" id="nomeEdit">
              
              <label for="valorEdit">Valor</label>
              <input readonly name="valorEdit" type="number" id="valorEdit">
  
              <label for="dataInfo">Data</label>
              <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="dataInfo" />

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
              <div class="form-img">
                <p>Editar Emprestimo</p>
              </div>
              <span id="fecharEdit">X</span>
              <label for="nomeEdit">Nome</label>
              <input readonly name="nomeEdit" type="nome" id="nomeEdit">
              
              <label for="valorEdit">Valor</label>
              <input readonly name="valorEdit" type="number" id="valorEdit">
  
              <label for="data">Data</label>
              <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />
  
            <label for="parcelasEdit">Parcelas</label>
            <select disabled readonly name="parcelasEdit" id="parcelasEdit">
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
            <label class='diferencaLabel' for="diferenca">Diferença</label>
              <input readonly type="diferenca" id="diferencaEdit">
              <label for="valor-final">Valor Final</label>
              <input readonly type="number" id="valorFinEdit">
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
      setTimeout(function name() {
        const diferenca = edit.querySelector('.diferencaLabel')
        diferenca.innerText = 'Lucro';
      })
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
      valor.innerText = compraLs[n].valor
    });
  }
  if (vendaLs) {
    const vendaLabel = document.querySelectorAll('#vendaLabel');

    vendaLabel.forEach((i, n) => {
      const nome = i.querySelector('#nomeMov');
      const data = i.querySelector('#data');
      const parcelas = i.querySelector('#parcelasTotal');
      const categoria = i.querySelector('#categoria');
      const valor = i.querySelector('#valor');

      nome.innerText = `${vendaLs[n].nome}`;
      valor.innerText = vendaLs[n].valor;
      data.innerText = vendaLs[n].data;
      categoria.innerText = vendaLs[n].categoria;
      parcelas.innerText = vendaLs[n].parcelas;
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

      nome.innerText = `Emprestou para ${emprestimoLs[n].nome}`
      data.innerText = emprestimoLs[n].data;
      valor.innerText = emprestimoLs[n].valor;
      valor.innerText = `-R$ ${emprestimoLs[n].valor}`
      parcelas.innerText = emprestimoLs[n].parcelas;
      diferenca.innerText = emprestimoLs[n].diferenca;
      valorFinal.innerText = emprestimoLs[n].valorFinal;
      juros.innerText = emprestimoLs[n].juros;
      jurosMes.innerText = emprestimoLs[n].jurosMes;
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


  let ValorAEditar = {
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
    nomeEdit.value = ValorAEditar.nome.innerText
    dataEdit.value = ValorAEditar.data.innerText
    let valorLimpo = ValorAEditar.valor.innerText.replace('+R$ ', '').replace('-R$ ', '')
    valorEdit.value = (+valorLimpo).toFixed(2)
    if (categoriaEdit && ValorAEditar.categoria) {
      categoriaEdit.value = ValorAEditar.categoria.innerText
    }
    if (parcelasEdit && ValorAEditar.parcelasInit) {
      parcelasEdit.value = ValorAEditar.parcelasInit.innerText.slice(0, 1)
    }
    if (jurosEdit && ValorAEditar.jurosInit) {
      jurosEdit.value = ValorAEditar.jurosInit.innerText
      jurosMesEdit.value = ValorAEditar.jurosMesInit.innerText
      nomeEdit.value = ValorAEditar.nome.innerText.replace('Emprestou para ', '')
    }

    if (diferencaeEdit && ValorAEditar.diferencaInit) {
      diferencaeEdit.value = ValorAEditar.diferencaInit.innerText
    }
    if (valorFinalEdit && ValorAEditar.valorFinal) {
      valorFinalEdit.value = ValorAEditar.valorFinal.innerText
    }
  }
  changeValue()

  btnEdit.addEventListener('click', function () {
    if (btnEdit.classList.contains('ativo')) {
      ValorAEditar.nome.innerText = nomeEdit.value
      ValorAEditar.data.innerText = dataEdit.value

      if (i.id == 'vendaLabel') {
        ValorAEditar.valor.innerText = `+R$ ${(+valorEdit.value.replace(',', '.')).toFixed(2)}`
      } else if (i.id == 'compraLabel') {
        ValorAEditar.valor.innerText = `-R$ ${(+valorEdit.value.replace(',', '.')).toFixed(2)}`
      } else if (i.id == 'transferenciaLabel') {
        if (ValorAEditar.condicao.innerText === 'Transferencia enviada') {
          ValorAEditar.valor.innerText = `-R$ ${(+valorEdit.value.replace(',', '.')).toFixed(2)}`
        } else if (ValorAEditar.condicao.innerText === 'Transferencia recebida') {
          ValorAEditar.valor.innerText = `+R$ ${(+valorEdit.value.replace(',', '.')).toFixed(2)}`
        } else { ValorAEditar.valor.innerText = `-R$ ${(+valorEdit.value.replace(',', '.')).toFixed(2)}` }
      } else if (i.id == 'emprestimoLabel') {
        ValorAEditar.nome.innerText = `Emprestou para ${nomeEdit.value}`
        ValorAEditar.valor.innerText = `-R$ ${(+valorEdit.value.replace(',', '.')).toFixed(2)}`
      }

      if (ValorAEditar.categoria) {
        ValorAEditar.categoria.innerText = categoriaEdit.value
      }
      if (parcelasEdit && ValorAEditar.parcelasInit) {
        ValorAEditar.parcelasInit.innerText = parcelasEdit.value
      }
      if (jurosEdit && ValorAEditar.jurosInit) {
        ValorAEditar.jurosInit.innerText = jurosEdit.value
      }
      if (jurosMesEdit && ValorAEditar.jurosMesInit) {
        ValorAEditar.jurosMesInit.innerText = jurosMesEdit.value
      }
      if (i.id == 'emprestimoLabel') {
        ValorAEditar.diferencaInit.innerText = diferencaeEdit.value
      }
      if (valorFinalEdit && ValorAEditar.valorFinal) {
        ValorAEditar.valorFinal.innerText = valorFinalEdit.value
      }
      transacaoAtual.push(valorEdit.value)
      this.offsetParent.offsetParent.classList.remove('ativo')
      storage()
      valorAoVivo()
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

  function removeAtivo(editBg) {
    editBg.classList.remove('ativo')
    document.body.style.overflow = 'auto'
  }


  // remove Bg quando clicado fora do  modal

  if (numeroDois) {
    {
      removeAtivo(editValueBg[numeroDois])
      const editValue = editValueBg[numeroDois].querySelector('.editValue')
      const btn = editValue.querySelector('.botaoEdit')
      const btnEdit = editValue.querySelector('#editar')
      removeAtivo(btnEdit)
    }
  }

  // remove Bg quando clicado no X

  if (itemClicado.nodeName === 'SPAN' && itemClicado.id === 'fecharEdit') {
    const editValue = document.querySelector(`[numero="${numero}"]`)
    const editValueBg = editValue.parentNode
    const btn = editValue.querySelector('#editar')
    const confirmar = editValueBg.querySelector('.confirmar')
    removeAtivo(confirmar)
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
      inputs.forEach((i) => {
        i.removeAttribute('readonly')
        if (i.getAttribute('type') === 'date') {
          i.style.pointerEvents = 'all'
        }

      })
      selects.forEach(i => i.removeAttribute('disabled'))

    } else if (!btn.classList.contains('ativo')) {
      inputs.forEach((i) => {
        i.setAttribute('readonly', '')
        if (i.getAttribute('type') === 'date') {
          i.style.pointerEvents = 'none'
        }
      })
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
    document.body.style.overflow = 'hidden'
  }
})

if (informacoesLs[0]) {
  valorAoVivo()
}
const userAtivo = localStorage.usuarioAtivo ? JSON.parse(localStorage.usuarioAtivo) : []
const table = document.querySelector('.tabela-transacoes')
const nomeUsuarioAtivo = JSON.parse(localStorage.usuarios).find(usuario => usuario.nomeUsuario === userAtivo.nomeUsuario)
const edits = document.getElementById('editores');
const transacoesTotaisBg = document.querySelector('.transacoesTotais-bg')

let Ls = localStorage.getItem(`informacoes_id${userAtivo.ID}`)
let informacoesLs = JSON.parse(Ls)

let ls = nomeUsuarioAtivo ? informacoesLs[5] : false;
let compraLs = informacoesLs[1] ? informacoesLs[1] : false;
let vendaLs = informacoesLs[2] ? informacoesLs[2] : false;
let transferenciaLs = informacoesLs[3] ? informacoesLs[3] : false;
let emprestimoLs = informacoesLs[4] ? informacoesLs[4] : false;

if (!localStorage.usuarioAtivo) {
  window.open('index.html', '_top');
}
function arrumarNome() {
  const nomeLogin = document.querySelector('.nome-login');

  nomeLogin.innerText = `Olá, ${userAtivo.nome} ${userAtivo.sobrenome.slice(0, 1)}.`;
}
if (userAtivo) {
  arrumarNome()
}

function criarPaineis() {

  ls.forEach((v, n) => {
    const div = document.createElement('li');
    const edit = document.createElement('form');
    div.classList.add('movimentacoesLista');
    div.setAttribute('label', n)

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
  criarPaineis()
  arrumarInputValor()
}

const filtroCompra = transacoesTotaisBg.querySelector('.filtro-compra')
const filtroVenda = transacoesTotaisBg.querySelector('.filtro-venda')
const filtroTransferencia = transacoesTotaisBg.querySelector('.filtro-transferencia')
const filtroEmprestimo = transacoesTotaisBg.querySelector('.filtro-emprestimo')
const movimentacoesLista = transacoesTotaisBg.querySelectorAll('.movimentacoesLista')
const barraPesquisa = document.querySelector('.pesquisa')
const lupa = document.querySelector('.lupa ')


let categoriaAtual = ''
let ultimoDigito = ''

barraPesquisa.addEventListener('keydown', () => {
  if (barraPesquisa.value === '') {
    lupa.style.display = 'none'
  }
})

barraPesquisa.addEventListener('keyup', () => {
  ultimoDigito = barraPesquisa.value


  function filter(categoria, label) {
    if (categoriaAtual === categoria && barraPesquisa.value !== '') {
      movimentacoesLista.forEach((i) => {
        if (i.id === label) {
          const nome = i.querySelector('#nomeMov').innerText

          if (!nome.includes(ultimoDigito)) {
            i.style.display = 'none'
          } else {
            i.style.display = 'grid'
          }
        }
      })
    } else if (categoriaAtual === categoria && barraPesquisa.value === '') {
      lupa.style.display = 'block'
      movimentacoesLista.forEach((i) => {
        if (i.id === label) {
          i.style.display = 'grid'
        }
      })
    }
  }
  function filterAll() {
    if (barraPesquisa.value !== '') {
      movimentacoesLista.forEach((i) => {
        const nome = i.querySelector('#nomeMov').innerText

        if (!nome.includes(ultimoDigito)) {
          i.style.display = 'none'
        } else {
          i.style.display = 'grid'
        }
      })
    } else if (categoriaAtual === '' && barraPesquisa.value === '') {
      lupa.style.display = 'block'
      movimentacoesLista.forEach((i) => {
        i.style.display = 'grid'
      })
    }
  }

  if (categoriaAtual === 'compra') {
    filter('compra', 'compraLabel')
  } else if (categoriaAtual === 'venda') {
    filter('venda', 'vendaLabel')
  } else if (categoriaAtual === 'transferencia') {
    filter('transferencia', 'transferenciaLabel')
  } else if (categoriaAtual === 'emprestimo') {
    filter('emprestimo', 'emprestimoLabel')
  } else {
    filterAll()
  }
})

function filter(categoria, label) {
  if (categoriaAtual !== categoria) {
    movimentacoesLista.forEach((i) => {
      i.style.display = 'none'
      const digitos = i.querySelector('#nomeMov')
      if (i.id === label) {
        i.style.display = 'grid';
        if (barraPesquisa.value !== '' && !digitos.innerText.includes(barraPesquisa.value)) {
          i.style.display = 'none'
        }

      }
    })
    categoriaAtual = categoria
  } else if (categoriaAtual === categoria) {
    movimentacoesLista.forEach((i) => {
      const digitos = i.querySelector('#nomeMov')
      if (barraPesquisa.value === '' && i.id !== label) {
        i.style.display = i.style.display == 'grid' ? 'none' : 'grid';
      } else if (barraPesquisa.value !== '' && i.id !== label && digitos.innerText.includes(barraPesquisa.value)) {
        i.style.display = 'grid'
      }
    })
    categoriaAtual = ''
  }
}

function addAtivo(item) {
  filtroBtn.forEach((i) => { if (i !== item) { i.classList.remove('ativo') } })
  item.classList.toggle('ativo')
}

const filtroBtn = document.querySelectorAll('.filtroBtn')

filtroBtn.forEach((item) => {
  item.addEventListener('click', () => {
    addAtivo(item)
  })
})

filtroCompra.addEventListener('click', function () {
  filter('compra', 'compraLabel')
})
filtroVenda.addEventListener('click', () => {
  filter('venda', 'vendaLabel')

})
filtroTransferencia.addEventListener('click', () => {
  filter('transferencia', 'transferenciaLabel')
})
filtroEmprestimo.addEventListener('click', () => {
  filter('emprestimo', 'emprestimoLabel')
})

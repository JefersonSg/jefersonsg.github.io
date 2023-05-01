const btnNovaCategoria = document.querySelector('#novaCategoria')
const categoriaValor = document.querySelector('.valorCategoria')
const categoriaUl = document.querySelector('.categoriaEscolha')
let categoriasDespesas = ["Produtos Eletronicos","Roupas","Contas","Transporte","Despesas médicas","Cuidados pessoais","Entretenimento","Remédio","Alimentação","Cosmeticos"]

const usuarioAtiv = localStorage.usuarioAtivo ? JSON.parse(localStorage.usuarioAtivo) : []


categoriaValor.addEventListener('click', function(){
  this.classList.toggle('ativo')
  categoriaUl.classList.toggle('ativo')
})

  categoriasDespesas.forEach((i)=>{
    const li = document.createElement('li')
    li.classList.add('valoresCategoria')
    li.innerText = i
    categoriaUl.append(li)
  })
  
  btnNovaCategoria.addEventListener('click', ()=>{
    btnNovaCategoria.classList.toggle('ativo')
    const input = document.createElement('input')
    input.classList.add('novoValor')
if (btnNovaCategoria.classList.contains('ativo')) {
      categoriaUl.appendChild(input)
}
if (!btnNovaCategoria.classList.contains('ativo')) {
  const novoInput = categoriaUl.querySelector('.novoValor')
  const li = document.createElement('li')
  li.classList.add('valoresCategoria')
  const valorDoInput = novoInput.value
  li.innerText = valorDoInput
  categoriaUl.appendChild(li)
  novoInput.remove()
  storage()
}
  })

categoriaUl.addEventListener('click', function(e){
  if (e.target.nodeName === 'LI') {
   const valorClicado = e.target.innerText
   categoriaValor.value = valorClicado
   categoriaUl.classList.remove('ativo')
   categoriaValor.classList.remove('ativo')
  }
})

function storage() {
  const transacoes = document.querySelectorAll('.movimentacoesLista');
  const compraLabel = document.querySelectorAll('#compraLabel');
  const vendaLabel = document.querySelectorAll('#vendaLabel');
  const transferenciaLabel = document.querySelectorAll('#transferenciaLabel');
  const emprestimoLabel = document.querySelectorAll('#emprestimoLabel');
  const categoriasInfos = document.querySelectorAll('.valoresCategoria')

  const informacoes = []

  const comprasArray = [];
  const vendasArray = [];
  const transferenciasArray = [];
  const EmprestimoArray = [];
  const InputValor = [];
  const categoriasAdd = []

  categoriasInfos.forEach((i)=>{
  const valor = {
    value: ''
  }
  valor.value = i.innerText
  categoriasAdd.push(valor)
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
      categoria:'',
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
      let emprestimoPush = -(+valor.innerText.replace('-R$ ', ''))
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
  informacoes.push(categoriasAdd)
  transacoes.forEach((t) => transacao.push(t.getAttribute('id')));
  localStorage.setItem(`informacoes_id${usuarioAtiv.ID}`, JSON.stringify(informacoes))
}
// storage()
const btnNovaCategoria = document.querySelectorAll('#novaCategoria')
const categoriaValor = document.querySelectorAll('.valorCategoria')
const categoriaUl = document.querySelectorAll('.categoriaEscolha')
let categoriasArrayDespesa = ["Produtos Eletronicos", "Roupas", "Contas", "Transporte", "Despesas médicas", "Cuidados pessoais", "Entretenimento", "Remédio", "Alimentação", "Cosmeticos"]
let categoriasArrayReceita = ["Salário", "Investimentos", "Vendas", "Comissões", "Aluguel", "Reembolso", "Juros"]

const usuarioAtiv = localStorage.usuarioAtivo ? JSON.parse(localStorage.usuarioAtivo) : []

let LocalStorag = localStorage.getItem(`informacoes_id${usuarioAtiv.ID}`)
let informacoesLocals = JSON.parse(LocalStorag)

let ArraycategoriaDespesa = informacoesLocals[6].length ? informacoesLocals[6] : categoriasArrayDespesa
let ArraycategoriaReceita = informacoesLocals[7].length ? informacoesLocals[7] : categoriasArrayReceita



categoriaValor.forEach((i, n) => {
  i.addEventListener('click', function () {
    this.classList.toggle('ativo')
    categoriaUl[n].classList.toggle('ativo')
  })
})

ArraycategoriaDespesa.forEach((i) => {
  const li = document.createElement('li')
  li.classList.add('valoresCategoria')
  li.innerText = i
  categoriaUl[0].append(li)
})
ArraycategoriaReceita.forEach((i) => {
  const li = document.createElement('li')
  li.classList.add('valoresCategoria')
  li.innerText = i
  categoriaUl[1].append(li)
})

btnNovaCategoria.forEach((botao) => {
  botao.addEventListener('click', function () {
    if (this.offsetParent.classList[1] === 'categoriaEscolhaDespesa') {
      botao.classList.toggle('ativo')
      const input = document.createElement('input')
      input.classList.add('novoValor')
      if (botao.classList.contains('ativo')) {
        categoriaUl[0].appendChild(input)
      }
      if (!botao.classList.contains('ativo')) {
        const novoInput = categoriaUl[0].querySelector('.novoValor')
        if (novoInput.value !== '') {
          const li = document.createElement('li')
          li.classList.add('valoresCategoria')
          const valorDoInput = novoInput.value
          li.innerText = valorDoInput
          categoriaUl[0].appendChild(li)
          novoInput.remove()
          storage()
        }
        novoInput.remove()
      }
    } else if (this.offsetParent.classList[1] === 'categoriaEscolhaReceita') {
      botao.classList.toggle('ativo')
      const input = document.createElement('input')
      input.classList.add('novoValor')
      if (botao.classList.contains('ativo')) {
        categoriaUl[1].appendChild(input)
      }
      if (!botao.classList.contains('ativo')) {
        const novoInput = categoriaUl[1].querySelector('.novoValor')
        if (novoInput.value !== '') {
          const li = document.createElement('li')
          li.classList.add('valoresCategoria')
          const valorDoInput = novoInput.value
          li.innerText = valorDoInput
          categoriaUl[1].appendChild(li)
          novoInput.remove()
          storage()
        }
        novoInput.remove()
      }
    }
  })
})

categoriaUl.forEach((ul) => {
  ul.addEventListener('click', function (e) {
    if (e.target.nodeName === 'LI' && this.classList[1] === 'categoriaEscolhaDespesa') {
      const valorClicado = e.target.innerText
      categoriaValor[0].value = valorClicado
      categoriaUl[0].classList.remove('ativo')
      categoriaValor[0].classList.remove('ativo')
    }
    if (e.target.nodeName === 'LI' && this.classList[1] === 'categoriaEscolhaReceita') {
      const valorClicado = e.target.innerText
      categoriaValor[1].value = valorClicado
      categoriaUl[1].classList.remove('ativo')
      categoriaValor[1].classList.remove('ativo')
    }
  })
})

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
  informacoes.push(categoriasDespesaAdd)
  informacoes.push(categoriasReceitaAdd)
  transacoes.forEach((t) => transacao.push(t.getAttribute('id')));
  localStorage.setItem(`informacoes_id${usuarioAtiv.ID}`, JSON.stringify(informacoes))
}
storage()
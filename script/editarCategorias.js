const categoriaValor = document.querySelectorAll('.valorCategoria')
const categoriaUl = document.querySelectorAll('.categoriaEscolha')

let categoriasArrayDespesa = ["Produtos Eletronicos", "Roupas", "Contas", "Transporte", "Despesas médicas", "Cuidados pessoais", "Entretenimento", "Remédio", "Alimentação", "Cosmeticos"]
let categoriasArrayReceita = ["Salário", "Investimentos", "Vendas", "Comissões", "Aluguel", "Reembolso", "Juros"]
const usuarioAtiv = localStorage.usuarioAtivo ? JSON.parse(localStorage.usuarioAtivo) : []

let LocalStorag = localStorage.getItem(`informacoes_id${usuarioAtiv.ID}`)
let informacoesLocals = JSON.parse(LocalStorag)

let ArraycategoriaDespesa = informacoesLocals[6] ? informacoesLocals[6] : categoriasArrayDespesa
let ArraycategoriaReceita = informacoesLocals[7] ? informacoesLocals[7] : categoriasArrayReceita

// adicionar novas categorias a despesas e receitas

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

categoriaUl.forEach((i)=>{
  // FUNCAO PARA ADICIONAR UM NOVO LI NA CATEGORIA
  const botaoAdicionar = i.querySelector('#novaCategoria')
  const btnDeletar = i.querySelector('#ApagarCategoria')
  const Lis = i.querySelectorAll('li')

  i.addEventListener('click', function(e){

    if (e.target.id === 'novaCategoria') {
      const input = document.createElement('input')
      input.classList.add('novoValor')

      botaoAdicionar.classList.toggle('ativo')
      btnDeletar.toggleAttribute('disabled')
      if (botaoAdicionar.classList.contains('ativo')) {
        this.appendChild(input)
      }
      if (!botaoAdicionar.classList.contains('ativo')) {
        const novoInput = this.querySelector('.novoValor')

        // REMOVE INPUT PREENCHIDO E ADICIONA A lI COM O VALOR
        if (novoInput.value !== '') {
          const li = document.createElement('li')
          li.classList.add('valoresCategoria')
          const valorDoInput = novoInput.value
          li.innerText = valorDoInput
          this.appendChild(li)
          novoInput.remove()
          storage()
        } else if (novoInput.value === '') {
          // REMOVE INPUT VAZIO
          novoInput.remove()
        }
      }
    }
  })

  // FUNCAO PARA ADICIONAR A LIXEIRA AO LADO DO LI
  i.addEventListener('click', function(e){
    if (e.target.id === 'ApagarCategoria') {
      btnDeletar.classList.toggle('ativo')
      Lis.forEach((i)=>{
        i.classList.toggle('ativo')
      })
      botaoAdicionar.toggleAttribute('disabled')
    }
  })

  // FUNCAO PARA APAGAR LIS
  i.addEventListener('click', function(e){
    if (btnDeletar.classList.contains('ativo') && e.target.nodeName === 'LI'){
      e.target.remove()
      storage()
    }
  })

  // FUNCAO PARA ADICIONAR O VALOR CLICADO NO INPUT
  i.addEventListener('click', function(e){
    if (!btnDeletar.classList.contains('ativo') && e.target.nodeName === 'LI'){
      const input = e.target.offsetParent.offsetParent.querySelector('.valorCategoria')
      const valorClicado = e.target.innerText
      input.value = valorClicado

      this.classList.remove('ativo')
      input.classList.remove('ativo')
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
  const categoriasDespesaAdd = [ ]
  const categoriasReceitaAdd = [ ]

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
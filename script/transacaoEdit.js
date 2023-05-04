const edit = document.getElementById('editores');
const editValue = document.querySelectorAll('.editValue')
const tables = document.querySelector('.tabela-transacoes')
const movimentacoesList = document.querySelectorAll('.movimentacoesLista')
const usuarioAtivo = localStorage.usuarioAtivo ? JSON.parse(localStorage.usuarioAtivo) : []


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
  const i = movimentacoesList[n]


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
      this.offsetParent.offsetParent.classList.remove('ativo')
      storage()
    }
  })

})

edit.addEventListener('click', (event) => {
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

tables.addEventListener('click', (event) => {
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
    const categoriasDespesaAdd = informacoesLs[6]
    const categoriasReceitaAdd = informacoesLs[7]
  
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

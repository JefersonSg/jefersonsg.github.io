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
tables.addEventListener('click',()=>{
  changeValue()
})

btnEdit.addEventListener('click', () => {
    if (btnEdit.classList.contains('ativo')) {
      Editar.nome.innerText = nomeEdit.value
      Editar.data.innerText = dataEdit.value

      if (i.id == 'vendaLabel') {
        Editar.valor.innerText = `+R$ ${(+valorEdit.value.replace(',','.')).toFixed(2)}`
      } else if (i.id == 'compraLabel') {
        Editar.valor.innerText = `-R$ ${(+valorEdit.value.replace(',','.')).toFixed(2)}`
      } else if (i.id == 'transferenciaLabel') {
        if (Editar.condicao.innerText === 'Transferencia enviada') {
          Editar.valor.innerText = `-R$ ${(+valorEdit.value.replace(',','.')).toFixed(2)}`
        } else if (Editar.condicao.innerText === 'Transferencia recebida') {
          Editar.valor.innerText = `+R$ ${(+valorEdit.value.replace(',','.')).toFixed(2)}`
        } else { Editar.valor.innerText = `-R$ ${(+valorEdit.value.replace(',','.')).toFixed(2)}` }
      } else if (i.id == 'emprestimoLabel') {
        if (Editar.condicao.innerText === '-') {
          Editar.nome.innerText = `Emprestou para ${nomeEdit.value}`
          Editar.valor.innerText = `-R$ ${(+valorEdit.value.replace(',','.')).toFixed(2)}`
        } else if (Editar.condicao.innerText === '+') {
          Editar.nome.innerText = `Pegou de ${nomeEdit.value}`
          Editar.valor.innerText = `+R$ ${(+valorEdit.value.replace(',','.')).toFixed(2)}`
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
      storage()
      location.reload()

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
  function removeAtivo(item1) {
    item1.classList.remove('ativo')
    document.body.style.overflow = 'auto'

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
          i.style.pointerEvents = 'all'
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
    InputValor.push(-(+valor.innerText.replace('-R$', '')));
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
  transacoes.forEach((t) => transacao.push(t.getAttribute('id')));
  localStorage.setItem(`informacoes_id${usuarioAtivo.ID}`, JSON.stringify(informacoes))

}
storage()

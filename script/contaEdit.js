const EmprestimoLabelEdicao = document.querySelectorAll('#emprestimoLabelEdit')
EmprestimoLabelEdicao.forEach((i)=>{

    const valor = i.querySelector('#valorEdit')
    let valorFinal = i.querySelector('#valorFinEdit')
    const parcelas = i.querySelector('#parcelasEdit')
    const juros = i.querySelector('#jurosEdit')
    const jurosAoMes = i.querySelector('#jurosCompEdit')
    const diferenca = i.querySelector('#diferencaEdit')
    function alterarValor (){

      const jurosTotal =
      (jurosAoMes.selectedIndex * parcelas.selectedIndex +
        juros.selectedIndex) /
      100;

      const valorJuros = +(valor.value * jurosTotal)
      const valorTotal = (+(valor.value).replace(',','.') + valorJuros).toFixed(2)
      let diferencaEdit = (valorTotal - +(valor.value).replace(',','.')).toFixed(2)
      
      diferenca.value = diferencaEdit
      valorFinal.value = valorTotal
    }
    valor.addEventListener('keyup', alterarValor)
    parcelas.addEventListener('change', alterarValor)
    juros.addEventListener('change', alterarValor)
    jurosAoMes.addEventListener('change', alterarValor)

})
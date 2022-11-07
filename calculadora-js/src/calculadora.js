export const OPERACAO_INVALIDA = 'OPERACAO_INVALIDA'

export const calculadora = (operacao, valores) => {
  let resultado = 0
  let i = 0

  switch(operacao){

    case 'soma':
      for(i; i < valores.length; i++){
        resultado += valores[i]
      }
      return resultado

    case 'subtracao':
      for(i; i < valores.length; i++){
        if(i == 0){
          resultado = valores[i]
        } else {
          resultado -= valores[i]
        }
      }
      return resultado

    case 'divisao':
      for(i; i < valores.length; i++){
        if(i == 0){
          resultado = valores[i]
        } else {
          resultado /= valores[i]
        }
      }
      return resultado
      
    case 'multiplicacao':
      for(i; i < valores.length; i++){
        if(i == 0){
          resultado = valores[i]
        } else {
          resultado *= valores[i]
        }
      }
      return resultado
    default:
      return OPERACAO_INVALIDA
  }
}
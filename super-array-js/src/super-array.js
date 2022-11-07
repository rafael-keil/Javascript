export const SuperArray = (itens = []) => {

  const array = {
    /**
     * Propriedade para acessar os itens
     */

    itens: [...itens],
  }

  /**
   * Adicionar um novo item ao final dos items
   */

  array.push = item => {

    array.itens[array.itens.length] = item

    return null
  }

  /**
   * Itera sobre cada um dos elementos do SuperArray enviando o item e o index
   * como segundo parametro
   */

  array.forEach = callback => {
    for(let i = 0; i < array.itens.length; i++) {
      callback(array.itens[i])
    }
    return null
  }

  /**
   * Retorna um novo SuperArray com os itens mapeados
   */

  array.map = callback => {
    const arrayFiltrado = SuperArray()

    for(let i = 0; i < array.itens.length; i++) {
      arrayFiltrado.push(callback(array.itens[i]))
    }
    
    return arrayFiltrado
  }


  /**
   * Retorna um SuperArray novo com os itens filtrados
   */

  array.filter = callback => {

    const arrayFiltrado = SuperArray()

    for(let i = 0; i < array.itens.length; i++) {
      if(callback(array.itens[i])){
        arrayFiltrado.push(array.itens[i])
      }
    }
    
    return arrayFiltrado

  }

  /**
   * Retorna o primeiro elemento do SuperArray que satisfazer o callback recebido
   * se não encontrar, deve retornar undefined
   */

  array.find = callback => {

    for(let i = 0; i < array.itens.length; i++) {
      if(callback(array.itens[i])){
        return array.itens[i]
      }
    }

  }

  /**
   * Reduz o SuperArray em um único valor
   */


  array.reduce = (callback, valorInicial) => {

    let valor = valorInicial

    for(let i = 0; i < array.itens.length; i++) {
      valor = callback(valor, array.itens[i])
    }
    
    return valor

  }

  return array
}
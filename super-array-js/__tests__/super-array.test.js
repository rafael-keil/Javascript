import instrutores from './instrutores.json'
import { SuperArray } from '../src/super-array'

let instrutorSuper
let arrayEsperado

beforeEach(() => {
  instrutorSuper = SuperArray(instrutores)
  arrayEsperado = instrutores
})

describe('Exemplo de testes', () => {

  it('Valor importado deve ser true', () => {
    expect(true).toBeTruthy()
  })

  it('push deve adicionar um novo instrutor ao meu super array', () => {

    arrayEsperado.push({ "nome": "rafael", "dandoAula": true })
    
    instrutorSuper.push({ "nome": "rafael", "dandoAula": true })

    expect(instrutorSuper.itens).toEqual(arrayEsperado)

  })

  it('forEach deve passar por todos os instrutores e chamando o callback esperado', () => {

    let valorEsperado = 0
    for(let i = 0; i < arrayEsperado.length; i++ ) {
      valorEsperado++
    }

    let soma = 0
    instrutorSuper.forEach(() => {
      soma++
    })

    expect(soma).toBe(valorEsperado)

  })

  it('filter deve retornar um novo array apenas com os instrutores que estão dando aula', () => {

    const esperadoNovoAula = arrayEsperado.filter(item => {
      return item.dandoAula == true
    })

    const instrutorNovoSuper = instrutorSuper.filter(item => {
      return item.dandoAula == true
    })

    expect(instrutorNovoSuper.itens).toEqual(esperadoNovoAula)

  })

  it('map deve retornar um novo array com o numero de nomes que o instrutor tem', () => {

    const esperadoNovoAula = arrayEsperado.map(item => {
      return item.dandoAula = true
    })

    const instrutorNovoSuper = instrutorSuper.map(item => {
      return item.dandoAula = true
    })

    expect(instrutorNovoSuper.itens).toEqual(esperadoNovoAula)

  })

  it('find deve retornar o primeiro instrutor que está dando aula', () => {

    const esperadoNovoAula = arrayEsperado.find(item => {
      return item.dandoAula == true
    })

    const instrutorNovoSuper = instrutorSuper.find(item => {
      return item.dandoAula == true
    })

    expect(instrutorNovoSuper).toEqual(esperadoNovoAula)

  })

  it('reduce deve retornar o total de letras no nome dos instrutores', () => {

    const valorEsperado = arrayEsperado.reduce((acumulador, item) => {
      return acumulador += item.nome.replace(/\s+/g, '').length
    }, 0)

    const valorSuper = instrutorSuper.reduce((acumulador, item) => {
      return acumulador += item.nome.replace(/\s+/g, '').length
    }, 0)

    expect(valorSuper).toBe(valorEsperado)

  })

  it('reduce deve retornar um boolean se todos os instrutores estão dando aula', () => {

    const valorEsperado = arrayEsperado.reduce((acumulador, item) => {
      if(acumulador == true && item.dandoAula){
        return true
      } else {
        return false
      }
    }, true)

    const valorSuper = instrutorSuper.reduce((acumulador, item) => {
      console.log(item)
      if(acumulador && item.dandoAula){
        return true
      } else {
        return false
      }
    }, true)

    expect(valorSuper).toBe(valorEsperado)

  })

})

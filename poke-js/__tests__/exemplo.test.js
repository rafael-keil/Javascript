import pokemonsArray from '../src/pokemons.json'
import {criarTreinador, subindoNivel, capturarPokemon} from '../src/index.js'

let treinadorTeste
let pokemonTeste

beforeEach(() => {
  treinadorTeste = criarTreinador('rafael', 15 , 1)
  pokemonTeste = { id: 1, nivel: 1}
})

describe('Testes sobre o Treinador', () => {

  it('Treinador será criado com nome correto', () => {
    const nomeEsperado = 'rafael'
    const nomeRecebido = treinadorTeste.nome

    expect(nomeRecebido).toBe(nomeEsperado)
  })

  it('Treinador será criado com a idade correta', () => {
    const idadeEsperada = 15
    const idadeRecebida = treinadorTeste.idade

    expect(idadeRecebida).toBe(idadeEsperada)
  })

  it('Treinador será criado com o pokemon inicial correto', () => {
    const pokemonEsperado = [pokemonTeste]
    const pokemonRecebido = treinadorTeste.pokemons

    expect(pokemonRecebido).toEqual(pokemonEsperado)
  })

  it('Treinador terá seus pokemons atualizados após nova captura', () => {
    const treinadorEsperado = {
      nome: 'rafael',
      idade: 15,
      pokemons: [{ id: 1, nivel: 2}, { id: 4, nivel: 3}]
    }

    const treinadorRecebido = capturarPokemon(treinadorTeste, { id: 4, nivel: 3})

    expect(treinadorRecebido).toEqual(treinadorEsperado)
  })

})

describe('Testes sobre o Pokemon', () => {

  it('Deve subir o nível do pokemon corretamente', () => {
    const pokemonEsperado = [{ id: 1, nivel: 2}]
    const pokemonRecebido = treinadorTeste.pokemons.map(subindoNivel)

    expect(pokemonRecebido.nivel).toEqual(pokemonEsperado.nivel)
  })

  it('Não deve evoluir pokemon caso não possua o level necessário', () => {
    const pokemonEsperado = [{ id: 1, nivel: 2}]
    const pokemonRecebido = treinadorTeste.pokemons.map(subindoNivel)

    expect(pokemonRecebido.id).toEqual(pokemonEsperado.id)
  })

  it('Deve evoluir pokemon ao atingir o nível necessário', () => {
    const pokemonEsperado = [{ id: 2, nivel: 5}]

    const treinadorNovo = {
      nome: 'rafael',
      idade: 15,
      pokemons: [{ id: 1, nivel: 4}],
    }
    const pokemonRecebido = treinadorNovo.pokemons.map(subindoNivel)

    expect(pokemonRecebido).toEqual(pokemonEsperado)
  })

})

import axios from 'axios'
import {
  verificarSeAtorEstaEmSeriado,
  filtarPorAnoERetornarNome,
  calcularMediaTotalDeEpisodios,
  agruparTituloDasSeriesPorPropriedade,
} from '../src/metodos'

let series
let seriesData

beforeAll(async () => {
  series = await axios.get('https://gustavobuttenbender.github.io/film-array/data/films.json')
  seriesData = series.data
})


describe('Testes de busca', () => {

  it('Deve filtrar as series com ano de estreia maior ou igual a 2010 e retornar uma listagem com os nomes', () => {
    
    const arrayEsperado = [
      'Stranger Things',
      'Game Of Thrones',
      'The Walking Dead',
      'Band of Brothers',
      'Gus and Will The Masters of the Wizards',
      '10 Days Why',
      'Mr. Robot',
      'Narcos',
      'Westworld'
    ]

    const arrayRecebido = filtarPorAnoERetornarNome(seriesData, 2010)

    expect(arrayRecebido).toEqual(arrayEsperado)
    
  })

  it('Deve retornar true ao procurar ator que está em elenco', () => {
    
    const boolRecebida = verificarSeAtorEstaEmSeriado(seriesData, 'Clifton L. Collins Jr.')

    expect(boolRecebida).toBeTruthy()
    
  })

  it('Deve retornar false ao procurar ator que não participa de elenco', () => {
    
    const boolRecebida = verificarSeAtorEstaEmSeriado(seriesData, 'Rafael K.')

    expect(boolRecebida).not.toBeTruthy()
    
  })

  it('Deve calcular corretamente a media total de episódios de todas as series', () => {

    const valorEsperado = 35.8
    
    const valorRecebido = calcularMediaTotalDeEpisodios(seriesData)

    expect(valorRecebido).toBe(valorEsperado)
    
  })

  it('Deve agrupar corretamente em um objeto os titulos das series baseado na Distribuidora', () => {
    
    const arrayEsperado = {
      Netflix: [ 'Stranger Things', 'Narcos' ],
      HBO: [ 'Game Of Thrones', 'Band of Brothers', 'Westworld' ],
      AMC: [ 'The Walking Dead', 'Breaking Bad' ],
      CWI: [ 'Gus and Will The Masters of the Wizards' ],
      JS: [ '10 Days Why' ], 
      'USA Network': [ 'Mr. Robot' ]
    }

    const arrayRecebido = agruparTituloDasSeriesPorPropriedade(seriesData, 'distribuidora')

    expect(arrayRecebido).toEqual(arrayEsperado)
    
  })

})


export function filtarPorAnoERetornarNome(series, ano) {
  
  let nomesFiltrados = []
  
  series.forEach(item => {
    if(item.anoEstreia >= ano){
      nomesFiltrados = [...nomesFiltrados, item.titulo]
    }
  })

  return nomesFiltrados

}

export function verificarSeAtorEstaEmSeriado(series, nomeAtor) {

  let resposta = false

  series.forEach(item => {
    if(item.elenco.includes(nomeAtor)){
      resposta = true
    }
  })
  
  return resposta

}

export function calcularMediaTotalDeEpisodios(series) {
  
  let quantidade = 0
  
  series.forEach(item => {
    quantidade += item.numeroEpisodios
  })
  
  return (quantidade / series.length)

}

export function agruparTituloDasSeriesPorPropriedade(series, propriedade) {
  
  return series.reduce(function (acumulador, item) {

    let propriedadeKey = item[propriedade];

    if (!acumulador[propriedadeKey]) {
      acumulador[propriedadeKey] = [];
    }

    acumulador[propriedadeKey].push(item.titulo);
    return acumulador;
  }, {});

}

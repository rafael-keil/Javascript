import {
  vantagemPista,
  debuffPista,
  buffPosicao,
  posicaoCorredor,
  buffAliadoInimigo,
  movimento,
} from "./funcoes";

export function corrida(pista, corredores, pistasArray, corredoresArray) {
  // declaração de um corredor {id: 0, idAliado: 0, idInimigo: 0, buffPosicao: 0}
  const pistaCorrida = pistasArray.find((pistaFind) => {
    return pistaFind.id == pista;
  });

  let pistaEstado = [[]];
  corredores.forEach((carro) => {
    pistaEstado[0] = [...pistaEstado[0], carro.id];
  });

  let posicoesBu = [];
  pistaCorrida.posicoesBuffs.forEach((buff) => {
    posicoesBu = [...posicoesBu, { posicao: buff, acumulador: 0 }];
  });

  const retornoString = rodada(
    pistaCorrida,
    corredoresArray,
    corredores,
    pistaEstado,
    posicoesBu,
    0
  );

  return retornoString;
}

function rodada(
  pistaCorrida,
  corredoresArray,
  corredores,
  pistaEstado,
  posicoesBuffs,
  turno
) {
  const pistaInicio = pistaEstado;

  //movimento

  const pistaNova = movimento(
    corredores,
    corredoresArray,
    pistaInicio,
    pistaCorrida,
    turno
  );

  //calculo buff

  const retornoBuff = buffPosicao(
    pistaInicio,
    pistaNova,
    corredores,
    posicoesBuffs
  );
  const corredoresAtualizados = retornoBuff.cors;
  const buffAtualizado = retornoBuff.buff;

  // final da rodada
  if (pistaNova.length >= pistaCorrida.tamanho) {
    const vencedor = pistaNova[pistaNova.length - 1];
    return "ID do vencedor: " + vencedor[0];
  } else {
    return rodada(
      pistaCorrida,
      corredoresArray,
      corredoresAtualizados,
      pistaNova,
      buffAtualizado,
      turno++
    );
  }
}

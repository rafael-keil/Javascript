export {
  vantagemPista,
  debuffPista,
  buffPosicao,
  posicaoCorredor,
  buffAliadoInimigo,
  movimento,
};

function vantagemPista(corredor, pista) {
  if (corredor.vantagem == pista.tipo) {
    return 2;
  } else {
    return 0;
  }
}

function debuffPista(pista) {
  return pista.debuff;
}

function buffPosicao(pistaInicio, pistaNova, corredores, posicoesBuffs) {
  let corredoresAtt = [];
  let primeiroBuff = true;
  let indexCarro = 0;
  let buffsAtualizados = [];

  // loop para rodar uma vez por buff de pista
  posicoesBuffs.forEach((posi) => {
    let acumulaPosi = posi.acumulador;
    indexCarro = 0;

    // loop para fazer uma vez por posição na pista, do primeiro ao ultimo lugar
    pistaNova
      .slice()
      .reverse()
      .forEach((carroPista) => {
        //se for só um carro na posição entra aqui
        if (carroPista.length == 1) {
          //pegar infos do carro da posição
          if (primeiroBuff) {
            corredoresAtt[indexCarro] = corredores.find((item) => {
              return item.id == carroPista[0];
            });
          }

          const posicaoInicial = posicaoCorredor(
            corredoresAtt[indexCarro].id,
            pistaInicio
          );
          const posicaoFinal = posicaoCorredor(
            corredoresAtt[indexCarro].id,
            pistaNova
          );

          //verificar se passou pelo buff
          if (posicaoInicial < posi.posicao && posicaoFinal >= posi.posicao) {
            if (corredoresAtt[indexCarro].buffPosicao == 0) {
              corredoresAtt[indexCarro] = {
                id: corredoresAtt[indexCarro].id,
                idAliado: corredoresAtt[indexCarro].idAliado,
                idInimigo: corredoresAtt[indexCarro].idInimigo,
                buffPosicao: acumulaPosi,
              };
            } else {
              corredoresAtt[indexCarro] = {
                id: corredoresAtt[indexCarro].id,
                idAliado: corredoresAtt[indexCarro].idAliado,
                idInimigo: corredoresAtt[indexCarro].idInimigo,
                buffPosicao:
                  corredoresAtt[indexCarro].buffPosicao + acumulaPosi,
              };
            }
            acumulaPosi++;
          }

          indexCarro++;
        } else {
          let acum = null;

          //loop para ir uma vez pra cada carro na posicao
          carroPista.forEach((itemCarroPista) => {
            //pegar infos do carro da posição
            if (primeiroBuff) {
              corredoresAtt[indexCarro] = corredores.find((item) => {
                return item.id == itemCarroPista;
              });
            }

            const posicaoInicial = posicaoCorredor(
              corredoresAtt[indexCarro].id,
              pistaInicio
            );
            const posicaoFinal = posicaoCorredor(
              corredoresAtt[indexCarro].id,
              pistaNova
            );

            //verificar se passou pelo buff
            if (posicaoInicial < posi.posicao && posicaoFinal >= posi.posicao) {
              if (acum == null) {
                acum = acumulaPosi;
              }

              if (corredoresAtt[indexCarro].buffPosicao == 0) {
                corredoresAtt[indexCarro] = {
                  id: corredoresAtt[indexCarro].id,
                  idAliado: corredoresAtt[indexCarro].idAliado,
                  idInimigo: corredoresAtt[indexCarro].idInimigo,
                  buffPosicao: acum,
                };
              } else {
                corredoresAtt[indexCarro] = {
                  id: corredoresAtt[indexCarro].id,
                  idAliado: corredoresAtt[indexCarro].idAliado,
                  idInimigo: corredoresAtt[indexCarro].idInimigo,
                  buffPosicao: corredoresAtt[indexCarro].buffPosicao + acum,
                };
              }

              acumulaPosi++;
            }

            indexCarro++;
          });
          acum = null;
        }
      });

    buffsAtualizados = [
      ...buffsAtualizados,
      { posicao: posi.posicao, acumulador: acumulaPosi },
    ];

    primeiroBuff = false;
  });

  return { cors: corredoresAtt, buff: buffsAtualizados };
}

function posicaoCorredor(corredorId, pista) {
  return pista.findIndex((posicaoPista) => {
    if (posicaoPista) {
      if (
        posicaoPista.find((item) => {
          return corredorId == item;
        })
      ) {
        return true;
      }
    } else {
      return false;
    }
  });
}

function buffAliadoInimigo(corredor, pista) {
  const posicao = posicaoCorredor(corredor.id, pista);
  const posicaoAliado = posicaoCorredor(corredor.idAliado, pista);
  const posicaoInimigo = posicaoCorredor(corredor.idInimigo, pista);
  let modificador = 0;

  const diferencaAliado = posicao - posicaoAliado;
  const diferencaInimigo = posicao - posicaoInimigo;

  if (diferencaAliado <= 2 && diferencaAliado >= -2) {
    modificador++;
  }
  if (diferencaInimigo <= 2 && diferencaInimigo >= -2) {
    modificador--;
  }

  return modificador;
}

function movimento(
  corredores,
  corredoresArray,
  pistaInicio,
  pistaCorrida,
  turno
) {
  let pistaNova = [[]];
  corredores.forEach((corredor) => {
    const corredorVez = corredoresArray.find((corredorFind) => {
      return corredorFind.id == corredor.id;
    });
    const posicao = posicaoCorredor(corredor.id, pistaInicio);

    let atributo;
    if (turno <= 3) {
      atributo = "aceleracao";
    } else if (turno % 4 == 0) {
      atributo = "drift";
    } else {
      atributo = "velocidade";
    }

    let movimento =
      corredorVez[atributo] +
      vantagemPista(corredorVez, pistaCorrida) +
      debuffPista(pistaCorrida) +
      corredor.buffPosicao +
      buffAliadoInimigo(corredor, pistaInicio);

    if (
      movimento < 0 ||
      (corredorVez.id == 1 && pistaCorrida.tamanho <= movimento + posicao)
    ) {
      movimento = 0;
    }

    const novaPosicao = movimento + posicao;

    if (pistaNova[novaPosicao] == undefined) {
      pistaNova[novaPosicao] = [corredor.id];
    } else {
      pistaNova[novaPosicao] = [...pistaNova[novaPosicao], corredor.id];
    }
  });

  return pistaNova;
}

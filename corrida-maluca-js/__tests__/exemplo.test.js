import axios from "axios";
import {
  vantagemPista,
  debuffPista,
  buffPosicao,
  buffAliadoInimigo,
  movimento,
} from "../src/funcoes";
import { corrida } from "../src/index";

let pistasRaw;
let pistas;
let corredoresRaw;
let corredores;

beforeAll(async () => {
  pistasRaw = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/corrida-maluca/pistas.json"
  );
  pistas = pistasRaw.data;
  corredoresRaw = await axios.get(
    "https://gustavobuttenbender.github.io/gus.github/corrida-maluca/personagens.json"
  );
  corredores = corredoresRaw.data;
});

describe("Testes - Get", () => {
  it("Deve conseguir obter a pista corretamente", () => {
    const pistaEsperada = {
      id: 1,
      nome: "Himalaia",
      tipo: "MONTANHA",
      descricao:
        "Uma montanha nevada, os corredores devem dar uma volta inteira nela, como existe muita neve eles terão dificuldade em enxergar",
      tamanho: 30,
      debuff: -2,
      posicoesBuffs: [6, 17],
    };

    const pistaRecebida = pistas.find((item) => {
      return item.id == 1;
    });

    expect(pistaRecebida).toEqual(pistaEsperada);
  });

  it("Deve conseguir obter o corredor corretamente", () => {
    const corredorEsperado = {
      id: 1,
      nome: "Dick Vigarista",
      velocidade: 5,
      drift: 2,
      aceleracao: 4,
      vantagem: "CIRCUITO",
    };

    const corredorRecebido = corredores.find((item) => {
      return item.id == 1;
    });

    expect(corredorRecebido).toEqual(corredorEsperado);
  });
});

describe("Testes - Buffs", () => {
  it("Deve conseguir calcular a vantagem de tipo pista corretamente", () => {
    const vantagemEsperada = 2;

    const pista = pistas.find((item) => {
      return item.id == 2;
    });
    const corredor = corredores.find((item) => {
      return item.id == 1;
    });

    const vantagemRecebida = vantagemPista(corredor, pista);

    expect(vantagemRecebida).toEqual(vantagemEsperada);
  });

  it("Deve conseguir calcular o debuff de pista corretamente", () => {
    const vantagemEsperada = -3;

    const pista = pistas.find((item) => {
      return item.id == 8;
    });

    const vantagemRecebida = debuffPista(pista);

    expect(vantagemRecebida).toEqual(vantagemEsperada);
  });

  it("Deve conseguir calcular o buff de posição de pista para 3 corredores", () => {
    const corredoresEsperados = [
      { id: 1, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 2, idAliado: 0, idInimigo: 0, buffPosicao: 1 },
      { id: 3, idAliado: 0, idInimigo: 0, buffPosicao: 2 },
    ];

    const cor = [
      { id: 1, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 2, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 3, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
    ];

    let pistaInicial = [];
    pistaInicial[5] = [1, 2, 3];

    let pistaFinal = [];
    pistaFinal[7] = [3];
    pistaFinal[8] = [2];
    pistaFinal[9] = [1];

    const posicoesBuffs = [
      { posicao: 6, acumulador: 0 },
      { posicao: 17, acumulador: 0 },
    ];

    const retornoBuff = buffPosicao(
      pistaInicial,
      pistaFinal,
      cor,
      posicoesBuffs
    );

    const corredoresRecebidos = retornoBuff.cors;

    expect(corredoresRecebidos).toEqual(corredoresEsperados);
  });

  it("Deve conseguir calcular o buff de posição de pista para 2 corredores passando junto", () => {
    const corredoresEsperados = [
      { id: 1, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 2, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 3, idAliado: 0, idInimigo: 0, buffPosicao: 2 },
    ];

    const cor = [
      { id: 1, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 2, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 3, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
    ];

    let pistaInicial = [];
    pistaInicial[5] = [1, 2, 3];

    let pistaFinal = [];
    pistaFinal[7] = [3];
    pistaFinal[8] = [1, 2];

    const posicoesBuffs = [
      { posicao: 6, acumulador: 0 },
      { posicao: 17, acumulador: 0 },
    ];

    const retornoBuff = buffPosicao(
      pistaInicial,
      pistaFinal,
      cor,
      posicoesBuffs
    );

    const corredoresRecebidos = retornoBuff.cors;

    expect(corredoresRecebidos).toEqual(corredoresEsperados);
  });

  it("Deve conseguir calcular a próxima posição corretamente se estiver sob o buff de um aliado", () => {
    const modificadorEsperado = 1;

    const corredor = { id: 1, idAliado: 2, idInimigo: 0, buffPosicao: 0 };
    let pista = [];
    pista[5] = [1, 2, 3];

    const modificadorRecebido = buffAliadoInimigo(corredor, pista);

    expect(modificadorRecebido).toBe(modificadorEsperado);
  });

  it("Deve conseguir calcular a próxima posição corretamente se estiver sob o debuff de um inimigo", () => {
    const modificadorEsperado = -1;

    const corredor = { id: 1, idAliado: 0, idInimigo: 1, buffPosicao: 0 };
    let pista = [];
    pista[5] = [1, 2, 3];

    const modificadorRecebido = buffAliadoInimigo(corredor, pista);

    expect(modificadorRecebido).toBe(modificadorEsperado);
  });
});

describe("Testes - Corrida", () => {
  it("Deve conseguir completar uma corrida com um vencedor", () => {
    const vencedorEsperado = "ID do vencedor: 2";

    const cor = [
      { id: 2, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 3, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 4, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
    ];

    const vencedorRecebido = corrida(2, cor, pistas, corredores);

    expect(vencedorRecebido).toEqual(vencedorEsperado);
  });

  it("Deve conseguir criar corredor corretamente somente com aliado", () => {
    const vencedorEsperado = "ID do vencedor: 3";

    const cor = [
      { id: 2, idAliado: 3, idInimigo: 0, buffPosicao: 0 },
      { id: 3, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 4, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
    ];

    const vencedorRecebido = corrida(2, cor, pistas, corredores);

    expect(vencedorRecebido).toEqual(vencedorEsperado);
  });

  it("Deve conseguir criar corredor corretamente somente com inimigo", () => {
    const vencedorEsperado = "ID do vencedor: 2";

    const cor = [
      { id: 2, idAliado: 0, idInimigo: 3, buffPosicao: 0 },
      { id: 3, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 4, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
    ];

    const vencedorRecebido = corrida(2, cor, pistas, corredores);

    expect(vencedorRecebido).toEqual(vencedorEsperado);
  });

  it("Deve conseguir criar corredor corretamente com aliado e inimigo", () => {
    const vencedorEsperado = "ID do vencedor: 2";

    const cor = [
      { id: 2, idAliado: 3, idInimigo: 4, buffPosicao: 0 },
      { id: 3, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 4, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
    ];

    const vencedorRecebido = corrida(2, cor, pistas, corredores);

    expect(vencedorRecebido).toEqual(vencedorEsperado);
  });

  it("Deve conseguir calcular as novas posições corretamente de uma rodada para a próxima", () => {
    let pistaEsperada = [[], [2], [3], [4]];

    const cor = [
      { id: 2, idAliado: 0, idInimigo: 0, buffPosicao: 0 },
      { id: 3, idAliado: 0, idInimigo: 0, buffPosicao: 1 },
      { id: 4, idAliado: 0, idInimigo: 0, buffPosicao: 2 },
    ];

    const pistaInicio = [[2, 3, 4]];

    const pistaCorrida = {
      id: 2,
      nome: "F1",
      tipo: "CIRCUITO",
      descricao:
        "Um circuito de corrida feito para os carros mais rápidos, possui curvas muitos fechadas",
      tamanho: 20,
      debuff: -1,
      posicoesBuffs: [3, 12],
    };

    const pistaRecebida = movimento(
      cor,
      corredores,
      pistaInicio,
      pistaCorrida,
      4
    );

    expect(pistaRecebida).toEqual(pistaEsperada);
  });

  it("Deve impedir que corredor se mova negativamente mesmo se o calculo de velocidade seja negativo", () => {
    let pistaEsperada = [[], [4]];

    const cor = [{ id: 4, idAliado: 0, idInimigo: 0, buffPosicao: 0 }];

    const pistaInicio = [[], [4]];

    const pistaCorrida = {
      id: 4,
      nome: "Nova York",
      tipo: "CIDADE",
      descricao: "Uma cidade muito populosa, cuidado com os pedestres",
      tamanho: 30,
      debuff: -2,
      posicoesBuffs: [5, 18],
    };

    const pistaRecebida = movimento(
      cor,
      corredores,
      pistaInicio,
      pistaCorrida,
      1
    );

    expect(pistaRecebida).toEqual(pistaEsperada);
  });

  it("Deve impedir que o Dick Vigarista vença a corrida se estiver a uma rodada de ganhar", () => {
    let pistaEsperada = [[]];
    pistaEsperada[29] = [1];

    const cor = [{ id: 1, idAliado: 0, idInimigo: 0, buffPosicao: 0 }];

    let pistaInicio = [[]];
    pistaInicio[29] = [1];

    const pistaCorrida = {
      id: 4,
      nome: "Nova York",
      tipo: "CIDADE",
      descricao: "Uma cidade muito populosa, cuidado com os pedestres",
      tamanho: 30,
      debuff: -2,
      posicoesBuffs: [5, 18],
    };

    const pistaRecebida = movimento(
      cor,
      corredores,
      pistaInicio,
      pistaCorrida,
      10
    );

    expect(pistaRecebida).toEqual(pistaEsperada);
  });
});

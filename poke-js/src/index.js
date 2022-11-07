import pokemonsArray from "./pokemons.json";

function criarTreinador(nomeRecebido, idadeRecebida, pokemonInicial) {
  return {
    nome: nomeRecebido,
    idade: idadeRecebida,
    pokemons: [{ id: pokemonInicial, nivel: 1 }],
  };
}

function subindoNivel(poke) {
  const nivelNovo = poke.nivel + 1;
  const pokemonAtual = pokemonsArray.find((item) => {
    return item.id == poke.id;
  });

  if (pokemonAtual.evolucao.level <= nivelNovo) {
    return { id: pokemonAtual.evolucao.id, nivel: nivelNovo };
  } else {
    return { id: poke.id, nivel: nivelNovo };
  }
}

function capturarPokemon(treinador, pokemonNovo) {
  const pokemonsAtualizados = treinador.pokemons.map(subindoNivel);

  return {
    nome: treinador.nome,
    idade: treinador.idade,
    pokemons: [...pokemonsAtualizados, pokemonNovo],
  };
}

export { criarTreinador, subindoNivel, capturarPokemon };

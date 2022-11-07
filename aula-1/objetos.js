const pessoa = {
    nome: 'will',
    idade: 23,
    nomesCachorros: ['pipoca', 'leo'],
    outroInstrutor: {
        nome: 'gus'
    }

}
console.log(pessoa)

pessoa.nome = 'william'
console.log(pessoa.nome)

const atributo = 'nome'
console.log(pessoa[atributo])
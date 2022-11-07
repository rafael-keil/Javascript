const instrutores = ['gus', 'will', 'zanata', 'sergio']

function escreverInstrutor(indice) {
    console.log(instrutores[indice])
}

function imprimir() {
    console.log('estou repetindo')
}

function dizerOla() {
    console.log('Olá')
}

function escreverIteracao(iteracao) {
    console.log(iteracao)
}

function repetir(vezes, callback) {
    for (let i = 0; i < vezes; i++) {
        callback(i)
    }
}

// repetir(5, imprimir)
// repetir(3, dizerOla)
// repetir(4, escreverIteracao)
repetir(instrutores.length, escreverInstrutor)
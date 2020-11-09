// requisicao da funcao obterPessoas do service
const {
    obterPessoas
} = require('./service')

// o método reduce()executa uma função reducer (fornecida por você) para cada elemento do array, resultando num único valor de retorno
// criacao de um reduce proprio
Array.prototype.meuReduce = function (callback, valorInicial) {

    // inicializa a variavel valorFinal com o valorInicial fornecido pela funcao
    // utiliza um if ternario para verificar se o valor inicial fornecido nao é invalido
    // caso o valor seja invalido inicializa a variavel com o primeiro item do Array
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

    // utiliza um for convenvcional para iterar todos os elementos do Arry
    for (let index = 0; index <= this.length - 1; index++) {
        // armazena os valores de cada iteracao em na variavel valorFinal
        valorFinal = callback(valorFinal, this[index], this)
    }

    // retorna uma unica variavel que acumula os resultados de todas as iteracoes
    return valorFinal
}

// funcao principal que fara a chamada da funcao reduce e testara seu funcionamento
async function main() {
    try {
        // aguarda a requisicao do service
        // caso tenha sucesso retornara todos os personagens que possuem a no nome
        const {
            results
        } = await obterPessoas(`a`)

        // utiliza um map para retornar a altura de todos as pessoas do vetor results
        // utiliza o metodo parseInt() para que caso algum valor nao seja numerico ele seja convertido
        // o autor nesse caso queria utilizar peso, mas utilizou height que siginifica altura
        const pesos = results.map(item => parseInt(item.height))
        console.log('pesos', pesos)

        // exemplo de execucao de reduce
        // [20.2, 30.3, 40.5] = 0
        
        // a funcao é alimentada pelo acumulador, o valor atual, o index atual(opcional) e o array ao qual a funcao foi chamada(opcional)
        const total = pesos.reduce((anterior, proximo) => {
            return anterior + proximo
        }, 0)
        
        // Array de Arryas de nome
        const minhaLista = [
            ['Erick', 'Wendel'],
            ['NodeBR', 'Nerdzão']
        ]
        
        // utiliza o reduce implementado anteriormente
        const total = minhaLista.meuReduce((anterior, proximo) => {
                return anterior.concat(proximo)
            }, [])
            .join(', ')
        
        /*  concat cria um novo array unindo todos os elementos que foram passados como parâmetro, 
            na ordem dada, para cada argumento e seus elementos (se o elemento passado for um array).

            concat não altera a si mesmo ou a qualquer um dos argumentos passados, apenas providencia 
            um novo array contendo uma cópia de si mesmo e dos argumentos passados. Os elementos copiados são:
        
            * Referência aos objetos (e não o objeto): concat copia a referência aos objetos para o novo array. 
            Tanto o original quanto a cópia apontam para o mesmo objeto. Ou seja, se o objeto foi modificado, 
            tais mudanças serão visíveis no objeto original e no array.

            * Strings e numbers (diferente dos objetos String e Number): concat copia os valores de strings e 
            numbers para o novo array. Qualquer alteração no novo array não refletirá no original, e vice versa.

        */

        // o método join() junta todos os elementos de um array (ou um array-like object) em uma string e retorna esta string.
        // Sintaxe: arr.join([separador = ',']); por padrao os itens sao separados por virgula
        console.log('total', total)

    } catch (error) {
        // tratamento de erro
        console.error(`DEU RUIM`, error)
    }
}

// chamada da funcao main
main()
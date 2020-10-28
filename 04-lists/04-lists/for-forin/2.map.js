// faz a requisicao do service, que acessa a api
const service = require('./service')

// o construtor prototype permite adicionar novas propriedades e metodos ao objeto Array(), mas pode gerar problemas no codigo
// criacao de uma funcao de map personalizada (simula a execucao de um map)
/* O método map() invoca a função callback passada por argumento para cada elemento do Array 
e devolve um novo Array como resultado*/
// como funcoes sao objetos no JS podem ser passadas como parametros de outra funcao
Array.prototype.meuMap = function (callback) {

    // cria um novo array que sera retornado
    const novoArrayMapeado = []

    // itera todos os itens contidos no array por meio do indicador this, uma vez que eh um metodo do proprio array
    for (let indice = 0; indice <= this.length - 1; indice++) {
        // executa a funcao de callback para o item do array
        const resultado = callback(this[indice], indice)

        // adiciona o novo resultado da execucao da funcao de callback
        novoArrayMapeado.push(resultado)
    }

    // retorna um array contendo os resultados de cada execucao da funcao de callback nos itens do array
    return novoArrayMapeado;
}

//  funcao principal que fara a chamada do map criado e testara seu funcionamento
async function main() {
    try {
        // aguarda o retorno da requisicao do service
        // retornara todos os personagens que possuem a no nome
        const results = await service.obterPessoas(`a`)

        // criacao de um array vazio que contera os nomes dos personagens
        const names = []

        // o método forEach() executa uma dada função em cada elemento de um array.
        results.results.forEach(function (item) {
            // para cada item do array adiciona o seu nome no array de nomes
            names.push(item.name)
        })

        // o método map() invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado
        // desse modo teremos como resultado do map um array contendo os nomes de todos os objetos contidos no Array original 
        const names = results.results.map(function (pessoa) {
            // nesse casso a funcao passada eh uma funcao anonima que retorna o nome do objeto pessoa   
            return pessoa.name
        })

        // nesse trecho temos uma forma menos verbosa de executar o mesmo que a funcao anterior
        // uma arrow function eh passada e sua execucao retorna o atributo name do objeto pessoa
        const names = results.results.map((pessoa) => pessoa.name)
        
        // chamada do map construido anteriormente
        // nesse caso temos uma funcao anonima que retorna o atributo nome do objeto pessoa, de acordo com seu indice
        // esse inidice sera utilizado para iterar o Array
        const names = results.results.meuMap(function (pessoa, indice) {
            return `[${indice}]${pessoa.name}`
        })

        // imprime os resultados das funcoes
        console.log('names', names)

    } catch (error) {
        // tratamento de erro 
        console.error(`DEU RUIM`, error)
    }
}

// chamada da funcao main
main()
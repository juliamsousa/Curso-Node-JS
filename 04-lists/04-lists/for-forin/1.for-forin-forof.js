// importa o service queacessa a api de star wars
const service = require('./service')

async function main() {
    try {
        // busca pessoas com 'a' no nome por meio do service
        const result = await service.obterPessoas('a')
        // cria um vetor vazio que contera o nome das pessoas buscadas pela requisicao
        const names = []

        // comeca a contagem de tempo
        console.time('for')

        // for com estrutura convencional, percorrendo o array de acordo com seu tamanho
        for (let i = 0; i <= result.results.length - 1; i++) {
            // acessa cada pessoa no array resultante da requisicao do service
            const pessoa = result.results[i]
            // adiciona o nome da pessoa no array de nomes
            names.push(pessoa.name)
        }

        // finaliza a contagem de tempo e imprime no terminal
        console.timeEnd('for')

        // inicia outra contagem de tempo
        console.time('forin')

        // estrutura do forin
        // a variavel i eh incrementada a medida que o vetor eh percorrido
        for (let i in result.results) {
            // acessa cada pessoa no array resultante da requisicao do service
            const pessoa = result.results[i]
            // adiciona o nome da pessoa no array de nomes
            names.push(pessoa.name)
        }

        // finaliza a contagem de tempo
        console.timeEnd('forin')

        // inicia a contagem de tempo
        console.time('forof')

        // estrutura do forof
        // faz uma iteracao atraves de um objeto, de modo que a funcao fica menos verbosa
        // ja acessamos os dados da variavel de forma direta, nao eh necessario recever os dados em outra variavel
        for (pessoa of result.results) {
            // adiciona o nome da pessoa no array de nomes
            names.push(pessoa.name)
        }

        // finaliza a contagem de tempo
        console.timeEnd('forof')

        // imprime os nomes do array
        console.log(`names`, names)

    } catch (error) {
        // tratamento de algum erro da funcao ou da requisicao do service
        console.error(`error interno`, error)
    }
}

// chamada da funcao main
main()
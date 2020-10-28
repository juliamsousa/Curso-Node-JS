// Axios eh um cliente https baseado em promises para fazer requisicoes
// service.js funciona como servidor dos dados da api de star wars
// importacao do metodo get do axios
const {
    get
} = require('axios')

// url que sera buscada pela requisicao do axios
// é um site que fornece uma api com dados de personagens do star wars
const URL = `https://swapi.co/api/people`

async function obterPessoas(nome) {

    // passa a url base definida acima e faz a requisicao pedindo os dados no formato json
    const url = `${URL}/?search=${nome}&format=json`

    // a resposta espera o retorno da promise do axios que faz uma requisicao get para a url
    const result = await get(url)

    // mapeia os resultados da requisicao utilizando a funcao mapearPessoas
    return result.data.results.map(mapearPessoas)
}

// funcao utilizada no map que retorna os atributos de nome e altura das pessoas buscadas na api
function mapearPessoas(item) {
    return {
        nome: item.name,
        peso: item.height
    }
}

// exporta o modulo obterPessoas para que possa ser utlizado por outras aplicacoes
module.exports = {
    obterPessoas
}
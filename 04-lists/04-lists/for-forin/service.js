// Axios eh um cliente https baseado em promises para fazer requisicoes
// service.js funciona como servidor dos dados da api
// importacao do axios
const axios = require('axios')

// url que sera buscada pela requisicao do axios
// eh um site que fornece uma api com dados de personagens do star wars
const URL = `https://swapi.co/api/people`

// funcao assincrona que busca os dados da api utilizando como parametro o nome do personagem
// a api fornece todos os dados do personagem que contem o nome
async function obterPessoas(nome) {
    
    // passa a url base definida acima e faz a requisicao pedindo os dados no formato json
    const url = `${URL}/?search=${nome}&format=json`
    
    // a resposta espera o retorno da promise do axios que faz uma requisicao get para a url
    const response = await axios.get(url)
    
    // retorna os dados da resposta
    return response.data
}

// exporta o modulo para que possa ser utilizado por outras aplicacoes
// em JS funcoes tambem sao objetos, de modo que podem ser exportadas da maneira abaixo
module.exports = {
    obterPessoas
}

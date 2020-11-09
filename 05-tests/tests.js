// os testes são feitos utilizando a ferramenta mocha
// o assert é pré-definida do node e funciona de forma semelhante ao c++
// instalando o mocha de forma global: npm install -g mocha
// instalando como dependencia de desenvolvimento: npm install --save-dev mocha
// quando publicamos alguma aplicacao nao instalamos os pacotes de testes, por isso só fica salvo na parte de desenvolvimento
// eses testes validam as entradas e saidas da nossa api

// importacao do assert
const assert = require('assert')
// importacao da funcao obterPessoas de service
const {
    obterPessoas
} = require('./service')

/* nock: uma biblioteca do Node que intercepta requisições e permite responder a elas como você deseja, 
incluindo o envio de respostas automáticas com códigos e payloads. */

// instalamos o pacote nock, para simular requisicoes
// permite fazer testes unitarios da api
const nock = require('nock')

// iniciamos o mocha com o describe e criamos a suit de testes
describe('Star Wars Tests', function () {
    // beforeAll define que esse trecho do código será executado antes de tudo
    this.beforeAll(() => {
        // simula um aresposta do servidor da api de star wars
        // isso é feito para que nao seja necessario acessar a api para todo teste qie for feito
        const response = {
            count: 1,
            next: null,
            previous: null,
            results: [{
                name: 'R2-D2',
                height: '96',
                mass: '32',
                hair_color: 'n/a',
                skin_color: 'white, blue',
                eye_color: 'red',
                birth_year: '33BBY',
                gender: 'n/a',
                homeworld: 'https://swapi.co/api/planets/8/',
                vehicles: [],
                starships: [],
                created: '2014-12-10T15:11:50.376000Z',
                edited: '2014-12-20T21:17:50.311000Z',
                url: 'https://swapi.co/api/people/3/'
            }]
        }

        // o nock simula uma requisicao e traz uma resposta automatica para ele
        // desse modo a requisicao é respondida pelo nock e nao pelo servidor
        // com isso reduzimos o tempo dos nossos testes
        nock('https://swapi.co/api/people')
            .get('/?search=r2-d2&format=json')
            .reply(200, response)
    })

    // subsuit, o teste que deve rodar propriamente dito
    it('deve buscar o r2d2 com o formato correto', async () => {

        // estado esperado
        const expected = [{
            nome: 'R2-D2',
            peso: '96'
        }]

        // utiliza o nomeBase para pesquisa
        const nomeBase = `r2-d2`
        // faz a requisicao do nome r2-d2
        const resultado = await obterPessoas(nomeBase)
        // faz a assercao se o resultado que vem da requisicao é igual ao resultado esperado
        // assert.deepEqual(resultadoAtual, resultadoEsperado) verifica se os resultados são iguais
        assert.deepEqual(resultado, expected)
    })
})
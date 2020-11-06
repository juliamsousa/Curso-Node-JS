// importa o assert 
const assert = require('assert')
// importa a api criada
const api = require('./../api')

// variaveis criadas para serem utilizadas nos testes
let app = {}
let MOCK_ID = ""

// funcao que injeta codigo
function cadastrar() {
    return app.inject({
        method: 'POST',
        url: '/herois',
        payload: {
            nome: 'Flash',
            poder: 'Velocidade'
        }
    });
}

// criacao da suite principal de testes da API Herois
describe.only('API Heroes test suite', function ()  {
    // para podermos utilizar o this nesse contexto temos que utilizar function
    // caso utilizassemos uma arrow function perderiamos o contexto
    
    // executa as funcoes antes de tudo para realizar os testes
    this.beforeAll(async () => {
        this.timeout(Infinity)
        // aguarda a API(servidor) ser inicializada
        app = await api

        const result = await cadastrar()
        
        MOCK_ID = JSON.parse(result.payload)._id
    })

    // testa a funcao listar na rota /herois
    it('listar /heroes', async () => {
        // injeta uma rota, simulando a acao do ususario
        // insere na nossa rota o metodo get da url /herois
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        // retorna o codigo de status da requisicao
        const statusCode = result.statusCode 
        
        // verifica se o codigo de status é de sucesso
        assert.deepEqual(statusCode, 200)

        // verifica se o retorno da nossa requisicao é um Array
        // o ideal é ter apenas uma assrcao por suite
        assert.ok(Array.isArray(JSON.parse(result.payload)))
    })

    it('cadastrar /herois', async () => {
        const result = await cadastrar()
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).nome, "Flash")

    })

    it('não deve cadastrar com payload errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: {
                NAME: 'Flash'
            }
        })
        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 400)
        assert.ok(payload.message.search('"nome" is required') !== -1)
    })
    it('atualizar /herois/{id}', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${MOCK_ID}`,
            payload: {
                nome: 'Canário Negro',
                poder: 'Grito'
            }
        })
        assert.deepEqual(result.statusCode, 200) 
        assert.deepEqual(JSON.parse(result.payload).nModified, 1)

    })
})
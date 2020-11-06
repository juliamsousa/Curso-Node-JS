// importa o assert
const assert = require('assert')
// importa a estrategia do mongodb
const MongoDb = require('./../src/db/strategies/mongodb/mongoDbStrategy')
// importa o esquema do mongodb
const HeroSchema = require('./../src/db/strategies/mongodb/schemas/heroSchema')
// importa o contexto(handler)
const Context = require('./../src/db/strategies/base/contextStrategy')

// 1o alterar criar pasta mongodb
// 2o mover mongodbStrategy para mongodb
// 3o modificar classe do mongodbStrategy
// 4o modificar criar schema em mongodb/schemas
// 6o modificar teste fazendo conexão direto do MongoDB
// 5o modificar teste passando para o MongoDB

// cria um heroi padrao para testes
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
};

// cria um heroi padrao para testes
const MOCK_HEROI_ATUALIZAR = {
    nome: 'Mulher Maravilha',
    poder: 'força'
};

// variavel para armazenar o id de um heroi para o teste do update
let MOCK_HEROI_ATUALIZAR_ID = '';
// cria um context para que possa ser reinstanciado
let context = {}

// cria a suite de testes principal
describe('MongoDB Suite de testes', function () {
    // executa os comandos primeiramente para que possam ser testado
    this.beforeAll(async () => {
        // cria uma conexao para o banco
        const connection = MongoDb.connect()
        // cria um novo contexto com implementacao do mongodb e esquemade herois
        context = new Context(new MongoDb(connection, HeroSchema))
        // cria um heroi
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        // armazena o id do heroi criado para que possa ser utilizado nos testes
        MOCK_HEROI_ATUALIZAR_ID = result._id
    })

    // subsuit de testes para verificar a conexao do banco
    it('verificar conexao', async () => {
        // armazena o resultado da funcao de conexao do banco
        const result = await context.isConnected()
        // definicao do estado esperado
        const expected = 'Conectado'
        // assert do estado resultante e do estado esperado
        assert.deepEqual(result, expected)
    })

    // subsuit de testes para verificar a funcao de cadastrar
    it('cadastrar', async () => {
        // usa a desconstrucao para pegar os atributos nome, poder
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        // como nome: nome e poder: poder possuem mesmo nome a associacao já é feita automaticamente
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })

    //  subsuit de testes para verificar a funcao de listar
    it('listar', async () => {
        // utiliza a desconstrucao para pegar a primeira posicao e os dados nome, poder dessa primeira posicao
        const [{ nome, poder}] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome})
        // cria um objeto com nome e poder vindos do context.read
        const result = {
            nome, poder
        }
        // faz o assert do resultado e do heroi padrao de teste
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    // subsuit de testes para verificar a funcao atualizar
    it('atualizar', async () => {
        // atualiza um heroi pelo seu id
        const result = await context.update(MOCK_HEROI_ATUALIZAR_ID, {
            poder: 'Laço'
        })
        // verifica se a atualizacao retorna valor true
        assert.deepEqual(result.nModified, 1)
    })

    // subsuit de testes para verificar a funcao de remover
    it('remover', async () => {
        // apaga um heroi
        const result = await context.delete(MOCK_HEROI_ATUALIZAR_ID)
        // verifica se a exclusao retorna valor true
        assert.deepEqual(result.n, 1)
    })
})
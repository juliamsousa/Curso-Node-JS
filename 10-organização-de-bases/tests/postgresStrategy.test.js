// npm i--save-dev mocha
// instala a dependencia mocha para o contexto de testes
// deve ser rodado com o mocha e nao npm
// mocha -w postgresStrategy.test.js para que execute aguardando as atualizacoes

// importacao dos elementos de testes de assert
const { equal, deepEqual, ok } = require('assert');
// importacao da estrategia do postgre
const PostgresStrategy = require('../src/db/strategies/postgres/postgresSQLStrategy');
// faz a importacao do esquema de herois
const HeroiSchema = require('../src/db/strategies/postgres/schemas/heroiSchema');
// faz a importacao do context
const Context = require('../src/db/strategies/base/contextStrategy');

// criacao de objetos padroes para testes
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flechas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Mulher Gavião', poder: 'grito' };

// 1o criar pasta postgres
// 2o criar schema heroiSchema
// 3o alterar classe postgres
  // constructor
  // defineModel
  // isConnected
  // connection
  // alterar _herois para _schema

// 4o alterar teste
  //adicionar connect
  // adicionar defineModel
  // adicionar context
// testar

// cria uma variavel context para que possa ser reinstanciada
let context = {}

// descricao da suite de testes
describe('PostgreSQL Strategy', function() {
  // como o banco de dados pode demorar a conectar tira o timeout
  this.timeout(Infinity);

  // executa as funcoes antes de executar os testes
  this.beforeAll(async () => {
    // cria uma conexao para o banco
    const connection = await PostgresStrategy.connect()
    // cria um model para o banco de dados
    const model = await PostgresStrategy.defineModel(connection, HeroiSchema)
    // cria um ocntext com estrategia de postgres e esquema de herois
    context = new Context(new PostgresStrategy(connection, model));
    
    // apaga o banco de dados inteiro
    await context.delete();
    // cadastra herois padrao para os testes
    await context.create(MOCK_HEROI_CADASTRAR);
    await context.create(MOCK_HEROI_ATUALIZAR);
  });

  // subsuit de testes para verificar a conexao do banco
  it('PostgresSQL connection', async () => {
    const result = await context.isConnected();

    // definicao do estado esperado
    const expected = 'Conectado'

    // assert do estado resultante e do estado esperado
    deepEqual(result, expected)
    // equal(result, true);
  });

  // subsuit de teste da funcao de cadastrar
  it('cadastrar', async () => {
    // chamada da funcao de cadastrar com o objeto padrao
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    // apaga o campo id para que o objeto tenha os mesmos campos que o MOCK_HEROI_CADASTRAR
    delete result.dataValues.id;
    // verifica se o resultado obtido é igual ao resultado esperado
    deepEqual(result.dataValues, MOCK_HEROI_CADASTRAR);
  });


  // subsuit de teste da funcao de listar
  it('listar', async () => {
    // chamada da funcao de ler com o objeto padrao
    // desestruturacao para pegar um unico objeto
    const [result] = await context.read(MOCK_HEROI_CADASTRAR);
    // apaga o campo id para que o objeto tenha os mesmos campos que o MOCK_HEROI_CADASTRAR
    delete result.id;
    // verifica se o resultado obtido é igual ao resultado esperad
    deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  // subsuit de teste da funcao de atualizar
  it('atualizar', async () => {
    // chamada da funcao de ler, como nenhum parametro foi passado fara a leitura de todos os dados
    // utiliza desconstrucao para ler apenas o primeiro item retornado
    const [result] = await context.read({});

    // cria um novo item com os dados atualizados
    // utiliza rest/spread para fazer o merge/separacao de objetos
    const novoItem = {
      // utiliza a funcao rest para armazenar os outros parametros do objeto
      // pega todas as chaves do item e coloca-as no mesmo nivel
      ...MOCK_HEROI_CADASTRAR,
      // altera apenas o atributo nome
      nome: 'Mulher Maravilha',
    };

    // adiciona o novo item
    const [update] = await context.update(result.id, novoItem);
    // update retorna o status de sucesso 0/1
    deepEqual(update, 1);
  });

  // subsuit de teste da funcao de remover
  it('remover', async () => {
    // le o primeiro item do banco de dados
    const [item] = await context.read({});
    // apaga o item pelo seu id
    const result = await context.delete(item.id);
    // verifica se o retorno de sucesso é true
    // retorna a quantidade de item deletados
    deepEqual(result, 1);
  });
});

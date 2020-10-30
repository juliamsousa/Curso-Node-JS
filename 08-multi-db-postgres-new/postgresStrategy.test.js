// npm i--save-dev mocha
// instala a dependencia mocha para o contexto de testes

// importacao dos elementos de testes de assert
const { equal, deepEqual, ok } = require('assert');
// importacao da estrategia do postgre
const PostgresStrategy = require('./src/db/strategies/postgresStrategy');
// faz a importacao do context
const Context = require('./src/db/strategies/base/contextStrategy');

// criacao de objetos padroes para testes
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Mulher Gavião', poder: 'grito' };

// cria um novo banco com estrategia do postgres
const context = new Context(new PostgresStrategy());

// descricao da suite de testes
describe('PostgreSQL Strategy', function() {
  // como o banco de dados pode demorar a conectar tira o timeout
  this.timeout(Infinity);

  // // executa as funcoes antes de executar os testes
  // before(async () => {
  //   await context.delete();
  //   await context.create(MOCK_HEROI_CADASTRAR);
  //   await context.create(MOCK_HEROI_ATUALIZAR);
  // });

  // subsuit de testes para verificar a conexao do banco
  it('PostgresSQL connection', async () => {
    // chamda da funcao de conexao do banco
    const result = await context.isConnected();

    // verifica se o retorno de sucesso da funao é true
    equal(result, 1);
  });

  // // subsuit de teste da funcao de cadastrar
  // it('cadastrar', async () => {
  //   // chamada da funcao de cadastrar com o objeto padrao
  //   const result = await context.create(MOCK_HEROI_CADASTRAR);

  //   // apaga o campo id 
  //   delete result.dataValues.id;
    
  //   deepEqual(result.dataValues, MOCK_HEROI_CADASTRAR);
  // });

  // // subsuit de teste da funcao de listar
  // it('listar', async () => {
  //   // chamada da funcao de ler com o objeto padrao
  //   const [result] = await context.read(MOCK_HEROI_CADASTRAR);
  //   delete result.id;
  //   deepEqual(result, MOCK_HEROI_CADASTRAR);
  // });

  // // subsuit de teste da funcao de atualizar
  // it('atualizar', async () => {
  //   // chamada da funcao de ler, como nehum parametro foi passado fara a leitura de todos os dados
  //   const [result] = await context.read({});

  //   const novoItem = {
  //     // utiliza a funcao rest para armazenar os outros parametros do objeto
  //     ...MOCK_HEROI_CADASTRAR,

  //     // altera apenas os atributo nome
  //     nome: 'Mulher Maravilha',
  //   };

  //   // adiciona o novo item
  //   const [update] = await context.update(result.id, novoItem);

  //   deepEqual(update, 1);
  // });

  // // subsuit de teste da funcao de remover
  // it('remover', async () => {
  //   const [item] = await context.read({});
  //   const result = await context.delete(item.id);
  //   deepEqual(result, 1);
  // });
});

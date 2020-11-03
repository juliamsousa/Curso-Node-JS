// npm i--save-dev mocha
// instala a dependencia mocha para o contexto de testes
// deve ser rodado com o mocha e nao npm
// mocha -w postgresStrategy.test.js para que execute aguardando as atualizacoes

// importacao dos elementos de testes de assert
const { equal, deepEqual, ok } = require('assert');
// importacao da estrategia do postgre
const PostgresStrategy = require('./src/db/strategies/postgresStrategy');
// faz a importacao do context
const Context = require('./src/db/strategies/base/contextStrategy');

// criacao de objetos padroes para testes
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flechas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Mulher Gavião', poder: 'grito' };

// cria um novo banco com estrategia do postgres
const context = new Context(new PostgresStrategy());

// descricao da suite de testes
describe('PostgreSQL Strategy', function() {
  // como o banco de dados pode demorar a conectar tira o timeout
  this.timeout(Infinity);

  // executa as funcoes antes de executar os testes
  this.beforeAll(async () => {
    // apaga a base inteira
    await context.delete();
    await context.create(MOCK_HEROI_CADASTRAR);
    await context.create(MOCK_HEROI_ATUALIZAR);
  });

  // subsuit de testes para verificar a conexao do banco
  it('PostgresSQL connection', async () => {
    // chamda da funcao de conexao do banco
    const result = await context.isConnected();

    // verifica se o retorno de sucesso da funcao é true
    equal(result, 1);
  });

  // subsuit de teste da funcao de cadastrar
  it('cadastrar', async () => {
    // chamada da funcao de cadastrar com o objeto padrao
    const result = await context.create(MOCK_HEROI_CADASTRAR);

    // apaga o campo id para que o objeto tenha os mesmos campos que o MOCK_HEROI_CADASTRAR
    delete result.id;
    
    // verifica se o resultado obtido é igual ao resultado esperado
    deepEqual (result, MOCK_HEROI_CADASTRAR);
  });

  // // subsuit de teste da funcao de listar
  it('listar', async () => {
    // chamada da funcao de ler com o objeto padrao
    // desestruturacao para pegar um unico objeto
    const [result] = await context.read(MOCK_HEROI_CADASTRAR);

    // apaga o campo id para que o objeto tenha os mesmos campos que o MOCK_HEROI_CADASTRAR
    delete result.id;

    // verifica se o resultado obtido é igual ao resultado esperado
    deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  // subsuit de teste da funcao de atualizar
  it('atualizar', async () => {
    // chamada da funcao de ler, como nenhum parametro foi passado fara a leitura de todos os dados
    // utiliza desconstrucao para ler apenas o primeiro item retornado
    const [itemAtualizar] = await context.read({});

    // cria um novo item com os dados atualizados
    // utiliza rest/spread para fazer o merge/separacao de objetos
    const novoItem = {
      // utiliza a funcao rest para armazenar os outros parametros do objeto
      // pega todas as chaves do item e coloca-as no mesmo nivel
      ...MOCK_HEROI_ATUALIZAR,

      // altera apenas o atributo nome
      nome: 'Mulher Maravilha',
    };

    // adiciona o novo item
    const [update] = await context.update(itemAtualizar.id, novoItem);

    // busca o item atualizado para fazer as comparacoes
    const [itemAtualizado] = await context.read({id : itemAtualizar.id})

    // update retorna o status de sucesso 0/1
    // nao é boa pratica utilizar varios asserts em uma mesma suit
    deepEqual(update, 1);
    deepEqual(itemAtualizado.nome, novoItem.nome);
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

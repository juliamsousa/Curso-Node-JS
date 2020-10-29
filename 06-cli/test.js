// instalar o mocha como dependencia de desenvolvimento
// executar npm -w test.js para que atualize com as modificacoes do arquivo

// requisicao do deepEqual e do ok do assert
// o ok verifica se o valor é diferente de NULL
// o deepEqual verifica se os dados são exataemnte iguais
const { deepEqual, ok } = require('assert');
// requerimento do banco de dados
const Database = require('./database');
// criando um heroi padrao para fazer os testes de cadastrar 
const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'speed', id: 1 };
// criando um heroi padrao para fazer os testes de atualizar
const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Lanterna Verde',
  poder: 'Anel do poder',
  id: 2,
};

// criando uma suite de testes
describe('Suite de manipulação de herois', () => {
  // faz com que executem antes de todos os testes pois a ordem de execucao pode dar problemas
  before(async () => {
    await Database.remover();
    await Database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    await Database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });

  // subsuit de teste do cadastro de um heroi
  it('deve cadastrar um heroi', async () => {
    // resultado esperado
    const expected = DEFAULT_ITEM_CADASTRAR;

    // processamento
    // cadastra o heroi default no banco de dados
    await Database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    // procura o heroi cadastrado no banco de dados
    const [realResult] = await Database.listar(expected.id);

    // asserção do resultado obtido e do resultado esperado
    deepEqual(realResult, expected);
  });
  
  // subsuit de teste da listagem de um heroi
  it('deve listar um heroi pelo id', async () => {
    // resultado esperado
    const expected = DEFAULT_ITEM_CADASTRAR;

    // resultado recebido do banco de dados
    // lista o heroi com id===1
    const result = await Database.listar(1);

    // asserção do resultado obtido e do resultado esperado
    deepEqual(result[0], expected);
  });

  // subsuit de teste da atualização de um heroi
  it('deve atualizar um heroi pelo id', async () => {
    // definicao do resultado esperado
    // utiliza o rest para separar os dados que nao são importantes para o teste      
    // nome e poder sao armazenados em atributos especificos e o resto dos atributos do objeto sao armazenados em ...DEFAULT_ITEM_ATUALIZAR, 
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'ricão',
    };

    // atualiza o nome e o poder de um heroi de acordo com seu id
    await Database.atualizar(expected.id, {
      nome: expected.nome,
      poder: expected.poder,
    });

    // busca o heroi no banco apos sua atualizacao
    const [realResult] = await Database.listar(expected.id);

    // asserção do resultado obtido e do resultado esperado
    deepEqual(realResult, expected);
  });

  // subsuit de teste da atualização de um heroi
  it('deve remover um heroi pelo id', async () =>{
    // definicao do resultado esperado
    const expected = true;

    // chamda da funcao de remover
    const resultado = await Database.remover(DEFAULT_ITEM_CADASTRAR.id)
    
    // assercao do resultado obtido e do resultado esperado
    deepEqual(resultado, expected)
  })
});

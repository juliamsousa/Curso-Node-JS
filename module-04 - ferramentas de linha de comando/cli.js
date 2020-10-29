// CLI - Command Line Interface
// o commander permite que criemos comandos para a linha de comandos

// importacao do commander
const commander = require('commander');
// importacao da classe Heroi para que manipulemos os dados advindos da linha de comando
const Heroi = require('./heroi');
// importacao do banco de dados para que manipulemos os dados do banco
const Database = require('./database');

(async () => {
  /**
   * node cli.js --help
   */
  commander
    // informacao da versao
    .version('v1')
    .option('-n, --nome [value]', 'adicionar nome')
    .option('-p, --poder [value]', 'adicionar poder')
    //CRUD
    .option('-c, --cadastrar', 'cadastrar Heroi')
    .option('-r, --listar [value]', 'listar herois pelo id')
    .option('-u, --atualizar [value]', 'atualizar heroi pelo id')
    .option('-d, --remover [value]', 'remover heroi pelo id')
    .parse(process.argv);

  // cria um novo heroi com os dados vindos do commander
  // como a classe apresenta apenas alguns atributos, ignora os atributos restantes vindos do objeto commander
  const heroi = new Heroi(commander);

  try {
    /**
     * node cli.js --cadastrar params...
     * node cli.js -c -n Hulk -p Forca
     */
    if (commander.cadastrar) {
      // cadastra o heroi advindo da linha de comando
      await Database.cadastrar(heroi);

      // mensagem de sucesso no cadastro
      console.log('item cadastrado com sucesso!');
      
      // finaliza a funcao
      return;
    }

    /**
     * node cli.js --listar
     * node cli.js -r
     * node cli.js -r 1
     */
    if (commander.listar) {
      // recebe um id do commander
      const id = commander.listar;
      
      // busca o heroi no banco pelo seu id
      const result = await Database.listar(id);

      // imprime o resultado no console
      console.log(result);
      
      // finaliza a funcao
      return;
    }

    /**
     * node cli.js --atualizar
     * node cli.js -u 1 -n papa
     * node cli.js -u 1 -n thor -p trovao
     */
    if (commander.atualizar) {
      // armazena a id recebida do commander
      const id = commander.atualizar;
      console.log('id', id);

      // atualiza o heroi no banco de dados pelo id recebido
      await Database.atualizar(id, heroi);

      // mensagem de sucesso
      console.log('item atualizado com sucesso!');
      
      // finaloza a funcao
      return;
    }
    /**
     * node cli.js --remover
     * node cli.js -d 1
     */
    if (commander.remover) {
      // armazena a id recebida do commander
      const id = commander.remover;

      // remove o item do banco de dados pelo id
      await Database.remover(id);

      // mensagem de sucesso
      console.log('item removido com sucesso!');
      
      // finaliza a funcao
      return;
    }
  } catch (error) {
    // tratamento de erro
    console.error('DEU RUIM', error);

    // finaliza a funcao
    return;
  }
})();

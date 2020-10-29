// fs = file system permite leitura/escrita em arquivos
const { writeFile, readFile } = require('fs');

// transforma uma funcao em Promise
const { promisify } = require('util');

// transforma as funcoes de ler e escrever em arquivo em promises
const [writeFileAsync, readFileAsync] = [
  promisify(writeFile),
  promisify(readFile),
];

class Database {
  constructor() {
    // arquivo que simula o banco de dados
    this.FILENAME = 'heroes.json';
  }

  // funcao aync para obter o Arquivo do banco de dados
  async obterArquivo() {
    // faz a leitura do arquivo definido no banco de dados
    const arquivo = await readFileAsync(this.FILENAME);

    // transforma o retorno em String pois vem no formato buffer
    return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados) {
    // salva os dados passados no banco de dados na forma de string
    await writeFileAsync(this.FILENAME, JSON.stringify(dados));

    // retorna true se tudo der certo
    return true;
  }

  async cadastrar(heroi) {
    // obtem todos os dados do arquivo
    const dados = await this.obterArquivo();

    //workaround para simular um id
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    
    // concatena os dados do heroi por meio do rest
    const heroiComId = {
      ...heroi,
      id,
    };

    // escreve os dados do heroi no arquivo
    // concatena o array anterior com o heroi a ser cadastrado em um array
    return await this.escreverArquivo([...dados, heroiComId]);
  }

  // funcao async para Listar dados do banco de acordo com seu id
  async listar(id) {
    // chamada da funcao que obtem os dados do Banco
    const dados = await this.obterArquivo();

    // utiliza um filter para trazer um unico dado de acordo com seu id
    // pelo if ternario se nao passar o id, traz tudo
    return dados.filter(item => (id ? item.id == id : true));
  }

  async atualizar(id, atualizacoes) {
    // obtem os dados do banco de dados
    const dados = await this.obterArquivo();

    // verifica se existe algum item com o id passado
    const indice = dados.findIndex(item => item.id === parseInt(id));

    // caso o indice === -1 siginifica que não há nehum item com esse id
    // essa verificacao nao pode ser feita por false pois se o id === 0 sera lido como false
    if (indice === -1) {
      throw Error('heroi não existe!');
    }

    // acessa o item a ser removido pelo indice
    const atual = dados[indice];

    /**
     * o método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
     * nesse caso remove 1 elemento do indice===indice
     */
    dados.splice(indice, 1);

    //workaround para remover valores undefined do objeto
    const objAtualizado = JSON.parse(JSON.stringify(atualizacoes));
    const dadoAtualizado = Object.assign({}, atual, objAtualizado);

    // reinsere os dados antigos mais as modificacoes
    return await this.escreverArquivo([...dados, dadoAtualizado]);
  }

  async remover(id) {
    // caso nehum id seja passado apaga todos os dados do banco de dados
    if (!id) {
      // escreve um array vazio na base de dados
      await this.escreverArquivo([]);
      return true;
    }

    // obtemos dados do arquivo da base de dados
    const dados = await this.obterArquivo();

    // verifica se o id do item é o id procurado
    const indice = dados.findIndex(item => item.id === parseInt(id));
    
    // caso o indice === -1 siginifica que não há nehum item com esse id
    // essa verificacao nao pode ser feita por false pois se o id === 0 sera lido como false
    if (indice === -1) {
      // tratamento de erro
      throw Error('heroi não existe!');
    }

    // acessa o item a ser removido pelo indice
    const atual = dados[indice];
    
    /**
     * o método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
     * nesse caso remove 1 elemento do indice===indice
     */

    dados.splice(indice, 1);
    
    // reinsere o Array com o elemento removido no arquivo de banco de dados
    await this.escreverArquivo(dados);
    
    // retorna true caso tudo de certo
    return true;
  }
}

module.exports = new Database();

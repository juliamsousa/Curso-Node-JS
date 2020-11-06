// faz o require da interface
const IDb = require('./interfaceDb');

// classe que funnciona como handler
class ContextStrategy extends IDb {
  // construtor da classe 
  constructor(database) {
    super();
    this._database = database;
  }

  // chama o metodo de verificar conexao implementado pelo banco de dados
  isConnected() {
    return this._database.isConnected();
  }

  // chama o metodo de conectar implementado pelo banco de dados
  connect() {
    return this._database.connect()
  }

  // chama o metodo de criar um item implementado pelo banco de dados
  create(item) {
    return this._database.create(item);
  }

  // chama o metodo de ler um item implementado pelo banco de dados
  read(item) {
    return this._database.read(item);
  }

  // chama o metodo de atualizar um item implementado pelo banco de dados
  update(id, item) {
    return this._database.update(id, item);
  }

  // chama o metodo de apagar um item implementado pelo banco de dados
  delete(id) {
    return this._database.delete(id);
  }
}

module.exports = ContextStrategy;

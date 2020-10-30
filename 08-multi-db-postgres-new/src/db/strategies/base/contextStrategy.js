// na pasta base temos tudo que é comum, que é base para nossas estrategias
const IDb = require('./interfaceDb');

// a strategy funciona como forma de handler
class ContextStrategy extends IDb {
  constructor(database) {
    // construtor da classe que chama o construtor da classe mae
    super();
    // o construtor recebe o banco de dados que implementara os metodos da "interface"
    // desse modo podemos implementar estrategias diferentes de bancos de dados
    this._database = database;
  }

  // chama o metodo create implementado pelo db
  create(item) {
    return this._database.create(item);
  }

  // chama o metodo read implementado pelo db
  read(item) {
    return this._database.read(item);
  }

  // chama o metodo update implementado pelo db
  update(id, item) {
    return this._database.update(id, item);
  }

  // chama o metodo delete implementado pelo db
  delete(id) {
    return this._database.delete(id, item);
  }

  // chama o metodo isConnected implementado pelo db
  isConnected (){
    return this._database.isConnected();
  }
}

// de modo analogo a poo o module.exports funciona como uma public class
module.exports = ContextStrategy;

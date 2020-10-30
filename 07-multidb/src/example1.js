// no javascript é possivel criar classes de erros que estendem a classe error
// limitacao do javascript: nao temos interfaces, como no caso de c++ que temos metodos abstratos
// nessa implemetacao é utilizada a design pattern strategy que é extremamente voltada para poo
// foi criada pela gang of four
// neste codigo temos tudo que foi criado, a base e as estrategias, mas foram separados na pasta src/db 
class NotImplementedException extends Error {
  constructor() {
    super('Not Implemented Exception');
  }
}

// simulacao de uma interface de crud
// esses metodos funcionam como metodos abstratos puros pois nao estao implementados
class ICrud {
  // simula o prototipo de uma funcao abstrata pura (function() = 0)
  create(item) {
    throw new NotImplementedException();
  }

  // simula o prototipo de uma funcao abstrata pura (function() = 0)
  read(item) {
    throw new NotImplementedException();
  }

  // simula o prototipo de uma funcao abstrata pura (function() = 0)
  update(id, item) {
    throw new NotImplementedException();
  }

  // simula o prototipo de uma funcao abstrata pura (function() = 0)
  delete(id) {
    throw new NotImplementedException();
  }
}

// classe concreta do strategy
class MongoDBStrategy extends ICrud {
  // por padrao no mongodb sempre que criamos uma classe temos que chamar o construtor da classe mae
  constructor() {
    super();
  }

  // simula a execucao do banco
  create(item) {
    console.log('MongoDBStrategy');
  }
}

// classe concreta do strategy
class PostgreSQLStrategy extends ICrud {
  // por padrao no mongodb sempre que criamos uma classe temos que chamar o construtor da classe mae
  constructor() {
    super();
  }

  // simula a execucao do banco
  create(item) {
    console.log('PostgreSQLStrategy');
  }
}

// a strategy funciona como forma de handler
class ContextoStrategy extends ICrud {
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
}

// instanciacao de uma strategy que recebe um mongodbstrategy
const contextMongo = new ContextoStrategy(new MongoDBStrategy());
// teste da funcao create implementada pelo mongodb
contextMongo.create();

// instanciacao de uma strategy que recebe um postgresstrategy
const context = new ContextoStrategy(new PostgreSQLStrategy());
// teste da funcao create implementada pelo postgresstrategy
context.create();

// teste da funcao read do postgresstrategy
// nesse caso a funcao esta acessivel devido a 'interface' mas fara o throw de uma exceccao pois nao esta implementada
context.read();
// na pasta base temos tudo que é comum, que é base para nossas estrategias

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
class IDb {
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
  delete(id, item) {
    throw new NotImplementedException();
  }

  isConnected() {
    return new NotImplementedException();
  }
}

module.exports = IDb;

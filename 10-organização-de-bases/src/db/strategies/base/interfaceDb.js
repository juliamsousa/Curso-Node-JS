// cria uma classe de erro que extende a classe Error
// é çamnçado quando um metodo nao esta implementado
class NotImplementedException extends Error {
  constructor() {
    super('Not Implemented Exception');
  }
}

//interface
// simula uma classe abstrata
class IDb {
  // metodo 'abstrato' de criar um item
  create(item) {
    throw new NotImplementedException();
  }

  // metodo 'abstrato' de ler um item
  read(item) {
    throw new NotImplementedException();
  }
  
  // metodo 'abstrato' de atualizar um item
  update(id, item) {
    throw new NotImplementedException();
  }

  // metodo 'abstrato' de apagar um item
  delete(id) {
    throw new NotImplementedException();
  }

  // metodo 'abstrato' de conectar um item
  isConnected(id) {
    throw new NotImplementedException();
  }
}

module.exports = IDb;

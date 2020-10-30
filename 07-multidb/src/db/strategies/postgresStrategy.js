// aqui temos o que é especifico da implementacao do postgres
// estende e implementa a classe interface

// importacao da classe interface idb
const IDb = require('./base/interfaceDb');

// classe concreta do strategy
class PostgresStrategy extends IDb {
  // por padrao no js sempre que criamos uma classe temos que chamar o construtor da classe mae
  constructor() {
    super();
  }

  // simula a execucao do banco
  create(item) {
    return 'Postgres';
  }
}

module.exports = PostgresStrategy;

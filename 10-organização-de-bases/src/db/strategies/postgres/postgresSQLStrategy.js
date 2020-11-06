// aqui temos o que é especifico da implementacao do postgres
// estende e implementa a classe interface

// importacao da classe interface idb
const IDb = require('../base/interfaceDb');
// importacao do sequelize
const Sequelize = require('sequelize');

// classe concreta do strategy
class PostgreSQLStrategy extends IDb {
  //1o
  constructor(connection, schema) {
    // por padrao no js sempre que criamos uma classe temos que chamar o construtor da classe mae
    super();
    // por serem atributos privados utilizamos _ no comeco dos nomes
    // define um esquema para o banco de dados
    this._db = schema;
    // define a conexao do banco de dados
    this._connection = connection;
  }

  //2o
  // metodo estatico que pode ser utilizado sem instanciar nenhum objeto da classe
  // define o modelo do banco de dados
  static async defineModel(connection, schema) {
    // pega os dados fornecidos pelo parametro esquema
    // utiliza o metodo define do sequelize
    const model = connection.define(
      schema.name, schema.schema, schema.options,
    );

    // sincroniza o modelo
    await model.sync()

    // retorna o modelo
    return model
  }

  // metodo estatico que pode ser utilizado sem instanciar nenhum objeto da classe
  static async connect() {
    // cria um driver para a conexao
    const sequelize  = new Sequelize(
      'heroes', //database
      'erickwendel', // user
      'minhasenhasecreta', //senha
      {
        host: 'localhost',
        dialect: 'postgres',
        // case sensitive
        quoteIdentifiers: false,
        // deprecation warning
        operatorsAliases: false,
        //disable logging
        logging: false
        // dialectOptions: {
        //   ssl: true,
      },
    );

    // retorna o driver
    return sequelize
  }

  async isConnected() {
    try {
      // await this._connect();
      //  autenticacao do banco de dados
      await this._connection.authenticate();

      // caso tenha sucesso retorna true
      return true;
    } 
      catch (error) {
        // tratamento de erro
        console.error('fail!', error);
        return false;
      }
  }

  // funcoa de criar um heros
  create(item) {
    // nesse caso foi passada uma formatacao especifica para a presentacao dos dados
    // sem o raw muitas informacoes indesejadas sao trazidas
    return this._db.create(item, { raw: true });
  }

  // o metodo findAll nos da algumas opcoes
  read(item) {
    return this._db.findAll({ where: item, raw: true });
  }

  update(id, item) {
    // pela desconstrucao temos { id : id }
    return this._db.update(item, { where: { id } });
  }

  delete(id) {
    // if ternario que verifica se um id foi passado
    // caso tenha nao tenh sido passado recebe um objeto vazio
    const query = id ? { id } : {};

    // caso nao tenha um id no parametro fara um delete sem o where, o que apaga todos os dados do banco
    return this._db.destroy({ where: query });
  }
}

module.exports = PostgreSQLStrategy;
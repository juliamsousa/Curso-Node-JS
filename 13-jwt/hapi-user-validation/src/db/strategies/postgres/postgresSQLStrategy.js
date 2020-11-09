const IDb = require('../base/interfaceDb');
const Sequelize = require('sequelize');

class PostgreSQLStrategy extends IDb {
  constructor(connection, schema) {
    super();
    this._db = schema;
    this._connection = connection;

  }

  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name, schema.schema, schema.options,
    );
    await model.sync()
    return model
  }

  static async connect() {
    const sequelize = new Sequelize(
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
    return sequelize
  }

  async isConnected() {
    try {
      // await this._connect();
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.error('fail!', error);
      return false;
    }
  }

  create(item) {
    return this._db.create(item, {
      raw: true
    });
  }

  read(item) {
    return this._db.findAll({
      where: item,
      raw: true
    });
  }

  update(id, item, upsert = false) {
    // faz uma verificacao se o dado ja existe ou nao
    // com a autenticacao daria problema pois os dados devem ser unicos
    // upsert: insere um novo dado se nao existe um com a mesma chave primaria ou atualiza se a chave é encontrada
    // com o update isso nos traria erros
    // define qual metodo sera utilizado
    const fn = upsert ? 'upsert' : 'update'
    return this._db[fn](item, {
      where: {
        id
      }
    });
  }
  delete(id) {
    const query = id ? {
      id
    } : {};
    return this._db.destroy({
      where: query
    });
  }
}

module.exports = PostgreSQLStrategy;
// aqui temos o que é especifico da implementacao do postgres
// estende e implementa a classe interface

// importacao da classe interface idb
const IDb = require('./base/interfaceDb');
// importacao do sequelize
const Sequelize = require('sequelize');

// classe concreta do strategy
class PostgresStrategy extends IDb {
  // por padrao no js sempre que criamos uma classe temos que chamar o construtor da classe mae
  constructor () {
    super();
    // por serem atributos privados utilizamos _ no comeco dos nomes
    // driver do sequelize
    this._sequelize = null
    // dados dos herois  
    // this._herois = null
    // quando a classe for instanciada faz a conexao do banco de dados
    this._connect()
    // define o modelo do banco de dados 
    this.defineModel()
  }

  async isConnected () {
    // tenta autenticar o banco de dados
    try {
      //  autenticacao do banco de dados
      await this._sequelize.authenticate()
      // caso tenha sucesso retorna true
      return true
    } 
      catch (error) {
        // tratamento de erro
        console.log('Falha na conexao do banco de dados!', error)
        return false;
      }
  }

  // cria a tabela e define um modelo para o nosso banco
  async defineModel () {
    this._herois = this._sequelize.define(
      'heroes',
      {
        // dados do atributo id
        id: {
          // dado do tipo inteiro
          type: Sequelize.INTEGER,
          // dado obrigatorio
          required: true,
          // defiido como chave primaria
          primaryKey: true,
          // increment automaticamente
          autoIncrement: true,
        },
        // dados do atributo nome
        nome: {
          // dado tipo string
          type: Sequelize.STRING,
          // dado obrigatorio
          required: true,
        },
        // dados do atributo poder
        poder: {
          // dado tipo string
          type: Sequelize.STRING,
          // dado obrigatorio
          required: true,
        },
      },
      
      {
        //opcoes para base existente
        tableName: 'TB_HEROIS',
        // nao mudr o nome da tabela
        freezeTableName: false,
        // nao criar dados automaticos
        timestamps: false,
      },
      );
      
      await this._herois.sync()
    }
    
    // por ser um método privado colocamos o _ no comeco do nome
    _connect () {
      // cria uma especie de driver para o sequelize passando dados do banco de dados
    this._sequelize = new Sequelize(
      'heroes', //database
      'erickwendel', // user
      'minhasenhasecreta', //senha
      {
        host: 'localhost',
        // tipo do driver
        dialect: 'postgres',
        // case sensitive
        quoteIdentifiers: false,
        // para de mostrar deprecation warning
        operatorsAliases: false
      },
    );
  }

  // simula a execucao do banco
  async create (item) {
    // utilizamos o dataValues para poder pegar apenas as informacoes necessarias
    const { dataValues } = await this._herois.create(item)

    return dataValues
  }

  // o metodo findAll nos da algumas opcoes
  // nesse caso foi passada uma formatacao especifica para a presentacao dos dados
  // sem o raw muitas informacoes indesejadas sao trazidas
  // caso o usuario nao passe um item, ele é inicializado com um objeto vazio
  read (item={}) {
    return this._herois.findAll({ raw: true, where: item })
  }

  async update (id, item) {
    return this._herois.update(item, {where: {id:id}})
  }
  
  async delete (id, item) {
    // if ternario que verifica se um id foi passado
    // caso tenha nao tenh sido passado recebe um objeto vazio
    const query = id ? {id} : {}

    // caso nao tenha um id no parametro fara um delete sem o where, o que apaga todos os dados do banco
    return this._herois.destroy({where : query})
  }
}

module.exports = PostgresStrategy;
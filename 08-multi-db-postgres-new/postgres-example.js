// npm i pg
// npm install --save sequelize pg-hstore pg
// sequelize é uma orm (que faz as conversoes de json para os dados)

/**
 * ORM (Object Relational Mapper) é uma técnica de mapeamento objeto relacional 
 * que permite fazer uma relação dos objetos com os dados que os mesmos representam.
 */

// const { Client } = require('pg');
// const client = new Client({
//   database: 'degfe1gjfh80m8',
//   host: 'ec2-54-163-246-5.compute-1.amazonaws.com',
//   port: 5432,
//   password: 'fea27e438e77e507f6a31e6d8bcc4d8642c88c78b2c7dcc0ec6351d513f43ca8',
//   user: 'vwgytcowhvcjug',
//   ssl: true,
// });
// (async () => {
//   const r = await client.connect();
//   console.log('conectado!');
//   const res = await client.query('SELECT * FROM TB_HEROIS');

//   console.log(res.rows); // Hello world!
//   await client.end();
// })();

// importacao do sequelize
const Sequelize = require('sequelize');

// cria uma especie de driver para o sequelize passando dados do banco de dados
const sequelize = new Sequelize(
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

    // dialectOptions: {
    //   ssl: true,
    // },
  },
);

// manipulacaoes do banco
(async () => {
  // define um modelo para o nosso banco
  const Herois = sequelize.define(
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

  // force: true will drop the table if it already exists
  // sincroniza a funcao
  await Herois.sync();

  // Table created
  // cria um heroi
  const result = await Herois.create(
    {
      nome: 'Charlize Theron',
      poder: 'Earring',
    },
    // {
    //   nome: 'Dani',
    //   poder: 'Tea',
    // },
    // {
    //   nome: 'Jamie',
    //   poder: 'Coffe',
    // }
  );

  // imprime todos os herois com o metodo findAll()
  console.log(
    'result',
    // o metodo findAll nos da algumas opcoes
    // nesse caso foi passada uma formatacao especifica para a presentacao dos dados
    // sem o raw muitas informacoes indesejadas sao trazidas
    // pela operacao atributes trazemos alguns atributos especificos
    await Herois.findAll({ raw: true, attributes: ['nome', 'poder', 'id'] }),
  );
})();

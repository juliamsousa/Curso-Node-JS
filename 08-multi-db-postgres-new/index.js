// por convencao a index.js é responsável pela chamada dos nossos metodos

// // importacao do mongoDbStrategy
// const mongoS = require('./src/db/strategies/mongoDbStrategy')
// importacao do postgresStrategy
const postgS = require('./src/db/strategies/postgresStrategy')
// imortacao do contextStrategy
const Context = require('./src/db/strategies/base/contextStrategy');

// // cria um novo contexto com estrategia do Mongo
// const contextM = new Context( new mongoS())
// // testa o metodo create do banco
// console.log(contextM.create())

// cria um novo contexto com estrategia do Postgres
const contextP = new Context( new postgS())
// testa o metodo create do banco
console.log(contextP.create())
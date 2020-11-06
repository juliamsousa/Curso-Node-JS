const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDB = require('./src/db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('./src/db/strategies/mongodb/schemas/heroSchema')
const HeroRoutes = require('./src/routes/heroRoutes')

const app = new Hapi.Server({
    port: 4000
})

// mapeia as rotas para que todas possam ser utilizadas
function mapRoutes(instance, methods) {
    // para cada metodo passado no parametro vai na instancia e busca a execucao do metodo
    // instance[method]() === instance.method()
    return methods.map(method => instance[method]())
}

async function main() {
    // cria uma conexao para o mongodb
    const connection = MongoDB.connect()
    // cria um novo contexto com estrategia do MongoDB e esquema herois
    const mongoDb = new Context(new MongoDB(connection, HeroSchema))

    // passa a instancia mongoDB e seus metodos para serem mapeados
    app.route([
        ...mapRoutes(new HeroRoutes(mongoDb), HeroRoutes.methods())
    ])

    await app.start()
    console.log('server running at', app.info.port)

    return app;
}
module.exports = main()
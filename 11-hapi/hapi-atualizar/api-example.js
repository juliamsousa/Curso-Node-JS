// hapi é um framework concorrente ao express que permite fazer respostas
// possui plugins nos quais eles podem se enxergar
// npm i hapi
const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDB = require('./src/db/strategies/mongoDbStrategy')
const mongoDb = new Context(new MongoDB())

const app = new Hapi.Server({
    port: 4000
})

async function main() {
    mongoDb.connect()

    app.route({
        path: '/herois',
        method: 'GET',
        handler: (request, headers) => {
            return mongoDb.read()
        }
    })

    await app.start()
    console.log('server running at', app.info.port)
}
main()
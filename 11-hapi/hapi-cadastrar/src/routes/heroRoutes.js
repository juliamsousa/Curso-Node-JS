// imposta a classe base
const BaseRoute = require('./base/baseRoute')

// classe de rotas de herois
class HeroRoutes extends BaseRoute {
    // recebe o banco de dados a ser utilizado
    constructor(db) {
        super()
        this.db = db
    }

    // cria a rota de requisicao para listar herois
    list() {
        return {
            // caminho
            path: '/herois',
            // reuisicao
            method: 'GET',
            // funcao que sera executada
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }
    
    // cria a rota de criar um heroi
    create() {
        return {
            path: '/herois',
            method: 'POST',
            handler: (request, headers) => {
                const payload = request.payload
                return this.db.create(payload)
            }
        }
    }
}

module.exports = HeroRoutes
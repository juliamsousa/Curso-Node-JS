const BaseRoute = require('./base/baseRoute')
// joi é uma ferramenta do hapi que permite fazer validacoes, evitando o uso continuo de if else
const Joi = require('joi')
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }
    
    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                // validacao do joi
                // caso falhe na validacao nao executa o handler
                validate: {
                    // fail action retorna o erro
                    failAction: (request, h, err) => {
                        throw err;
                      },
                    payload: {
                        nome: Joi.string().max(100).required(),
                        poder: Joi.string().max(30).required()
                    }
                },

            },
            handler: (request, headers) => {
                const payload = request.payload
                return this.db.create(payload)
            }
        }
    }

}

module.exports = HeroRoutes
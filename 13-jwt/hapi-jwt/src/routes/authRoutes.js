const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

// user utilizado para simulacao
const USER = {
    username: 'xuxadasilva',
    password: '123'
}

const Jwt = require('jsonwebtoken')

class AuthRoutes extends BaseRoute {
    constructor(key) {
        super()
        // cria uma chave para autenticacao
        this.secret = key
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                // colocamos o auth como false para que nao seja necessario um token para criar um token
                // isso traria complicacoes para nosso programa
                auth: false,
                tags: ['api'],
                description: 'fazer login',
                notes: 'retorna o token',
                validate: {
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: (request, headers) => {
                const {
                    username,
                    password
                } = request.payload
                if (
                    username.toLowerCase() !== USER.username ||
                    password !== USER.password
                )
                    return Boom.unauthorized()
                    
                return {
                    token: Jwt.sign({
                        username: username
                    }, this.secret)
                }
            }
        }
    }
}
module.exports = AuthRoutes
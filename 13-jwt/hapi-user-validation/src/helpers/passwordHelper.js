const Bcrypt = require('bcrypt')
const {
    promisify
} = require('util')
const hashAsync = promisify(Bcrypt.hash)
const compareAsync = promisify(Bcrypt.compare)
// configuracao do bcrypt
// configura a intensidade da senha
const SALT = 3

class Password {

    // cria um hash de senha
    static hashPassword(pass) {
        return hashAsync(pass, SALT)
    }
    // compara o hash e uma senha
    static comparePassword(pass, hash) {
        return compareAsync(pass, hash)
    }
}
module.exports = Password
// classe base de rotas
class BaseRoute {
    // os metodos sao estaticos para que possam ser utilizados fora da classe
    // com esse metodo podemos pegar os metodos da nossa api
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
            // pega os metodos que nao sao o construtor e aqueles que nao sao privados
            // como utilizamos o _ para definir metodos privados podemos adicionar o filter
            .filter(method => method !== 'constructor' && !method.startsWith('_'))
    }
}

module.exports = BaseRoute
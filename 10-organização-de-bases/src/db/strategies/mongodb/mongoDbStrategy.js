// importa a interface do Banco de Dados
const ICrud = require('../base/interfaceDb')
// importa o mongoose 
const Mongoose = require('mongoose')

// possiveis estados de conexao do banco de dados 
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

// implementa a estrategia do MongoDB a partir da interface
class MongoDB extends ICrud {
    
     // 1o 
    constructor(connection, schema) {
        super()
        // recebe uma conexaode banco de dados
        this._connection = connection;
        // recebe um esquema de banco de dados
        // isso permite que o banco utilize esquemas diferentes
        this._collection = schema;
    }

    // 2o
    // verifica o status(estado) de conexao do banco de dados
    async isConnected() {
        // readyState nos traz o estado da conexao
        const state = STATUS[this._connection.readyState]

        // nesse caso retorna 1 == true
        if (state === 'Conectado') return state;

        // caso o banco nao esteja conectando retorna o estado
        if (state !== 'Conectando') return state

        // aguarda o banco conectar caso ainda esteja conectando
        // espera 1s para que o banco conecte
        await new Promise(resolve => setTimeout(resolve, 1000))

        // retorna o estado retornado pela promise
        return STATUS[this._connection.readyState]
    }

    // 3o
    // metodo estatico que pode ser utilizado sem a instanciacao de um objeto
    static connect() {
        // faz a conexao com o banco de dados passando o usuario e a senha que foram autenticados no banco
        Mongoose.connect('mongodb://erickwendel:minhasenhasecreta@localhost:27017/herois', 
        // usa o novo parser de url
        { useNewUrlParser: true }, 
        // aviso de erro
        function (error) {
            if (!error) return;
            console.log('Falha na conexão!', error)
        })

        // guarda a conexao com o banco de dados
        const connection = Mongoose.connection

        // dispara o evento uma vez
        // no evento open, dispara a acao de console.log()
        connection.once('open', () => console.log('database rodando!!'))

        // retorna a conexao do banco de dados
        return connection;
    }

    // funcao de criar/cadastrar um heroi
    async create(item) {
        // utiliza a funcao create do mongoose
        return this._collection.create(item)
    }

    // funcao de ler um heroi
    async read(item = {}) {
        // utiliza a funcao find() do mongoose
        return this._collection.find(item, { nome: 1, poder: 1, insertedAt: 1})
    }

    // funcao de atualizar um heroi
    async update(id, item) {
        // utiliza a funcao updateOne do mongoose 
        // o update() está deprecado
        return this._collection.updateOne({_id: id}, { $set: item})
    }
    
    // funcao de apagar um heroi
    // geralmente na remocao fazemos uma remocao logica ou movemos o dado de lugar para evitar a perda de dados
    async delete(id) {
        // utiliza a funcao deleteOne do mongoose
        return this._collection.deleteOne({_id: id})
    }
}

module.exports = MongoDB
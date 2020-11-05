// importa a interface do Banco de Dados
const ICrud = require('./base/interfaceDb')
// importa o mongoose 
const Mongoose = require('mongoose')

// possiveis estados de conexao do mongoose
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    // verifica o status(estado) de conexao do banco de dados
    async isConnected() {
        // readyState nos traz o estado da conexao
        const state = STATUS[this._driver.readyState]
        // nesse caso retorna 1 == true
        if (state === 'Conectado') return state;

        // caso o banco nao esteja conectando retorna o estado
        if (state !== 'Conectando') return state

        // aguarda o banco conectar caso ainda esteja conectando
        // espera 1s para que o banco conecte
        await new Promise(resolve => setTimeout(resolve, 1000))

        // retorna o estado retornado pela promise
        return STATUS[this._driver.readyState]
    }

    // funcao de definicao do modelo dos dados
    defineModel() {
        // criamos um esquema para os nossos dados
        const heroiSchema = new Mongoose.Schema({
            // atributo nome, do tipo String e obrigatorio
            nome: {
                type: String,
                required: true
            },
            // atributo poder, do tipo String e obrigatorio
            poder: {
                type: String,
                required: true
            },
            // atributo de data de insercao, do tipo Date e que já vem com um valor padrao
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        
        //mocha workaround
        // define o modelo do banco de dados
        this._herois = Mongoose.models.heroes || Mongoose.model('heroes', heroiSchema)
    }

    // funcao de conexao do banco de dados
    connect() {
        // faz a conexao com o banco de dados passando o usuario e a senha que foram autenticados no banco
        Mongoose.connect('mongodb://erickwendel:minhasenhasecreta@localhost:27017/heroes', 
        // usa o novo parser de url
        { useNewUrlParser: true }, 
        // aviso de erro
        function (error) {
            if (!error) return;
            console.log('Falha na conexão!', error)
        })

        // guarda a conexao com o banco de dados
        this._driver = Mongoose.connection
        // dispara o evento uma vez
        // no evento open, dispara a acao de console.log()
        this._driver.once('open', () => console.log('database rodando!!'))

        // define o modelo do banco
        // caso o modelo nao seja definido ficaria como null por padrao do constructor
        this.defineModel()
    }

    // funcao de criar/cadastrar um heroi
    async create(item) {
        // utiliza a funcao create do mongoose
        return this._herois.create(item)
    }

    // funcao de ler um heroi
    async read(item = {}) {
        // utiliza a funcao find() do mongoose
        return this._herois.find(item, { nome: 1, poder: 1, insertedAt: 1})
    }

    // funcao de atualizar um heroi
    async update(id, item) {
        // utiliza a funcao updateOne do mongoose 
        // o update() está deprecado
        return this._herois.updateOne({_id: id}, { $set: item})
    }
    
    // funcao de apagar um heroi
    // geralmente na remocao fazemos uma remocao logica ou movemos o dado de lugar para evitar a perda de dados
    async delete(id) {
        // utiliza a funcao deleteOne do mongoose
        return this._herois.deleteOne({_id: id})
    }
}

module.exports = MongoDB
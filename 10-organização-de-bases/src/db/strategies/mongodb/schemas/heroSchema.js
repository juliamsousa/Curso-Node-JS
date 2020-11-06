// importa o mongooose (odm)
const Mongoose=  require('mongoose')

// define um esquema para o banco de dados
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
    // atributo inseridoEm do tipo Date, recebendo um valor default
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

//mocha workaround
module.exports = Mongoose.models.herois || Mongoose.model('herois', heroiSchema)
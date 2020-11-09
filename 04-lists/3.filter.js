// faz o requerimento da funcao obterPessoas de service.js
const {
    obterPessoas
} = require('./service')

/*
// exemplo de descontrucao dento do JS
 const item = {
     nome: 'Erick',
     idade: 12,
 }

// é possivel acessar os atributos do objeto da seguinte maneira
// desse modo nao é necessario fazer nome = item.nome 
// quando o nome da variavel é o mesmo do atributo o JS ja faz a associacao de modo direto
 const { nome , idade } = item
 console.log(nome, idade)
*/

// o método filter() cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida
// criacao de um filter personalizado utilizando o construtor Array.prototype
Array.prototype.meuFilter = function (callback) {
    // cria um array vcaxio que contera os itens selecionados pelo filter
    const lista = []

    // implementacao de um forin que filtrara os itens
    for (index in this) {
        // seleciona o item do Array
        const item = this[index]

        // faz a chamada da funcao passada como parametro e armazena seu resultado em um Array
        const result = callback(item, index, this)
        
        // 0, "", null, undefined === false
        // verifica se o resultado é falso, caso seja pula para a proxima iteracao com o metodo continue
        if (!result) continue;

        // adiciona o item filtrado no Array
        lista.push(item)
    }

    // retorna a lista de items filtrados
    return lista;
}

// funcao prinicpal que faz a chamda do filter e testa seu funcionamento
async function main() {
    try {
        // aguarda o resultado da requisicao do service
        // caso tenha sucesso, retornara todos os personagens que contem 'a' no nome
        const {
            results
        } = await obterPessoas(`a`)

        // filter padrao
        const familiaLars = results.filter(function (item) {
            // por padrão precisa retornar um booleano
            // para informar se deve manter ou remover da lista
            // false > remove da lista
            // true > mantem
            // não encontrou = -1
            // encontrou = posicaoNoArray
            // verifica se o item apresenta 'lars' no nome
            return item.name.toLowerCase().indexOf(`lars`) !== -1
        })

        // utilizacao do filter implementado anteriormente
        // como esta buscando todos os itens com 'lars' teremos como retorno a familia Lars
        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            // verifica se o item apresenta 'lars' no nome
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        // utiliza um map para retornar apenas o atributo nome das pessoas de sobrenome 'Lars'
        const names = familiaLars.map((pessoa) => pessoa.name)
        // imprime o nome de todos os itens contidos em familiaLars
        console.log(names)

    } catch (error) {
        // tratamento de erro
        console.error('DEU RUIM', error)
    }
}

// chamada da funcao main
main()
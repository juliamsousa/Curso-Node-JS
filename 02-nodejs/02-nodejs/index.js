/*
 0 Obter um usuario
 1 Obter o numero de telefone de um usuario a partir de seu Id
 2 Obter o endereco do usuario pelo Id 
*/
// importamos um módulo interno do node.js
const util = require('util')
// esse modulo eh utilizado para transformar a funcao em uma promise
const obterEnderecoAsync = util.promisify(obterEndereco)

// uma promise permite manter a ordem de execucao de funcoes que dependem do retorno de outra funcao
// uma promise pode ser resolvida ou rejeitada
// quando a funcao executa com sucesso a promise eh resolvida
// quando a execucao da funcao falha a promise eh rejeitada
// esses dois cenarios podem ser tratados por meio de try/catch, apresentando execucoes diferentes de acordo com o resultado da promise
// para criar uma promise utilizamos a estrutura: const a = new Promise (function(resolve, reject){}) 

function obterUsuario() {
    // quando der algum problema -> reject(ERRO)
    // quando sucess -> RESOLV
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            // return reject(new Error('DEU RUIM DE VERDADE!'))

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)

    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1199002',
                ddd: 11
            })
        }, 2000);

    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}

// 1o passso adicionar a palavra async -> automaticamente ela retornará uma Promise
// funcoes assincronas funcionam por meio de Promises
// a estrutura utilizada para trabalhar com essas funcoes: async/await

main()

async function main() {
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')

    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

// const usuarioPromise = obterUsuario()
// // para manipular o sucesso usamos a função .then
// // para manipular erros , usamos o .catch
// // usuario -> telefone -> telefone
// usuarioPromise
//     .then(function (usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(result) {
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function (resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//         `)
//     })
//     .catch(function (error) {
//         console.error('DEU RUIM', error)
//     })

// obterUsuario(function resolverUsuario(error, usuario) {
//     // null || "" || 0 === false
//     if (error) {
//         console.error('DEU RUIM em USUARIO', error)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if (error1) {
//             console.error('DEU RUIM em TELEFONE', error)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if (error2) {
//                 console.error('DEU RUIM em TELEFONE', error)
//                 return;
//             }

//             console.log(`
//              Nome: ${usuario.nome},
//              Endereco: ${endereco.rua},${endereco.numero}
//              Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         })
//     })
// })
// const telefone = obterTelefone(usuario.id)

// console.log('telefone', telefone)

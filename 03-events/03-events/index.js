// codigo de exemplo sobre tratamento e disparo de eventos
// importacao de 'events'
const EventEmitter = require('events')

// classe de um emissor que estende a classe 'events'
class MeuEmissor extends EventEmitter {

}

// cria um novo emissor
const meuEmissor = new MeuEmissor()
// nome do evento disparado
const nomeEvento = 'usuario:click'

// acao que ocorre ao disparo de um evento de click
meuEmissor.on(nomeEvento, function (click) {
    console.log('um usuario clicou', click)
})

// evento na barra de rolagem
meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')

let count = 0

// simula o disparo do evento a cada 1s com a funcao set interval
// a medida que o evento eh disparado o contador eh incrementado
setInterval(function () {
    meuEmissor.emit(nomeEvento, 'no ok' + (count++))
}, 1000)

// cria uma variavel de entrada que recebe dados digitados no terminal
const stdin = process.openStdin()

function main() {
    // como foi criada com uma promise, apos ser resolvida, o listenner para de ouvir
    return new Promise(function (resolve, reject) {
        // fica ouvindo, caso o evento seja disparado faz uma acao
        stdin.addListener('data', function (value) {
            // console.log(`Voce digitou: ${value.toString().trim()}`)
            return resolve(value)
        })
    })
}

// imprime o resultado retornado da funcao main
main().then(function (resultado) {
    console.log('resultado', resultado.toString())
})

const socketIo = require('socket.io');
const trasmisaoController = require('./transmicaoController');
const rotativoControler = require('./rotativoController');
// Classe Sujeito que gerencia os observadores
class Sujeito {
    constructor() {
        this.observadores = [];  // Lista de observadores
    }

    // Adiciona um observador
    inscrever(observador) {
        this.observadores.push(observador);
    }

    // Remove um observador
    desinscrever(observador) {
        this.observadores = this.observadores.filter(obs => obs !== observador);
    }

    // Notifica todos os observadores sobre um evento
    notificar(dados) {
        this.observadores.forEach(observador => observador.atualizar(dados));
    }
}
// Classe Observador que será notificado
class Observador {
    constructor(socket) {
        // ID do observador
        this.socket = socket;  // Conexão Socket.io do observador
    }

    // Método chamado quando o observador é notificado
    atualizar(dados) {
        this.socket.emit('notificacao', dados);
    }
}

const sujeito = new Sujeito();  // Instância do Sujeito
const initializeSocket = (server) => {
    const io = socketIo(server);
    io.on('connection', async function (socket) {
        // Cria um novo observador para cada cliente conectado
        const observador = new Observador(socket.id, socket);
        sujeito.inscrever(observador);
        console.log(sujeito.observadores)

        // Remove o observador quando o cliente desconecta
        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
            sujeito.desinscrever(observador);
        });

        trasmisaoController.socket(io, socket)
        rotativoControler.socket(io, socket)
    });
};
module.exports = { initializeSocket };
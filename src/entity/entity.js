const socketIo = require('socket.io');
class Transmissao {
    constructor() {
        this.id_cronometro = 21;
        this.id_transmissao = 24;
        this.idjogo = null;
    }
}

class Jogo {
    constructor() {
        this.idjogo = null;
        this.nome_time1 = ""
        this.nome_time2 = ""
        this.partida = null
        this.pontos_time1 = null
        this.pontos_time2 = null
    }
}
class Cronometro {
    constructor() {
        this.duracao = 31;
        this.icone = false;
        this.ativo = false
        this.interval = null
        this.minuto = 0;
        this.segundo = 0;
        this.tipo_cronometro = 1;
    }
    pause() {
        clearInterval(this.cronometro.interval);
        this.icone = false
        this.cronometro.ativo = false;
    }
    stop() {
        clearInterval(this.cronometro.interval);
        this.minuto = 0
        this.segundo = 0
        this.cronometro.ativo = false;
        enviarMensagemSocket(this.id_transmissao, "id_cronometro", this.id_cronometro, "minuto", this.minuto)
        enviarMensagemSocket(this.id_transmissao, "id_cronometro", this.id_cronometro, "segundo", this.segundo)
    }
    play() {
        this.cronometro.interval = setInterval(() => {

            if (this.tipo_cronometro === 0) {
                this.contagemProgressiva();
                this.cronometro.ativo = true;
            } else {
                this.contagemRegressiva();
                this.cronometro.ativo = true;
            }
        }, 1000);
    }
    contagemProgressiva() {

        if (this.minuto === this.duracao) {
            this.minuto = 0
            this.segundo = 0
            enviarMensagemSocket(this.id_transmissao, "id_cronometro", this.id_cronometro, "minuto", this.minuto)
            enviarMensagemSocket(this.id_transmissao, "id_cronometro", this.id_cronometro, "segundo", this.segundo)
        }
        else {
            if (this.segundo === 59) {
                this.minuto++;
                this.segundo = 0;
                enviarMensagemSocket(this.id_transmissao, "id_cronometro", this.id_cronometro, "minuto", this.minuto);
            } else {
                this.segundo++
            }
            enviarMensagemSocket(this.id_transmissao, "id_cronometro", this.id_cronometro, "segundo", this.segundo);
        }
    }
    contagemRegressiva() {

        if (!this.cronometro.ativo && this.minuto === 0 && this.segundo === 0) {
            this.minuto = this.duracao
            this.segundo = 0
        }
        if (this.minuto === 0 && this.segundo === 0) {
            this.stop();
        } else {
            if (this.cronometro.ativo) {
                if (this.segundo === 0) {
                    if (this.minuto !== 0) {
                        this.minuto--;
                        this.segundo = 59;
                        enviarMensagemSocket(this.id_transmissao, "id_cronometro", this.id_cronometro, "minuto", this.minuto);
                    }
                } else {
                    this.segundo--;
                    enviarMensagemSocket(this.id_transmissao, "id_cronometro", this.id_cronometro, "segundo", this.segundo);
                }
            }
        }
    }
}
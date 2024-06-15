const { Cronometro } = require("../model/models");

const cronometroController = {
    ativo: false,
    tipo_cronometro: 1, // Definindo tipo_cronometro como 1 para contagem regressiva
    interval: null,
    duracao: 1,
    minuto: 0,
    segundo: 0,
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.minuto = 0
            this.segundo = 0
            this.ativo = false;
        }
    },
    pause() {
        clearInterval(this.interval)
    },
    play() {
        this.stop();
        this.interval = setInterval(() => {
            if (this.tipo_cronometro === 0) {
                this.contagemProgressiva();
                this.ativo = true;
            } else {
                this.contagemRegressiva();
                this.ativo = true;
            }
        }, 200);
    },
    contagemProgressiva() {
        if (this.minuto === this.duracao) {
            this.stop();
        } else {
            if (this.ativo) {
                if (this.segundo === 59) {
                    this.minuto++;
                    this.segundo = 0;
                } else {
                    this.segundo++;
                }
                const formattedSegundo = this.segundo < 10 ? `0${this.segundo}` : this.segundo;
                console.log(`${this.minuto}:${formattedSegundo}`);
            }
        }
    },
    contagemRegressiva() {

        if (!this.ativo) {
            this.minuto = this.duracao
        }
        if (this.minuto === 0 && this.segundo === 0) {
            this.stop();
        } else {
            if (this.ativo) {
                if (this.segundo === 0) {
                    if (this.minuto !== 0) {
                        this.minuto--;
                        this.segundo = 59;
                    }
                } else {
                    this.segundo--;
                }
                const formattedSegundo = this.segundo < 10 ? `0${this.segundo}` : this.segundo;
                console.log(`${this.minuto}:${formattedSegundo}`);
            }
        }
    },
    type_socket: async (menssagem) => {
        switch (menssagem.tipo) {
            case "duracao":
                await Cronometro.update({ duracao: menssagem.duracao }, { where: { id_cronometro: menssagem.id_cronometro } });
                break;
            case "tipo_cronometro":
                await Cronometro.update({ tipo_cronometro: parseInt(menssagem.tipo_cronometro) }, { where: { id_cronometro: menssagem.id_cronometro } });
                break;
            case "icone":
                await database.query(`UPDATE Cronometro SET icone= '${menssagem.icone}' WHERE id_cronometro =${menssagem.id_cronometro}`)
                break;
            case "minuto":
                await Cronometro.update({ minuto: menssagem.minuto }, { where: { id_cronometro: menssagem.id_cronometro } });
                break
            case "segundo":
                await Cronometro.update({ segundo: menssagem.segundo }, { where: { id_cronometro: menssagem.id_cronometro } });
                break
        }
    },
};

// cronometroController.play();



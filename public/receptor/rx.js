socket = io();
function enviarMensagemSocket(id_transmissao, entidade, valor_entidade, atributo, valor_atributo) {
  const send = {
    id_socket: socket.id,
    cliente:'rx',
    "entidade": "transmissao",
    "id_transmissao": id_transmissao,
    "tipo": atributo,
    [entidade]: valor_entidade,
    [atributo]: valor_atributo
  }
  send["id_transmissao"] = id_transmissao
  socket.emit(`transmissao_t${id_transmissao}`, send);
}
const { createApp } = Vue;
const appp = createApp({
  data() {
    return {
      cronometro: {
        ativo: null,
        interval: null,
      },
      transmissao: {
        id_placar: 0,
        id_transmissao: 0,
        placar_visibilidade: false,
        placar_x: 0,
        placar_y: 0,
        placar_z: 0,
        idjogo: 0,
        nome: '',
        id_rotativo: 0,
        rotativo_visivilidade: true,
        rotativo_x: 0,
        rotativo_y: 0,
        rotativo_z: 0,
        id_cronometro: 0,
        tipo_cronometro: 0,
        minuto: 0,
        segundo: 0,
        icone: false,
        duracao: 0,
        icone: "play",
        id_cronometro: 0,
        minuto: 0,
        segundo: 0,
        tipo_cronometro: null,
        overlay_visibilidade: null,
        nome_time1: "",
        nome_time2: "",
        pontos_time1: null,
        pontos_time2: null,
        partida: null
      },
      carrosel: {
        imagemAtual: null,
        value: [],
        interval: null,
        duracao: 0,
        indice: 0,
        contador: 0,
      }
    }
  },
  mounted() {
  },
  methods: {
    listen() {
      const send = {
        entidade: "transmissao",
        tipo: "segundo",
        id_transmissao: this.transmissao.id_transmissao,
        id_cronometro: this.transmissao.id_cronometro,
        segundo: this.transmissao.segundo
      }
      socket.emit(`transmissao`, send)
      socket.on(`transmissao_t${this.transmissao.id_transmissao}`, (menssagem) => {
        if (menssagem.tipo === "receptor") {
          this.transmissao = menssagem.transmissao
          this.transmissao.placar_visibilidade = menssagem.transmissao.placar_visibilidade === "true" ? true : false
          this.transmissao.rotativo_visibilidade = menssagem.transmissao.rotativo_visibilidade === "true" ? true : false
          this.transmissao.logo_visibilidade = menssagem.transmissao.logo_visibilidade === "true" ? true : false
          this.transmissao.overlay_visibilidade = menssagem.transmissao.overlay_visibilidade === "true" ? true : false
          this.transmissao.icone = menssagem.transmissao.icone === "true" ? true : false
        } else if (socket.id != menssagem.id_socket)  {
          console.log("DADOS RECEIDOS")
          console.log(menssagem)
          switch (menssagem.entidade) {
            case "transmissao":
              this.transmissao[menssagem.tipo] = menssagem[menssagem.tipo]
              if (menssagem.tipo === "icone") {
                if (menssagem.icone) {
                  this.play();
                } else {
                  this.pause();
                }
              }
              if (menssagem.tipo === "stop") {
                this.stop()
              }
              break;
          }
        }
      });
    },
    //CRONÔMETRO
    pause() {
      clearInterval(this.cronometro.interval);
      this.transmissao.icone = false
      this.cronometro.ativo = false;
    },
    stop() {
      clearInterval(this.cronometro.interval);
      this.transmissao.minuto = 0
      this.transmissao.segundo = 0
      this.cronometro.ativo = false;
      enviarMensagemSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "minuto", this.transmissao.minuto)
      enviarMensagemSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "segundo", this.transmissao.segundo)
    },
    play() {
      this.cronometro.interval = setInterval(() => {

        if (this.transmissao.tipo_cronometro === 0) {
          this.contagemProgressiva();
          this.cronometro.ativo = true;
        } else {
          this.contagemRegressiva();
          this.cronometro.ativo = true;
        }
      }, 1000);
    },
    contagemProgressiva() {

      if (this.transmissao.minuto === this.transmissao.duracao) {
        this.transmissao.minuto = 0
        this.transmissao.segundo = 0
        enviarMensagemSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "minuto", this.transmissao.minuto)
        enviarMensagemSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "segundo", this.transmissao.segundo)
      }
      else {
        if (this.transmissao.segundo === 59) {
          this.transmissao.minuto++;
          this.transmissao.segundo = 0;
          enviarMensagemSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "minuto", this.transmissao.minuto);
        } else {
          this.transmissao.segundo++
        }
        enviarMensagemSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "segundo", this.transmissao.segundo);
      }
    },
    contagemRegressiva() {

      if (!this.cronometro.ativo && this.transmissao.minuto === 0 && this.transmissao.segundo === 0) {
        this.transmissao.minuto = this.transmissao.duracao
        this.transmissao.segundo = 0
      }
      if (this.transmissao.minuto === 0 && this.transmissao.segundo === 0) {
        this.stop();
      } else {
        if (this.cronometro.ativo) {
          if (this.transmissao.segundo === 0) {
            if (this.transmissao.minuto !== 0) {
              this.transmissao.minuto--;
              this.transmissao.segundo = 59;
              enviarMensagemSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "minuto", this.transmissao.minuto);
            }
          } else {
            this.transmissao.segundo--;
            enviarMensagemSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "segundo", this.transmissao.segundo);
          }
        }
      }
    },
    //CARROSEL
    atualizarCarrosel() {
      fetch('/api_carroselAtivo')
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao buscar imagens');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data)
          this.carrosel.value = data
        })
        .catch(error => {
          console.error('Erro ao buscar imagens:', error);
        });
    },
    proximo() {
      this.carrosel.indice++;
      // Verifica se o índice ultrapassou o limite máximo
      if (this.carrosel.indice >= this.carrosel.value.length) {
        //atualiza a lista
        this.atualizarCarrosel()
        this.carrosel.indice = 0;
      }
      if (this.carrosel.value.length != 0) {
        // Obtém a próxima imagem e sua duração
        const proximaImagem = this.carrosel.value[this.carrosel.indice];
        this.carrosel.imagemAtual = `/pictures/carrossel/${proximaImagem.url}`;
        this.carrosel.duracao = proximaImagem.duracao;
      } else {
        this.carrosel.imagemAtual = ""
      }
    },
    carrosel_play() {
      this.carrosel.interval = setInterval(() => {
        if (this.carrosel.duracao === this.carrosel.contador) {
          this.proximo()
          this.carrosel.contador = 0
        }
        // console.log(this.carrosel.contador)
        this.carrosel.contador++
      }, 1000)
    },
    carrosel_pause() {
      clearInterval(this.carrosel.interval)
      this.carrosel.contador = 0
      this.carrosel.duracao = 0

    }
  }
}
).mount('#app');



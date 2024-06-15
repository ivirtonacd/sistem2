socket = io();
const { createApp } = Vue
function enviarTransmissaoSocket(id_transmissao, entidade, valor_entidade, atributo, valor_atributo) {
  const send = {
    cliente: 'tx',
    id_socket: socket.id,
    "entidade": "transmissao",
    "id_transmissao": id_transmissao,
    "tipo": atributo,
    [entidade]: valor_entidade,
    [atributo]: valor_atributo
  }
  send["id_transmissao"] = id_transmissao
  socket.emit(`transmissao_t${id_transmissao}`, send);
}
const appp = createApp({
  data() {
    return {
      loading: true, // Adicione um estado de loading
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
      }
    }
  },
  methods: {
    listen() {
      socket.on(`transmissao_t${this.transmissao.id_transmissao}`, (menssagem) => {
      
        if (menssagem.tipo === "receptor") {
          this.transmissao = menssagem.transmissao
          this.transmissao.placar_visibilidade = menssagem.transmissao.placar_visibilidade === "true" ? true : false
          this.transmissao.rotativo_visibilidade = menssagem.transmissao.rotativo_visibilidade === "true" ? true : false
          this.transmissao.overlay_visibilidade = menssagem.transmissao.overlay_visibilidade === "true" ? true : false
          this.transmissao.icone = menssagem.transmissao.icone === "true" ? true : false
        } else if (socket.id != menssagem.id_socket) {
          console.log("DADOS RECEIDOS")
          console.log(menssagem)
          switch (menssagem.entidade) {
            case "transmissao":
              this.transmissao[menssagem.tipo] = menssagem[menssagem.tipo]
              if (menssagem.tipo === "minuto") {
                if (this.transmissao.tipo_cronometro === 0 && this.transmissao.minuto === this.transmissao.duracao) {
                  this.transmissao.icone = false
                  enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "icone", this.transmissao.icone)
                }
              }
              if (menssagem.tipo === "segundo") {
                if (this.transmissao.tipo_cronometro === 1 && this.transmissao.minuto === 0 && this.transmissao.segundo === 0) {
                  this.transmissao.icone = false
                  enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "icone", this.transmissao.icone)
                }
              }
              break;
          }
        }
      });
    },
    jogo_nome1_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_transmissao", this.transmissao.id_transmissao, "nome_time1", this.transmissao.nome_time1)
    },
    jogo_nome2_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_transmissao", this.transmissao.id_transmissao, "nome_time2", this.transmissao.nome_time2)
    },
    incrementar_partida() {
      this.transmissao.partida++
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_transmissao", this.transmissao.id_transmissao, "partida", this.transmissao.partida)
    },
    decrementar_partida() {
      if (this.transmissao.partida > 1) {
        this.transmissao.partida--
        enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_transmissao", this.transmissao.id_transmissao, "partida", this.transmissao.partida)
      }
    },
    incrementar_time1() {
      this.transmissao.pontos_time1++
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_transmissao", this.transmissao.id_transmissao, "pontos_time1", this.transmissao.pontos_time1)
    },
    incrementar_time2() {
      this.transmissao.pontos_time2++
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_transmissao", this.transmissao.id_transmissao, "pontos_time2", this.transmissao.pontos_time2)
    },
    decrementar_time1() {
      if (this.transmissao.pontos_time1 > 0) {
        this.transmissao.pontos_time1--
        enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_transmissao", this.transmissao.id_transmissao, "pontos_time1", this.transmissao.pontos_time1)
      }
    },
    decrementar_time2() {
      if (this.transmissao.pontos_time2 > 0) {
        this.transmissao.pontos_time2--
        enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_transmissao", this.transmissao.id_transmissao, "pontos_time2", this.transmissao.pontos_time2)
      }
    },
    placar_visibilidade_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_placar", this.transmissao.id_placar, "placar_visibilidade", this.transmissao.placar_visibilidade)
    },
    placar_x_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_placar", this.transmissao.id_placar, "placar_x", this.transmissao.placar_x)
    },
    placar_y_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_placar", this.transmissao.id_placar, "placar_y", this.transmissao.placar_y)
    },
    placar_z_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_placar", this.transmissao.id_placar, "placar_z", this.transmissao.placar_z)
    },
    rotativo_visibilidade_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_rotativo", this.transmissao.id_rotativo, "rotativo_visibilidade", this.transmissao.rotativo_visibilidade)
    },
    rotativo_x_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_rotativo", this.transmissao.id_rotativo, "rotativo_x", this.transmissao.rotativo_x)
    },
    rotativo_y_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_rotativo", this.transmissao.id_rotativo, "rotativo_y", this.transmissao.rotativo_y)
    },
    rotativo_z_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_rotativo", this.transmissao.id_rotativo, "rotativo_z", this.transmissao.rotativo_z)
    },
    cronometro_duracao_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "duracao", this.transmissao.duracao)
    },
    cronometro_play_tx() {
      this.transmissao.icone = !this.transmissao.icone
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "icone", this.transmissao.icone)
    },
    cronometro_tipo_cronometro_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "tipo_cronometro", parseInt(this.transmissao.tipo_cronometro))
    },
    cronometro_stop_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "stop", "stop")
      this.transmissao.icone = false
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_cronometro", this.transmissao.id_cronometro, "icone", this.transmissao.icone)
    },
    overlay_visibilidade_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_overlay", this.transmissao.id_overlay, "overlay_visibilidade", this.transmissao.overlay_visibilidade)
    },
    overlay_imagem_tx(fundo) {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_overlay", this.transmissao.id_overlay, "fundo", fundo)
    },
    logo_visibilidade_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_logo", this.transmissao.id_logo, "logo_visibilidade", this.transmissao.logo_visibilidade)
    },
    logo_x_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_logo", this.transmissao.id_logo, "logo_x", this.transmissao.logo_x)
    },
    logo_y_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_logo", this.transmissao.id_logo, "logo_y", this.transmissao.logo_y)
    },
    logo_z_tx() {
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_logo", this.transmissao.id_logo, "logo_z", this.transmissao.logo_z)
    },
    link_visibilidade_tx(){
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_Link", this.transmissao.id_Link, "Link_visibilidade", this.transmissao.Link_visibilidade)
    },
    link_visibilidade_tx(){
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_Link", this.transmissao.id_Link, "Link_visibilidade", this.transmissao.Link_visibilidade)
    },
    link_tx(){
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_Link", this.transmissao.id_Link, "Link", this.transmissao.Link)
    },
    link_play_tx() {
      this.transmissao.Link_play = !this.transmissao.Link_play
      enviarTransmissaoSocket(this.transmissao.id_transmissao, "id_Link", this.transmissao.id_Link, "Link_play", this.transmissao.Link_play)
    },
  },
}).mount('#app')
setTimeout(() => {
  loader.style.display = 'none'; // Ocultar o loader depois que os dados estiverem prontos
}, 5000); // Ajuste o tempo conforme necessário

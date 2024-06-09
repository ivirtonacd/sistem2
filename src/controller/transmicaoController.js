const { Transmissao, Rotativo, Placar, Cronometro, Merchan, Overlay, Logo } = require("../model/models")

const database = require("../config/database");
const trasmisaoController = {
    getTransmisao: async function (id_transmissao) {
        const data = await database.query("select * from Placar,Transmissao,Rotativo,Cronometro,Overlay,Logo where Placar.id_transmissao = Transmissao.id_transmissao and Rotativo.id_transmissao = Transmissao.id_transmissao and Overlay.id_transmissao = Transmissao.id_transmissao and  Logo.id_transmissao = Transmissao.id_transmissao and Cronometro.id_transmissao = Transmissao.id_transmissao and Transmissao.id_transmissao=" + id_transmissao)
        return data[0][0]
    },
    getJogo: async function (idjogo) {
        const data = await database.query("select Jogo.idjogo,Jogo.nome_time1,partida,pontos_time1, jogo.nome_time2 ,pontos_time2 from Jogo WHERE Jogo.idjogo = " + idjogo)

        return data[0][0]
    },
    receptor: async (req, res) => {
        if (req.query.id_transmissao) {
            const transmissao = await trasmisaoController.getTransmisao(req.query.id_transmissao)
            res.render('receptor', { transmissao:  transmissao})
        } else {
            res.render('naoencontrada')
        }

    },
    transmisoes: async (req, res) => {
        const transmisoes = await Transmissao.findAll();
        res.render('transmisoes', { transmisoes: transmisoes });
    },
    transmisao: async (req, res) => {
        if (req.query.id) {
            const transmissao = await trasmisaoController.getTransmisao(req.query.id)
            console.log(transmissao)
            const merchans = await Merchan.findAll()
            res.render('transmisao', { transmissao: transmissao, merchans: merchans });
        }
    },
    create: async (req, res) => {
        try {
            const novoTransmisao = await Transmissao.create({
                nome: req.body.nome,
                nome_time1: "",
                nome_time2: "",
                pontos_time1: 0,
                pontos_time2: 0,
                partida: 1
            });
            await Placar.create({
                id_transmissao: novoTransmisao.id_transmissao,
                placar_visibilidade: true,
                placar_x: 1,
                placar_y: 1,
                placar_z: 100
            })
            await Cronometro.create({
                id_transmissao: novoTransmisao.id_transmissao,
                tipo_cronometro: 0,
                minuto: 0,
                segundo: 0,
                icone: "play",
                duracao: 0
            })
            await Rotativo.create({
                rotativo_visibilidade: true,
                rotativo_x: 0,
                rotativo_y: 0,
                rotativo_z: 100,
                id_transmissao: novoTransmisao.id_transmissao
            })
            await Overlay.create({
                overlay_visibilidade: false,
                fundo: null,
                id_transmissao: novoTransmisao.id_transmissao
            })
            await Logo.create({
                logo_visibilidade: false,
                logo: "/pictures/sistem/logo_podium.png",
                id_transmissao: novoTransmisao.id_transmissao
            })

        } catch (error) {
            console.log("erro ao criar tranmissao ", error)
        }
        res.redirect('/transmisoes');
    },
    delete: async (req, res) => {
        await Transmissao.destroy({ where: { id_transmissao: req.query.id } });
        res.redirect('/transmisoes');
    },
    socket: async (io, socket) => {
        socket.on("transmissao", async function (menssagem) {
            if (menssagem.tipo === "transmissao") {
                const send = {
                    tipo: "receptor",
                    transmissao: await trasmisaoController.getTransmisao(menssagem.id_transmissao)
                }
                io.emit(`transmissao_t${menssagem.id_transmissao}`, send)
            } else {
                io.emit(`transmissao_t${menssagem.id_transmissao}`, menssagem)
            }
            console.log(menssagem)
            socket.on(`transmissao_t${menssagem.id_transmissao}`, async function (menssagem) {
                console.log(menssagem)
                switch (menssagem.tipo) {
                    //PLACAR
                    case "placar_visibilidade":
                        await database.query(`UPDATE Placar SET placar_visibilidade= '${menssagem.placar_visibilidade}' WHERE id_placar =${menssagem.id_placar}`)
                        break;
                    case "placar_x":
                        await Placar.update({ placar_x: menssagem.placar_x }, { where: { id_placar: menssagem.id_placar } });
                        break;
                    case "placar_y":
                        await Placar.update({ placar_y: menssagem.placar_y }, { where: { id_placar: menssagem.id_placar } });
                        break;
                    case "placar_z":
                        await Placar.update({ placar_z: menssagem.placar_z }, { where: { id_placar: menssagem.id_placar } });
                        break;
                    //JOGO
                    case "nome_time1":
                        await Transmissao.update({ nome_time1: menssagem.nome_time1 }, { where: { id_transmissao: menssagem.id_transmissao } });
                        break;
                    case "nome_time2":
                        await Transmissao.update({ nome_time2: menssagem.nome_time2 }, { where: { id_transmissao: menssagem.id_transmissao } });
                        break;
                    case "pontos_time1":
                        await Transmissao.update({ pontos_time1: menssagem.pontos_time1 }, { where: { id_transmissao: menssagem.id_transmissao } });
                        break;
                    case "pontos_time2":
                        await Transmissao.update({ pontos_time2: menssagem.pontos_time2 }, { where: { id_transmissao: menssagem.id_transmissao } });
                        break;
                    case "partida":
                        await Transmissao.update({ partida: menssagem.partida }, { where: { id_transmissao: menssagem.id_transmissao } });
                        break;
                    //ROTATIVO
                    case "rotativo_visibilidade":
                        await database.query(`UPDATE Rotativo SET rotativo_visibilidade= "${menssagem.rotativo_visibilidade}" WHERE id_rotativo = ${menssagem.id_rotativo}`)
                        break;
                    case "rotativo_x":
                        await Rotativo.update({ rotativo_x: menssagem.rotativo_x }, { where: { id_rotativo: menssagem.id_rotativo } });
                        break;
                    case "rotativo_y":
                        await Rotativo.update({ rotativo_y: menssagem.rotativo_y }, { where: { id_rotativo: menssagem.id_rotativo } });
                        break;
                    case "rotativo_z":
                        await Rotativo.update({ rotativo_z: menssagem.rotativo_z }, { where: { id_rotativo: menssagem.id_rotativo } });
                        break;
                    //CRONOMETRO
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
                    case "overlay_visibilidade":
                        await database.query(`UPDATE Overlay SET overlay_visibilidade= "${menssagem.overlay_visibilidade}" WHERE id_overlay = ${menssagem.id_overlay}`)
                        break
                    case "fundo":
                        await database.query(`UPDATE Overlay SET fundo= "${menssagem.fundo}" WHERE id_overlay = ${menssagem.id_overlay}`)
                        break
                    //ROTATIVO
                    case "logo_visibilidade":
                        await database.query(`UPDATE Logo SET logo_visibilidade= "${menssagem.logo_visibilidade}" WHERE id_logo = ${menssagem.id_logo}`)
                        break;
                    case "logo_x":
                        await Logo.update({ logo_x: menssagem.logo_x }, { where: { id_logo: menssagem.id_logo } });
                        break;
                    case "logo_y":
                        await Logo.update({ logo_y: menssagem.logo_y }, { where: { id_logo: menssagem.id_logo } });
                        break;
                    case "logo_z":
                        await Logo.update({ logo_z: menssagem.logo_z }, { where: { id_logo: menssagem.id_logo } });
                        break;
                }
                io.emit(`transmissao_t${menssagem.id_transmissao}`, menssagem)
            })
        })
    }

}
module.exports = trasmisaoController;
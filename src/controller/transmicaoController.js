<<<<<<< HEAD
<<<<<<< HEAD
const { Transmissao, Rotativo, Placar, Cronometro, Merchan, Overlay, Logo, Link } = require("../model/models")

const database = require("../config/database");
const trasmisaoController = {
    getTransmisao: async function (id_transmissao) {
        const data = await database.query("select * from Placar,Transmissao,Rotativo,Cronometro,Overlay,Logo,Link where Link.id_transmissao = Transmissao.id_transmissao and Placar.id_transmissao = Transmissao.id_transmissao and Rotativo.id_transmissao = Transmissao.id_transmissao and Overlay.id_transmissao = Transmissao.id_transmissao and  Logo.id_transmissao = Transmissao.id_transmissao and Cronometro.id_transmissao = Transmissao.id_transmissao and Transmissao.id_transmissao=" + id_transmissao)
=======
const { Transmissao, Rotativo, Placar, Jogo, Cronometro, Merchan, Overlay, Logo } = require("../model/models")
const database = require("../config/database");
const trasmisaoController = {
    getTransmisao: async function (id_transmissao) {
        const data = await database.query("select * from Placar,Transmissao,Rotativo,Cronometro,Overlay,Logo where Placar.id_transmissao = Transmissao.id_transmissao and Rotativo.id_transmissao = Transmissao.id_transmissao and Cronometro.id_placar = Placar.id_placar  and Overlay.id_transmissao = Transmissao.id_transmissao and  Logo.id_transmissao = Transmissao.id_transmissao and Transmissao.id_transmissao=" + id_transmissao)
>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
=======
const { Transmissao, Rotativo, Placar, Jogo, Cronometro, Merchan, Overlay, Logo } = require("../model/models")
const database = require("../config/database");
const trasmisaoController = {
    getTransmisao: async function (id_transmissao) {
        const data = await database.query("select * from Placar,Transmissao,Rotativo,Cronometro,Overlay,Logo where Placar.id_transmissao = Transmissao.id_transmissao and Rotativo.id_transmissao = Transmissao.id_transmissao and Cronometro.id_placar = Placar.id_placar  and Overlay.id_transmissao = Transmissao.id_transmissao and  Logo.id_transmissao = Transmissao.id_transmissao and Transmissao.id_transmissao=" + id_transmissao)
>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
        return data[0][0]
    },
    getJogo: async function (idjogo) {
        const data = await database.query("select Jogo.idjogo, jogo.id_equipe1,jogo.id_equipe2,Jogo.data, Jogo.nome_time1,partida,pontos_time1, jogo.nome_time2 ,pontos_time2,estadio.nome as estadio  from Jogo,Times AS time1,Times as time2,estadio  WHERE Jogo.id_equipe1 = time1.id_equipe and time2.id_equipe = Jogo.id_equipe2 and estadio.idestadio = Jogo.idestadio; and Jogo.idjogo = " + idjogo)
        return data[0][0]
    },
    receptor: async (req, res) => {
        if (req.query.id_transmissao) {
<<<<<<< HEAD
<<<<<<< HEAD
            const transmissao = await trasmisaoController.getTransmisao(req.query.id_transmissao)
            res.render('receptor', { transmissao: transmissao })
=======
=======
>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
            const transmissao = await database.query(`select Placar.id_placar,Transmissao.nome ,Transmissao.id_transmissao,Rotativo.id_rotativo,placar_visibilidade,placar_x,placar_y,placar_z, rotativo_visibilidade,rotativo_x,rotativo_y,rotativo_z,Cronometro.id_cronometro,Cronometro.tipo_cronometro,Cronometro.duracao,
            Cronometro.icone,Cronometro.minuto,Cronometro.segundo
            from Placar,Transmissao,Rotativo,Cronometro
            where Placar.id_transmissao = Transmissao.id_transmissao and Rotativo.id_transmissao = Transmissao.id_transmissao and Cronometro.id_placar = Placar.id_placar and Transmissao.id_transmissao=${req.query.id_transmissao}`)
            console.log(transmissao[0][0])
            res.render('receptor', { transmissao: transmissao[0][0] })
<<<<<<< HEAD
>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
=======
>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
        } else {
            res.render('naoencontrada')
        }

    },
    transmisoes: async (req, res) => {
        const transmisoes = await Transmissao.findAll();
        res.render('transmisoes', { transmisoes: transmisoes });
    },
    transmisao: async (req, res) => {
        if (req.query.idjogo && req.query.id) {
            const jogo = await trasmisaoController.getJogo(req.query.idjogo)
            const transmissao = await trasmisaoController.getTransmisao(req.query.id)
            const merchans = await Merchan.findAll()
            console.log({transmissao: transmissao, jogo: jogo, merchans: merchans })
            await database.query(`UPDATE Placar SET idjogo =${req.query.idjogo} WHERE id_placar =${transmissao.id_placar}`)
            // await Placar.update({ idjogo: req.query.idjogo }, { where: { id_placar: transmissao.id_placar } });
            
            res.render('transmisao', { transmissao: transmissao, jogo: jogo, merchans: merchans });
        }
    },
    create: async (req, res) => {
        try {
            const novoTransmisao = await Transmissao.create({ nome: req.body.nome });
            const placar = await Placar.create({
                idjogo: null,
                id_transmissao: novoTransmisao.id_transmissao,
                placar_visibilidade: true,
                placar_x: 1,
                placar_y: 1,
                placar_z: 100
            })
            
            await Cronometro.create({
                id_placar: placar.id_placar,
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
                fundo:null,
                id_transmissao: novoTransmisao.id_transmissao
            })
            await Logo.create({
                logo_visibilidade: false,
                logo:"/pictures/sistem/logo_podium.png",
<<<<<<< HEAD
                id_transmissao: novoTransmisao.id_transmissao
            })
            await Link.create({
                link_visibilidade: false,
                link: "",
=======
>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
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
                    transmissao: await trasmisaoController.getTransmisao(menssagem.id_transmissao),
                    jogo: await trasmisaoController.getJogo(menssagem.idjogo)
                }
                io.emit(`transmissao_t${menssagem.id_transmissao}`, send)
            } else {
                io.emit(`transmissao_t${menssagem.id_transmissao}`, menssagem)
            }
            // console.log(menssagem)
            socket.on(`transmissao_t${menssagem.id_transmissao}`, async function (menssagem) {
                // console.log(menssagem)
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
                        await Jogo.update({ nome_time1: menssagem.nome_time1 }, { where: { idjogo: menssagem.idjogo } });
                        break;
                    case "nome_time2":
                        await Jogo.update({ nome_time2: menssagem.nome_time2 }, { where: { idjogo: menssagem.idjogo } });
                        break;
                    case "pontos_time1":
                        await Jogo.update({ pontos_time1: menssagem.pontos_time1 }, { where: { idjogo: menssagem.idjogo } });
                        break;
                    case "pontos_time2":
                        await Jogo.update({ pontos_time2: menssagem.pontos_time2 }, { where: { idjogo: menssagem.idjogo } });
                        break;
                    case "partida":
                        await Jogo.update({ partida: menssagem.partida }, { where: { idjogo: menssagem.idjogo } });
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
                    //OVERLAY
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
<<<<<<< HEAD
<<<<<<< HEAD
                    case "Link_visibilidade":
                        await database.query(`UPDATE Link SET Link_visibilidade= "${menssagem.Link_visibilidade}" WHERE id_Link = ${menssagem.id_Link}`)
                        break;
                    case "Link_x":
                        await Link.update({ Link_x: menssagem.Link_x }, { where: { id_logo: menssagem.id_Link } });
                        break;
                    case "Link_y":
                        await Link.update({ Link_y: menssagem.Link_y }, { where: { id_logo: menssagem.id_Link } });
                        break;
                    case "Link_z":
                        await Link.update({ Link_z: menssagem.Link_z }, { where: { id_logo: menssagem.id_Link } });
                        break;
                    case "Link":
                        await Link.update({ Link: menssagem.Link }, { where: { id_Link: menssagem.id_Link } });
                        break;

                }
=======
                    }
>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
=======
                    }
>>>>>>> parent of d110e5f (alteraçoes de sabado 09/06)
                io.emit(`transmissao_t${menssagem.id_transmissao}`, menssagem)
            })
        })
    }

}
module.exports = trasmisaoController;
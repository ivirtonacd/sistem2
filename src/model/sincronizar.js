const { Transmissao, Rotativo, Placar,  Cronometro, Imagem,Overlay, Merchan, Logo } = require("./models");
Logo.sync()
    .then(() => {
        console.log('Logo IMAGEM sincronizada com sucesso.');
    })
Imagem.sync()
    .then(() => {
        console.log('Tabela IMAGEM sincronizada com sucesso.');
    })
Rotativo.sync()
    .then(() => {
        console.log('Tabela Rotativo sincronizada com sucesso.');
    })
Transmissao.sync()
    .then(() => {
        console.log('Tabela transmisao sincronizada com sucesso.');
    })
Placar.sync()
    .then(() => {
        console.log('Tabela Placar sincronizada com sucesso.');
    })
    .catch(error => {
        console.error('Erro ao sincronizar a tabela:', error);
    });
Cronometro.sync()
    .then(() => {
        console.log('Tabela Cronometro sincronizada com sucesso.');
    })
    .catch(error => {
        console.error('Erro ao sincronizar a tabela:', error);
    });
Overlay.sync()
    .then(() => {
        console.log('Tabela Overlay sincronizada com sucesso.');
    })
    .catch(error => {
        console.error('Erro ao sincronizar a tabela:', error);
    });
Merchan.sync()
    .then(() => {
        console.log('Tabela Merchan sincronizada com sucesso.');
    })
    .catch(error => {
        console.error('Erro ao sincronizar a tabela:', error);
    });

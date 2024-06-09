const express = require('express');
const router = express.Router();

const trasmisaoController = require('../controller/transmicaoController');
const rotativoControler = require('../controller/rotativoController');
const MerchaController = require('../controller/merchanController');


//TRANSMISSÃO
router.get('/', trasmisaoController.transmisoes);
router.get('/receptor', trasmisaoController.receptor);
router.get('/transmisao', trasmisaoController.transmisao);
router.get('/transmisoes', trasmisaoController.transmisoes);
router.post('/createtransmisao', trasmisaoController.create);
router.get('/deletetransmisao', trasmisaoController.delete);

//Rotativo Carrosel
router.get('/carrossel',rotativoControler.findAll);
router.post('/create_carrosel', rotativoControler.upload.single('imagem'),rotativoControler.create);
router.get('/delete_carrosel',rotativoControler.delete);
router.get('/api_carroselAtivo',rotativoControler.api_carroselAtivo);

//MERCHAN
router.post('/create_merchan', MerchaController.upload.single('imagem'),MerchaController.create);
router.get('/delete_merchan',MerchaController.delete);

module.exports = router;
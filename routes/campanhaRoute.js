const express = require('express'); 
const router = express.Router();
const campanhaController = require('../controllers/campanhaController');
router.get('/', campanhaController.showView);
router.get('/procurar/:id', campanhaController.mostrarCampanha);
router.get('/investidores/:cd_campanha', campanhaController.filtrarInvestidores);
router.get('/redes-sociais/:id', campanhaController.mostrarRedesSociais);
router.get('/recompensas/:id', campanhaController.mostrarRecompensas);
module.exports = router;
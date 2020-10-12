const express = require('express'); 
const router = express.Router();
const explorarController = require('../controllers/explorarController');
router.get('/', explorarController.showView);
router.get('/categorias', explorarController.mostrarCategorias);
router.get('/filtrar-campanhas/:cd_categoria/:vl_lance/:ds_localizacao', explorarController.filtrarCampanhas);
module.exports = router;
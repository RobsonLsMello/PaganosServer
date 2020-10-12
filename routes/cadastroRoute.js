const express = require('express'); 
const router = express.Router();
const cadastroController = require('../controllers/cadastroController');
router.get('/', cadastroController.showView);
router.post('/negocio', cadastroController.cadNegocio);
router.post('/usuario', cadastroController.cadUsuario);
module.exports = router;
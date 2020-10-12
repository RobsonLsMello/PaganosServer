const express = require('express'); 
const router = express.Router();
const usuarioController = require('../controllers/cadUsuarioController');
router.get('/', usuarioController.get);
router.post('/', usuarioController.cadUsuario);
module.exports = router;
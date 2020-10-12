const express = require('express'); 
const router = express.Router();
const escolhaCadastroController = require('../controllers/escolhaCadastroController');
router.get('/', escolhaCadastroController.showView);
module.exports = router;
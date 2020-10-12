const express = require('express'); 
const router = express.Router();
const cadNegocioController = require('../controllers/cadNegocioController');
router.post('/', cadNegocioController.get);
router.post('/', cadNegocioController.cadNegocio);
module.exports = router;
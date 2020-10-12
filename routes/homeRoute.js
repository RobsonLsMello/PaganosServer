const express = require('express'); 
const router = express.Router();
const homeController = require('../controllers/homeController');
router.get('/', homeController.showView);
router.get('/top-investimentos/:cd_categoria', homeController.campanhasTopInvestimento);
router.get('/campanha/:ds_termo',homeController.procurarPorTermo);
module.exports = router;
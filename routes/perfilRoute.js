const express = require('express'); 
const router = express.Router();
const perfilController = require('../controllers/perfilController')
router.get('/', perfilController.showView);
router.post('/cadastro-campanha', perfilController.cadCampanha);
router.post('/cadastro-rede-social', perfilController.cadRedeSocial);
router.get('/pesquisar-campanhas/:cd_negocio/:dt_max/:dt_min',perfilController.pesquisarCampanhas);
router.get('/investimentos/:cd_usuario/:dt_max/:dt_min',perfilController.mostrarInvestimentos);
router.get('/negocios/:cd_negocio',perfilController.mostrarNegocios);
router.get('/tipo-recompensas',perfilController.mostrarTipoRecompensas);
router.get('/usuario/:cd_usuario',perfilController.mostrarUsuario);
module.exports = router;
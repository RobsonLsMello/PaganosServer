const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');
router.get('/',pagamentoController.showView);
router.post('/',pagamentoController.realizarPagamento);

module.exports = router;
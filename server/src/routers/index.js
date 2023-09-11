const express = require('express');
const router = express.Router();

// Importa tus rutas
const controlador = require('../controllers/index.controller');

// Usa tus rutas
router.use('/', controlador);
router.use('/usuario', controlador);
router.use('/mesa', controlador);
router.use('/pedido', controlador);
router.use('/categoria', controlador);

module.exports = router;

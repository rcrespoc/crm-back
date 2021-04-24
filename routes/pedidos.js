const express = require('express');
const { nuevoPedido, mostrarPedidos, mostrarPedido, editarPedido, eliminarPedido } = require('../controllers/pedidosController');
const { validarJWT } = require('../middlewares/auth');
const router = express.Router();

router.post('/:id', validarJWT, nuevoPedido);
router.get('/', validarJWT, mostrarPedidos);
router.get('/:id', validarJWT, mostrarPedido);
router.put('/:id', validarJWT, editarPedido);
router.delete('/:id', validarJWT, eliminarPedido);

module.exports = router;
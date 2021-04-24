const express = require('express');
const { nuevoCliente, mostrarClientes, mostrarCliente, actualizaCliente, eliminarCliente } = require('../controllers/clientesController');
const { validarJWT } = require('../middlewares/auth')
const router = express.Router();

router.post('/', validarJWT, nuevoCliente)
router.get('/', validarJWT, mostrarClientes)
router.get('/:id', validarJWT, mostrarCliente)
router.put('/:id', validarJWT, actualizaCliente)
router.delete('/:id', validarJWT, eliminarCliente)

module.exports = router;
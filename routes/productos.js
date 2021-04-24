const express = require('express');
const { crearProducto, mostrarProductos, mostrarProducto, editarProducto, eliminarProducto, mostrarProductoXNombre } = require('../controllers/productosController');
const { subirArchivo } = require('../middlewares/subirArchivo');
const { validarCampos } = require('../middlewares/validarCampos');
const { body } = require('express-validator');
const { existeProducto } = require('../helpers/validacion-db');
const { validarJWT } = require('../middlewares/auth')
const router = express.Router();


router.post('/', [
  validarJWT,
  subirArchivo,
  body('nombre', 'El nombre no puede ir vacio').not().isEmpty(),
  body('precio', 'El precio no puede ir vacio').notEmpty(),
  body('nombre').custom(existeProducto),
  validarCampos
], crearProducto);

router.get('/', validarJWT, mostrarProductos)
router.get('/:id', validarJWT, mostrarProducto)
router.post('/:nombre', validarJWT, mostrarProductoXNombre)
router.put('/:id', [
  validarJWT,
  subirArchivo
], editarProducto);

router.delete('/:id', validarJWT, eliminarProducto)

module.exports = router;
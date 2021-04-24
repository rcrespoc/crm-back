const express = require('express');
const { registrarUsuario, autenticarUsuario } = require('../controllers/usuariosController');
const router = express.Router();


router.post('/crear-cuenta', registrarUsuario)
router.post('/iniciar-sesion', autenticarUsuario)

module.exports = router;

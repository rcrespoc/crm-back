const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const validarJWT = async(req, res, next) => {
  const token = req.header('x-token');
  if(!token){
    return res.status(401).json({
      msg: 'No hay token en la petición'
    })
  }
  try {
    const {id} = jwt.verify(token, 'LLAVE_SECRETA');
    const usuario = await Usuario.findById(id);
    if(!usuario){
      return res.status(401).json({
        msg: 'No existe ese usuario'
      })
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Token no válido'
    })
  }
}

module.exports = {
  validarJWT
}
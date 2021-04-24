const {Usuario} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registrarUsuario = async(req, res) => {
  const usuario = new Usuario(req.body);
  try {
    usuario.password = await bcrypt.hashSync(req.body.password, 12);
    await usuario.save();
    res.json({
      msg: 'Usuario guardado exitosamente.'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const autenticarUsuario = async(req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({email});
  if(!usuario){
    return res.status(401).json({
      msg: 'El usuario no existe.'
    })
  }else{
    if(!bcrypt.compareSync(password, usuario.password)){
      return res.status(401).json({
        msg: 'Usuario o password incorrecto'
      })
    }else{
      const token = jwt.sign({
        email: usuario.email,
        nombre: usuario.nombre,
        id: usuario._id
      }, 'LLAVE_SECRETA',{
        expiresIn: '1h'
      })
      res.json({
        token
      });
    }
  }
}

module.exports = {
  registrarUsuario,
  autenticarUsuario
}
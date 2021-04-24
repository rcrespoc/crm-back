const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
    if(req.body.imagen){
      fs.unlinkSync(path.join(__dirname,`../uploads/${req.body.imagen}`));
    }
    return res.status(400).json({
      errors
    })
  }
  next();
}

module.exports = {
  validarCampos
}
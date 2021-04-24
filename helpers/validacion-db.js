const { Producto, Cliente } = require('../models');

const existeProducto = async(nombre) => {
  const productoDB = await Producto.findOne({nombre});
  if(productoDB){
    throw new Error(`El producto ${nombre} ya existe`);
  }
  
}

module.exports = {
  existeProducto
}
const {Producto} = require('../models');
const fs = require('fs');
const path = require('path');

const crearProducto = async (req, res) => {
  const { nombre, precio } = req.body; 
  const obj = {
    nombre,
    precio,
  }
  try {
    const productoDB = await Producto.findOne({nombre});
    if(productoDB){
      return res.status(400).json({
        msg: `El productor ${nombre} ya existe, ctr`
      })
    }
    const producto = new Producto(obj);
    if(req.file.filename){
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json(producto)
  } catch (error) {
    res.status(500).json({
      msg: 'Pongase en contacto con el administrador del servidor.',
    })
  }
}

const mostrarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos)
  } catch (error) {
    res.status(500).json({
      msg: 'Pongase en contacto con el administrador del servidor.',
    })
  }
}

const mostrarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    if(!producto){
      return res.status(400).json({
        msg: `El producto con la id ${id} no existe.`
      })
    }
    res.json(producto)
  } catch (error) {
    res.status(500).json({
      msg: 'Pongase en contacto con el administrador del servidor.',
    })
  }
}

const editarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, imagen } = req.body;
  let obj = { nombre, precio };
  try {
    if(imagen){
      obj = {...obj, imagen};
      const productoDB = await Producto.findById(id);
      if(productoDB.imagen){
        fs.unlinkSync(path.join(__dirname,`../uploads/${productoDB.imagen}`));
      }
    }
    let producto = await Producto.findOneAndUpdate({_id: id}, obj, {new: true});
    res.json(producto)
  } catch (error) {
    res.status(500).json({
      msg: 'Pongase en contacto con el administrador del servidor.',
    })
  }
}

const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    if(producto.imagen){
      fs.unlinkSync(path.join(__dirname,`../uploads/${producto.imagen}`));
    }
    await producto.remove();
    return res.json({
      msg: 'Eliminado exitosamente.'
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'Pongase en contacto con el administrador del servidor.',
    })
  }
}

const mostrarProductoXNombre = async (req, res) => {
  const { nombre } = req.params;
  try {
    const producto = await Producto.find({nombre: new RegExp(nombre, 'i')});
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({
      msg: 'Pongase en contacto con el administrador del servidor.'
    })
  }
}

module.exports = {
  crearProducto,
  mostrarProductos,
  mostrarProducto,
  editarProducto,
  eliminarProducto,
  mostrarProductoXNombre
}
const {Cliente} = require('../models');

const nuevoCliente = async(req, res) => {
  const { nombre, apellido, empresa, telefono, email } = req.body;
  try {
    const clienteDB = await Cliente.findOne({email});
    if(clienteDB){
      return res.status(400).json({
        msg: `El correo ${email} ya está en uso`
      })
    }
    const cliente = new Cliente({nombre, apellido, empresa, telefono, email});
    await cliente.save();
    res.json({
      msg: 'Guardado correctamente'
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Busca al administrador del servidor csmmmm...'
    })
  }
}

const mostrarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes)
  } catch (error) {
    res.status(500).json({
      msg: 'Busca al administrador del servidor csmmm....'
    })
  }
}

const mostrarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findById(id);
    res.json(cliente)
  } catch (error) {
    res.status(500).json({
      msg: 'Busca al administrador del servidor csmmm....'
    })
  }
}

const actualizaCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, empresa, telefono, email } = req.body;
  const obj = { 
    nombre,
    apellido, 
    empresa, 
    telefono, 
    email 
  }
  try {
    const cliente = await Cliente.findOneAndUpdate({_id: id}, obj, { new: true })
    res.json(cliente)
  } catch (error) {
    res.status(500).json({
      msg: 'Busca al administrador del servidor csmmm....'
    })
  }
}

const eliminarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await Cliente.findOneAndDelete({_id: id})
    res.json({
      msg: 'Se eliminó correctamente.'
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Busca al administrador del servidor csmmm....'
    })
  }
}
module.exports = {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizaCliente,
  eliminarCliente
}
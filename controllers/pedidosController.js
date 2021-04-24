const { Pedido } = require('../models')

const nuevoPedido = async (req, res) => {
  const { cliente, productos, total } = req.body;
  const obj = {cliente, productos, total};
  try {
    const pedido = new Pedido(obj);
    await pedido.save();
    return res.json(pedido)
  } catch (error) {
    return res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const mostrarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('cliente').populate({
      path: 'productos.producto',
      model: 'productos'
    });
    res.json(pedidos)
  } catch (error) {
    return res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const mostrarPedido = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findById(id).populate('cliente').populate({
      path: 'productos.producto',
      model: 'productos'
    });
    if(!pedido){
      return res.status(400).json({
        msg: `El pedido con la id ${id} no existe`
      });
    }
    return res.json(pedido)
  } catch (error) {
    return res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const editarPedido = async (req, res) => {
  const { id } = req.params;
  const { productos, cliente, total } = req.body;
  const obj = {
    cliente, productos, total
  }
  try {
    const pedidoDB = await Pedido.findOneAndUpdate({_id: id}, obj, {new: true}).populate('cliente').populate({
      path: 'productos.producto',
      model: 'productos'
    });
    return res.json(pedidoDB)
  } catch (error) {
    return res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const eliminarPedido = async (req, res) => {
  const { id } = req.params;
  try {
    await Pedido.findOneAndDelete({_id: id})
    return res.json({
      msg: 'Pedido eliminado'
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

module.exports = {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido,
  editarPedido,
  eliminarPedido
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: 'Clientes'
  },
  productos: [{
    producto: {
      type: Schema.ObjectId,
      ref: 'productos'
    },
    cantidad: Number
  }],
  total: {
    type: Number
  }
});

pedidosSchema.methods.toJSON = function(){
  const { __v, ...pedido } = this.toObject();
  return pedido;
}

module.exports = mongoose.model('pedidos', pedidosSchema);
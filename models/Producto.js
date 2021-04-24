const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
  nombre: {
    type: String,
    trim: true
  },
  precio: {
    type: Number
  },
  imagen: {
    type: String
  }
})

productosSchema.methods.toJSON = function(){
  const { __v, ...producto } = this.toObject();
  return producto;
}

module.exports = mongoose.model('productos', productosSchema);
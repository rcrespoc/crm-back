const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
  nombre: {
    type: String,
    trim: true
  },
  apellido: {
    type: String,
    trim: true
  },
  empresa: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  }
})

clienteSchema.methods.toJSON = function(){
  const { __v, ...cliente } = this.toObject();
  return cliente;
}

module.exports = mongoose.model('Clientes', clienteSchema);
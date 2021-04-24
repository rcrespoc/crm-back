const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: '.env'});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {
  useNewUrlParser: true
}).then(resp => console.log('Base conectada'))

// Se crea el servidor
const app = express();


// Parseo
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Para declarar lo que sea público, lo que se pueda acceder
// Imagenes, index, etc...
app.use(express.static('uploads'));

// CORS
// Definir dominios en listas blancas
const whitelist = [process.env.FRONTEND_URL];
const corsOption = {
  origin: (origin, callback) => {
    console.log(origin)
    // Revisar si la peticion está en la whilelisst
    const existe = whitelist.some(dominio => dominio === origin);
    if(existe){
      callback(null, true)
    }else{
      callback(new Error('No permitido por CORS'))
    }
  }
}

app.use(cors(corsOption));

// Rutas
app.use('/', require('./routes'))
app.use('/api/clientes', require('./routes/clientes'))
app.use('/api/productos', require('./routes/productos'))
app.use('/api/pedidos', require('./routes/pedidos'))
app.use('/api/auth', require('./routes/usuarios'))

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// Se coloca a la escucha en el puerto.
app.listen(port, host, () => {
  console.log('Corriendo...')
});
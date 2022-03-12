//Crear instancia de Express
const express = require('express');
const app = express();


//3. LIBRERIA DOTENV
const dotenv = require("dotenv");
const res = require('express/lib/response');
dotenv.config();



//configuracion del puerto
const PORT = process.env.PORT || 4000


//Rutas
//app.use('/api/tienda', require('./routes/rutas.js'))

app.listen(PORT, () => {
    console.log(`Listen on Port: ${PORT}`)
})
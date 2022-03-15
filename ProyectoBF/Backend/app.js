//Crear instancia de Express
const express = require('express');
const app = express();




//3. LIBRERIA DOTENV
const dotenv = require("dotenv");

dotenv.config();

//
app.use(express.json());


const routes = require('./routes/rutas');

//configuracion del puerto
const PORT = process.env.PORT || 4000

//Rutas
app.use('/api/tienda', routes);


app.listen(PORT, () => {
    console.log(`Listen on Port: ${PORT}`)
})



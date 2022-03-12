const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
//const error=require('console');

//configuracion
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Rutas
app.use('/api/tienda', require('./routes/rutas.js'))

// Estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})
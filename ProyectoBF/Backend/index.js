const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

//configuracion
// configurando el puerto
app.set('port', process.env.PORT || 4000);

// middlewares
// hace log de cada petición
app.use(morgan('dev'));
// hace que express entienda JSON
app.use(express.json());
// Sirve para hacer que el body se reciba correctamente
app.use(bodyParser.urlencoded({ extended: false }));

//middleware para gestionar los errores, esto enviará un json con el error según sea el caso en validación 
app.use((error, req, res, next) => {
    res.status(400).json({
        status: 'error',
        message: error.message,
    });
});


//Rutas
app.use('/api/tienda', require('./routes/rutas.js'))

// Estáticos
//no es necesario
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})


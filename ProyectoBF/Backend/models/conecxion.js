const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'tienda',
    user: 'root',
    password: 'password'
});

module.exports = conexion;
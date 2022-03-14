const express = require('express'); // para el servidor web
const pool = require('../database'); // la conexión
const router = express.Router(); // para las rutas
const db = require('../database'); // no se está usando
const bcrypt = require('bcrypt'); // para encriptar
const validacion = require('./validacion');   //require a el archivo validación de la carpeta routes
const saltRounds = 10; // el tamaño o dificultad del Salt de la encriptación

/*router.get('/', (req, res) => {
    res.json({
        status: 'API funciona'
    });
})*/

// para ver todos los usuarios con todos sus datos
// es inutil
router.get('/', async (req, res) => {
    await pool.query('SELECT * FROM Usuarios', (err, usuarios) => {
        if (err) {
            res.json(err);
        };
        res.json(usuarios);
    })
})

//llamado a la función validate que contiene la función createUserValidation en el archivo validación 
router.post('/crear', validacion.validate(validacion.createUsersValidation), async (req, res) => {
    const { nombre, apellido, correo, telefono, pass, direccion } = req.body;
    console.log("nombre", nombre);
    // validando que no estén vacíos los campos
    if (!nombre || !apellido || !correo || !telefono || !pass || !direccion) {
        res.json("Datos vacíos");
    } else {
        // validando el correo no repita
        consulta = 'SELECT correoElectronico FROM Usuarios WHERE correoElectronico = ?'
        await pool.query(consulta, [correo], (err, respuesta) => {
            if (err) {
                res.json(err);
            } else {
                // si no existe el correo
                if (respuesta.length == 0) {
                    const nuevousuario = {
                        nombres: nombre,
                        apellidos: apellido,
                        correoElectronico: correo,
                        telefono: telefono,
                        contrasenia: pass,
                        dirección: direccion,
                        idrol: 1
                    };

                    // Encriptando contrasenia
                    bcrypt.hash(nuevousuario.contrasenia, saltRounds, (err, hash) => {

                        nuevousuario.contrasenia = hash;
                        consulta = 'INSERT INTO Usuarios set ?';
                        pool.query(consulta, [nuevousuario], (err, respuesta) => {
                            if (err) {
                                res.json(err);
                            } else {
                                res.json('recivido');
                            }
                        });
                    });
                } else {
                    res.json("correo en uso")
                }
            }
        });
    }
});

// Busca usuarios por medio de su id, no tiene uso practico aún
router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;
    consulta = 'SELECT * FROM usuarios where idUsuarios = ?';
    await pool.query(consulta, [id], (err, usuario) => {
        if (err) {
            res.json(err);
        }
        if (usuario) {
            res.json(usuario);
        }
    })
})

module.exports = router;
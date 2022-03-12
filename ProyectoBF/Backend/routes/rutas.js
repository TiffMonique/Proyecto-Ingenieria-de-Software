const express = require('express');
const pool = require('../database');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt');
const validacion=require('./validacion');
const saltRounds = 10;

/*router.get('/', (req, res) => {
    res.json({
        status: 'API funciona'
    });
})*/

router.get('/', async(req, res) => {
    await pool.query('SELECT * FROM Usuarios', (err, usuarios) => {
        if(err) {
            res.json(err);
        };
        res.json(usuarios);
    })
})

router.post('/crear', validacion.validate(validacion.createUsersValidation), async (req,res) => {
   const { nombre, apellido, correo, telefono, pass, direccion } = req.body;
   console.log("nombre", nombre);
   // validando que no estén vacíos los campos
    if(!nombre || !apellido || !correo || !telefono || !pass || !direccion) {
        res.json("Datos vacíos");
    }else{
        // validando el correo no repita
        consulta = 'SELECT correoElectronico FROM Usuarios WHERE correoElectronico = ?'
        await pool.query(consulta, [correo], (err, respuesta) => {
            if(err) {
                res.json(err);
            }else {
                // si no existe el correo
                if(respuesta.length == 0) {
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
                            if(err) {
                                res.json(err);
                            }else {
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

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;
    consulta = 'SELECT * FROM usuarios where idUsuarios = ?';
    await pool.query(consulta, [id], (err, usuario) => {
        if(err){
            res.json(err);
        }
        if (usuario) {
            res.json(usuario);
        }
    })
})

module.exports = router;
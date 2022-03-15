
const express = require("express");
const app = express();
const bcryptjs = require('bcryptjs');
const pool = require("../database");
const auth = require("./sesiones.js");
/*app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));*/

app.post('/login', async (req, res)=>{
    const {correo, pass} = req.body;
    const valores = [correo, pass]
    console.log(req.body);
    await pool.query("SELECT * FROM Usuarios WHERE correo = ?", [correo], (err, result) =>{
        if(err){
            res.status(500).send(err);
        }else{
            if(result.length > 0){
                //res.status(200).send(result[0]);
                console.log("len >0");
                console.log(result)
                const comparacion = bcryptjs.compareSync(pass, result[0].pass);

                if(comparacion) {
                    req.session.ingresado = true;
                    req.session.user = correo;
                    req.session.admin = false;
                    console.log(req.session);
                    res.status(200).json({
                        message: "Autenticado"
                    });
                } else {
                    res.status(400).json({
                        message: "Usuario o contraseña incorrecta"
                    })
                }
            }else{
                res.status(400).json({
                    message: "Usuario o contraseña incorrecta"
                })
            }
        }
    })
})

app.post('/prueba', auth, async(req, res) => {
    res.send("Entra!!!");
});


  

module.exports = app;
//11.Autenticacion
/*app.post('/auth', async (req, res) => {
    const correoElectronico = req.body.correo;
    const contrasenia = req.body.pass;
    let passHash2 = await bcryptjs.hash(contrasenia, 2);
    if (correoElectronico && contrasenia) {
        connection.query('SELECT * FROM usuarios WHERE correoElectronico = ?', [correoElectronico],
            async (error, results) => {
                if (results.length == 0 || !(await bcryptjs.compare(contrasenia, results[0].contrasenia))) {
                    res.render('loginForm', {
                        alert: true,
                        alertTitle: "HA OCURRIDO UN ERROR",
                        alertMessage: "CORREO y/o PASSWORD INCORRECTOS INTENTE DE NUEVO",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'loginForm'
                    });
                } else {
                    //variable de sesion
                    req.session.ingresado = true;
                    req.session.nombres = results[0].nombres
                    res.render('loginForm', {
                        alert: true,
                        alertTitle: "AUTENTICACION EXITOSA",
                        alertMessage: "LOGIN CORRECTO!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                        ruta: ''
                    });
                }
            })
    } else {
        res.render('loginForm', {
            alert: true,
            alertTitle: "ADVERTENCIA",
            alertMessage: "POR FAVOR INGRESE SU CORREO Y SU CONTRASEÑA",
            alertIcon: 'warning',
            showConfirmButton: true,
            timer: false,
            ruta: 'loginForm'
        });
    }
})*/
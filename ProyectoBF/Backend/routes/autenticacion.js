//11.Autenticacion
app.post('/auth', async (req, res) => {
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
})
//require del módulo yup que sirve para hacer validaciones de datos 
const yup = require('yup');

//crear un middleware que recibe la función a validar 
function validate(validation) {
    return (req, res, next) => { //debido a que es un middleware se tiene que retornar 
        try {
            validation(req.body); //recibe la información de la función a validar
            next();

        } catch (error) { //si hay un error 
            next(error);
        }
    };

}

//crear función para poder hacer las validaciones (le enviamos data que es lo que envía el usuario en el método post en el archivo rutas)
function createUsersValidation(data) {
    const schema = yup.object().shape({ //creamos un objeto yup
        nombre: yup.string().min(4).matches(/^[A-Z][a-z]+$/).required(),
        apellido: yup.string().min(4).matches(/^[A-Z][a-z]+$/).required(),
        correo: yup.string().matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/).required(),
        telefono: yup.number().min(8).integer().required(),
        pass: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/).required(),
        direccion: yup.string().min(8).required(),
    });
    schema.validateSync(data);
}


//exporta las funciones de este archivo
module.exports = {
    validate,
    createUsersValidation,
};






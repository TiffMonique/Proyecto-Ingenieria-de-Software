const yup = require('yup');

function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body);
            next();

        } catch (error) {
            next(error);
        }
    };

}

function createUsersValidation(data) {
    const schema = yup.object().shape({
        nombre: yup.string().min(4).matches(/^[A-Z][a-z]+$/).required(),
        apellido: yup.string().min(4).matches(/^[A-Z][a-z]+$/).required(),
        correo: yup.string().matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/).required(),
        telefono: yup.number().min(8).integer().required(),
        pass: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/).required(),
        direccion: yup.string().min(8).required(),
    });
    schema.validateSync(data);
}


module.exports = {
    validate,
    createUsersValidation,
};






const { validationResult } = require('express-validator');

/*
    el parametro next es para seguir con el siguiente middleware si paso la validación.
    si el código llega a next() va a seguir con el siguiente, si no hay siguiente entonces
    se ejecuta el controlador.
*/
const valFields = (req, res, next) =>{//llamamos en routes/users despues de las validaciones

    const errors = validationResult(req);//extrae los errores de las validaciones
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    valFields
}
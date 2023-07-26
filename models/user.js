const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'name is a required field']
    },
    email:{
        type: String,
        required: [true, 'email is a required field'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'password is a required field'],
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        emun: ['ADMIN', 'USER']
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

/*
primer parametro es el nombre del modelo con la primer letra mayuscula y tmb el nombre de la coleccion pero agregandole una "s"
y el segundo parametro es el schema
*/
module.exports = model('User', UserSchema);
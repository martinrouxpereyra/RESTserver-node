const {response, request} = require('express');
const bcyptjs = require('bcryptjs');
const User = require('../models/user');


const getUsers = (req = request, res = response) => {

    //const params = req.query;
    const {id , q = 'no existe parametro "q"', uKey} = req.query; //QUERY params

    res.json({
        msg: 'get API - controller',
        //params
        id: id,
        q: q,
        kwy: uKey
    });
}

const postUser =  async(req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    //verificar si el correo existe
    const existsEmail = await User.findOne({email});//email: email es redundante
    if(existsEmail){
        
        res.status(400).json({// 400 = bad request
            msg: 'este correo ya existe'
        });

        return;
    }

    //encriptar la contraseña
    const salt = bcyptjs.genSaltSync();//cantidad de vueltas para el hashing de la contraseña (por defecto esta en 10)
    user.password = bcyptjs.hashSync(password, salt);//hace un hash de la contraseña de una sola via
    //guardar en la bd
    await user.save();

    res.json({
        msg: 'post API - controller',
        user
    });
}

const deleteUser = (req, res = response) => {

    const {uId} = req.params;
    const status = res.statusCode;
    console.log(status);
    res.json({
        msg: 'delete API - controller',
        uId,
        status
    });
}

module.exports = {
    getUsers,
    postUser,
    deleteUser
}
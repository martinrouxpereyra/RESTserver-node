const {response, request} = require('express');
const bcyptjs = require('bcryptjs');
const User = require('../models/user');


const getUser = async(req = request, res = response) => {

    const {limit = 5, skip = 0} = req.query;
    const statusQuery = {status: true};

    // const users = await User.find(statusQuery)
    //     .skip(Number(skip))
    //     .limit(Number(limit));
    
    // const totalUsers = await User.countDocuments(statusQuery);

    //Promise.all ejecuta las promesas en simultaneo, si una falla, no sigue
    const resp = await Promise.all([
        User.countDocuments(statusQuery),
        User.find(statusQuery)
            .skip(Number(skip))
            .limit(Number(limit))
    ]);

    res.json({
        // totalUsers,
        // users
        resp
    });
}

const postUser =  async(req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

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

const putUser = async(req, res = response) =>{
    const { id } = req.params;
    const{ _id, password, google, mail, ...rest} = req.body;

    //TODO validar contra bd
    if(password){
        const salt = bcyptjs.genSaltSync();
        rest.password = bcyptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        msg: 'put API - putUser',
        user
    });

}
const deleteUser = async(req, res = response) => {

    const {id} = req.params;

    //viene del middleware validate-jwt ya que lo mande en el header
    const authorizedUser = req.authorizedUser;

    //para borrar fisicamente de la bd
    //const user = await User.findByIdAndDelete( id );

    //"borrar", cambiando el status
    const user = await User.findByIdAndUpdate(id , {status: false});

    res.json({  
        user,
        authorizedUser
    });
}

module.exports = {
    getUser,
    postUser,
    deleteUser,
    putUser
}
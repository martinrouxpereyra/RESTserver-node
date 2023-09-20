const { response, request } = require("express");
const User = require('../models/user');
const bcryptjs = require("bcryptjs");
const {generateJWT} = require('../helpers/jwt-generation');


const login = async(req = request, res = response) =>{

    const {email, password} = req.body;
    try {

        //validar que exista un email
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({
                msg: 'the email or the passeord is incorrect - correo'
            });
        }

        //verificar que este activo
        if(!user.status){
            return res.status(400).json({
                msg: 'the email or the passeord is incorrect - status false'
            });
        }

        //verificar la contraseña
        const validPassowrd = bcryptjs.compareSync(password, user.password);

        if(!validPassowrd){
            return res.status(400).json({
                msg: 'the email or the passeord is incorrect - wrong Pass'
            });
        }

        //generate JWT
        const token = await generateJWT(user.id);
        res.json({ 
            user,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Internal error'
        })
    }
    
}

module.exports = {
    login
}
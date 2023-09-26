const jwt = require('jsonwebtoken');
const { request, response } = require("express");
const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) =>{

    const token = req.header('x-token');

    if(!token){

        return res.status(401).json({
            msg: 'no token to verify'
        });
    }

    try {
        
        //puedo desestructurar el uid porque se que lo mande en el payload del jwt
        const { uid } = jwt.verify(token, process.env.SECRETOFPRIVATEKEY);//si falla tira un throw new error que lo captura el catch
       
        const authorizedUser = await User.findById(uid);  
        

        if(!authorizedUser){
            return res.status(401).json({
                msg: 'invalid token - user doesnt exist in DB'
            });
        }
        //si un usuario tiene status false no puede logearse
        if(!authorizedUser.status){
            return res.status(401).json({
                msg: 'invalid token - deleted user'
            });
        }

        req.authorizedUser = authorizedUser;
        
        next();
        
    } catch (error) {  
        res.status(401).json({
            msg: 'invalid token'
        });
    
    }

}

module.exports = {
    validateJWT
}
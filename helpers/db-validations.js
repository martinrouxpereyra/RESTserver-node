const Role = require('../models/rol');
const User = require('../models/user');

const validRole = async(role = '') =>{
    const existRole = await Role.findOne({role});
    if(!existRole){
      throw new Error(`${role} doesn't exist`);
    }
}

//verificar si el correo existe
const existingEmail = async(email = '') =>{
    
    const existsEmail = await User.findOne({email});
    if(existsEmail){      
        throw new Error(`an user with '${email}' is alredy registered`); 
    }
}

//verifica si hay un usuario con determinado id
const existingUser = async( id ) =>{
    
    const existsUser = await User.findById(id);
    if(!existsUser){      
        throw new Error(`there is no user with ${id} id.`); 
    }
}

module.exports = {
    validRole,
    existingEmail,
    existingUser
}
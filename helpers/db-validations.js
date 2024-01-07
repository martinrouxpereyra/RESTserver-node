const { default: mongoose } = require('mongoose');
const { Category, User } = require('../models');
const Role = require('../models/rol');

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

const existingCategory = async( id ) =>{
    if(mongoose.Types.ObjectId.isValid(id)){
        // Verificar si el id de la categoría existe
        const existCategory = await Category.findById(id)
        if(!existCategory) {
            throw new Error('the selected category doesnt exist');
        }
    }
}

const deletedCategory = async( id ) =>{
    if(mongoose.Types.ObjectId.isValid(id)){
        // Verificar si el id de la categoría existe
        const deletedCategory = await Category.findById(id);
        if(deletedCategory && deletedCategory.status == false){
            console.log('entro')
            throw new Error('the selected category doesnt exist');
        }

    }
}

module.exports = {
    validRole,
    existingEmail,
    existingUser,
    existingCategory,
    deletedCategory
}
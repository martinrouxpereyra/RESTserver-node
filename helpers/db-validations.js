const Role = require('../models/rol');

const validRole = async(role = '') =>{
    const existRole = await Role.findOne({role});
    if(!existRole){
      throw new Error(`${role} doesn't exist`);
    }
}

module.exports = {
    validRole
}
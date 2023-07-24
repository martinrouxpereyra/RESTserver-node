const mongoose = require('mongoose');

const dbConnection = async() =>{

    try {
        
        await mongoose.connect(process.env.MONGO_CNN);

        console.log('bd online');

    } catch (error) {
        console.log(error);
        throw new Error('Error, cannot conect to de db');
    }
}


module.exports = {
    dbConnection
}
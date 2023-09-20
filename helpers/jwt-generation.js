const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') =>{

    return new Promise( (resolve, reject) =>{

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETOFPRIVATEKEY,{
            expiresIn: '4h'
        }, (err, token) =>{

            if( err ){
                console.log(err);
                reject('the token could not be generated');
            }else{
                resolve(token);
            }
        })
    })

}

module.exports = {
    generateJWT
} 
    

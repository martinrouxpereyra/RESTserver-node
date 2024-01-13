const { response } = require('express');


const isAdminRole = ( req, res = response, next ) => {

    if ( !req.authorizedUser ) {
        return res.status(500).json({
            msg: 'You want to verify the role without validating the token first'
        });
    }

    const { role, name } = req.authorizedUser;
    
    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } user has not enough privileges`
        });
    }

    next();
}


const hasRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.authorizedUser ) {
            return res.status(500).json({
                msg: 'You want to verify the role without validating the token first'
            });
        }

        if ( !roles.includes( req.authorizedUser.role ) ) {
            return res.status(401).json({
                msg: `the service requires one of this roles ${ roles }`
            });
        }


        next();
    }
}



module.exports = {
    isAdminRole,
    hasRole
}
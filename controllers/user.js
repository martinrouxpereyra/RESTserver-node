const {response, request} = require('express');

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

const postUser =  (req, res = response) => {
    //const body = req.body;
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - controller',
        //1body
        nombre, edad
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
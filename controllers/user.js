const {response} = require('express');

const getUsers = (req, res = response) => {
    res.json({
        msg: 'get API - controller'
    });
}

const postUser =  (req, res = response) => {
    res.status(201).json({
        msg: 'post API - controller'
    });
}

const deleteUser = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    getUsers,
    postUser,
    deleteUser
}
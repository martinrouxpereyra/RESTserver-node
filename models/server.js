/* 
Se maneja el servidor de express como una clase para que el app.js sea mas limpio,
ademas asi le damos un poco mas de orden al código
*/

/*
los middlewares son funciones que van a añadirle funcionalidad al web server,
se ejecutan cada vez que levantemos el servidor,
la palabra clave para saber que es un middleware es 'use'
*/
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8008;

        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            users:      '/api/users'
        }
        //conexion a la bd
        this.conectDB();

        //middlewares
        this.middlewares();

        //rutas de la app
        this.routes();
    }

    async conectDB(){
        await dbConnection();
    }

    middlewares(){

        //cors
        this.app.use(cors());

        //lectura y parseo
        this.app.use(express.json());
        
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.users, require('../routes/user'));//configurando el endpoint al router
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;
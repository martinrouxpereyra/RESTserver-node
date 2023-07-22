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

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //middlewares
        this.middlewares();

        //rutas de la app
        this.routes();
    }

    middlewares(){

        this.cors.use(cors());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/api', (req, res) => {
            res.send('Hello World');
        });
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;
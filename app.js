require('dotenv').config();//toma el archivo .env y configura las variables de entorno
const Server = require('./models/server');

const server = new Server();

server.listen();
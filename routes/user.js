/*
  Router es un componente que permite organizar y modularizar las rutas y controladores en una aplicación web,
  Los enrutadores son particularmente útiles cuando se necesita dividir una aplicación en múltiples módulos o 
  cuando se desean manejar diferentes tipos de solicitudes de manera más organizada.

  Al utilizar un enrutador, se pueden agrupar rutas relacionadas y sus respectivas funciones de controlador
  en una unidad lógica, lo que facilita el mantenimiento y mejora la legibilidad del código. Los enrutadores
  también pueden ser montados en la aplicación principal como sub-rutas, lo que proporciona una forma eficiente
  de manejar rutas dentro de contextos específicos.
*/

//NOTA: pongo solo '/' dentro de las peticiones pq en server mediante un middleware le digo el endpoint
const {Router} = require('express');
const {getUsers, postUser, deleteUser} = require('../controllers/user');

const router = Router();


router.get('/', getUsers );

router.post('/', postUser);

router.delete('/:uId', deleteUser); //:uId es un parametro de la url

module.exports = router;
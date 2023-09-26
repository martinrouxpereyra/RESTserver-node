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
const {getUser, postUser, deleteUser, putUser} = require('../controllers/user');
const { check } = require('express-validator');
const { valFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validRole, existingEmail, existingUser } = require('../helpers/db-validations');
const router = Router();

/*
Los middlewares son el segundo argumento, si no hay middlewares la llamada al controlador es el segundo.

Al momento de ejecutar el post, antes de llamar al controlador va a hacer las verificaciones pertinentes,
va a preparar un json con los errores que vaya encontrando, y cuamdo termine va a disparar el controlador
donde vamos a fijarnos si ese arreglo de errores esta vacio o no y mostrar los errores
*/
router.get('/', getUser );

router.put('/:id',[
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(existingUser),
  check('role').custom( validRole ),
  valFields
], putUser );

router.post('/',[
  check('name', 'name is a required field').not().isEmpty(),
  check('password', 'the password must have at least 6 characters').isLength({min: 6}),
  //check('email', 'invalid email').isEmail(),//si no es un email válido agrega el error a la lista de errores
  check('email').custom(existingEmail).isEmail(),
  //check('role', 'invalid role').isIn(['ADMIN', 'USER']),
  check('role').custom( validRole ), // (role) =>validRole(role) ... cuando el primer arg es el mismo arg que se recibe al principio, se manda solo la ref a la funcion
  valFields //middleware que checkea si cayó en alguno de los check
], postUser);//se manda un arreglo porque puede haber más de una validación para la misma request

router.delete('/:id',[
  validateJWT,
  check('id', 'is not a valid id').isMongoId(),
  check('id').custom(existingUser),
  valFields
], deleteUser); //:id es un parametro de la url

module.exports = router;
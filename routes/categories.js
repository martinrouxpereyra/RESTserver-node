const {Router} = require('express');
const { check } = require('express-validator');
const { getCategories, postCategory, getCategoty, putCategory, deleteCategoty } = require('../controllers/categories');

const { valFields } = require('../middlewares/validate-fields');
const { validateJWT} = require('../middlewares/validate-jwt');  
const { existingCategory, deletedCategory } = require('../helpers/db-validations');

const router = Router();

//obetener todas las categorias - publica
router.get('/', getCategories);

//obetener categoria por id - publica
router.get('/:id',[
    check('id', 'it is not a mongo ID').isMongoId(),
    check('id').custom(existingCategory),
    valFields
],getCategoty);

//agregar una nueva categoria - usuario con token valido
router.post('/', [
    validateJWT,
    check('name', 'name is a required field').not().isEmpty(),
    valFields
], postCategory);

//actualizar una categoria - usuario con token valido
router.put('/:id',[
    validateJWT,
    check('name', 'name is a required field').not().isEmpty(),
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(existingCategory),
    valFields
], putCategory);

//"Eliminar una categoria"
router.delete('/:id',[
    validateJWT,
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(existingCategory),
    check('id').custom(deletedCategory),
    valFields
], deleteCategoty);


module.exports = router;
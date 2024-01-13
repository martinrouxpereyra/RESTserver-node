const {Router} = require('express');
const { check } = require('express-validator');
const { getProducts, getProduct, postProduct, putProduct, deleteProduct } = require('../controllers/products');

const { valFields } = require('../middlewares/validate-fields');
const { validateJWT} = require('../middlewares/validate-jwt');  
const { existingProduct, existingCategory } = require('../helpers/db-validations');
const { isAdminRole } = require('../middlewares/validate-isAdminRole');

const router = Router();


router.get('/', getProducts);


router.get('/:id',[
    check('id', 'it is not a mongo ID').isMongoId(),
    check('id').custom(existingProduct),
    valFields
],getProduct);


router.post('/', [
    validateJWT,
    check('name', 'name is a required field').not().isEmpty(),
    check('category', 'category is a required field').not().isEmpty(),
    check('category', 'is not a mongo ID').isMongoId(),
    check('category').custom(existingCategory),
    valFields
], postProduct);


router.put('/:id',[
    validateJWT,
    check('id', 'is not a mongo ID').isMongoId(),
    check('id').custom(existingProduct),
    valFields
], putProduct);


router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(existingProduct),
    valFields
], deleteProduct);


module.exports = router;
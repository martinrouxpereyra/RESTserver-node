const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { valFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email', 'email is a required field').isEmail(),
    check('password', 'password is a required field').not().isEmpty(),
    valFields
], login );

module.exports = router;
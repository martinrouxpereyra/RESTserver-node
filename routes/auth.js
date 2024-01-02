const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { valFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email', 'email is a required field').isEmail(),
    check('password', 'password is a required field').not().isEmpty(),
    valFields
], login );

router.post('/google',[
    check('id_token', 'id_token is required').not().isEmpty(),
    valFields
], googleSignIn );

module.exports = router;
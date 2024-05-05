const { Router, response, request} = require('express');
const { register } = require('../controllers/authController');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');
const { verifyEmail } = require('../helpers/verify-email');


const router = Router();

router.get('/login', ( req = request, res = response) => {
    res.status(200).json({
        msg: 'Login'
    })
});

router.post('/register',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').custom(verifyEmail),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('phone', 'El telefono es obligatorio').not().isEmpty(),
    validateFields
] , register);

//http://localhost:8080/api/auth/register

module.exports = router;
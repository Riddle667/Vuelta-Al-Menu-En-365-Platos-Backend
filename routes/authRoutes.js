const { Router, response, request} = require('express');
const { register, login } = require('../controllers/authController');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');
const { verifyEmail, verifyEmailLogin } = require('../helpers/verify-email');


const router = Router();

router.post('/login', [
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'email not exist').custom(verifyEmailLogin),
    validateFields
] , login);

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('email', 'email exist').custom(verifyEmail),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    validateFields
] , register);


module.exports = router;
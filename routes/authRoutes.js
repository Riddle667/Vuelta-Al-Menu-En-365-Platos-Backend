const { Router } = require('express');
const { login, register, requestPasswordReset, resetPassword } = require('../controllers/authController');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'El correo electrónico es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
], register);

router.post('/request-password-reset', [
    check('email', 'El correo electrónico es obligatorio').isEmail(),
    validateFields
], requestPasswordReset);

router.post('/reset-password', [
    check('token', 'El token es obligatorio').not().isEmpty(),
    check('newPassword', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
], resetPassword);

module.exports = router;

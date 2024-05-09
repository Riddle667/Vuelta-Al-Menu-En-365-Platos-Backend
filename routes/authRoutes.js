const { Router, response, request} = require('express');
const { register, login } = require('../controllers/authController');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');
const { verifyEmail } = require('../helpers/verify-email');


const router = Router();

router.post('/login', login);

router.post('/register', register);

//http://localhost:8080/api/auth/register

module.exports = router;
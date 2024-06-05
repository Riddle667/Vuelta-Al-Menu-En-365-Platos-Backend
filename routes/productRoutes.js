const { Router } = require('express');
const { createProduct } = require('../controllers/productController');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');
const { validateJWT } = require('../middleware/validate-jwt');

const router = Router();

router.post('/create-product', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('images', 'Images is required').not().isEmpty(),
    check('price', 'Price must be a number').isNumeric(),
    check('categories', 'Categories is required').not().isEmpty(),
    validateFields,
    validateJWT
], createProduct);

module.exports = router;

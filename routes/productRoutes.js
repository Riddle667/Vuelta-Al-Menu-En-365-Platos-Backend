const { Router } = require('express');
const { createProduct } = require('../controllers/productController');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();

router.post('/create-product', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('image', 'Image is required').not().isEmpty(),
    check('price', 'Price must be a number').isNumeric(),
    check('categoryId', 'Category ID is required').not().isEmpty(),
    validateFields
], createProduct);

module.exports = router;

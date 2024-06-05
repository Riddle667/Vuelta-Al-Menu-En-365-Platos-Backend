const { Router } = require('express');
const { createProduct } = require('../controllers/productController');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();

router.post('/create-product', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('images', 'At least one image is required').isArray({ min: 1 }),
    check('price', 'Price must be a number').isNumeric(),
    check('categoryIds', 'At least one category is required').isArray({ min: 1 }),
    validateFields
], createProduct);

module.exports = router;
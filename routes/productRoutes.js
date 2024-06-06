const { Router } = require('express');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
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

router.get('/products', getProducts);

router.get('/product/:id', getProductById);

router.put('/update-product/:id', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('images', 'At least one image is required').isArray({ min: 1 }),
    check('price', 'Price must be a number').isNumeric(),
    check('categoryIds', 'At least one category is required').isArray({ min: 1 }),
    validateFields
], updateProduct);

router.delete('/delete-product/:id', deleteProduct);

module.exports = router;
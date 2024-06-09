const { Router } = require('express');
const { createProduct, getAllProducts, getProductDetail, updateProduct, deleteProduct } = require('../controllers/productController');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');
const { validateJWT } = require('../middleware/validate-jwt');

const router = Router();

router.post('/create-product', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price must be a number').isNumeric(),
    validateFields
], createProduct);

router.get('/products', validateJWT, getAllProducts);

router.get('/product/:id', validateJWT, getProductDetail);

router.put('/update-product/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price must be a number').isNumeric(),
    validateFields
], updateProduct);

router.delete('/delete-product/:id', validateJWT, deleteProduct);

module.exports = router;

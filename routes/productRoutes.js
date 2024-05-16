const { Router } = require('express');
const { createProduct } = require('../controllers/productController');

const router = Router();

router.get('/create-product', createProduct);


module.exports = router;
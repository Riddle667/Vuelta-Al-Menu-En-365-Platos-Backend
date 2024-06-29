const { Router } = require("express");
const { validateJWT } = require("../middleware/validate-jwt");
const { validateFields } = require("../middleware/validate-fields");
const { check } = require("express-validator");
const { manageCart, getAllOrders, updateOrderStatus } = require('../controllers/orderController');


const router = Router();

router.post('/manage-cart',[
    validateJWT,
    validateFields,
    check('productId', 'Product ID is required').not().isEmpty(),
    check('quantity', 'Quantity must be a number').isNumeric(),
    check('quantity', 'Quantity must be greater than 0').isInt({ min: 1 })
], manageCart);

router.get('/orders', validateJWT, getAllOrders);

router.put('/update-order/:id', [
    validateJWT,
    check('status', 'Status is required').not().isEmpty(),
    validateFields
], updateOrderStatus);

module.exports = router;

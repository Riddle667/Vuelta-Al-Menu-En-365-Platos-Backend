const { Router } = require("express");
const { validateJWT } = require("../middleware/validate-jwt");
const { validateFields } = require("../middleware/validate-fields");
const { check } = require("express-validator");
const { manageCart } = require("../controllers/orderController");


const router = Router();

router.put('/manage-cart',[
    validateJWT,
    validateFields,
    check('productId', 'Product ID is required').not().isEmpty(),
    check('quantity', 'Quantity must be a number').isNumeric(),
    check('quantity', 'Quantity must be greater than 0').isInt({ min: 1 })
], manageCart);

module.exports = router;


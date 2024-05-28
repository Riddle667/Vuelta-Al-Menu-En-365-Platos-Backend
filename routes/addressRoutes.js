const { Router } = require("express");
const { showAddress, createAddress } = require("../controllers/addressController");
const { validateJWT } = require("../middleware/validate-jwt");
const { validateFields } = require("../middleware/validate-fields");
const { check } = require("express-validator");


const router= Router();

router.get('/show-address',[
    validateJWT,
    validateFields
],showAddress);

router.post('/create-address',[
    check('name', 'Name is required').not().isEmpty(),
    check('street', 'Street is required').not().isEmpty(),
    check('district', 'District is required').not().isEmpty(),
    check('referencePoint', 'Reference point is required').not().isEmpty(),
    validateJWT,
    validateFields
], createAddress);

module.exports = router;
const { Router } = require('express');
const { showAddress, createAddress, saveReferencePoint } = require('../controllers/addressController');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');
const { validateJWT } = require('../middleware/validate-jwt');

const router = Router();

router.get('/show-address', validateJWT, showAddress);

router.post('/create-address', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('street', 'Street is required').not().isEmpty(),
    check('district', 'District is required').not().isEmpty(),
    validateFields
], createAddress);

router.post('/save-reference-point', [
    validateJWT,
    check('userId', 'User ID is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('latitude', 'Latitude is required').not().isEmpty(),
    check('longitude', 'Longitude is required').not().isEmpty(),
    validateFields
], saveReferencePoint);

module.exports = router;
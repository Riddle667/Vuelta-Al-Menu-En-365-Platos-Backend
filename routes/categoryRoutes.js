const { Router } = require('express');
const { createCategory, showCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');
const { validateJWT } = require('../middleware/validate-jwt');

const router = Router();

router.post('/create-category', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    validateFields
], createCategory);

router.get('/show-category', validateJWT, showCategory);

router.put('/update-category/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    validateFields
], updateCategory);

router.delete('/delete-category/:id', [
    validateJWT,
], deleteCategory);

module.exports = router;

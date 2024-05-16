const { Router, response, request} = require('express');
const { createCategory, showCategory } = require('../controllers/categoryController');
const { check } = require('express-validator');

const router = Router();

router.post('/create-category',[
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
], createCategory);

router.get('/show-category', showCategory);

module.exports = router;
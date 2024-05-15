const { Router, response, request} = require('express');
const { createCategory, showCategory } = require('../controllers/categoryController');

const router = Router();

router.post('/create-category', createCategory);

router.get('/show-category', showCategory);

module.exports = router;
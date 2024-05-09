const { Router, response, request} = require('express');
const { createCategory } = require('../controllers/categoryController');

const router = Router();

router.post('/create-category', createCategory);

module.exports = router;
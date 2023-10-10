const express = require('express');
const { createProduct, fetchAllProducts, fetchProductById } = require('../controllers/ProductController');

const router = express.Router();

router.post('/', createProduct)
    .get('/', fetchAllProducts)
    .get('/:id', fetchProductById);

exports.router = router;
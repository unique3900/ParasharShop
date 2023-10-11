const express = require('express');
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require('../controllers/ProductController');

const router = express.Router();

router.post('/', createProduct)
    .get('/', fetchAllProducts)
    .get('/:id', fetchProductById)
    .post('/:id',updateProduct)

exports.router = router;
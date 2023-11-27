const express = require('express');
const { createProduct, fetchAllProducts, fetchProductById, updateProduct, fetchSellerProducts, deleteProducts, fetchTotalProducts } = require('../controllers/ProductController');

const router = express.Router();

router.post('/', createProduct)
    .get('/', fetchAllProducts)
    .get('/:id', fetchProductById)
    .patch('/:id', updateProduct)
    .get('/seller/:seller', fetchSellerProducts)
    .delete('/:id',deleteProducts).get('/seller/total-product/:seller',fetchTotalProducts)

exports.router = router;
const express = require('express');
const { createProduct, fetchAllProducts, fetchProductById, updateProduct, fetchSellerProducts, deleteProducts, fetchTotalProducts, searchProduct, updateProductRating } = require('../controllers/ProductController');

const router = express.Router();
const passport = require('passport');

router.post('/', createProduct)
    .get('/', fetchAllProducts)
    .get('/search', searchProduct)
    .get('/:id', fetchProductById)
    .patch('/:id', updateProduct)
    .post('/rating',passport.authenticate('jwt'),updateProductRating)
    .get('/seller/:seller', fetchSellerProducts)
    .delete('/:id',deleteProducts).get('/seller/total-product/:seller',fetchTotalProducts)

exports.router = router;
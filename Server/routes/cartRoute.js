const mongoose = require('mongoose');
const express = require('express');
const { fetchUserCart, addToCartController, removeFromCartController, updateCartController } = require('../controllers/CartController');


const router = express.Router();


router.get('/:id', fetchUserCart).post('/',addToCartController).delete('/:id',removeFromCartController).patch('/:id',updateCartController)


exports.router = router;
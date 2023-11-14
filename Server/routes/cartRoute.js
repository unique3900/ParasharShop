const mongoose = require('mongoose');
const express = require('express');
const { fetchUserCart, addToCartController, removeFromCartController, updateCartController, resetCartController } = require('../controllers/CartController');
const { isLoggedIn } = require('../Middleware/Auth');


const router = express.Router();


router.get('/:id', fetchUserCart).post('/',addToCartController).delete('/:id', removeFromCartController).patch('/:id',updateCartController).post('/reset',resetCartController)


exports.router = router;
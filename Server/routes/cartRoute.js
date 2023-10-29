const mongoose = require('mongoose');
const express = require('express');
const { fetchUserCart, addToCartController, removeFromCartController, updateCartController } = require('../controllers/CartController');
const { isLoggedIn } = require('../Middleware/Auth');


const router = express.Router();


router.get('/:id',isLoggedIn, fetchUserCart).post('/',isLoggedIn, addToCartController).delete('/:id',isLoggedIn, removeFromCartController).patch('/:id',isLoggedIn,updateCartController)


exports.router = router;
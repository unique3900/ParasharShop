const mongoose = require('mongoose');
const express = require('express');
const { fetchUserCart, addToCartController, removeFromCartController, updateCartController, resetCartController } = require('../controllers/CartController');
const { isLoggedIn } = require('../Middleware/Auth');


const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('jwt'), fetchUserCart).post('/', passport.authenticate('jwt'), addToCartController).delete('/:id', removeFromCartController).patch('/:id', updateCartController).post('/reset', passport.authenticate('jwt'),resetCartController);

exports.router = router;
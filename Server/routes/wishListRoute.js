const mongoose = require('mongoose');
const express = require('express');
const { createNewWishList, deleteWishList, resetWishlistController } = require('../controllers/WishlistController');

const router = express.Router();
const passport = require('passport');


router.get('/').post('/', passport.authenticate('jwt'), createNewWishList).post('/reset',resetWishlistController).delete('/:id', deleteWishList);
exports.router = router;
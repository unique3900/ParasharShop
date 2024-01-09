const mongoose = require('mongoose');
const express = require('express');

const passport = require('passport');
const { createNewWishList, deleteWishList } = require('../controllers/WishlistController');

const router = express.Router();

router.post('/', passport.authenticate('jwt'), createNewWishList).delete('/:id', deleteWishList);